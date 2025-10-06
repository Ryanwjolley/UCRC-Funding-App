import { useRef, useState } from 'react'
import { Map as LeafletMap } from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { MapPin, Layers, Navigation } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in React Leaflet
import L from 'leaflet'
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface InteractiveMapProps {
  latitude?: number
  longitude?: number
  onLocationChange: (lat: number, lng: number) => void
}

// Component for handling map clicks
function MapClickHandler({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      onLocationChange(lat, lng)
    },
  })
  return null
}

export default function InteractiveMap({ latitude, longitude, onLocationChange }: InteractiveMapProps) {
  const [basemap, setBasemap] = useState<'street' | 'aerial'>('street')
  const [gettingLocation, setGettingLocation] = useState(false)
  const mapRef = useRef<LeafletMap>(null)

  // Default to Utah center if no coordinates provided
  const defaultLat = 39.3210
  const defaultLng = -111.0937
  const lat = latitude || defaultLat
  const lng = longitude || defaultLng

  const streetTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const aerialTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }

    setGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        onLocationChange(lat, lng)
        setGettingLocation(false)
        
        // Pan map to new location
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 15)
        }
      },
      (_error) => {
        alert('Unable to get your location. Please place the marker manually.')
        setGettingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setBasemap(basemap === 'street' ? 'aerial' : 'street')}
          className="btn btn-secondary flex items-center gap-2 text-sm"
        >
          <Layers className="w-4 h-4" />
          {basemap === 'street' ? 'Aerial' : 'Street'}
        </button>
        
        <button
          onClick={handleUseMyLocation}
          disabled={gettingLocation}
          className="btn btn-secondary flex items-center gap-2 text-sm"
        >
          <Navigation className="w-4 h-4" />
          {gettingLocation ? 'Getting Location...' : 'Use My Location'}
        </button>
      </div>

      {/* Map Container */}
      <div className="h-96 rounded-lg overflow-hidden border border-gray-300 relative z-0">
        <MapContainer
          center={[lat, lng]}
          zoom={latitude && longitude ? 15 : 7}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url={basemap === 'street' ? streetTileUrl : aerialTileUrl}
            attribution={basemap === 'street' 
              ? '&copy; OpenStreetMap contributors'
              : '&copy; Esri'
            }
          />
          
          <MapClickHandler onLocationChange={onLocationChange} />
          
          {latitude && longitude && (
            <Marker 
              position={[latitude, longitude]}
              draggable={true}
              eventHandlers={{
                dragend: (e) => {
                  const marker = e.target
                  const position = marker.getLatLng()
                  onLocationChange(position.lat, position.lng)
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800 mb-1">How to set location:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Click anywhere on the map to place a marker</li>
              <li>• Drag the marker to adjust the position</li>
              <li>• Use "Use My Location" for automatic positioning</li>
              <li>• Switch between Street and Aerial views</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Live Coordinates Display */}
      {latitude && longitude && (
        <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
          <strong>Selected coordinates:</strong> {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </div>
      )}
    </div>
  )
}