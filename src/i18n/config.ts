import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      alerts: "Alerts",
      reports: "Reports",
      awareness: "Awareness",
      login: "Login",
      
      // Dashboard
      "community_health_dashboard": "Community Health Dashboard",
      "total_reports": "Total Reports",
      "hot_villages": "Hot Villages",
      "active_alerts": "Active Alerts",
      "total_population": "Total Population",
      "avg_water_quality": "Avg Water Quality",
      "refresh_data": "Refresh Data",
      "export_report": "Export Report",
      "send_alert": "Send Alert",
      "assign_doctor": "Assign Doctor",
      "generate_report": "Generate Report",
      "view_analytics": "View Analytics",
      "outbreak_trend": "Outbreak Trend",
      "quick_actions": "Quick Actions",
      "system_status": "System Status",
      "riskPrediction": "Outbreak Risk Prediction",
      "realTime": "Real-time",
      "cases": "cases",
      "riskDetails": "Risk Analysis Details",
      "riskFactors": "Risk Factors",
      "confidence": "Confidence",
      "risk": {
        "high": "High Risk",
        "medium": "Medium Risk",
        "low": "Low Risk"
      },
      
      // Map
      "northeast_india_map": "Northeast India Health Map",
      "select_state": "Select a state to view detailed information",
      "all_states": "All States",
      "safe": "Safe",
      "moderate": "Moderate Risk",
      "high": "High Risk", 
      "critical": "Critical",
      "legend": "Legend",
      
      // States
      "assam": "Assam",
      "arunachal_pradesh": "Arunachal Pradesh", 
      "manipur": "Manipur",
      "meghalaya": "Meghalaya",
      "mizoram": "Mizoram",
      "nagaland": "Nagaland",
      "sikkim": "Sikkim",
      "tripura": "Tripura",
      
      // Voice
      "voice_control": "Voice Control",
      "listening": "Listening...",
      "voice_commands": "Voice Commands",
      "speak_command": "Speak your command",
      "voice": {
        "connected": "Voice assistant connected",
        "disconnected": "Voice assistant disconnected",
        "error": "Voice recognition error",
        "greeting": "Hello! I am your health monitoring assistant. How can I help you today?",
        "setup": "Voice Assistant Setup",
        "setupRequired": "Please enter API key and Agent ID",
        "setupFailed": "Failed to setup voice assistant",
        "setupFirst": "Please setup voice assistant first",
        "toggleFailed": "Failed to toggle voice assistant",
        "volumeAdjusted": "Volume adjusted",
        "volumeFailed": "Failed to adjust volume",
        "apiKeyPlaceholder": "Enter ElevenLabs API Key",
        "agentIdPlaceholder": "Enter Agent ID",
        "setupButton": "Setup Voice Assistant",
        "setupInstructions": "Get your API key and Agent ID from ElevenLabs dashboard",
        "inactive": "Inactive"
      },
      
      // Languages
      "language": "Language",
      "english": "English",
      "hindi": "हिन्दी",
      "assamese": "অসমীয়া",
      "manipuri": "মৈতৈলোন্",
      "khasi": "Khasi",
      "mizo": "Mizo",
      "nagamese": "Nagamese",
      "nepali": "नेपाली"
    }
  },
  hi: {
    translation: {
      // Navigation
      dashboard: "डैशबोर्ड",
      alerts: "अलर्ट",
      reports: "रिपोर्ट",
      awareness: "जागरूकता",
      login: "लॉगिन",
      
      // Dashboard
      "community_health_dashboard": "सामुदायिक स्वास्थ्य डैशबोर्ड",
      "total_reports": "कुल रिपोर्ट",
      "hot_villages": "हॉट गांव",
      "active_alerts": "सक्रिय अलर्ट",
      "total_population": "कुल जनसंख्या",
      "avg_water_quality": "औसत पानी की गुणवत्ता",
      "refresh_data": "डेटा रीफ्रेश करें",
      "export_report": "रिपोर्ट एक्सपोर्ट करें",
      "send_alert": "अलर्ट भेजें",
      "assign_doctor": "डॉक्टर असाइन करें",
      "generate_report": "रिपोर्ट जेनरेट करें",
      "view_analytics": "एनालिटिक्स देखें",
      "outbreak_trend": "प्रकोप प्रवृत्ति",
      "quick_actions": "त्वरित कार्य",
      "system_status": "सिस्टम स्थिति",
      
      // Map
      "northeast_india_map": "पूर्वोत्तर भारत स्वास्थ्य मानचित्र",
      "select_state": "विस्तृत जानकारी के लिए राज्य चुनें",
      "all_states": "सभी राज्य",
      "safe": "सुरक्षित",
      "moderate": "मध्यम जोखिम",
      "high": "उच्च जोखिम",
      "critical": "गंभीर",
      "legend": "लेजेंड",
      
      // States
      "assam": "असम",
      "arunachal_pradesh": "अरुणाचल प्रदेश",
      "manipur": "मणिपुर", 
      "meghalaya": "मेघालय",
      "mizoram": "मिजोरम",
      "nagaland": "नागालैंड",
      "sikkim": "सिक्किम",
      "tripura": "त्रिपुरा",
      
      // Voice
      "voice_control": "आवाज नियंत्रण",
      "listening": "सुन रहा है...",
      "voice_commands": "आवाज आदेश",
      "speak_command": "अपना आदेश बोलें",
      
      // Languages
      "language": "भाषा",
      "english": "English",
      "hindi": "हिन्दी",
      "assamese": "অসমীয়া",
      "manipuri": "মৈতৈলোন্",
      "khasi": "Khasi",
      "mizo": "Mizo", 
      "nagamese": "Nagamese",
      "nepali": "नेपाली"
    }
  },
  as: {
    translation: {
      // Navigation  
      dashboard: "ড্যাশব'ৰ্ড",
      alerts: "সতৰ্কবাণী",
      reports: "প্ৰতিবেদন",
      awareness: "সজাগতা",
      login: "লগইন",
      
      // Dashboard
      "community_health_dashboard": "সমাজৰ স্বাস্থ্য ড্যাশব'ৰ্ড",
      "total_reports": "মুঠ প্ৰতিবেদন",
      "hot_villages": "গৰম গাঁও",
      "active_alerts": "সক্ৰিয় সতৰ্কবাণী",
      "total_population": "মুঠ জনসংখ্যা",
      "avg_water_quality": "গড় পানীৰ মান",
      "refresh_data": "তথ্য নবীকৰণ",
      "export_report": "প্ৰতিবেদন ৰপ্তানি",
      "send_alert": "সতৰ্কবাণী পঠিয়াওক",
      "assign_doctor": "চিকিৎসক নিযুক্তি",
      "generate_report": "প্ৰতিবেদন সৃষ্টি",
      "view_analytics": "বিশ্লেষণ চাওক",
      "outbreak_trend": "প্ৰকোপৰ প্ৰৱণতা",
      "quick_actions": "দ্ৰুত কাৰ্য",
      "system_status": "সিস্টেমৰ অৱস্থা",
      
      // Map
      "northeast_india_map": "উত্তৰ-পূৰ্ব ভাৰতৰ স্বাস্থ্য মানচিত্ৰ",
      "select_state": "বিতং তথ্যৰ বাবে ৰাজ্য বাছনি কৰক",
      "all_states": "সকলো ৰাজ্য",
      "safe": "নিৰাপদ",
      "moderate": "মধ্যম বিপদ",
      "high": "উচ্চ বিপদ",
      "critical": "গুৰুতৰ",
      "legend": "চিহ্ন",
      
      // States
      "assam": "অসম",
      "arunachal_pradesh": "অৰুণাচল প্ৰদেশ",
      "manipur": "মণিপুৰ",
      "meghalaya": "মেঘালয়",
      "mizoram": "মিজোৰাম", 
      "nagaland": "নাগালেণ্ড",
      "sikkim": "ছিক্কিম",
      "tripura": "ত্ৰিপুৰা",
      
      // Voice
      "voice_control": "কণ্ঠস্বৰ নিয়ন্ত্ৰণ",
      "listening": "শুনি আছে...",
      "voice_commands": "কণ্ঠস্বৰ আদেশ",
      "speak_command": "আপোনাৰ আদেশ কওক",
      
      // Languages
      "language": "ভাষা",
      "english": "English",
      "hindi": "হিন্দী", 
      "assamese": "অসমীয়া",
      "manipuri": "মৈতৈলোন্",
      "khasi": "Khasi",
      "mizo": "Mizo",
      "nagamese": "Nagamese", 
      "nepali": "নেপালী"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;