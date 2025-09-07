import { useState, useEffect } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { AnimatedBackground } from "@/components/common/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Activity,
  Droplets,
  Heart,
  Download,
  RefreshCw
} from "lucide-react";

interface VillageData {
  id: number;
  name: string;
  x: number;
  y: number;
  cases: number;
  status: "low" | "medium" | "high";
  waterQuality: number;
  population: number;
}

export function Dashboard() {
  const [villages, setVillages] = useState<VillageData[]>([
    { id: 1, name: "Rampur", x: 18, y: 30, cases: 2, status: "low", waterQuality: 7.2, population: 1250 },
    { id: 2, name: "Nongya", x: 42, y: 50, cases: 8, status: "high", waterQuality: 4.1, population: 890 },
    { id: 3, name: "Khawai", x: 65, y: 20, cases: 1, status: "low", waterQuality: 8.5, population: 2100 },
    { id: 4, name: "Mela", x: 75, y: 70, cases: 5, status: "medium", waterQuality: 5.8, population: 1680 },
    { id: 5, name: "Bharatpur", x: 25, y: 80, cases: 12, status: "high", waterQuality: 3.2, population: 950 },
  ]);

  const [stats, setStats] = useState({
    totalReports: 0,
    hotVillages: 0,
    doctorsOnline: 4,
    alertsActive: 0,
    totalPopulation: 0,
    avgWaterQuality: 0
  });

  useEffect(() => {
    updateStats();
  }, [villages]);

  const updateStats = () => {
    const totalReports = villages.reduce((sum, v) => sum + v.cases, 0);
    const hotVillages = villages.filter(v => v.status === "high").length;
    const alertsActive = villages.filter(v => v.status === "high" || v.waterQuality < 5).length;
    const totalPopulation = villages.reduce((sum, v) => sum + v.population, 0);
    const avgWaterQuality = villages.reduce((sum, v) => sum + v.waterQuality, 0) / villages.length;

    setStats({
      totalReports,
      hotVillages,
      doctorsOnline: 4,
      alertsActive,
      totalPopulation,
      avgWaterQuality: Number(avgWaterQuality.toFixed(1))
    });
  };

  const getStatusColor = (status: string, waterQuality?: number) => {
    if (waterQuality && waterQuality < 5) return "text-accent-coral";
    if (status === "high") return "text-accent-coral";
    if (status === "medium") return "text-accent-yellow";
    return "text-accent-emerald";
  };

  const refreshData = () => {
    // Simulate real-time updates
    setVillages(prev => prev.map(village => ({
      ...village,
      cases: village.cases + Math.floor(Math.random() * 2),
      waterQuality: Math.max(1, village.waterQuality + (Math.random() - 0.5) * 0.5)
    })));
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold gradient-text">Health Dashboard</h1>
            <p className="text-muted-foreground">Real-time community health monitoring</p>
          </div>
          
          <div className="flex items-center space-x-3 animate-slide-in-right">
            <Button variant="glass" size="sm" onClick={refreshData} className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="minimal" size="sm" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { 
              label: "Total Reports", 
              value: stats.totalReports, 
              icon: BarChart3, 
              color: "text-accent-cyan",
              bgColor: "from-accent-cyan/20 to-accent-purple/20"
            },
            { 
              label: "Hot Villages", 
              value: stats.hotVillages, 
              icon: AlertTriangle, 
              color: "text-accent-coral",
              bgColor: "from-accent-coral/20 to-accent-yellow/20"
            },
            { 
              label: "Doctors Online", 
              value: stats.doctorsOnline, 
              icon: Heart, 
              color: "text-accent-emerald",
              bgColor: "from-accent-emerald/20 to-accent-cyan/20"
            },
            { 
              label: "Active Alerts", 
              value: stats.alertsActive, 
              icon: Activity, 
              color: "text-accent-yellow",
              bgColor: "from-accent-yellow/20 to-accent-coral/20"
            },
            { 
              label: "Population", 
              value: `${(stats.totalPopulation / 1000).toFixed(1)}k`, 
              icon: Users, 
              color: "text-accent-purple",
              bgColor: "from-accent-purple/20 to-accent-coral/20"
            },
            { 
              label: "Water Quality", 
              value: stats.avgWaterQuality, 
              icon: Droplets, 
              color: "text-accent-cyan",
              bgColor: "from-accent-cyan/20 to-accent-emerald/20"
            }
          ].map(({ label, value, icon: Icon, color, bgColor }, index) => (
            <GlassCard 
              key={label} 
              className={`text-center animate-bounce-in bg-gradient-to-br ${bgColor}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              hover
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Village Map */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard hover>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-foreground">Village Health Map</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accent-emerald"></div>
                    <span className="text-muted-foreground">Safe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accent-yellow"></div>
                    <span className="text-muted-foreground">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accent-coral"></div>
                    <span className="text-muted-foreground">High Risk</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 bg-gradient-to-br from-bg-deep to-bg-navy rounded-lg overflow-hidden">
                {/* Animated grid background */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute border-l border-border" 
                      style={{ left: `${i * 10}%`, height: "100%" }}
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute border-t border-border" 
                      style={{ top: `${i * 10}%`, width: "100%" }}
                    />
                  ))}
                </div>
                
                {/* Village markers */}
                {villages.map((village, index) => (
                  <div
                    key={village.id}
                    className="absolute group cursor-pointer animate-bounce-in"
                    style={{ 
                      left: `${village.x}%`, 
                      top: `${village.y}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className={`
                      w-4 h-4 rounded-full transition-all duration-300 group-hover:scale-150
                      ${village.status === 'high' ? 'bg-accent-coral animate-pulse-glow' : 
                        village.status === 'medium' ? 'bg-accent-yellow' : 'bg-accent-emerald'}
                    `}>
                      {village.status === 'high' && (
                        <div className="absolute inset-0 rounded-full bg-accent-coral/30 animate-ping"></div>
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 text-sm whitespace-nowrap">
                        <div className="font-bold text-foreground">{village.name}</div>
                        <div className="text-muted-foreground">Cases: {village.cases}</div>
                        <div className="text-muted-foreground">Water Quality: {village.waterQuality}</div>
                        <div className="text-muted-foreground">Population: {village.population}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Outbreak Trend Chart */}
            <GlassCard hover>
              <h3 className="text-xl font-bold text-foreground mb-4">Outbreak Trend</h3>
              <div className="h-64 flex items-end justify-around space-x-2">
                {villages.map((village, index) => (
                  <div key={village.id} className="flex flex-col items-center space-y-2">
                    <div 
                      className={`
                        w-12 rounded-t-lg transition-all duration-1000 animate-bounce-in
                        ${village.cases > 5 ? 'bg-gradient-to-t from-accent-coral to-accent-yellow' : 
                          village.cases > 2 ? 'bg-gradient-to-t from-accent-yellow to-accent-emerald' : 
                          'bg-gradient-to-t from-accent-emerald to-accent-cyan'}
                      `}
                      style={{ 
                        height: `${Math.max(20, (village.cases / 15) * 200)}px`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      <div className="font-medium">{village.name}</div>
                      <div>{village.cases}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alert Panel */}
            <GlassCard hover>
              <h3 className="text-xl font-bold text-foreground mb-4">Active Alerts</h3>
              <div className="space-y-3">
                {villages
                  .filter(v => v.status === "high" || v.waterQuality < 5)
                  .map((village) => (
                    <div 
                      key={village.id} 
                      className="p-3 rounded-lg bg-gradient-to-r from-accent-coral/20 to-accent-yellow/20 border border-accent-coral/30 animate-fade-in"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-accent-coral" />
                            <span>{village.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {village.cases} cases • Water: {village.waterQuality}
                          </div>
                        </div>
                        <Button variant="minimal" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard hover>
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="hero" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Alert
                </Button>
                <Button variant="success" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Assign Doctor
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </GlassCard>

            {/* System Status */}
            <GlassCard hover>
              <h3 className="text-xl font-bold text-foreground mb-4">System Status</h3>
              <div className="space-y-3">
                {[
                  { label: "Data Sync", status: "Online", color: "text-accent-emerald" },
                  { label: "SMS Gateway", status: "Active", color: "text-accent-emerald" },
                  { label: "Weather API", status: "Connected", color: "text-accent-emerald" },
                  { label: "Backup Status", status: "Updated", color: "text-accent-cyan" }
                ].map(({ label, status, color }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={`text-sm font-medium ${color}`}>{status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}