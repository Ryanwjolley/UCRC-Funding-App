import { useState } from 'react';
import { Upload } from 'lucide-react';
import InteractiveMap from '../InteractiveMap';

interface LocationPageProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function LocationPage({ formData, updateFormData }: LocationPageProps) {
  const [coordinates, setCoordinates] = useState({
    latitude: formData.latitude || '',
    longitude: formData.longitude || ''
  });

  const handleLocationChange = (lat: number, lng: number) => {
    const newCoords = {
      latitude: lat,
      longitude: lng
    };
    setCoordinates(newCoords);
    updateFormData(newCoords);
  };

  const handleInputChange = (field: string, value: string) => {
    const newCoords = { ...coordinates, [field]: value };
    setCoordinates(newCoords);
    updateFormData(newCoords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Proposed Location & Photos</h2>
        <p className="text-gray-600">Add location coordinates and upload site photos.</p>
      </div>

      {/* Interactive Map */}
      <InteractiveMap
        latitude={coordinates.latitude ? Number(coordinates.latitude) : undefined}
        longitude={coordinates.longitude ? Number(coordinates.longitude) : undefined}
        onLocationChange={handleLocationChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.000001"
            className="input-field"
            placeholder="e.g., 40.7608"
            value={coordinates.latitude}
            onChange={(e) => handleInputChange('latitude', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.000001"
            className="input-field"
            placeholder="e.g., -111.8910"
            value={coordinates.longitude}
            onChange={(e) => handleInputChange('longitude', e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Does this project involve a trans-basin diversion out of the Colorado River system?
          </label>
          <select 
            className="input-field"
            value={formData.transbasinDiversion || ''}
            onChange={(e) => updateFormData({ transbasinDiversion: e.target.value })}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location Notes</label>
          <textarea 
            className="input-field" 
            rows={3} 
            value={formData.locationNotes || ''}
            onChange={(e) => updateFormData({ locationNotes: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Site Photos</h3>
        <p className="text-sm text-gray-600">
          Upload photos of the site including upstream, downstream, side views, and site access.
        </p>

        {['Upstream', 'Downstream', 'Side 1', 'Side 2', 'Site Access'].map((label) => (
          <div key={label} className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label} Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}