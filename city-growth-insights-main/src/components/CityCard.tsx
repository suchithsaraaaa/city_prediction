import { MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CityCardProps {
  cityName: string;
  state: string;
  growthScore: number;
  predictedGrowth: number;
}

export const CityCard = ({
  cityName,
  state,
  growthScore,
  predictedGrowth,
}: CityCardProps) => {
  const getGrowthLevel = (score: number) => {
    if (score >= 1.5) return 'high';
    if (score >= 1.0) return 'medium';
    return 'low';
  };

  const growthLevel = getGrowthLevel(predictedGrowth);

  const levelConfig = {
    high: {
      label: 'High Growth',
      bgClass: 'bg-success/10',
      textClass: 'text-success',
      borderClass: 'border-success/30',
      icon: TrendingUp,
    },
    medium: {
      label: 'Medium Growth',
      bgClass: 'bg-warning/10',
      textClass: 'text-warning',
      borderClass: 'border-warning/30',
      icon: Minus,
    },
    low: {
      label: 'Low Growth',
      bgClass: 'bg-destructive/10',
      textClass: 'text-destructive',
      borderClass: 'border-destructive/30',
      icon: TrendingDown,
    },
  };

  const config = levelConfig[growthLevel];
  const GrowthIcon = config.icon;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{cityName}</h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {state}
          </div>
        </div>
        <div
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
            config.bgClass,
            config.textClass,
            config.borderClass
          )}
        >
          <GrowthIcon className="h-3.5 w-3.5" />
          {config.label}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Growth Score</p>
          <p className="text-2xl font-bold text-foreground">
            {growthScore.toFixed(2)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Predicted Growth</p>
          <p className={cn('text-2xl font-bold', config.textClass)}>
            {predictedGrowth.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all duration-500', config.bgClass.replace('/10', ''))}
            style={{ width: `${Math.min(predictedGrowth * 50, 100)}%` }}
          />
        </div>
      </div>

      {/* Decorative gradient */}
      <div
        className={cn(
          'absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20',
          growthLevel === 'high' ? 'bg-success' : growthLevel === 'medium' ? 'bg-warning' : 'bg-destructive'
        )}
      />
    </div>
  );
};
