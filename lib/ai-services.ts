// Advanced AI Services for Tourism Jharkhand
// Integrates multiple AI APIs for comprehensive analysis

export interface AIAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  emotions: { [key: string]: number }
  keywords: string[]
  language: string
  toxicity?: number
  urgency?: 'low' | 'medium' | 'high' | 'critical'
  categories?: string[]
  actionableInsights?: string[]
}

export interface VoiceAnalysisResult {
  transcription: string
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  emotions: { [key: string]: number }
  speakerTone: 'calm' | 'excited' | 'frustrated' | 'angry' | 'happy'
  language: string
}

export interface ImageAnalysisResult {
  description: string
  objects: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  quality: number
  issues?: string[]
  location?: string
}

// Advanced multilingual sentiment analysis with multiple AI models
export class AdvancedAIService {
  private huggingFaceKey: string
  private openAIKey?: string
  private googleCloudKey?: string

  constructor() {
    this.huggingFaceKey = process.env.HUGGINGFACE_API_KEY || ''
    this.openAIKey = process.env.OPENAI_API_KEY
    this.googleCloudKey = process.env.GOOGLE_CLOUD_API_KEY
  }

  // Enhanced text analysis with multiple AI models
  async analyzeText(text: string, language: string = 'auto'): Promise<AIAnalysisResult> {
    try {
      // Detect language if not specified
      const detectedLanguage = language === 'auto' ? await this.detectLanguage(text) : language

      // Run multiple AI analyses in parallel
      const [sentimentResult, emotionResult, toxicityResult, categoryResult] = await Promise.allSettled([
        this.analyzeSentiment(text, detectedLanguage),
        this.analyzeEmotions(text),
        this.analyzeToxicity(text),
        this.categorizeText(text)
      ])

      // Extract keywords using advanced NLP
      const keywords = await this.extractAdvancedKeywords(text, detectedLanguage)

      // Generate actionable insights
      const insights = await this.generateActionableInsights(text, detectedLanguage)

      // Determine urgency level
      const urgency = this.calculateUrgency(
        sentimentResult.status === 'fulfilled' ? sentimentResult.value : null,
        toxicityResult.status === 'fulfilled' ? toxicityResult.value : 0
      )

      return {
        sentiment: sentimentResult.status === 'fulfilled' ? sentimentResult.value.sentiment : 'neutral',
        confidence: sentimentResult.status === 'fulfilled' ? sentimentResult.value.confidence : 0.5,
        emotions: emotionResult.status === 'fulfilled' ? emotionResult.value : {},
        keywords,
        language: detectedLanguage,
        toxicity: toxicityResult.status === 'fulfilled' ? toxicityResult.value : 0,
        urgency,
        categories: categoryResult.status === 'fulfilled' ? categoryResult.value : [],
        actionableInsights: insights
      }
    } catch (error) {
      console.error('Advanced AI analysis failed:', error)
      return this.fallbackAnalysis(text, language)
    }
  }

  // Voice analysis with speech-to-text and emotion detection
  async analyzeVoice(audioBlob: Blob): Promise<VoiceAnalysisResult> {
    try {
      // Convert audio to text using Hugging Face Whisper
      const transcription = await this.speechToText(audioBlob)
      
      // Analyze the transcribed text
      const textAnalysis = await this.analyzeText(transcription)
      
      // Analyze voice tone and emotions from audio
      const voiceEmotions = await this.analyzeVoiceEmotions(audioBlob)
      
      return {
        transcription,
        sentiment: textAnalysis.sentiment,
        confidence: textAnalysis.confidence,
        emotions: { ...textAnalysis.emotions, ...voiceEmotions },
        speakerTone: this.determineSpeakerTone(voiceEmotions),
        language: textAnalysis.language
      }
    } catch (error) {
      console.error('Voice analysis failed:', error)
      throw new Error('Voice analysis service unavailable')
    }
  }

  // Image analysis for visual feedback
  async analyzeImage(imageBlob: Blob): Promise<ImageAnalysisResult> {
    try {
      // Convert image to base64
      const base64Image = await this.blobToBase64(imageBlob)
      
      // Analyze image content using Hugging Face Vision models
      const [description, objects, sentiment] = await Promise.all([
        this.generateImageDescription(base64Image),
        this.detectObjects(base64Image),
        this.analyzeImageSentiment(base64Image)
      ])

      // Assess image quality
      const quality = await this.assessImageQuality(base64Image)
      
      // Detect potential issues
      const issues = await this.detectImageIssues(base64Image, objects)

      return {
        description,
        objects,
        sentiment,
        quality,
        issues,
        location: await this.extractLocationFromImage(base64Image)
      }
    } catch (error) {
      console.error('Image analysis failed:', error)
      throw new Error('Image analysis service unavailable')
    }
  }

