const fs = require('fs');
const path = require('path');

/**
 * Fallback data loader for when MongoDB is unavailable
 */
class FallbackDataLoader {
  constructor() {
    this.placesData = null;
    this.destinationsData = null;
    this.loaded = false;
  }

  /**
   * Load data from local files
   */
  async loadLocalData() {
    if (this.loaded) return;

    try {
      // Load places.js
      const placesPath = path.join(__dirname, '..', '..', 'db', 'places.js');
      if (fs.existsSync(placesPath)) {
        const placesContent = fs.readFileSync(placesPath, 'utf8');
        const arrayMatch = placesContent.match(/const\s+\w+\s*=\s*(\[[\s\S]*\]);/);
        if (arrayMatch) {
          this.placesData = eval(arrayMatch[1]);
          console.log(`📁 Loaded ${this.placesData.length} places from local file`);
        }
      }

      // Load destination.js
      const destPath = path.join(__dirname, '..', '..', 'db', 'destination.js');
      if (fs.existsSync(destPath)) {
        let destContent = fs.readFileSync(destPath, 'utf8');
        destContent = destContent.replace('export default destinations;', '');
        const arrayMatch = destContent.match(/const\s+destinations\s*=\s*(\[[\s\S]*\])/);
        if (arrayMatch) {
          this.destinationsData = eval(arrayMatch[1]);
          console.log(`📁 Loaded ${this.destinationsData.length} destinations from local file`);
        }
      }

      this.loaded = true;
    } catch (error) {
      console.error('❌ Error loading fallback data:', error);
    }
  }

  /**
   * Search places by keywords (fallback for MongoDB queries)
   */
  async searchPlaces(searchTerms, limit = 5) {
    await this.loadLocalData();
    
    if (!this.placesData && !this.destinationsData) {
      return [];
    }

    const allPlaces = [];
    
    // Transform places.js data
    if (this.placesData) {
      this.placesData.forEach(place => {
        allPlaces.push({
          name: place.name,
          district: place.district,
          category: this.determineCategory(place.name),
          description: `Beautiful ${this.determineCategory(place.name)} in ${place.district} district`,
          lat: place.lat,
          lon: place.lon,
          streetView: place.streetView || '',
          imageName: this.findImageName(place.name)
        });
      });
    }

    // Transform destinations.js data
    if (this.destinationsData) {
      this.destinationsData.forEach(dest => {
        allPlaces.push({
          name: dest.name,
          district: dest.distance ? dest.distance.split(' from ')[1] || 'Ranchi' : 'Ranchi',
          category: this.determineCategory(dest.name),
          description: dest.description || `Beautiful destination in Jharkhand`,
          lat: 23.3441,
          lon: 85.3094,
          streetView: '',
          imageName: this.findImageName(dest.name)
        });
      });
    }

    // Search logic
    if (!searchTerms || searchTerms.length === 0) {
      return allPlaces.slice(0, limit);
    }

    const searchRegex = new RegExp(searchTerms.join('|'), 'i');
    const matches = allPlaces.filter(place => 
      searchRegex.test(place.name) ||
      searchRegex.test(place.district) ||
      searchRegex.test(place.category) ||
      searchRegex.test(place.description)
    );

    return matches.slice(0, limit);
  }

  /**
   * Get all places (fallback for MongoDB count/list)
   */
  async getAllPlaces() {
    await this.loadLocalData();
    return this.searchPlaces([], 100); // Return all places
  }

  /**
   * Find image name for a place
   */
  findImageName(placeName) {
    try {
      const imagesPath = path.join(__dirname, '..', '..', 'db', 'arvrPics');
      if (!fs.existsSync(imagesPath)) return null;

      const imageFiles = fs.readdirSync(imagesPath);
      const searchName = placeName.toLowerCase();

      // Direct match
      const directMatch = imageFiles.find(file => 
        path.parse(file).name.toLowerCase() === searchName
      );
      if (directMatch) return directMatch;

      // Partial match
      const partialMatch = imageFiles.find(file => {
        const fileName = path.parse(file).name.toLowerCase();
        return fileName.includes(searchName) || searchName.includes(fileName);
      });
      
      return partialMatch || null;
    } catch (error) {
      console.error('Error finding image:', error);
      return null;
    }
  }

  /**
   * Determine category based on place name
   */
  determineCategory(name) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('falls') || nameLower.includes('waterfall')) return 'waterfall';
    if (nameLower.includes('dam')) return 'dam';
    if (nameLower.includes('temple') || nameLower.includes('mandir')) return 'temple';
    if (nameLower.includes('fort') || nameLower.includes('palace')) return 'fort';
    if (nameLower.includes('park') || nameLower.includes('zoo') || nameLower.includes('garden')) return 'park';
    if (nameLower.includes('hill') || nameLower.includes('peak') || nameLower.includes('mountain') || nameLower.includes('valley')) return 'hill';
    if (nameLower.includes('museum')) return 'museum';
    return 'other';
  }

  /**
   * Get statistics (fallback for MongoDB aggregation)
   */
  async getStats() {
    const places = await this.getAllPlaces();
    const categories = {};
    
    places.forEach(place => {
      categories[place.category] = (categories[place.category] || 0) + 1;
    });

    return {
      total: places.length,
      withImages: places.filter(p => p.imageName).length,
      categories: Object.entries(categories)
        .map(([category, count]) => ({ _id: category, count }))
        .sort((a, b) => b.count - a.count)
    };
  }
}

// Export singleton instance
module.exports = new FallbackDataLoader();
