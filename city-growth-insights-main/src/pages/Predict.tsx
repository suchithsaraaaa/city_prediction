import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Calendar, TrendingUp, Sparkles, MapPin, ArrowRight, Building2, Banknote, Activity, Shield, Car, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCities, fetchPredictions, City, Prediction } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import predictVideo from '@/assets/predict-video.mp4';

export default function Predict() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2030);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const { data: predictions } = useQuery({
    queryKey: ['predictions'],
    queryFn: fetchPredictions,
  });

  const filteredCities = cities?.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePredict = () => {
    if (!selectedCity || !predictions) return;

    setIsAnimating(true);
    setShowResults(false);

    // Simulate prediction calculation
    setTimeout(() => {
      const cityPrediction = predictions.find(
        (p) => p.city.name.toLowerCase() === selectedCity.name.toLowerCase()
      );

      if (cityPrediction) {
        // Adjust prediction based on year
        const yearOffset = selectedYear - 2024;
        const adjustedPrediction: Prediction = {
          ...cityPrediction,
          predicted_growth: cityPrediction.predicted_growth + (yearOffset * 0.08),
          growth_score: cityPrediction.growth_score + (yearOffset * 0.05),
          livability_score: cityPrediction.livability_score + (yearOffset * (cityPrediction.livability_growth / 100)),
          livability_growth: cityPrediction.livability_growth,
          gdp_current: cityPrediction.gdp_current * Math.pow(1 + (cityPrediction.gdp_growth_rate / 100), yearOffset),
          gdp_growth_rate: cityPrediction.gdp_growth_rate,
          crime_rate: cityPrediction.crime_rate * (1 + (yearOffset * 0.005)), // Crime up slightly
          traffic_index: Math.min(10, cityPrediction.traffic_index + (yearOffset * 0.05)), // Traffic worse
          aqi: Math.min(500, cityPrediction.aqi + (yearOffset * 1.5)), // AQI worse
          historic_growth: cityPrediction.historic_growth,
          positive_factors: cityPrediction.positive_factors,
          negative_factors: cityPrediction.negative_factors,
        };
        setPrediction(adjustedPrediction);
      }

      setIsAnimating(false);
      setShowResults(true);
    }, 2000);
  };

  const getGrowthLevel = (score: number) => {
    if (score >= 1.5) return { level: 'High', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
    if (score >= 1.0) return { level: 'Medium', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
    return { level: 'Low', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' };
  };

  return (
    <div className="relative min-h-screen">
      {/* Full Page Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={predictVideo} type="video/mp4" />
        </video>
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-4 py-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Predictions
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Predict City
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Growth
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enter a city and target year to forecast urban growth using our advanced prediction model
            </p>
          </div>
        </div>
      </section>

      {/* Prediction Form */}
      <section className="relative z-10 container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
            {/* Form Header */}
            <div className="gradient-primary p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-primary-foreground">
                <TrendingUp className="h-5 w-5" />
                Growth Prediction
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Select parameters for your prediction
              </p>
            </div>

            {/* Form Body */}
            <div className="space-y-6 p-6">
              {/* City Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Select City
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for a city..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedCity(null);
                    }}
                    className="pl-10"
                  />
                </div>

                {/* City Dropdown */}
                {searchQuery && !selectedCity && filteredCities && filteredCities.length > 0 && (
                  <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
                    {filteredCities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCity(city);
                          setSearchQuery(city.name);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{city.name}</p>
                          <p className="text-xs text-muted-foreground">{city.state}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected City Badge */}
                {selectedCity && (
                  <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">{selectedCity.name}</span>
                    <span className="text-sm text-muted-foreground">({selectedCity.state})</span>
                  </div>
                )}
              </div>

              {/* Year Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Prediction Year
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2025, 2026, 2027, 2030].map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={cn(
                        'rounded-lg border px-4 py-2.5 text-sm font-medium transition-all',
                        selectedYear === y
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict Button */}
              <Button
                onClick={handlePredict}
                disabled={!selectedCity || isAnimating}
                className="w-full gap-2 py-6 text-base"
                size="lg"
              >
                {isAnimating ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    Predict Growth
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && prediction && (
        <section className="relative z-10 container mx-auto px-4 pb-12">
          {/* <div className="mx-auto max-w-xl animate-fade-in"> */}
          <div className="mx-auto w-full max-w-7xl animate-fade-in">
            {/* Expanded width for dashboard */}

            {/* 3-Column Layout */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">

              {/* LEFT COLUMN: Historic Trends (3/12) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass-card rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Growth Trend</h3>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        ...(prediction.historic_growth || []),
                        { year: selectedYear, growth_rate: prediction.growth_score }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="year" style={{ fontSize: 10, fill: '#888' }} />
                        <YAxis style={{ fontSize: 10, fill: '#888' }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="growth_rate" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground text-center">
                    2019 - {selectedYear} Growth Trajectory
                  </p>
                </div>

                <div className="glass-card rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Forecast Horizon</h3>
                  </div>
                  <Select
                    value={selectedYear.toString()}
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* MIDDLE COLUMN: Core Prediction (5/12) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 backdrop-blur-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 rounded-full bg-primary/10 p-4 ring-1 ring-primary/20">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {prediction.city.name}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Growth Prediction for {selectedYear}
                    </p>

                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="text-7xl font-bold tracking-tighter text-foreground">
                        {prediction.growth_score.toFixed(1)}
                      </span>
                      <span className="text-xl font-medium text-muted-foreground">/10</span>
                    </div>

                    <div className="mt-8 grid w-full gap-4">
                      <div className="flex items-center justify-between rounded-lg bg-background/40 p-3 px-4">
                        <span className="text-sm font-medium text-muted-foreground">Est. Growth</span>
                        <span className="font-mono font-bold text-success">
                          +{prediction.predicted_growth.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Factors Analysis */}
                    <div className="mt-8 w-full text-left">
                      <h4 className="mb-3 text-sm font-semibold text-foreground">Key Drivers</h4>
                      <div className="space-y-2">
                        {prediction.positive_factors.slice(0, 2).map((factor, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-green-400">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            {factor}
                          </div>
                        ))}
                        {prediction.negative_factors.slice(0, 2).map((factor, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-red-400">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Quality of Life (4/12) */}
              <div className="lg:col-span-4 space-y-4">
                {/* GDP */}
                <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-primary" />
                    <p className="text-sm text-muted-foreground">Total GDP</p>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-foreground">
                      ${prediction.gdp_current.toFixed(1)}B
                    </p>
                    <span className="text-xs font-medium text-success">
                      (+{prediction.gdp_growth_rate.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Crime */}
                <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-destructive" />
                    <p className="text-sm text-muted-foreground">Crime Rate</p>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {prediction.crime_rate.toFixed(1)} <span className="text-xs text-muted-foreground">/100k</span>
                  </p>
                </div>

                {/* Traffic */}
                <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-orange-500" />
                    <p className="text-sm text-muted-foreground">Traffic Index</p>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-orange-500 transition-all"
                      style={{ width: `${(prediction.traffic_index / 10) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-xs font-medium text-muted-foreground">
                    {prediction.traffic_index.toFixed(1)}/10
                  </p>
                </div>

                {/* AQI */}
                <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-muted-foreground">Air Quality</p>
                  </div>
                  <p className={cn("mt-1 text-2xl font-bold", prediction.aqi > 200 ? "text-destructive" : "text-foreground")}>
                    {Math.round(prediction.aqi)}
                  </p>
                </div>

                {/* Insight Box */}
                <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4 backdrop-blur-xl">
                  <h5 className="flex items-center gap-2 font-medium text-foreground">
                    <Sparkles className="h-4 w-4 text-accent" />
                    AI Insight
                  </h5>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Based on current infrastructure development and economic indicators,{' '}
                    <span className="font-medium text-foreground">{prediction.city.name}</span> is projected to experience{' '}
                    <span className={cn('font-medium', getGrowthLevel(prediction.predicted_growth).color)}>
                      {getGrowthLevel(prediction.predicted_growth).level.toLowerCase()} growth
                    </span>{' '}
                    by {selectedYear}.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}
    </div>
  );
}
