import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Zap, Shield } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface RiskData {
  state: string;
  riskLevel: 'high' | 'medium' | 'low';
  confidence: number;
  factors: string[];
  cases: number;
  waterQuality: number;
  population: number;
}

interface RiskHeatmapProps {
  onStateSelect?: (state: string, riskData: RiskData) => void;
}

export function RiskHeatmap({ onStateSelect }: RiskHeatmapProps) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [riskData, setRiskData] = useState<RiskData[]>([]);

  useEffect(() => {
    generateRiskData();
    const interval = setInterval(generateRiskData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const generateRiskData = () => {
    const states = [
      'Assam', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 
      'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'
    ];

    const newRiskData = states.map(state => {
      const cases = Math.floor(Math.random() * 100) + 10;
      const waterQuality = Math.random() * 100;
      const population = Math.floor(Math.random() * 1000000) + 500000;
      
      // Risk calculation algorithm
      const riskScore = calculateRiskScore(cases, waterQuality, population);
      
      let riskLevel: 'high' | 'medium' | 'low';
      if (riskScore > 70) riskLevel = 'high';
      else if (riskScore > 40) riskLevel = 'medium';
      else riskLevel = 'low';

      return {
        state,
        riskLevel,
        confidence: Math.floor(Math.random() * 30) + 70,
        factors: getRiskFactors(riskLevel),
        cases,
        waterQuality,
        population
      };
    });

    setRiskData(newRiskData);
    
    // Check for high risk alerts
    const highRiskStates = newRiskData.filter(data => data.riskLevel === 'high');
    if (highRiskStates.length > 0) {
      highRiskStates.forEach(state => {
        toast.error(`High outbreak risk detected in ${state.state}!`, {
          description: `Confidence: ${state.confidence}% - Immediate attention required`,
        });
      });
    }
  };

  const calculateRiskScore = (cases: number, waterQuality: number, population: number) => {
    const caseWeight = (cases / 100) * 40;
    const waterWeight = ((100 - waterQuality) / 100) * 30;
    const populationWeight = (population / 1000000) * 30;
    
    return Math.min(caseWeight + waterWeight + populationWeight, 100);
  };

  const getRiskFactors = (riskLevel: 'high' | 'medium' | 'low') => {
    const allFactors = [
      'High case density', 'Poor water quality', 'Population density',
      'Weather patterns', 'Healthcare capacity', 'Historical trends'
    ];
    
    const factorCount = riskLevel === 'high' ? 4 : riskLevel === 'medium' ? 2 : 1;
    return allFactors.slice(0, factorCount);
  };

  const getRiskColor = (riskLevel: 'high' | 'medium' | 'low') => {
    switch (riskLevel) {
      case 'high': return 'bg-red-500/20 border-red-500/40 hover:bg-red-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/40 hover:bg-yellow-500/30';
      case 'low': return 'bg-green-500/20 border-green-500/40 hover:bg-green-500/30';
    }
  };

  const getRiskIcon = (riskLevel: 'high' | 'medium' | 'low') => {
    switch (riskLevel) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'medium': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'low': return <Shield className="w-5 h-5 text-green-400" />;
    }
  };

  const handleStateClick = (state: RiskData) => {
    setSelectedState(state.state);
    onStateSelect?.(state.state, state);
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">
          {t('dashboard.riskPrediction')}
        </h3>
        <Badge variant="outline" className="text-xs">
          {t('dashboard.realTime')}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {riskData.map((data) => (
          <div
            key={data.state}
            onClick={() => handleStateClick(data)}
            className={`
              relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300
              ${getRiskColor(data.riskLevel)}
              ${selectedState === data.state ? 'ring-2 ring-primary/50' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              {getRiskIcon(data.riskLevel)}
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {data.confidence}%
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-sm mb-1">{data.state}</h4>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {data.cases} {t('dashboard.cases')}
              </span>
              <Badge 
                variant={data.riskLevel === 'high' ? 'destructive' : 
                        data.riskLevel === 'medium' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {t(`dashboard.risk.${data.riskLevel}`)}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {selectedState && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3">{selectedState} - {t('dashboard.riskDetails')}</h4>
          {(() => {
            const state = riskData.find(d => d.state === selectedState);
            if (!state) return null;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('dashboard.riskFactors')}:
                  </p>
                  <ul className="text-sm space-y-1">
                    {state.factors.map((factor, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary/60 rounded-full" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('dashboard.waterQuality')}:</span>
                    <span className="font-medium">{state.waterQuality.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('dashboard.population')}:</span>
                    <span className="font-medium">{state.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('dashboard.confidence')}:</span>
                    <span className="font-medium">{state.confidence}%</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500/60 rounded-full" />
          <span className="text-xs text-muted-foreground">{t('dashboard.risk.high')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500/60 rounded-full" />
          <span className="text-xs text-muted-foreground">{t('dashboard.risk.medium')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500/60 rounded-full" />
          <span className="text-xs text-muted-foreground">{t('dashboard.risk.low')}</span>
        </div>
      </div>
    </GlassCard>
  );
}