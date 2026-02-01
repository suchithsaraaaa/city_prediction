import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, AlertCircle } from 'lucide-react';
import { fetchCities } from '@/services/api';
import { TableRowSkeleton } from '@/components/Skeleton';
import { Input } from '@/components/ui/input';

const Cities = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const filteredCities = cities?.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Cities
              </h1>
              <p className="mt-2 text-muted-foreground">
                Explore all cities in the growth prediction database
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        {error ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 p-12 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">
              Failed to Load Cities
            </h3>
            <p className="mt-2 text-muted-foreground">
              Please check your API connection and try again.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      City Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      State
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Latitude
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Longitude
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRowSkeleton key={i} />
                    ))
                  ) : filteredCities && filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <tr
                        key={city.id}
                        className="group border-b border-border transition-colors last:border-0 hover:bg-muted/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-foreground">
                              {city.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {city.state}
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-muted-foreground">
                          {city.latitude.toFixed(4)}°
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-muted-foreground">
                          {city.longitude.toFixed(4)}°
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-muted-foreground"
                      >
                        {searchQuery
                          ? `No cities found matching "${searchQuery}"`
                          : 'No cities available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results count */}
        {!isLoading && !error && filteredCities && (
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {filteredCities.length} of {cities?.length || 0} cities
          </p>
        )}
      </section>
    </div>
  );
};

export default Cities;
