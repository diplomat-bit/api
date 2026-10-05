import React, { useState } from 'react';
import { ChartSeriesPoint } from '../types/catalog';
import { BarChart3, TrendingUp, Info } from 'lucide-react';

interface ChartVisualizerProps {
  series: ChartSeriesPoint[];
  chartType?: 'timeseries' | 'bar' | 'distribution';
  title?: string;
  description?: string;
}

export const ChartVisualizer: React.FC<ChartVisualizerProps> = ({
  series,
  chartType = 'timeseries',
  title,
  description
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<ChartSeriesPoint | null>(null);

  if (!series || series.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-neutral-500">
        No chart series data available.
      </div>
    );
  }

  // Find numeric fields in the series points
  const sample = series[0];
  const numericKeys = Object.keys(sample).filter(
    (k) => typeof sample[k] === 'number' && k !== 'id'
  );

  const primaryMetric = numericKeys[0] || 'value';
  const secondaryMetric = numericKeys[1];

  const values = series.map((p) => Number(p[primaryMetric]) || 0);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const avgVal = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));

  // Secondary values if present
  const secondaryValues = secondaryMetric
    ? series.map((p) => Number(p[secondaryMetric]) || 0)
    : [];
  const maxSecondary = secondaryMetric ? Math.max(...secondaryValues, 1) : 1;

  return (
    <div className="flex flex-col h-full bg-neutral-950 rounded-lg border border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{title || 'Telemetry Performance Curve'}</span>
          </div>
          {description && (
            <p className="text-[11px] text-neutral-400 mt-0.5">{description}</p>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span className="text-neutral-300 font-mono text-[11px] capitalize">
              {primaryMetric.replace(/_/g, ' ')}
            </span>
          </div>
          {secondaryMetric && (
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
              <span className="text-neutral-400 font-mono text-[11px] capitalize">
                {secondaryMetric.replace(/_/g, ' ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-900/30 border-b border-neutral-800/80">
        <div className="p-2 rounded bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase tracking-wide">Peak Demand</div>
          <div className="text-sm font-semibold font-mono text-neutral-100 tabular-nums">
            {maxVal.toLocaleString()}
          </div>
        </div>
        <div className="p-2 rounded bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase tracking-wide">Arithmetic Mean</div>
          <div className="text-sm font-semibold font-mono text-neutral-100 tabular-nums">
            {avgVal.toLocaleString()}
          </div>
        </div>
        <div className="p-2 rounded bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-500 uppercase tracking-wide">Datapoint Count</div>
          <div className="text-sm font-semibold font-mono text-neutral-100 tabular-nums">
            {series.length} snapshots
          </div>
        </div>
      </div>

      {/* SVG Canvas Chart */}
      <div className="flex-1 p-6 relative flex flex-col justify-end min-h-[220px]">
        {/* Background Grid Lines */}
        <div className="absolute inset-x-6 inset-y-6 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-neutral-600 w-full" />
          <div className="border-b border-neutral-600 w-full" />
          <div className="border-b border-neutral-600 w-full" />
          <div className="border-b border-neutral-600 w-full" />
        </div>

        {/* Bars and Line plot container */}
        <div className="relative z-10 w-full h-44 flex items-end justify-between gap-2">
          {series.map((point, idx) => {
            const val = Number(point[primaryMetric]) || 0;
            const heightPct = Math.max(5, (val / maxVal) * 100);

            const isHovered = hoveredPoint === point;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="flex-1 h-full flex flex-col items-center justify-end relative group cursor-pointer"
              >
                {/* Secondary metric dot */}
                {secondaryMetric && (
                  <div
                    style={{
                      bottom: `${((Number(point[secondaryMetric]) || 0) / maxSecondary) * 85}%`
                    }}
                    className="absolute w-2 h-2 rounded-full bg-amber-400 border border-neutral-950 z-20 transition-transform group-hover:scale-150"
                  />
                )}

                {/* Primary Metric Bar */}
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full max-w-[40px] rounded-t transition-all ${
                    isHovered
                      ? 'bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]'
                      : 'bg-blue-600/70 hover:bg-blue-500'
                  }`}
                />

                {/* Label on X Axis */}
                <div className="mt-2 text-[10px] text-neutral-500 font-mono truncate w-full text-center">
                  {point.time || point.label || idx}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover / Selected Inspector */}
      <div className="p-2.5 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-between text-xs font-mono">
        {hoveredPoint ? (
          <div className="flex items-center gap-4 text-neutral-200">
            <span className="text-neutral-400 font-sans">
              Snapshot: {hoveredPoint.time || hoveredPoint.label || 'Selected'}
            </span>
            <span className="text-blue-400 font-semibold tabular-nums">
              {primaryMetric}: {Number(hoveredPoint[primaryMetric]).toLocaleString()}
            </span>
            {secondaryMetric && (
              <span className="text-amber-400 font-semibold tabular-nums">
                {secondaryMetric}: {Number(hoveredPoint[secondaryMetric]).toLocaleString()}
              </span>
            )}
          </div>
        ) : (
          <span className="text-neutral-500 text-[11px] font-sans flex items-center gap-1.5">
            <Info className="w-3 h-3 text-neutral-500" />
            Hover over any bar to inspect exact point metrics
          </span>
        )}
      </div>
    </div>
  );
};
