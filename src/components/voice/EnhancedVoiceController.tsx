import React, { useState, useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, VolumeX, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { StateData } from '@/data/northeastStates';

interface EnhancedVoiceControllerProps {
  onStateSelect?: (state: StateData) => void;
  onQuickAction?: (action: string) => void;
  onRiskQuery?: (query: string) => void;
}

export function EnhancedVoiceController({ 
  onStateSelect, 
  onQuickAction,
  onRiskQuery 
}: EnhancedVoiceControllerProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [agentId, setAgentId] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isSetup, setIsSetup] = useState(false);
  
  const conversation = useConversation({
    onConnect: () => {
      toast.success(t('voice.connected'));
      setIsActive(true);
    },
    onDisconnect: () => {
      toast.info(t('voice.disconnected'));
      setIsActive(false);
    },
    onError: (error) => {
      toast.error(t('voice.error') + ': ' + error.message);
      setIsActive(false);
    },
    onMessage: (message) => {
      handleVoiceMessage(message);
    },
    clientTools: {
      navigateToPage: (params: { page: string }) => {
        navigate(`/${params.page}`);
        return `Navigated to ${params.page}`;
      },
      selectState: (params: { stateName: string }) => {
        const stateNames = [
          'assam', 'arunachal pradesh', 'manipur', 'meghalaya', 
          'mizoram', 'nagaland', 'sikkim', 'tripura'
        ];
        
        const state = stateNames.find(s => 
          s.toLowerCase().includes(params.stateName.toLowerCase())
        );
        
        if (state && onStateSelect) {
          // Mock state data - in real app, fetch from data source
          const mockState: StateData = {
            id: state,
            name: state,
            capital: '',
            coordinates: { lat: 26.2006, lng: 92.9376 },
            population: 1000000,
            healthStatus: 'moderate',
            waterQuality: 80,
            healthFacilities: 10,
            activeAlerts: 2,
            districts: []
          };
          onStateSelect(mockState);
          return `Selected ${state}`;
        }
        return `State ${params.stateName} not found`;
      },
      analyzeRisk: (params: { location?: string, type?: string }) => {
        const query = `Risk analysis for ${params.location || 'all areas'} - ${params.type || 'general'}`;
        onRiskQuery?.(query);
        return `Analyzing risk for ${params.location || 'all areas'}`;
      },
      executeAction: (params: { action: string }) => {
        onQuickAction?.(params.action);
        return `Executed ${params.action}`;
      },
      changeLanguage: (params: { language: string }) => {
        const langMap: { [key: string]: string } = {
          'english': 'en',
          'hindi': 'hi',
          'assamese': 'as',
          'manipuri': 'mni',
          'khasi': 'kha',
          'mizo': 'lus',
          'nagamese': 'nag',
          'nepali': 'ne'
        };
        
        const langCode = langMap[params.language.toLowerCase()];
        if (langCode) {
          i18n.changeLanguage(langCode);
          return `Language changed to ${params.language}`;
        }
        return `Language ${params.language} not supported`;
      }
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `You are a multilingual health monitoring assistant for Northeast India. 
          You can help users navigate the dashboard, analyze outbreak risks, select states, 
          and perform health monitoring tasks. Respond in the user's preferred language 
          (English, Hindi, or regional Northeast languages). Keep responses concise and helpful.
          
          Available tools:
          - navigateToPage: Navigate to dashboard, alerts, reports, etc.
          - selectState: Select a specific Northeast state  
          - analyzeRisk: Analyze outbreak risk for locations
          - executeAction: Perform quick actions like sending alerts
          - changeLanguage: Switch interface language
          
          Current context: Health monitoring dashboard for Northeast India states.`
        },
        firstMessage: t('voice.greeting'),
        language: i18n.language,
      },
      tts: {
        voiceId: "Aria" // Default voice, can be customized
      }
    }
  });

  const handleVoiceMessage = useCallback((message: any) => {
    // Handle different message types from the conversation
    if (message.type === 'agent_response') {
      // Agent responded - could update UI or trigger actions
    } else if (message.type === 'user_transcript') {
      // User spoke - could show transcript in UI
    }
  }, []);

  const setupVoiceAgent = useCallback(async () => {
    if (!apiKey || !agentId) {
      toast.error(t('voice.setupRequired'));
      return;
    }

    try {
      // In a real app, you'd generate signed URL on your backend
      // For now, we'll use the agent ID directly
      await conversation.startSession({ 
        agentId: agentId,
        // Note: For production, use signed URLs generated on your backend
      });
      setIsSetup(true);
    } catch (error) {
      toast.error(t('voice.setupFailed'));
      console.error('Voice setup failed:', error);
    }
  }, [apiKey, agentId, conversation, t]);

  const toggleConversation = useCallback(async () => {
    if (!isSetup) {
      toast.warning(t('voice.setupFirst'));
      return;
    }

    try {
      if (isActive) {
        await conversation.endSession();
      } else {
        await conversation.startSession({ agentId });
      }
    } catch (error) {
      toast.error(t('voice.toggleFailed'));
      console.error('Voice toggle failed:', error);
    }
  }, [isActive, isSetup, conversation, agentId, t]);

  const adjustVolume = useCallback(async (volume: number) => {
    try {
      await conversation.setVolume({ volume });
      toast.success(t('voice.volumeAdjusted'));
    } catch (error) {
      toast.error(t('voice.volumeFailed'));
    }
  }, [conversation, t]);

  if (!isSetup) {
    return (
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium">{t('voice.setup')}</h4>
        <div className="space-y-2">
          <input
            type="text"
            placeholder={t('voice.apiKeyPlaceholder')}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md bg-background"
          />
          <input
            type="text"
            placeholder={t('voice.agentIdPlaceholder')}
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md bg-background"
          />
          <Button onClick={setupVoiceAgent} size="sm" className="w-full">
            {t('voice.setupButton')}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {t('voice.setupInstructions')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={toggleConversation}
        variant={isActive ? "destructive" : "default"}
        size="sm"
        className="relative"
      >
        {isActive ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>

      <Button
        onClick={() => adjustVolume(0.5)}
        variant="outline"
        size="sm"
      >
        {conversation.isSpeaking ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-xs"
      >
        <Bot className="w-4 h-4 mr-1" />
        <Badge variant="outline" className="text-xs">
          {isActive ? t('voice.listening') : t('voice.inactive')}
        </Badge>
      </Button>
    </div>
  );
}