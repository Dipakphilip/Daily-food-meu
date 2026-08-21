import React from 'react';
import { IndianState, AyurvedicRitu, WeatherContext } from '../types';
import { INDIAN_STATES, AYURVEDIC_RITUS, getRituForMonth } from '../data/indianRegionsData';
import { MapPin, Calendar, CloudSun, Sparkles, Thermometer, Droplets, Info } from 'lucide-react';

interface RegionWeatherBarProps {
  selectedState: IndianState;
  onSelectState: (state: IndianState) => void;
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
  weather: WeatherContext;
  onUpdateWeather: (newWeather: WeatherContext) => void;
  activeRitu: AyurvedicRitu;
}

const MONTH_NAMES = [
  'January (Magha)',
  'February (Phalguna)',
  'March (Chaitra)',
  'April (Vaishakha)',
  'May (Jyeshtha)',
  'June (Ashadha)',
  'July (Shravana)',
  'August (Bhadrapada)',
  'September (Ashvina)',
  'October (Kartika)',
  'November (Margashirsha)',
  'December (Pausha)'
];

const WEATHER_PRESETS: { label: string; condition: WeatherContext['condition']; temp: number; humidity: number; heatIndex: string; guidance: string; hydration: string }[] = [
  {
    label: 'Sunny Summer Heat (38°C)',
    condition: 'Sunny & Hot',
    temp: 38,
    humidity: 45,
    heatIndex: 'High Pitta Aggravation',
    guidance: 'Prioritize cooling gourds (Lauki, Turai), tender coconut water, mint, and fennel. Avoid fiery chili curries.',
    hydration: '3.5 - 4.0 Liters (Include Chaas, Sattu drink, or Aam Panna)'
  },
  {
    label: 'Humid Monsoon Rain (28°C)',
    condition: 'Rainy / Monsoon',
    temp: 28,
    humidity: 88,
    heatIndex: 'Low Agni (Weak Digestion)',
    guidance: 'Agni is at its weakest. Eat freshly cooked, hot meals with ginger, hing, and cumin. Avoid raw waterlogged leafy greens.',
    hydration: '2.5 Liters (Warm Jeera-Ginger water)'
  },
  {
    label: 'Pleasant Spring / Autumn (25°C)',
    condition: 'Pleasant & Mild',
    temp: 25,
    humidity: 55,
    heatIndex: 'Balanced Tridoshic',
    guidance: 'Incorporate detoxifying bitter tastes (Karela, Methi, Neem flowers) to clear accumulated seasonal Kapha.',
    hydration: '2.5 - 3.0 Liters (Room temperature water)'
  },
  {
    label: 'Crisp Winter Chill (14°C)',
    condition: 'Chilly / Cold',
    temp: 14,
    humidity: 40,
    heatIndex: 'Strong Metabolic Agni',
    guidance: 'Digestive fire is peaked. Eat dense winter greens (Sarson, Bathua), carrots, root veggies, with desi ghee and sesame.',
    hydration: '2.0 - 2.5 Liters (Warm herbal water)'
  },
  {
    label: 'Severe Dry Heatwave (42°C)',
    condition: 'Dry Heatwave',
    temp: 42,
    humidity: 25,
    heatIndex: 'Severe Vata & Pitta Depletion',
    guidance: 'Strictly cooling, liquid-heavy diet. Ash gourd juice, Lauki sabzi, watermelon, and barley sattu.',
    hydration: '4.5 Liters (Electrolytes with black salt & lemon)'
  }
];

export const RegionWeatherBar: React.FC<RegionWeatherBarProps> = ({
  selectedState,
  onSelectState,
  selectedMonth,
  onSelectMonth,
  weather,
  onUpdateWeather,
  activeRitu
}) => {
  // Group states by Zone for easy browsing
  const groupedStates = React.useMemo(() => {
    const groups: Record<string, IndianState[]> = {
      North: [],
      South: [],
      West: [],
      East: [],
      Central: [],
      Northeast: []
    };
    INDIAN_STATES.forEach(s => {
      if (groups[s.zone]) groups[s.zone].push(s);
    });
    return groups;
  }, []);

  const handlePresetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = WEATHER_PRESETS.find(p => p.label === e.target.value);
    if (selected) {
      onUpdateWeather({
        temperatureC: selected.temp,
        humidity: selected.humidity,
        condition: selected.condition,
        heatIndex: selected.heatIndex,
        ayurvedicGuidance: selected.guidance,
        hydrationRecommendation: selected.hydration
      });
    }
  };

  return (
    <div className="bg-stone-900 border-b border-stone-800 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Controls Grid: State, Month, and Weather Modifier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          
          {/* 1. Indian State Picker */}
          <div className="bg-stone-800/90 border border-stone-700/80 rounded-xl p-3 shadow-sm hover:border-amber-500/50 transition-colors">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Indian State & Agro-Zone</span>
            </label>
            <select
              id="region-state-selector"
              value={selectedState.id}
              onChange={(e) => {
                const found = INDIAN_STATES.find(s => s.id === e.target.value);
                if (found) onSelectState(found);
              }}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {(Object.entries(groupedStates) as [string, IndianState[]][]).map(([zone, states]) => (
                <optgroup key={zone} label={`${zone} India`}>
                  {states.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.zone} Zone)
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-xs text-stone-400">
              <span>Staple Fat: <span className="text-stone-300 font-medium">{selectedState.stapleFat}</span></span>
              <span>Staple Grain: <span className="text-stone-300 font-medium">{selectedState.stapleGrain.split(',')[0]}</span></span>
            </div>
          </div>

          {/* 2. Month & Ayurvedic Ritu Selector */}
          <div className="bg-stone-800/90 border border-stone-700/80 rounded-xl p-3 shadow-sm hover:border-amber-500/50 transition-colors">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>2. Month & Ayurvedic Season (Ritu)</span>
            </label>
            <select
              id="region-month-selector"
              value={selectedMonth}
              onChange={(e) => {
                const m = parseInt(e.target.value, 10);
                onSelectMonth(m);
              }}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {MONTH_NAMES.map((name, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-medium">{activeRitu.sanskritName}</span>
              <span className="text-stone-400">{activeRitu.englishSeason}</span>
            </div>
          </div>

          {/* 3. Climate & Real-Time Weather Context */}
          <div className="bg-stone-800/90 border border-stone-700/80 rounded-xl p-3 shadow-sm hover:border-amber-500/50 transition-colors">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Climate & Weather Setting</span>
            </label>
            <select
              id="region-weather-selector"
              onChange={handlePresetSelect}
              defaultValue="Sunny Summer Heat (38°C)"
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {WEATHER_PRESETS.map((p, idx) => (
                <option key={idx} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-300 font-medium">{weather.temperatureC}°C</span>
              </span>
              <span className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-stone-300 font-medium">{weather.humidity}% Humidity</span>
              </span>
              <span className="text-amber-300 font-medium text-[11px]">{weather.condition}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