  // Language detection using AI
  private async detectLanguage(text: string): Promise<string> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/fasttext-language-identification',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ inputs: text }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        return result[0]?.label?.replace('__label__', '') || 'en'
      }
    } catch (error) {
      console.error('Language detection failed:', error)
    }
    return 'en'
  }

  // Enhanced sentiment analysis with multiple models
  private async analyzeSentiment(text: string, language: string): Promise<{sentiment: string, confidence: number}> {
    const models = [
      'cardiffnlp/twitter-roberta-base-sentiment-latest',
      'nlptown/bert-base-multilingual-uncased-sentiment'
    ]

    for (const model of models) {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            headers: {
              'Authorization': `Bearer ${this.huggingFaceKey}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ inputs: text }),
          }
        )

        if (response.ok) {
          const result = await response.json()
          if (Array.isArray(result) && result.length > 0) {
            const topResult = result[0]
            return {
              sentiment: this.normalizeSentiment(topResult.label),
              confidence: topResult.score
            }
          }
        }
      } catch (error) {
        console.error(`Sentiment analysis with ${model} failed:`, error)
      }
    }

    throw new Error('All sentiment analysis models failed')
  }

  // Advanced emotion analysis
  private async analyzeEmotions(text: string): Promise<{ [key: string]: number }> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ inputs: text }),
        }
      )

      if (response.ok) {
        const emotions = await response.json()
        if (Array.isArray(emotions) && emotions.length > 0) {
          const emotionScores: { [key: string]: number } = {}
          emotions[0].forEach((emotion: any) => {
            emotionScores[emotion.label.toLowerCase()] = emotion.score
          })
          return emotionScores
        }
      }
    } catch (error) {
      console.error('Emotion analysis failed:', error)
    }
    return {}
  }

  // Toxicity detection
  private async analyzeToxicity(text: string): Promise<number> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/unitary/toxic-bert',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ inputs: text }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        if (Array.isArray(result) && result.length > 0) {
          const toxicResult = result[0].find((r: any) => r.label === 'TOXIC')
          return toxicResult ? toxicResult.score : 0
        }
      }
    } catch (error) {
      console.error('Toxicity analysis failed:', error)
    }
    return 0
  }

  // Text categorization
  private async categorizeText(text: string): Promise<string[]> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: text,
            parameters: {
              candidate_labels: [
                'accommodation', 'food', 'transportation', 'attractions', 
                'service quality', 'cleanliness', 'safety', 'pricing', 
                'accessibility', 'cultural experience'
              ]
            }
          }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        return result.labels?.slice(0, 3) || []
      }
    } catch (error) {
      console.error('Text categorization failed:', error)
    }
    return []
  }

  // Advanced keyword extraction using TF-IDF and NER
  private async extractAdvancedKeywords(text: string, language: string): Promise<string[]> {
    try {
      // Named Entity Recognition
      const response = await fetch(
        'https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ inputs: text }),
        }
      )

      const entities: string[] = []
      if (response.ok) {
        const result = await response.json()
        if (Array.isArray(result)) {
          result.forEach((entity: any) => {
            if (entity.entity_group && entity.word) {
              entities.push(entity.word.replace('##', ''))
            }
          })
        }
      }

      // Combine with TF-IDF keywords
      const tfidfKeywords = this.extractTFIDFKeywords(text)
      
      return [...new Set([...entities, ...tfidfKeywords])].slice(0, 10)
    } catch (error) {
      console.error('Advanced keyword extraction failed:', error)
      return this.extractTFIDFKeywords(text)
    }
  }

  // Generate actionable insights using AI
  private async generateActionableInsights(text: string, language: string): Promise<string[]> {
    const insights: string[] = []
    
    // Rule-based insights for now (can be enhanced with GPT-4 later)
    const lowercaseText = text.toLowerCase()
    
    if (lowercaseText.includes('dirty') || lowercaseText.includes('unclean')) {
      insights.push('Immediate cleaning and hygiene improvement required')
    }
    
    if (lowercaseText.includes('expensive') || lowercaseText.includes('overpriced')) {
      insights.push('Review pricing strategy and provide value justification')
    }
    
    if (lowercaseText.includes('rude') || lowercaseText.includes('unprofessional')) {
      insights.push('Staff training and customer service improvement needed')
    }
    
    if (lowercaseText.includes('unsafe') || lowercaseText.includes('dangerous')) {
      insights.push('URGENT: Safety assessment and security measures required')
    }
    
    if (lowercaseText.includes('beautiful') || lowercaseText.includes('amazing')) {
      insights.push('Leverage positive aspects in marketing and promotion')
    }

    return insights
  }

  // Calculate urgency level
  private calculateUrgency(sentiment: any, toxicity: number): 'low' | 'medium' | 'high' | 'critical' {
    if (toxicity > 0.8 || (sentiment?.sentiment === 'negative' && sentiment?.confidence > 0.9)) {
      return 'critical'
    }
    if (toxicity > 0.6 || (sentiment?.sentiment === 'negative' && sentiment?.confidence > 0.7)) {
      return 'high'
    }
    if (toxicity > 0.3 || (sentiment?.sentiment === 'negative' && sentiment?.confidence > 0.5)) {
      return 'medium'
    }
    return 'low'
  }

  // Speech to text conversion
  private async speechToText(audioBlob: Blob): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.wav')

      const response = await fetch(
        'https://api-inference.huggingface.co/models/openai/whisper-large-v3',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
          },
          method: 'POST',
          body: formData,
        }
      )

      if (response.ok) {
        const result = await response.json()
        return result.text || ''
      }
    } catch (error) {
      console.error('Speech to text failed:', error)
    }
    return ''
  }

  // Voice emotion analysis
  private async analyzeVoiceEmotions(audioBlob: Blob): Promise<{ [key: string]: number }> {
    // Placeholder for voice emotion analysis
    // In production, this would use specialized audio emotion recognition models
    return {
      calm: 0.3,
      excited: 0.2,
      frustrated: 0.1,
      happy: 0.4
    }
  }

  // Determine speaker tone from voice emotions
  private determineSpeakerTone(emotions: { [key: string]: number }): 'calm' | 'excited' | 'frustrated' | 'angry' | 'happy' {
    const maxEmotion = Object.entries(emotions).reduce((a, b) => a[1] > b[1] ? a : b)
    return maxEmotion[0] as any || 'calm'
  }

  // Image description generation
  private async generateImageDescription(base64Image: string): Promise<string> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ inputs: base64Image }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        return result[0]?.generated_text || 'Unable to generate description'
      }
    } catch (error) {
      console.error('Image description failed:', error)
    }
    return 'Image analysis unavailable'
  }

  // Object detection in images
  private async detectObjects(base64Image: string): Promise<string[]> {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/detr-resnet-50',
        {
          headers: {
            'Authorization': `Bearer ${this.huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ inputs: base64Image }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        return result.map((obj: any) => obj.label).slice(0, 10)
      }
    } catch (error) {
      console.error('Object detection failed:', error)
    }
    return []
  }

  // Image sentiment analysis
  private async analyzeImageSentiment(base64Image: string): Promise<'positive' | 'negative' | 'neutral'> {
    // Placeholder - would use specialized image sentiment models
    return 'neutral'
  }

  // Assess image quality
  private async assessImageQuality(base64Image: string): Promise<number> {
    // Placeholder - would use image quality assessment models
    return Math.random() * 0.3 + 0.7 // Random quality between 0.7-1.0
  }

  // Detect issues in images
  private async detectImageIssues(base64Image: string, objects: string[]): Promise<string[]> {
    const issues: string[] = []
    
    // Rule-based issue detection
    if (objects.includes('trash') || objects.includes('garbage')) {
      issues.push('Cleanliness issue detected')
    }
    
    if (objects.includes('damage') || objects.includes('broken')) {
      issues.push('Infrastructure damage detected')
    }
    
    return issues
  }

  // Extract location from image metadata
  private async extractLocationFromImage(base64Image: string): Promise<string | undefined> {
    // Placeholder - would extract GPS data from EXIF or use image recognition
    return undefined
  }

  // Utility functions
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  private normalizeSentiment(label: string): 'positive' | 'negative' | 'neutral' {
    const normalized = label.toLowerCase()
    if (normalized.includes('positive') || normalized.includes('pos')) return 'positive'
    if (normalized.includes('negative') || normalized.includes('neg')) return 'negative'
    return 'neutral'
  }

  private extractTFIDFKeywords(text: string): string[] {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'was', 'are', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
    ])
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
    
    const wordCount: { [key: string]: number } = {}
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word)
  }

  private fallbackAnalysis(text: string, language: string): AIAnalysisResult {
    // Simple rule-based fallback
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'beautiful', 'love', 'perfect']
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointing', 'poor']
    
    const words = text.toLowerCase().split(/\s+/)
    const positiveCount = words.filter(word => positiveWords.includes(word)).length
    const negativeCount = words.filter(word => negativeWords.includes(word)).length
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    let confidence = 0.5
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive'
      confidence = Math.min(0.8, 0.5 + (positiveCount - negativeCount) * 0.1)
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative'
      confidence = Math.min(0.8, 0.5 + (negativeCount - positiveCount) * 0.1)
    }
    
    return {
      sentiment,
      confidence,
      emotions: {
        joy: sentiment === 'positive' ? confidence * 0.8 : 0.1,
        anger: sentiment === 'negative' ? confidence * 0.6 : 0.1,
        sadness: sentiment === 'negative' ? confidence * 0.4 : 0.1,
      },
      keywords: this.extractTFIDFKeywords(text),
      language: language || 'en',
      toxicity: 0,
      urgency: 'low',
      categories: [],
      actionableInsights: []
    }
  }
}

// Singleton instance
export const aiService = new AdvancedAIService()
