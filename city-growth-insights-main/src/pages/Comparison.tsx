import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCities, fetchPredictions, City, Prediction } from '@/services/api';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Check, ChevronsUpDown, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function Comparison() {
    const [city1, setCity1] = useState<string>("");
    const [city2, setCity2] = useState<string>("");

    // UI State for Popovers
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const { data: cities } = useQuery({ queryKey: ['cities'], queryFn: fetchCities });
    const { data: predictions } = useQuery({ queryKey: ['predictions'], queryFn: fetchPredictions });

    const getCityData = (name: string) => predictions?.find(p => p.city.name === name);

    const c1Data = getCityData(city1);
    const c2Data = getCityData(city2);

    // Prepare Radar Data (Normalized roughly 0-10)
    const radarData = c1Data && c2Data ? [
        { subject: 'Growth', A: c1Data.growth_score, B: c2Data.growth_score, fullMark: 10 },
        { subject: 'Livability', A: c1Data.livability_score, B: c2Data.livability_score, fullMark: 10 },
        { subject: 'GDP (Norm)', A: Math.min(10, c1Data.gdp_current / 20), B: Math.min(10, c2Data.gdp_current / 20), fullMark: 10 },
        { subject: 'Safety', A: Math.max(0, 10 - (c1Data.crime_rate / 60)), B: Math.max(0, 10 - (c2Data.crime_rate / 60)), fullMark: 10 }, // Inverse Crime
        { subject: 'Traffic Flow', A: 10 - c1Data.traffic_index, B: 10 - c2Data.traffic_index, fullMark: 10 }, // Inverse Traffic
    ] : [];

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">City Comparison</h1>
                    <p className="mt-2 text-muted-foreground">Compare growth metrics side-by-side</p>
                </div>

                {/* Selection Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 items-center">
                    {/* City 1 Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">City 1</label>
                        <Popover open={open1} onOpenChange={setOpen1}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open1} className="w-full justify-between">
                                    {city1 ? cities?.find((city) => city.name === city1)?.name : "Select city..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search city..." />
                                    <CommandList>
                                        <CommandEmpty>No city found.</CommandEmpty>
                                        <CommandGroup>
                                            {cities?.map((city) => (
                                                <CommandItem
                                                    key={city.id}
                                                    value={city.name}
                                                    onSelect={(currentValue) => {
                                                        setCity1(currentValue === city1 ? "" : currentValue)
                                                        setOpen1(false)
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", city1 === city.name ? "opacity-100" : "opacity-0")} />
                                                    {city.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* City 2 Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">City 2</label>
                        <Popover open={open2} onOpenChange={setOpen2}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open2} className="w-full justify-between">
                                    {city2 ? cities?.find((city) => city.name === city2)?.name : "Select city..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search city..." />
                                    <CommandList>
                                        <CommandEmpty>No city found.</CommandEmpty>
                                        <CommandGroup>
                                            {cities?.map((city) => (
                                                <CommandItem
                                                    key={city.id}
                                                    value={city.name}
                                                    onSelect={(currentValue) => {
                                                        setCity2(currentValue === city2 ? "" : currentValue)
                                                        setOpen2(false)
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", city2 === city.name ? "opacity-100" : "opacity-0")} />
                                                    {city.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {c1Data && c2Data && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">

                        {/* Radar Chart */}
                        <div className="glass-card rounded-2xl border border-border/50 bg-card/50 p-6">
                            <h3 className="text-lg font-semibold mb-6 text-center">Metric Overlap</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart outerRadius={120} data={radarData}>
                                        <PolarGrid stroke="#333" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} />
                                        <Radar name={city1} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                                        <Radar name={city2} dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                                        <Legend />
                                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Direct Stats Comparison */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 border-b pb-4 text-center font-semibold">
                                <div className="text-blue-500">{city1}</div>
                                <div className="text-muted-foreground">Metric</div>
                                <div className="text-green-500">{city2}</div>
                            </div>

                            {[
                                { label: 'Growth Score', v1: c1Data.growth_score.toFixed(1), v2: c2Data.growth_score.toFixed(1), better: 'higher' },
                                { label: 'GDP (Billions)', v1: `$${c1Data.gdp_current}`, v2: `$${c2Data.gdp_current}`, better: 'higher' },
                                { label: 'Crime Rate', v1: c1Data.crime_rate, v2: c2Data.crime_rate, better: 'lower' },
                                { label: 'Traffic Index', v1: c1Data.traffic_index, v2: c2Data.traffic_index, better: 'lower' },
                                { label: 'AQI', v1: c1Data.aqi, v2: c2Data.aqi, better: 'lower' },
                            ].map((stat, i) => (
                                <div key={i} className="grid grid-cols-3 gap-4 text-center items-center py-2 hover:bg-muted/10 rounded">
                                    <div className="font-medium text-lg">{stat.v1}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    <div className="font-medium text-lg">{stat.v2}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
