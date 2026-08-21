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
  onOpenAi?: () => void;
  groceryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedState,
  activeRitu,
  weather,
  groceryCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md text-stone-800 border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('planner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-lg shadow-md text-white">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent font-serif">
                  Season diet
                </span>
                <span className="text-[11px] font-bold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300">
                  {activeRitu.key} Ritu
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Indian Seasonal Health & Regional Cuisine Architecture
              </p>
            </div>
          </div>

          {/* Environmental Context Quick Badges */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>{selectedState.name}</span>
              <span className="text-orange-500">({selectedState.zone})</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-medium">
              <SunMedium className="w-3.5 h-3.5 text-sky-600" />
              <span>{weather.condition}</span>
              <span className="font-bold text-sky-900">{weather.temperatureC}°C</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Agni: <strong>{activeRitu.key === 'Hemanta' || activeRitu.key === 'Shishira' ? 'Strong' : activeRitu.key === 'Varsha' ? 'Sensitive' : 'Moderate'}</strong></span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-stone-100 scrollbar-none text-xs sm:text-sm">
          <button
            id="nav-tab-planner"
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-orange-50/70'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Weekly Meal Plan</span>
          </button>

          <button
            id="nav-tab-grocery"
            onClick={() => setActiveTab('grocery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === 'grocery'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-emerald-50/70'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Weekly Grocery</span>
            {groceryCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-md font-mono ${
                activeTab === 'grocery' ? 'bg-white text-emerald-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {groceryCount}
              </span>
            )}
          </button>

          <button
            id="nav-tab-seasonality"
            onClick={() => setActiveTab('seasonality')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'seasonality'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-teal-50/70'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Seasonal Produce</span>
          </button>

          <button
            id="nav-tab-recipes"
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'recipes'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50/70'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Everyday Recipes</span>
          </button>

          <button
            id="nav-tab-blueprint"
            onClick={() => setActiveTab('blueprint')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'blueprint'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-purple-50/70'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PM Blueprint</span>
          </button>
        </div>
      </div>
    </header>
  );
};
