import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Prediction } from '@/services/api';

interface ChartsProps {
  predictions: Prediction[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-2 font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const GrowthBarChart = ({ predictions }: ChartsProps) => {
  const data = predictions.map((p) => ({
    name: p.city.name,
    'Predicted Growth': p.predicted_growth,
    'Growth Score': p.growth_score,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'hsl(215 16% 47%)', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fill: 'hsl(215 16% 47%)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar
            dataKey="Predicted Growth"
            fill="hsl(221 83% 53%)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Growth Score"
            fill="hsl(173 58% 39%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GrowthLineChart = ({ predictions }: ChartsProps) => {
  const data = predictions.map((p) => ({
    name: p.city.name,
    'Predicted Growth': p.predicted_growth,
    'Growth Score': p.growth_score,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'hsl(215 16% 47%)', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fill: 'hsl(215 16% 47%)', fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="Predicted Growth"
            stroke="hsl(221 83% 53%)"
            strokeWidth={3}
            dot={{ fill: 'hsl(221 83% 53%)', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: 'hsl(221 83% 53%)', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="Growth Score"
            stroke="hsl(173 58% 39%)"
            strokeWidth={3}
            dot={{ fill: 'hsl(173 58% 39%)', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: 'hsl(173 58% 39%)', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GrowthRadarChart = ({ predictions }: ChartsProps) => {
  const data = predictions.slice(0, 6).map((p) => ({
    city: p.city.name,
    'Predicted Growth': p.predicted_growth,
    'Growth Score': p.growth_score,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid className="stroke-muted" />
          <PolarAngleAxis
            dataKey="city"
            tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 2.5]}
            tick={{ fill: 'hsl(215 16% 47%)', fontSize: 10 }}
          />
          <Radar
            name="Predicted Growth"
            dataKey="Predicted Growth"
            stroke="hsl(221 83% 53%)"
            fill="hsl(221 83% 53%)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Growth Score"
            dataKey="Growth Score"
            stroke="hsl(173 58% 39%)"
            fill="hsl(173 58% 39%)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
