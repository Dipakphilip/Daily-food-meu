import React, { useState } from 'react';
import { Vegetable, IndianState, AyurvedicRitu } from '../types';
import { SEASONAL_VEGETABLES } from '../data/seasonalVegetablesData';
import { 
  Sprout, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Droplet, 
  BookOpen, 
  CheckCircle2,
  ChevronRight,
  Languages
} from 'lucide-react';

interface SeasonalVegetableShowcaseProps {
  selectedState: IndianState;
  selectedMonth: number;
  activeRitu: AyurvedicRitu;
  onSelectVegetableForRecipe: (veg: Vegetable) => void;
  onAskAiForVeg: (veg: Vegetable) => void;
}

const CATEGORIES = [
  'All Produce',
  'Gourds & Melons',
  'Leafy Greens (Saag)',
  'Roots & Tubers',
  'Pods & Beans',
  'Local Nightshades & Fruits'
];

export const SeasonalVegetableShowcase: React.FC<SeasonalVegetableShowcaseProps> = ({
  selectedState,
  selectedMonth,
  activeRitu,
  onSelectVegetableForRecipe,
  onAskAiForVeg
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Produce');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVegDetail, setSelectedVegDetail] = useState<Vegetable | null>(null);

  // Compute seasonal status for current month and zone
  const evaluatedProduce = React.useMemo(() => {
    return SEASONAL_VEGETABLES.map(veg => {
      const isPeak = veg.peakMonths.includes(selectedMonth);
      const isZoneMatch = veg.zones.includes(selectedState.zone);
      
      let status: 'Peak Season' | 'Secondary / Early' | 'Off-Season' = 'Off-Season';
      if (isPeak && isZoneMatch) status = 'Peak Season';
      else if (isPeak || isZoneMatch) status = 'Secondary / Early';

      return {
        ...veg,
        computedStatus: status
      };
    }).sort((a, b) => {
      if (a.computedStatus === 'Peak Season' && b.computedStatus !== 'Peak Season') return -1;
      if (b.computedStatus === 'Peak Season' && a.computedStatus !== 'Peak Season') return 1;
      return 0;
    });
  }, [selectedMonth, selectedState]);

  // Filtered by category and search
  const filteredVegetables = React.useMemo(() => {
    return evaluatedProduce.filter(veg => {
      const matchesCategory = selectedCategory === 'All Produce' || veg.category === selectedCategory;
      
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesName = veg.englishName.toLowerCase().includes(q) ||
                          veg.hindiName.toLowerCase().includes(q) ||
                          veg.botanicalName.toLowerCase().includes(q) ||
                          Object.values(veg.regionalNames).some(name => typeof name === 'string' && name.toLowerCase().includes(q));

      return matchesCategory && matchesName;
    });
  }, [evaluatedProduce, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner with Season Overview */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedState.name} ({selectedState.zone} India)
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeRitu.sanskritName} • Month {selectedMonth}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-100 font-serif">
              Seasonal Vegetable & Produce Recommendations
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-3xl">
              Locally harvested vegetables naturally suited to the climate, soil humidity, and biological Agni requirements of {selectedState.name} right now.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-3 bg-stone-800/80 p-3 rounded-xl border border-stone-700/80 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-stone-100 font-mono">
                {evaluatedProduce.filter(v => v.computedStatus === 'Peak Season').length}
              </div>
              <div className="text-xs text-stone-400">Peak In-Season Vegetables</div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in English, Hindi, Tamil, Telugu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Produce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredVegetables.map((veg) => {
          const isPeak = veg.computedStatus === 'Peak Season';
          const isCooling = veg.ayurvedicProperties.virya.includes('Cooling');

          return (
            <div
              key={veg.id}
              className={`bg-stone-900 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-lg ${
                isPeak
                  ? 'border-emerald-500/40 hover:border-emerald-500 shadow-sm'
                  : 'border-stone-800 hover:border-stone-700 opacity-90'
              }`}
            >
              <div>
                {/* Header: English, Hindi, and Peak Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                        {veg.englishName}
                      </h3>
                      {isPeak && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Peak Season
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-amber-400 font-medium">{veg.hindiName}</p>
                    <p className="text-[11px] text-stone-500 italic font-serif">{veg.botanicalName}</p>
                  </div>

                  <div className={`p-2 rounded-xl text-xs flex items-center gap-1 shrink-0 ${
                    isCooling 
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40' 
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  }`}>
                    {isCooling ? <Droplet className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-semibold">{veg.ayurvedicProperties.virya.split('(')[0]}</span>
                  </div>
                </div>

                {/* Multilingual Regional Names Pill Drawer */}
                <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-2.5 mb-3 text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium mb-1.5">
                    <Languages className="w-3.5 h-3.5 text-amber-400" />
                    <span>Regional Names in India:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {veg.regionalNames.tamil && (
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                        <strong className="text-stone-400 font-normal">Tamil:</strong> {veg.regionalNames.tamil}
                      </span>
                    )}
                    {veg.regionalNames.telugu && (
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                        <strong className="text-stone-400 font-normal">Telugu:</strong> {veg.regionalNames.telugu}
                      </span>
                    )}
                    {veg.regionalNames.bengali && (
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                        <strong className="text-stone-400 font-normal">Bengali:</strong> {veg.regionalNames.bengali}
                      </span>
                    )}
                    {veg.regionalNames.marathi && (
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                        <strong className="text-stone-400 font-normal">Marathi:</strong> {veg.regionalNames.marathi}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ayurvedic Dosha & Digestion Ease */}
                <div className="flex items-center justify-between text-xs py-1.5 border-y border-stone-800 mb-3 text-stone-400">
                  <span>
                    Digestion: <strong className="text-emerald-300 font-medium">{veg.ayurvedicProperties.digestionEase}</strong>
                  </span>
                  <span className="text-amber-400/90 text-right">
                    {veg.ayurvedicProperties.doshaBalance.split(',')[0]}
                  </span>
                </div>

                {/* Top Health Benefits */}
                <div className="space-y-1.5 mb-4">
                  {veg.healthBenefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Everyday Pantry Pairings */}
                <div className="text-xs text-stone-400 mb-4 bg-stone-800/40 p-2.5 rounded-lg border border-stone-800">
                  <span className="font-semibold text-stone-300 block mb-1">Everyday Pantry Pairings:</span>
                  <div className="flex flex-wrap gap-1">
                    {veg.pantryPairings.map((pairing, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 text-[11px]">
                        {pairing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                <button
                  id={`veg-view-recipes-${veg.id}`}
                  onClick={() => onSelectVegetableForRecipe(veg)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Recipes</span>
                </button>

                <button
                  id={`veg-ask-ai-${veg.id}`}
                  onClick={() => onAskAiForVeg(veg)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition-all cursor-pointer flex items-center gap-1"
                  title="Ask AI how to cook with this vegetable"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Tips</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
