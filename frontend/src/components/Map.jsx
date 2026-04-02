import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getMapData } from '../services/api';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await getMapData();
                setLocations(res.data);
            } catch (error) {
                console.error("Error fetching map locations", error);
            }
        };
        fetchLocations();
    }, []);

    return (
        <MapContainer center={[10.6609, 77.0048]} zoom={10} style={{ height: "100%", width: "100%", borderRadius: "8px" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {locations.length > 0 ? locations.map((loc) => (
                <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                    <Popup>
                        <strong>{loc.region}</strong><br />
                        Severity: {loc.severity}
                    </Popup>
                </Marker>
            )) : null}
        </MapContainer>
    );
};

export default MapComponent;
