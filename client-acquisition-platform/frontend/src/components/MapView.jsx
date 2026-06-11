import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

function validPoint(lead) {
  return typeof lead.lat === 'number' && typeof lead.lng === 'number' && !Number.isNaN(lead.lat) && !Number.isNaN(lead.lng);
}

export function MapView({ leads = [] }) {
  const points = leads.filter(validPoint);
  if (!points.length) {
    return <Card className="relative min-h-[520px] overflow-hidden p-4"><div className="absolute inset-0 opacity-60" style={{backgroundImage:'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)', backgroundSize:'42px 42px'}} />
      <div className="relative flex h-full min-h-[490px] items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 via-indigo/10 to-transparent p-5 text-center text-muted">
        Search for leads to render live map markers.
      </div>
    </Card>;
  }
  const center = [points[0].lat, points[0].lng];
  return <Card className="min-h-[520px] overflow-hidden p-3">
    <div className="h-[500px] overflow-hidden rounded-2xl">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((lead) => <CircleMarker key={lead.id} center={[lead.lat, lead.lng]} radius={lead.score > 70 ? 10 : 7} pathOptions={{ color: lead.score > 70 ? '#3B82F6' : '#6366F1', fillColor: lead.score > 70 ? '#3B82F6' : '#6366F1', fillOpacity: 0.72 }}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{lead.name}</strong><br />
              <span>{lead.category} · score {lead.score}</span><br />
              <Link to={`/lead/${lead.id}`}>View Detail</Link>
            </div>
          </Popup>
        </CircleMarker>)}
      </MapContainer>
    </div>
  </Card>;
}
