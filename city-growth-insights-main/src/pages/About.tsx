import { Code2, Database, Globe, Cpu, Users, Layers, Zap, Info } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
                        <Info className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        About City Growth AI
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A next-generation platform empowering urban planners, developers, and researchers with data-driven insights and predictive analytics.
                    </p>
                </div>

                {/* Mission */}
                <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We believe that the future of urbanization relies on intelligent data. By combining historical trends, real-time economic indicators, and machine learning predictions, we aim to provide a comprehensive view of how cities evolve.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Our goal is to make complex urban data accessible, comparable, and actionable for everyone from government officials to real estate investors.
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="bg-card/80 backdrop-blur p-4 rounded-xl border border-border">
                                <Globe className="w-8 h-8 text-blue-500 mb-2" />
                                <div className="font-bold text-2xl">100+</div>
                                <div className="text-sm text-muted-foreground">Global Cities</div>
                            </div>
                            <div className="bg-card/80 backdrop-blur p-4 rounded-xl border border-border">
                                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                                <div className="font-bold text-2xl">Realtime</div>
                                <div className="text-sm text-muted-foreground">News Intelligence</div>
                            </div>
                            <div className="bg-card/80 backdrop-blur p-4 rounded-xl border border-border">
                                <Cpu className="w-8 h-8 text-purple-500 mb-2" />
                                <div className="font-bold text-2xl">AI</div>
                                <div className="text-sm text-muted-foreground">Growth Models</div>
                            </div>
                            <div className="bg-card/80 backdrop-blur p-4 rounded-xl border border-border">
                                <Layers className="w-8 h-8 text-green-500 mb-2" />
                                <div className="font-bold text-2xl">Smart</div>
                                <div className="text-sm text-muted-foreground">Filtering</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Technology Stack</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                            <Code2 className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Modern Frontend</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>• React 18 & TypeScript</li>
                                <li>• Tailwind CSS & Framer Motion</li>
                                <li>• Recharts for Visualization</li>
                                <li>• TanStack Query for State</li>
                            </ul>
                        </div>
                        <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                            <Database className="w-10 h-10 text-accent mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Robust Backend</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>• Django REST Framework</li>
                                <li>• Python 3.10+</li>
                                <li>• SQLite / PostgreSQL</li>
                                <li>• Feedparser for RSS</li>
                            </ul>
                        </div>
                        <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                            <Cpu className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Data Intelligence</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>• Custom Growth Algorithms</li>
                                <li>• Region-Specific Context</li>
                                <li>• Stochastic Modeling</li>
                                <li>• Realtime Data Aggregation</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Machine Learning Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Machine Learning & Methodology</h2>
                    <div className="glass-card p-8 rounded-3xl border border-border bg-card/50 relative overflow-hidden">
                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div className="space-y-3">
                                <div className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-500/10 mb-2">
                                    <span className="text-blue-500 font-bold">What We Used</span>
                                </div>
                                <h3 className="text-xl font-semibold">Random Forest Regression</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We integrated a robust Random Forest Regressor coupled with Stochastic Gradient Boosting to handle the non-linear complexities of urban environments.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="inline-flex items-center justify-center p-2 rounded-lg bg-purple-500/10 mb-2">
                                    <span className="text-purple-500 font-bold">Why We Used It</span>
                                </div>
                                <h3 className="text-xl font-semibold">Handling Complexity</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    City growth isn't linear. It depends on thousands of inter-connected factors like GDP flow, crime rates, and infrastructure. Simple linear models fail here; our ensemble approach captures these hidden correlations accurately.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="inline-flex items-center justify-center p-2 rounded-lg bg-green-500/10 mb-2">
                                    <span className="text-green-500 font-bold">How It Works</span>
                                </div>
                                <h3 className="text-xl font-semibold">Predictive Pipeline</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    The system ingests historical data (2015-2024), applies country-specific economic weighting, and runs 500 decision trees to forecast growth scores for 2025-2030, updating in real-time as new data arrives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Processing & Visualization Strategy */}
                <div className="mb-20 grid md:grid-cols-2 gap-12">
                    {/* Data Processing */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <Database className="w-4 h-4" />
                            <span>Backend Pipeline</span>
                        </div>
                        <h2 className="text-3xl font-bold">Data Processing</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Our data ingestion pipeline allows us to synthesize information from disparate global sources into a unified analytical model.
                            </p>
                            <ul className="space-y-3 list-disc pl-4">
                                <li>
                                    <strong className="text-foreground">Normalization:</strong> We align metrics like GDP (nominal) and Crime Rates to a standard comparative scale, adjusting for regional purchasing power parity.
                                </li>
                                <li>
                                    <strong className="text-foreground">Cleaning:</strong> Outlier detection algorithms remove statistical anomalies ensuring our training data for the ML models remains robust.
                                </li>
                                <li>
                                    <strong className="text-foreground">Storage:</strong> Processed data is structured in a relational PostgreSQL schema, optimized for efficient time-series querying.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Plotting Engine */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                            <Layers className="w-4 h-4" />
                            <span>Visualization Engine</span>
                        </div>
                        <h2 className="text-3xl font-bold">Data Plotting Architecture</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                We utilize a high-performance SVG-based rendering engine (`Recharts`) to ensure that our visualizations are crisp, responsive, and interactive across all devices.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-card p-4 rounded-xl border border-border">
                                    <h4 className="font-semibold text-foreground mb-1">Vector Graphics</h4>
                                    <p className="text-xs">Infinite scalability without pixelation.</p>
                                </div>
                                <div className="bg-card p-4 rounded-xl border border-border">
                                    <h4 className="font-semibold text-foreground mb-1">React Integration</h4>
                                    <p className="text-xs">Seamless state updates & real-time re-rendering.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plotting Methods */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-center mb-10">Plotting Methodologies</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 rounded-2xl border border-border bg-card/50">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                                Comparative Bar Charts
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Used for ranking entities (e.g., "Top 10 High-Growth Cities"). The vertical juxtaposition allows for instant identification of leaders and laggards within a dataset.
                            </p>
                        </div>
                        <div className="glass-card p-6 rounded-2xl border border-border bg-card/50">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                                Temporal Line Charts
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Essential for visualizing momentum. We plot metrics over time (2015-2030) to show not just where a city is, but the <i>velocity</i> and <i>acceleration</i> of its development.
                            </p>
                        </div>
                        <div className="glass-card p-6 rounded-2xl border border-border bg-card/50">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                                Multivariate Scatter Plots
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Used to reveal correlations between three distinct variables (X-Axis: GDP, Y-Axis: Growth, Bubble Size: Population). This reveals hidden clusters and economic archetypes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Credits */}
                <div className="mt-12 pt-8 border-t border-border flex justify-end">
                    <div className="text-right space-y-4">
                        <div className="inline-flex items-center gap-2 text-muted-foreground mb-2 justify-end">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium uppercase tracking-wider">Credits</span>
                        </div>

                        <div className="space-y-1">
                            <p className="text-lg font-medium text-foreground">Suchith Sara</p>
                            <p className="text-xs text-muted-foreground">Lead Developer</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-base text-foreground/80">Sai Krishna</p>
                            <p className="text-xs text-muted-foreground">Contributor</p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
