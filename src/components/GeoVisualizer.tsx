import React, { useState } from 'react';
import { GeoPoint } from '../types/catalog';
import { MapPin, Activity, Compass, Layers } from 'lucide-react';

interface GeoVisualizerProps {
  points: GeoPoint[];
  title?: string;
  description?: string;
}

export const GeoVisualizer: React.FC<GeoVisualizerProps> = ({
  points,
  title,
  description
}) => {
  const [selectedPoint, setSelectedPoint] = useState<GeoPoint | null>(points[0] || null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Convert lat/lng to SVG percentage coordinates (Equirectangular projection)
  const getCoordinates = (lat: number, lng: number) => {
    // x: lng from -180 to 180 -> 0% to 100%
    const x = ((lng + 180) / 360) * 100;
    // y: lat from 90 to -90 -> 0% to 100%
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const regions = Array.from(new Set(points.map((p) => p.region).filter(Boolean))) as string[];

  const filteredPoints = selectedRegion === 'all'
    ? points
    : points.filter((p) => p.region === selectedRegion);

  return (
    <div className="flex flex-col h-full bg-neutral-950 rounded-lg border border-neutral-800 overflow-hidden">
      {/* Header Bar */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-rose-400" />
            <span>{title || 'Geospatial Node Visualizer'}</span>
          </div>
          {description && (
            <p className="text-[11px] text-neutral-400 mt-0.5">{description}</p>
          )}
        </div>

        {/* Region Filter */}
        {regions.length > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                selectedRegion === 'all'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Nodes ({points.length})
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  selectedRegion === region
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative flex-1 bg-neutral-950 p-4 min-h-[300px] flex items-center justify-center overflow-hidden">
        {/* SVG World Map Graticule & Continental Outlines */}
        <div className="relative w-full max-w-4xl aspect-[2/1] bg-neutral-900/40 rounded-lg border border-neutral-800/80 p-2 overflow-hidden shadow-inner">
          <svg
            className="w-full h-full text-neutral-800/60"
            viewBox="0 0 1000 500"
            fill="none"
            stroke="currentColor"
          >
            {/* Latitude Grid lines */}
            <line x1="0" y1="125" x2="1000" y2="125" strokeDasharray="4 4" strokeWidth="0.5" />
            <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="1" stroke="rgba(255,255,255,0.1)" />
            <line x1="0" y1="375" x2="1000" y2="375" strokeDasharray="4 4" strokeWidth="0.5" />

            {/* Longitude Grid lines */}
            <line x1="250" y1="0" x2="250" y2="500" strokeDasharray="4 4" strokeWidth="0.5" />
            <line x1="500" y1="0" x2="500" y2="500" strokeWidth="1" stroke="rgba(255,255,255,0.1)" />
            <line x1="750" y1="0" x2="750" y2="500" strokeDasharray="4 4" strokeWidth="0.5" />

            {/* Stylized continent landmasses */}
            {/* North America */}
            <path
              d="M 150 80 Q 200 90 260 140 Q 220 200 180 230 Q 150 180 130 140 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* South America */}
            <path
              d="M 280 270 Q 340 300 320 380 Q 280 440 250 420 Q 250 330 280 270 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Europe */}
            <path
              d="M 480 90 Q 560 90 560 160 Q 500 180 460 150 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Africa */}
            <path
              d="M 470 190 Q 550 190 560 280 Q 520 370 480 340 Q 450 250 470 190 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Asia */}
            <path
              d="M 580 90 Q 820 90 850 210 Q 750 260 620 200 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Australia */}
            <path
              d="M 780 320 Q 860 310 880 370 Q 820 410 770 380 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          </svg>

          {/* Node Point Markers */}
          {filteredPoints.map((pt) => {
            const { x, y } = getCoordinates(pt.lat, pt.lng);
            const isSelected = selectedPoint?.id === pt.id;

            return (
              <div
                key={pt.id}
                onClick={() => setSelectedPoint(pt)}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Ping wave animation if healthy */}
                <div
                  className={`absolute -inset-2 rounded-full opacity-60 animate-ping pointer-events-none ${
                    pt.status === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                />

                {/* Main pin marker */}
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-transform transform group-hover:scale-125 flex items-center justify-center ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] scale-125'
                      : pt.status === 'Warning'
                      ? 'bg-amber-500 border-neutral-900 shadow-sm'
                      : 'bg-blue-500 border-neutral-900 shadow-sm'
                  }`}
                >
                  <div className="w-1 h-1 rounded-full bg-neutral-950" />
                </div>

                {/* Hover Tooltip Label */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-neutral-900 border border-neutral-700 text-white text-[10px] rounded shadow-lg whitespace-nowrap z-30 font-sans">
                  <div className="font-semibold">{pt.name}</div>
                  <div className="text-neutral-400 font-mono">
                    {pt.lat.toFixed(2)}°, {pt.lng.toFixed(2)}°
                    {pt.latency_ms && ` · ${pt.latency_ms}ms`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Tray */}
      {selectedPoint && (
        <div className="p-3 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-neutral-800 flex items-center justify-center text-blue-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-neutral-100 flex items-center gap-2">
                <span>{selectedPoint.name}</span>
                <span className="text-[11px] text-neutral-500">({selectedPoint.id})</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">
                Coordinates: {selectedPoint.lat.toFixed(4)}° N, {selectedPoint.lng.toFixed(4)}° E
                {selectedPoint.region && ` · Region: ${selectedPoint.region}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-neutral-300 font-mono">
            {selectedPoint.latency_ms !== undefined && (
              <div>
                <div className="text-[10px] text-neutral-500 font-sans uppercase">Roundtrip</div>
                <div className="text-sm font-semibold tabular-nums text-emerald-400">
                  {selectedPoint.latency_ms} ms
                </div>
              </div>
            )}
            {selectedPoint.load_pct !== undefined && (
              <div>
                <div className="text-[10px] text-neutral-500 font-sans uppercase">Compute Load</div>
                <div className="text-sm font-semibold tabular-nums text-neutral-200">
                  {selectedPoint.load_pct}%
                </div>
              </div>
            )}
            {selectedPoint.status && (
              <div>
                <div className="text-[10px] text-neutral-500 font-sans uppercase">Node State</div>
                <div className="text-sm font-semibold text-neutral-200">
                  {selectedPoint.status}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
