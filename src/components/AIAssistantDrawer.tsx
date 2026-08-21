import React, { useState } from 'react';
import { IndianState, AyurvedicRitu, WeatherContext, DietPlanMode } from '../types';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle, 
  ChefHat, 
  Flame, 
  Droplets,
  BookOpen
} from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedState: IndianState;
  selectedMonth: number;
  activeRitu: AyurvedicRitu;
  weather: WeatherContext;
  dietMode: DietPlanMode;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recipeCard?: any;
}

const PRESET_PROMPTS = [
  'How to counter summer dehydration with Indian vegetables?',
  'What should I cook for dinner if I have sluggish monsoon digestion?',
  'Give me an authentic Gujarati recipe using Bottle Gourd (Lauki)',
  'How to balance Vata during winter with everyday spices?',
  'Suggest a high-protein vegetarian dinner for Delhi summer'
];

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  selectedState,
  selectedMonth,
  activeRitu,
  weather,
  dietMode,
  initialPrompt
}) => {
  const [inputQuery, setInputQuery] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: `Namaste! I am your Ayurvedic Nutrition & Culinary Assistant for **${selectedState.name}** during **${activeRitu.key} Ritu** (${weather.condition}, ${weather.temperatureC}°C).\n\nAsk me anything about seasonal Indian vegetables, gut-friendly spices, custom recipe tweaks, or adapting your meal chart!`,
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = async (promptToSend?: string) => {
    const text = promptToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/advise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text.trim(),
          state: selectedState.name,
          month: activeRitu.englishSeason,
          weather: `${weather.condition} (${weather.temperatureC}°C, ${weather.humidity}% humidity)`,
          dietType: dietMode
        })
      });

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.advice || data.fallbackAdvice || 'Here is the seasonal dietary recommendation.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Incorporate light seasonal gourds like Lauki and Turai with cumin, ginger, and turmeric to support digestive fire during ${activeRitu.key} season.`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white border-l border-stone-200 w-full max-w-lg h-full flex flex-col shadow-2xl overflow-hidden animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-orange-50/80 via-amber-50/60 to-emerald-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-800 font-serif">AI Ayurvedic Diet & Recipe Advisor</h2>
              <p className="text-xs text-stone-600 font-medium">
                Personalized for {selectedState.name} • {activeRitu.key} Ritu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-3 bg-stone-50/80 border-b border-stone-200 overflow-x-auto scrollbar-none flex gap-2">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl text-xs bg-white hover:bg-orange-50 text-stone-700 hover:text-orange-900 border border-stone-200 whitespace-nowrap transition-all cursor-pointer font-medium shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-gradient-to-b from-amber-50/20 to-white">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 mt-0.5 border border-orange-200 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                    isAssistant
                      ? 'bg-white border border-stone-200 text-stone-800 shadow-2xs'
                      : 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {!isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-stone-600 font-medium">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 border border-orange-200">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span>Consulting Ayurvedic seasonality guidelines for {selectedState.name}...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about seasonal vegetables, diet adjustments, or recipe steps..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 text-white font-bold transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
