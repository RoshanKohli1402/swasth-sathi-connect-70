import { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { AnimatedBackground } from "@/components/common/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, BarChart3, Calendar, Filter } from "lucide-react";

export function Reports() {
  const [dateRange, setDateRange] = useState("week");
  
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and export comprehensive health reports</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard hover>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-accent-cyan" />
              <span>Generate Reports</span>
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button variant="hero" className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export CSV</span>
                </Button>
                <Button variant="glass" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Export PDF</span>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </GlassCard>

          <GlassCard hover>
            <h3 className="text-xl font-bold text-foreground mb-4">Report Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Reports:</span>
                <span className="text-foreground font-bold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">This Week:</span>
                <span className="text-foreground font-bold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Alerts:</span>
                <span className="text-accent-coral font-bold">5</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}