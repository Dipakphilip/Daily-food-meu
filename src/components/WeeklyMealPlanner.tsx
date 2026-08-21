import React, { useState } from 'react';
import { 
  MealPlanDay, 
  DietPlanMode, 
  HybridSettings, 
  Recipe, 
  IndianState, 
  AyurvedicRitu, 
  WeatherContext,
  IndianCuisine 
} from '../types';
import { 
  CalendarDays, 
  RotateCcw, 
  Shuffle, 
  Share2, 
  Printer, 
  Check, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Flame, 
  Leaf, 
  Drumstick as DrumstickIcon, 
  Egg, 
  ShieldAlert,
  Sliders,
  Utensils,
  CookingPot,
  ShoppingCart,
  ChevronDown
} from 'lucide-react';

interface WeeklyMealPlannerProps {
  weeklyPlan: MealPlanDay[];
  dietMode: DietPlanMode;
  onUpdateDietMode: (mode: DietPlanMode) => void;
  hybridSettings: HybridSettings;
  onUpdateHybridSettings: (settings: HybridSettings) => void;
  selectedCuisines: IndianCuisine[];
  onToggleCuisine: (cuisine: IndianCuisine) => void;
  onSelectAllCuisines: () => void;
  onResetToStateCuisine: () => void;
  onSwapMeal: (dayId: string, slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
  onRegenerateAll: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  selectedState: IndianState;
  activeRitu: AyurvedicRitu;
  weather: WeatherContext;
  peopleCount: number;
  onUpdatePeopleCount: (count: number) => void;
  onNavigateToGrocery?: () => void;
}

const ALL_DAYS: MealPlanDay['dayName'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const CUISINES_LIST: IndianCuisine[] = [
  'Punjabi',
  'Bengali',
  'South Indian',
  'Gujarati',
  'Maharashtrian',
  'Rajasthani',
  'Bihari',
  'Kashmiri',
  'Awadhi',
  'Goan',
  'Odia'
];

export const WeeklyMealPlanner: React.FC<WeeklyMealPlannerProps> = ({
  weeklyPlan,
  dietMode,
  onUpdateDietMode,
  hybridSettings,
  onUpdateHybridSettings,
  selectedCuisines,
  onToggleCuisine,
  onSelectAllCuisines,
  onResetToStateCuisine,
  onSwapMeal,
  onRegenerateAll,
  onSelectRecipe,
  selectedState,
  activeRitu,
  weather,
  peopleCount,
  onUpdatePeopleCount,
  onNavigateToGrocery
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle specific day in Hybrid mode
  const handleToggleHybridDay = (dayName: string) => {
    let updatedDays = [...hybridSettings.nonVegDays];
    if (updatedDays.includes(dayName)) {
      updatedDays = updatedDays.filter(d => d !== dayName);
    } else {
      updatedDays.push(dayName);
    }
    onUpdateHybridSettings({
      nonVegCount: updatedDays.length,
      nonVegDays: updatedDays
    });
  };

  // Calculate weekly macro averages
  const weeklyStats = React.useMemo(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFiber = 0;
    const vegetablesSet = new Set<string>();

    weeklyPlan.forEach(day => {
      [day.breakfast, day.lunch, day.snack, day.dinner].forEach(meal => {
        if (meal) {
          totalCalories += meal.calories;
          totalProtein += meal.proteinGrams;
          totalFiber += meal.fiberGrams;
          meal.featuredVegetables.forEach(v => vegetablesSet.add(v));
        }
      });
    });

    const daysCount = weeklyPlan.length || 7;
    return {
      avgDailyCalories: Math.round(totalCalories / daysCount),
      avgDailyProtein: Math.round(totalProtein / daysCount),
      avgDailyFiber: Math.round(totalFiber / daysCount),
      uniqueVegetables: Array.from(vegetablesSet)
    };
  }, [weeklyPlan]);

  // Export to WhatsApp formatted message
  const handleExportWhatsApp = () => {
    let text = `🌿 *${selectedState.name} Seasonal 7-Day Meal Plan* (${activeRitu.key} Ritu)\n`;
    text += `Cuisines: ${selectedCuisines.join(', ')} | Diet: ${dietMode === 'strictly_veg' ? 'Strictly Vegetarian' : dietMode === 'strictly_nonveg' ? 'Strictly Non-Vegetarian' : `Hybrid (${hybridSettings.nonVegDays.length} Non-Veg Days)`} | Scaled for: ${peopleCount} People\n\n`;

    weeklyPlan.forEach(day => {
      text += `📅 *${day.dayName}* ${day.isNonVeg ? '🍗 (Non-Veg Day)' : '🥦 (Pure Veg Day)'}\n`;
      text += `• Breakfast: ${day.breakfast.title} [${day.breakfast.cuisine}]\n`;
      text += `• Lunch: ${day.lunch.title} [${day.lunch.cuisine}]\n`;
      text += `• Snack: ${day.snack.title} [${day.snack.cuisine}]\n`;
      text += `• Dinner: ${day.dinner.title} [${day.dinner.cuisine}]\n\n`;
    });

    text += `🛒 *Seasonal Produce Used*: ${weeklyStats.uniqueVegetables.join(', ')}\n`;
    text += `Generated via Season diet - Indian Seasonal Health & Meal Planner`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner: Dietary Mode Customizer, Cuisine Selector & Action Settings */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Dietary Mode Selector */}
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              Dietary Preference & Plan Structure
            </span>
            <div className="inline-flex p-1 bg-stone-950 rounded-xl border border-stone-800 gap-1 flex-wrap">
              <button
                id="diet-strictly-veg"
                onClick={() => onUpdateDietMode('strictly_veg')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  dietMode === 'strictly_veg'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Leaf className="w-4 h-4 text-emerald-300" />
                <span>Strictly Vegetarian (7 Days)</span>
              </button>

              <button
                id="diet-strictly-nonveg"
                onClick={() => onUpdateDietMode('strictly_nonveg')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  dietMode === 'strictly_nonveg'
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <DrumstickIcon className="w-4 h-4 text-rose-300" />
                <span>Strictly Non-Veg</span>
              </button>

              <button
                id="diet-hybrid-plan"
                onClick={() => onUpdateDietMode('hybrid')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  dietMode === 'hybrid'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sliders className="w-4 h-4 text-stone-950" />
                <span>Custom Hybrid Plan</span>
              </button>
            </div>
          </div>

          {/* Quick Action CTAs & People Scaler */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Inline People Scaler */}
            <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1.5 gap-2 shadow-inner">
              <span className="text-xs text-stone-400 font-medium hidden sm:inline">Servings:</span>
              <button
                onClick={() => onUpdatePeopleCount(Math.max(1, peopleCount - 1))}
                disabled={peopleCount <= 1}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200 text-xs font-bold transition-all cursor-pointer"
                title="Decrease people count"
              >
                -
              </button>
              <span className="text-xs sm:text-sm font-bold font-mono text-amber-400 min-w-[58px] text-center">
                {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
              </span>
              <button
                onClick={() => onUpdatePeopleCount(Math.min(15, peopleCount + 1))}
                disabled={peopleCount >= 15}
                className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-200 text-xs font-bold transition-all cursor-pointer"
                title="Increase people count"
              >
                +
              </button>
            </div>

            {onNavigateToGrocery && (
              <button
                id="plan-view-grocery-btn"
                onClick={onNavigateToGrocery}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Weekly Grocery Page</span>
              </button>
            )}

            <button
              id="plan-regenerate-all-btn"
              onClick={onRegenerateAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Regenerate Plan</span>
            </button>

            <button
              id="plan-export-whatsapp-btn"
              onClick={handleExportWhatsApp}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer relative"
            >
              {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-emerald-400" />}
              <span>{copiedNotification ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              id="plan-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Chart</span>
            </button>
          </div>
        </div>

        {/* Multi-Cuisine Interactive Selection Interface */}
        <div className="pt-4 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <CookingPot className="w-4 h-4" />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-200 uppercase tracking-wide flex items-center gap-2">
                  <span>Select Regional Cuisines (Multiple selection enabled):</span>
                  <span className="text-[11px] normal-case font-mono px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-800">
                    {selectedCuisines.length} selected
                  </span>
                </label>
                <p className="text-xs text-stone-400 mt-0.5">
                  Choose your preferred regional cuisines. Weekly meals will exclusively reflect your selected culinary traditions.
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onSelectAllCuisines}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  selectedCuisines.length === CUISINES_LIST.length
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                All Cuisines
              </button>
              {selectedState.traditionalCuisine && (
                <button
                  type="button"
                  onClick={onResetToStateCuisine}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-950 text-amber-300 border border-stone-800 hover:border-amber-700/60 transition-all cursor-pointer"
                  title={`Select only ${selectedState.traditionalCuisine} (Native to ${selectedState.name})`}
                >
                  ⭐ Native ({selectedState.traditionalCuisine})
                </button>
              )}
            </div>
          </div>

          {/* Cuisine Multi-Select Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {CUISINES_LIST.map((cuisine) => {
              const isSelected = selectedCuisines.includes(cuisine);
              const isNative = cuisine === selectedState.traditionalCuisine;

              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => onToggleCuisine(cuisine)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-stone-950/70 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'border border-stone-600'
                  }`}>
                    {isSelected && '✓'}
                  </span>
                  <span>{cuisine}</span>
                  {isNative && (
                    <span className="text-[10px] text-amber-400/80 font-normal">⭐</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Cuisine Filter Note */}
          <div className="mt-3 text-xs bg-stone-950/70 px-3.5 py-2 rounded-xl border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-stone-300">
            <div>
              <span className="text-stone-400">Reflecting meals exclusively for: </span>
              <strong className="text-amber-300">
                {selectedCuisines.length > 0 ? selectedCuisines.join(', ') : 'All Cuisines'}
              </strong>
            </div>
            <span className="text-[11px] text-stone-500">
              (Breakfast • Lunch • Evening Snack • Dinner)
            </span>
          </div>
        </div>

        {/* Hybrid Day Selector (Visible when Hybrid Mode is active) */}
        {dietMode === 'hybrid' && (
          <div className="pt-4 border-t border-stone-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Hybrid Schedule Customizer:
                </span>{' '}
                <span className="text-xs text-stone-400">
                  Select which days to permit Non-Veg meals (unselected days remain strictly Pure Vegetarian as per fasting/temple customs).
                </span>
              </div>
              <div className="text-xs font-semibold text-stone-300">
                {hybridSettings.nonVegDays.length} Non-Veg Days / {7 - hybridSettings.nonVegDays.length} Veg Days
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {ALL_DAYS.map(day => {
                const isNonVegDay = hybridSettings.nonVegDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => handleToggleHybridDay(day)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isNonVegDay
                        ? 'bg-rose-950/80 border border-rose-600 text-rose-200'
                        : 'bg-emerald-950/60 border border-emerald-700/60 text-emerald-300'
                    }`}
                  >
                    <span>{day.slice(0, 3)}</span>
                    <span className="text-[10px] font-mono">
                      {isNonVegDay ? '🍗 Non-Veg' : '🥦 Pure Veg'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Weekly Nutrition Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5">
          <div className="text-[11px] text-stone-400 uppercase font-semibold">Avg Daily Calories</div>
          <div className="text-xl font-bold text-stone-100 font-mono mt-0.5">
            {weeklyStats.avgDailyCalories} <span className="text-xs font-normal text-stone-400">kcal / day</span>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5">
          <div className="text-[11px] text-stone-400 uppercase font-semibold">Avg Daily Protein</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
            {weeklyStats.avgDailyProtein}g <span className="text-xs font-normal text-stone-400">/ day</span>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5">
          <div className="text-[11px] text-stone-400 uppercase font-semibold">Dietary Fiber</div>
          <div className="text-xl font-bold text-cyan-400 font-mono mt-0.5">
            {weeklyStats.avgDailyFiber}g <span className="text-xs font-normal text-stone-400">/ day</span>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5">
          <div className="text-[11px] text-stone-400 uppercase font-semibold">Seasonal Veg Diversity</div>
          <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
            {weeklyStats.uniqueVegetables.length} <span className="text-xs font-normal text-stone-400">Varieties</span>
          </div>
        </div>
      </div>

      {/* 7-Day Meal Plan Grid */}
      <div className="space-y-4">
        {weeklyPlan.map((day) => {
          return (
            <div
              key={day.dayId}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-stone-700 transition-all"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-stone-100 font-serif">
                    {day.dayName}
                  </span>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                    day.isNonVeg
                      ? 'bg-rose-950/80 text-rose-300 border-rose-800/80'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80'
                  }`}>
                    {day.isNonVeg ? '🍗 Non-Veg Day' : '🥦 Pure Vegetarian'}
                  </span>
                </div>

                <div className="text-xs text-stone-400 hidden sm:block">
                  Featured Seasonal Produce: <span className="text-amber-300 font-medium">{day.seasonalHighlights.join(', ')}</span>
                </div>
              </div>

              {/* 4 Meal Slots: Breakfast, Lunch, Snack, Dinner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Breakfast */}
                <MealSlotCard
                  slotLabel="Breakfast"
                  recipe={day.breakfast}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'breakfast')}
                />

                {/* Lunch */}
                <MealSlotCard
                  slotLabel="Lunch (Main Meal)"
                  recipe={day.lunch}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'lunch')}
                />

                {/* Snack */}
                <MealSlotCard
                  slotLabel="Evening Snack"
                  recipe={day.snack}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'snack')}
                />

                {/* Dinner */}
                <MealSlotCard
                  slotLabel="Dinner (Light & Warm)"
                  recipe={day.dinner}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'dinner')}
                />

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

interface MealSlotCardProps {
  slotLabel: string;
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  onSwap: () => void;
}

const MealSlotCard: React.FC<MealSlotCardProps> = ({
  slotLabel,
  recipe,
  onSelectRecipe,
  onSwap
}) => {
  const isNonVeg = recipe.dietType === 'Non-Vegetarian';
  const isEgg = recipe.dietType === 'Eggitarian';

  return (
    <div className="bg-stone-950/80 border border-stone-800/90 rounded-xl p-3.5 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
      <div>
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            {slotLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 bg-amber-950 text-amber-300 border border-amber-800/60 rounded text-[9px] font-semibold">
              {recipe.cuisine}
            </span>
            <span className={`w-2 h-2 rounded-full ${
              isNonVeg ? 'bg-rose-500' : isEgg ? 'bg-amber-400' : 'bg-emerald-500'
            }`} />
            <span className="text-[10px] text-stone-400">
              {recipe.prepTimeMins + recipe.cookTimeMins}m
            </span>
          </div>
        </div>

        <h4 
          onClick={() => onSelectRecipe(recipe)}
          className="text-sm font-bold text-stone-200 group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {recipe.title}
        </h4>
        <p className="text-[11px] text-amber-400/80 font-medium mt-0.5 line-clamp-1">
          {recipe.hindiTitle}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {recipe.featuredVegetables.map((veg, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] text-stone-300">
              {veg}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs">
        <div className="text-[11px] text-stone-400 font-mono">
          <span className="text-stone-300 font-semibold">{recipe.calories}</span> kcal • <span className="text-emerald-400 font-semibold">{recipe.proteinGrams}g</span> P
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSwap();
          }}
          title="Swap for another seasonal recipe"
          className="p-1 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
