import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPredictions, fetchCities } from '@/services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, DollarSign, Globe } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NewsTicker } from '@/components/NewsTicker';

export default function Trends() {
    const { data: predictions } = useQuery({ queryKey: ['predictions'], queryFn: fetchPredictions });
    const { data: cities } = useQuery({ queryKey: ['cities'], queryFn: fetchCities });
    const [selectedCountry, setSelectedCountry] = useState<string>("India");

    if (!predictions) return <div className="p-20 text-center">Loading trends...</div>;

    const filteredPredictions = predictions.filter(p => p.city.country === selectedCountry);
    const availableCountries = Array.from(new Set(cities?.map(c => c.country) || ["India"])).sort();

    // Data Prep
    const topGrowth = [...filteredPredictions].sort((a, b) => b.growth_score - a.growth_score).slice(0, 10);
    const topTraffic = [...filteredPredictions].sort((a, b) => b.traffic_index - a.traffic_index).slice(0, 10);

    // Scatter data: GDP vs Growth
    const scatterData = filteredPredictions.map(p => ({
        x: p.gdp_current,
        y: p.growth_score,
        z: p.city.population, // Bubble size based on population (roughly)
        name: p.city.name
    }));

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">National Trends</h1>
                    <p className="mt-2 text-muted-foreground">Macro-economic analysis of global cities</p>

                    <div className="mt-6 flex justify-center">
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
                </div>

                <div className="mb-8">
                    <NewsTicker country={selectedCountry} />
                </div>

                <div className="grid grid-cols-1 gap-8">

                    {/* Row 1: Top 10 Growth */}
                    <div className="glass-card rounded-2xl border border-border/50 bg-card/50 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="h-5 w-5 text-success" />
                            <h3 className="text-xl font-semibold">Top 10 High-Growth Cities</h3>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topGrowth} layout="vertical" margin={{ left: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                                    <XAxis type="number" domain={[0, 10]} hide />
                                    <YAxis dataKey="city.name" type="category" width={100} tick={{ fill: '#fff' }} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="growth_score" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
                                        {
                                            topGrowth.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.growth_score > 8 ? '#10b981' : '#34d399'} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Row 2: Scatter & Traffic */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* GDP vs Growth Scatter */}
                        <div className="glass-card rounded-2xl border border-border/50 bg-card/50 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <DollarSign className="h-5 w-5 text-blue-400" />
                                <h3 className="text-xl font-semibold">GDP vs Growth Correlation</h3>
                                <p className="ml-auto text-xs text-muted-foreground">Bubble Size = Population</p>
                            </div>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis type="number" dataKey="x" name="GDP ($B)" unit="B" stroke="#888" />
                                        <YAxis type="number" dataKey="y" name="Growth Score" unit="" stroke="#888" domain={[0, 10]} />
                                        <ZAxis type="number" dataKey="z" range={[50, 400]} />
                                        <Tooltip
                                            cursor={{ strokeDasharray: '3 3' }}
                                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Scatter name="Cities" data={scatterData} fill="#3b82f6" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Traffic Pain Points */}
                        <div className="glass-card rounded-2xl border border-border/50 bg-card/50 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <AlertTriangle className="h-5 w-5 text-orange-500" />
                                <h3 className="text-xl font-semibold">Highest Traffic Density</h3>
                            </div>
                            <div className="space-y-4">
                                {topTraffic.slice(0, 6).map((city, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20">
                                        <span className="font-medium">{city.city.name}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-2 rounded-full bg-secondary">
                                                <div
                                                    className="h-full rounded-full bg-orange-500"
                                                    style={{ width: `${(city.traffic_index / 10) * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-bold w-8 text-right text-orange-400">{city.traffic_index.toFixed(1)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
