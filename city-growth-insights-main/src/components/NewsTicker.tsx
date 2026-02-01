import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/services/api';
import { ExternalLink, Newspaper, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsTickerProps {
    country: string;
}

export function NewsTicker({ country }: NewsTickerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const { data: news, isLoading } = useQuery({
        queryKey: ['news', country],
        queryFn: () => fetchNews(country),
        refetchInterval: 1000 * 60 * 5
    });

    useEffect(() => {
        if (!news || news.length === 0) return;

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % news.length);
                setIsVisible(true);
            }, 500); // Wait for fade out
        }, 6000); // 6 seconds total cycle

        return () => clearInterval(interval);
    }, [news]);

    if (isLoading || !news || news.length === 0) return null;

    const currentItem = news[currentIndex];

    return (
        <div className="w-full rounded-xl border border-primary/20 bg-primary/5 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center">
                {/* Label Section */}
                <div className="flex w-full md:w-auto items-center justify-center gap-2 bg-primary/10 px-6 py-4 md:border-r md:border-primary/10 text-primary">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </div>
                    <span className="font-bold tracking-wide uppercase text-sm">Live Feed</span>
                </div>

                {/* Content Section */}
                <div className="flex-1 w-full overflow-hidden px-6 py-4 min-h-[80px] flex items-center justify-center md:justify-start">
                    <a
                        href={currentItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex flex-col md:flex-row items-center gap-3 transition-all duration-500 ease-in-out hover:opacity-80",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        <Newspaper className="h-5 w-5 text-muted-foreground hidden md:block" />
                        <span className="text-lg font-medium text-foreground text-center md:text-left leading-tight">
                            {currentItem.title}
                        </span>
                        <span className="whitespace-nowrap rounded-full bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground border border-border shadow-sm">
                            {currentItem.source}
                        </span>
                        <ExternalLink className="h-4 w-4 text-primary opacity-50" />
                    </a>
                </div>

                {/* Progress Indicator (Optional visual flair) */}
                <div className="hidden md:flex px-4 text-muted-foreground/30 font-mono text-xs">
                    {currentIndex + 1} / {news.length}
                </div>
            </div>
        </div>
    );
}
