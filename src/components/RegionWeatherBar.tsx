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
    <div className="bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-emerald-50/70 border-b border-amber-200/80 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Controls Grid: State, Month, and Weather Modifier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          
          {/* 1. Indian State Picker */}
          <div className="bg-white border border-orange-200 rounded-2xl p-3.5 shadow-sm hover:border-orange-400 transition-all">
            <label className="flex items-center gap-1.5 text-xs font-bold text-orange-800 uppercase tracking-wider mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>1. State & Agro-Zone</span>
            </label>
            <select
              id="region-state-selector"
              value={selectedState.id}
              onChange={(e) => {
                const found = INDIAN_STATES.find(s => s.id === e.target.value);
                if (found) onSelectState(found);
              }}
              className="w-full bg-orange-50/50 border border-orange-200 rounded-xl px-3 py-1.5 text-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
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
            <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>Staple Fat: <span className="text-orange-950 font-bold">{selectedState.stapleFat}</span></span>
              <span>Grain: <span className="text-orange-950 font-bold">{selectedState.stapleGrain.split(',')[0]}</span></span>
            </div>
          </div>

          {/* 2. Month & Ayurvedic Ritu Selector */}
          <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 shadow-sm hover:border-emerald-400 transition-all">
            <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. Month & Season (Ritu)</span>
            </label>
            <select
              id="region-month-selector"
              value={selectedMonth}
              onChange={(e) => {
                const m = parseInt(e.target.value, 10);
                onSelectMonth(m);
              }}
              className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-1.5 text-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              {MONTH_NAMES.map((name, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-[11px] font-medium">
              <span className="text-emerald-800 font-bold">{activeRitu.sanskritName}</span>
              <span className="text-emerald-600">{activeRitu.englishSeason}</span>
            </div>
          </div>

          {/* 3. Climate & Real-Time Weather Context */}
          <div className="bg-white border border-sky-200 rounded-2xl p-3.5 shadow-sm hover:border-sky-400 transition-all">
            <label className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1.5">
              <CloudSun className="w-3.5 h-3.5 text-sky-600" />
              <span>3. Climate & Weather Setting</span>
            </label>
            <select
              id="region-weather-selector"
              onChange={handlePresetSelect}
              defaultValue="Sunny Summer Heat (38°C)"
              className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-1.5 text-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
            >
              {WEATHER_PRESETS.map((p, idx) => (
                <option key={idx} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span className="flex items-center gap-1 text-orange-700">
                <Thermometer className="w-3 h-3 text-orange-600" />
                <span className="font-bold">{weather.temperatureC}°C</span>
              </span>
              <span className="flex items-center gap-1 text-sky-700">
                <Droplets className="w-3 h-3 text-sky-600" />
                <span className="font-bold">{weather.humidity}%</span>
              </span>
              <span className="text-stone-700 font-medium">{weather.condition}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
