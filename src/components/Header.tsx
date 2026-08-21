import React from 'react';
import { IndianState, AyurvedicRitu, WeatherContext } from '../types';
import { 
  CalendarDays, 
  Sprout, 
  ChefHat, 
  ShoppingCart, 
  FileText, 
  SunMedium, 
  MapPin, 
  Flame
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'planner' | 'seasonality' | 'recipes' | 'grocery' | 'blueprint';
  setActiveTab: (tab: 'planner' | 'seasonality' | 'recipes' | 'grocery' | 'blueprint') => void;
  selectedState: IndianState;
  activeRitu: AyurvedicRitu;
  weather: WeatherContext;
  onOpenAi: () => void;
  groceryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedState,
  activeRitu,
  weather,
  onOpenAi,
  groceryCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('planner')}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xl shadow-inner">
              🥗
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-amber-400 font-serif">Season diet</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  {activeRitu.key} Ritu
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">Indian Seasonal Health & Regional Meal Planner</p>
            </div>
          </div>

          {/* Environmental Context Quick Badges */}
          <div className="hidden xl:flex items-center gap-2 text-xs bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
            <div className="flex items-center gap-1.5 text-stone-300 pr-2 border-r border-stone-700">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-stone-200">{selectedState.name}</span>
              <span className="text-stone-400">({selectedState.zone})</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300 pr-2 border-r border-stone-700">
              <SunMedium className="w-3.5 h-3.5 text-amber-400" />
              <span>{weather.condition}</span>
              <span className="text-amber-300 font-medium">{weather.temperatureC}°C</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agni: {activeRitu.key === 'Hemanta' || activeRitu.key === 'Shishira' ? 'Strong' : activeRitu.key === 'Varsha' ? 'Sensitive' : 'Moderate'}</span>
            </div>
          </div>

          {/* Right Section / Status */}
          <div className="flex items-center gap-2 sm:gap-3">
          </div>
        </div>

          {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 border-t border-stone-800 scrollbar-none text-xs sm:text-sm">
          <button
            id="nav-tab-planner"
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Weekly Meal Plan</span>
          </button>

          <button
            id="nav-tab-grocery"
            onClick={() => setActiveTab('grocery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === 'grocery'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Weekly Grocery</span>
            {groceryCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                activeTab === 'grocery'
                  ? 'bg-stone-950 text-amber-400'
                  : 'bg-emerald-500 text-stone-950'
              }`}>
                {groceryCount}
              </span>
            )}
          </button>

          <button
            id="nav-tab-seasonality"
            onClick={() => setActiveTab('seasonality')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'seasonality'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Seasonal Produce</span>
          </button>

          <button
            id="nav-tab-recipes"
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'recipes'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Everyday Recipes</span>
          </button>

          <button
            id="nav-tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'blueprint'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PM Blueprint & Architecture</span>
          </button>
        </div>
      </div>
    </header>
  );
};
