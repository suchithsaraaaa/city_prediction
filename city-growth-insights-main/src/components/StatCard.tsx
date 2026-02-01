import { useEffect, useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  suffix?: string;
  decimals?: number;
  variant?: 'default' | 'primary' | 'accent';
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  suffix = '',
  decimals = 0,
  variant = 'default',
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || typeof value !== 'number') return;

    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(stepValue * step, value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const variantStyles = {
    default: 'bg-card border border-border',
    primary: 'gradient-primary text-primary-foreground border-0',
    accent: 'bg-accent text-accent-foreground border-0',
  };

  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    primary: 'bg-primary-foreground/20 text-primary-foreground',
    accent: 'bg-accent-foreground/20 text-accent-foreground',
  };

  const titleStyles = {
    default: 'text-muted-foreground',
    primary: 'text-primary-foreground/80',
    accent: 'text-accent-foreground/80',
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative overflow-hidden rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn('text-sm font-medium', titleStyles[variant])}>
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">
            {typeof value === 'number'
              ? displayValue.toFixed(decimals)
              : value}
            {suffix}
          </p>
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110',
            iconStyles[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-current opacity-5" />
    </div>
  );
};
