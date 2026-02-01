import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export const Skeleton = ({ className, style }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      style={style}
    />
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </div>
  );
};

export const CityCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
      <Skeleton className="mt-4 h-1.5 w-full rounded-full" />
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-border">
      <td className="p-4"><Skeleton className="h-5 w-28" /></td>
      <td className="p-4"><Skeleton className="h-5 w-24" /></td>
      <td className="p-4"><Skeleton className="h-5 w-16" /></td>
      <td className="p-4"><Skeleton className="h-5 w-16" /></td>
    </tr>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="h-80 w-full rounded-xl border border-border bg-card p-6">
      <Skeleton className="mb-4 h-6 w-40" />
      <div className="flex h-64 items-end justify-around gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-12"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
};
