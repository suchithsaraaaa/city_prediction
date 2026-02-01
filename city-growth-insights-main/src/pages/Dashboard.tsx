import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, TrendingUp, Trophy, ArrowRightLeft, LineChart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCities, fetchPredictions } from '@/services/api';
import { StatCard } from '@/components/StatCard';
import { GrowthBarChart, GrowthLineChart } from '@/components/Charts';
import { StatCardSkeleton, ChartSkeleton } from '@/components/Skeleton';
import heroVideo from '@/assets/hero-video.mp4';

const Dashboard = () => {
  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const { data: predictions, isLoading: predictionsLoading } = useQuery({
    queryKey: ['predictions'],
    queryFn: fetchPredictions,
  });

  const [selectedCountry, setSelectedCountry] = useState<string>("India");

  const isLoading = citiesLoading || predictionsLoading;

  // Filter Data
  const filteredPredictions = predictions?.filter(p => p.city.country === selectedCountry);
  const availableCountries = Array.from(new Set(cities?.map(c => c.country) || ["India"])).sort();

  // Calculate statistics
  const totalCities = filteredPredictions?.length || 0;
  const avgGrowthScore =
    filteredPredictions && filteredPredictions.length > 0
      ? filteredPredictions.reduce((acc, p) => acc + p.growth_score, 0) / filteredPredictions.length
      : 0;
  const topCity =
    filteredPredictions && filteredPredictions.length > 0
      ? filteredPredictions.reduce((max, p) =>
        p.predicted_growth > max.predicted_growth ? p : max
      )
      : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              City Growth
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Prediction Dashboard
              </span>
            </h1>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 backdrop-blur-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Region:</span>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[180px] bg-transparent border-0 focus:ring-0">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="mt-6 animate-slide-up text-lg text-muted-foreground sm:text-xl">
              Analyze and predict urban growth patterns with data-driven insights.
              Make informed decisions for sustainable city development.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 animate-slide-up">
              <Link to="/compare">
                <Button size="lg" className="gap-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  Compare Cities
                </Button>
              </Link>
              <Link to="/trends">
                <Button variant="outline" size="lg" className="gap-2 backdrop-blur-sm bg-background/30 hover:bg-background/50">
                  <LineChart className="h-4 w-4" />
                  View Trends
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto -mt-8 px-4 sm:-mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Cities"
                value={totalCities}
                icon={Building2}
                variant="default"
              />
              <StatCard
                title="Average Growth Score"
                value={avgGrowthScore}
                icon={TrendingUp}
                decimals={2}
                variant="primary"
              />
              <StatCard
                title="Top Growing City"
                value={topCity?.city.name || 'N/A'}
                icon={Trophy}
                variant="accent"
              />
            </>
          )}
        </div>
      </section>

      {/* Charts Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Growth Analytics
          </h2>
          <p className="mt-2 text-muted-foreground">
            Compare growth metrics across different cities
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {isLoading || !filteredPredictions ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Growth Comparison ({selectedCountry})
                </h3>
                <GrowthBarChart predictions={filteredPredictions} />
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Growth Trends ({selectedCountry})
                </h3>
                <GrowthLineChart predictions={filteredPredictions} />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
