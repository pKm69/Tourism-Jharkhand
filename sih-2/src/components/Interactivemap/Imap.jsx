import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Imap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color = '#e74c3c') =>
  L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        pointer-events: auto;
        position: relative;
        width: 24px;
        height: 24px;
        background-color: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      ">
        <div style="
          position: absolute;
          width: 50%;
          height: 50%;
          background: white;
          border-radius: 50%;
          top: 25%;
          left: 25%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
  });

const JharkhandMap = () => {
  const jharkhandCenter = [23.6102, 85.2799];

  const famousPlaces = [
    {
      id: 1,
      name: 'Netarhat',
      position: [23.4854, 84.2648],
      description: 'Queen of Chotanagpur - breathtaking sunrise views',
      streetViewLink:
        'https://www.google.com/maps/place/Netarhat,+Jharkhand+835218/@23.481603,84.2668631,3a,75y,189.57h,83.34t/data=!3m7!1e1!3m5!1sEPBkEz9iuha2Ck2NgtNYiw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D6.662762039621839%26panoid%3DEPBkEz9iuha2Ck2NgtNYiw%26yaw%3D189.57170891104278!7i13312!8i6656!4m6!3m5!1s0x398b08073b9e73e9:0x27447d0d1c7e558f!8m2!3d23.485434!4d84.2647522!16zL20vMDVraDNs?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 2,
      name: 'Betla National Park',
      position: [23.885621, 84.192385],
      description: 'Wildlife sanctuary with tigers and elephants',
      streetViewLink: 'https://www.google.com/maps/place/Betla+National+Park/@23.8695988,84.2107576,3a,75y,195.62h,88.96t/data=!3m7!1e1!3m5!1sJVNk2TOXC0sTbNIl5u7fpg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D1.0429930750639897%26panoid%3DJVNk2TOXC0sTbNIl5u7fpg%26yaw%3D195.6194047750014!7i13312!8i6656!4m6!3m5!1s0x398b837be6d19761:0xb1a90adf2189a235!8m2!3d23.8856486!4d84.1923982!16zL20vMDhfcWts?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 3,
      name: 'Hundru Falls',
      position: [23.450781, 85.667014],
      description: 'Spectacular 98-meter waterfall cascade',
      streetViewLink: 'https://www.google.com/maps/@23.450922,85.66745,3a,75y,10.65h,123.44t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDq3ICfIg!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HZ3z8Qo6kh-KeLxbDVDBwuqf6SCdpVt4unB43T3HYz8Ki7GQhWAKRY8Zz5Q4V41TNuhPP8QV8zbh5yYDLETCdo0rNrO8vfuZhVJ-iLWo7spD0VS66D3oN0IQLMU0r2LaKleGMJY%3Dw900-h600-k-no-pi-33.443060690629125-ya10.6516734247211-ro0-fo100!7i8704!8i4352?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 4,
      name: 'Baidhyanath Dham (Deoghar)',
      position: [24.492417, 86.700106],
      description: 'One of the 12 Jyotirlingas',
      streetViewLink: 'https://www.google.com/maps/@24.4925204,86.700189,3a,75y,226.33h,112.76t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDum8zE0QE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HZCYHO7lREegqCg7vEor5_aRVraPM902juKoQIPUifMQESR-LEaMVPg6AfF86F_oZqHIXDrxIyEe3giwb_n3zUg2Lm6QfRMnCTRJkP3J_RZS02m2lIfDVudmSYlPq7RPYUjwIm-%3Dw900-h600-k-no-pi-22.764124934192893-ya325.32935476675675-ro0-fo100!7i10240!8i5120?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 5,
      name: 'Hazaribagh Wildlife Sanctuary',
      position: [24.142908, 85.382245],
      description: "Nature's Calm Escape",
      streetViewLink: 'https://www.google.com/maps/place/Hazaribagh+Wildlife+Sanctuary/@24.1428757,85.3820953,3a,75y,108.42h,109.17t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDUh7G_zgE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6Han07QYo5-n6FS0ufxV4w5IUt8SsXSFiYRBaT-McP7JGRjbf_n0mcJdDef5RqVCjTHvKQhjHYCgZ6wKDiDB6FyQqdTKfcVNtWXqLOcbYUPL7sB_mQAuX51PQ8FYIRRA4DspAFKfrQ%3Dw900-h600-k-no-pi-19.17-ya178.42000000000002-ro0-fo100!7i8704!8i4352!4m7!3m6!1s0x39f363bdb5c8055d:0x2d35637ceb4c54f0!8m2!3d24.142977!4d85.3822027!10e5!16zL20vMDdmYzls?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setPanelVisible(true);
  };

  const handleClosePanel = () => {
    setPanelVisible(false);
    setSelectedPlace(null);
  };

  return (
    <div className="jharkhand-map-container">
      <MapContainer center={jharkhandCenter} zoom={8} className="jharkhand-map"
      zoomControl={false}       
      scrollWheelZoom={false}  
      doubleClickZoom={false}   
      touchZoom={false}         
      dragging={true}    
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {famousPlaces.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={createCustomIcon('#e74c3c')}
            eventHandlers={{
              click: () => handleMarkerClick(place),
              mouseover: (e) => {
                e.target.openPopup(); 
                handleMarkerClick(place);
              },
              mouseout: (e) => {
                e.target.closePopup();  
              }
            }}
          >
            <Popup>
              <div className="popup-content">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {panelVisible && (
        <div className="info-panel">
          {/* Close Button */}
          <button className="close-btn" onClick={handleClosePanel}>
            ×
          </button>
          {selectedPlace && (
            <div className="selected-place-info">
              <h3>Selected: {selectedPlace.name}</h3>
              <p>{selectedPlace.description}</p>
              {selectedPlace.streetViewLink && (
                <a
                  href={selectedPlace.streetViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="street-view-link"
                >
                  View on Google Street View
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JharkhandMap;
