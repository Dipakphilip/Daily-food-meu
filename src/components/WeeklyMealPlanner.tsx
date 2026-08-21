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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      
      {/* Top Controls: Dietary Mode, Cuisine Selector & Action Settings */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Dietary Mode Selector */}
          <div>
            <span className="text-[11px] font-bold text-orange-900 uppercase tracking-wider block mb-1.5">
              Dietary Preference
            </span>
            <div className="inline-flex p-1 bg-stone-100/80 rounded-xl border border-stone-200 gap-1 flex-wrap">
              <button
                id="diet-strictly-veg"
                onClick={() => onUpdateDietMode('strictly_veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dietMode === 'strictly_veg'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-stone-600 hover:text-emerald-700 hover:bg-white'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Pure Vegetarian</span>
              </button>

              <button
                id="diet-strictly-nonveg"
                onClick={() => onUpdateDietMode('strictly_nonveg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dietMode === 'strictly_nonveg'
                    ? 'bg-rose-600 text-white shadow-sm font-bold'
                    : 'text-stone-600 hover:text-rose-700 hover:bg-white'
                }`}
              >
                <DrumstickIcon className="w-3.5 h-3.5" />
                <span>Non-Vegetarian</span>
              </button>

              <button
                id="diet-hybrid-plan"
                onClick={() => onUpdateDietMode('hybrid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dietMode === 'hybrid'
                    ? 'bg-amber-600 text-white shadow-sm font-bold'
                    : 'text-stone-600 hover:text-amber-700 hover:bg-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Hybrid Plan</span>
              </button>
            </div>
          </div>

          {/* Quick Action CTAs & People Scaler */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Inline People Scaler */}
            <div className="flex items-center bg-orange-50 border border-orange-200 rounded-xl px-2.5 py-1 gap-1.5">
              <span className="text-xs text-orange-900 font-semibold hidden sm:inline">Servings:</span>
              <button
                onClick={() => onUpdatePeopleCount(Math.max(1, peopleCount - 1))}
                disabled={peopleCount <= 1}
                className="w-6 h-6 rounded-md bg-white hover:bg-orange-100 disabled:opacity-30 text-orange-800 text-xs font-bold transition-colors cursor-pointer border border-orange-200 flex items-center justify-center"
                title="Decrease people count"
              >
                -
              </button>
              <span className="text-xs font-bold font-mono text-orange-950 min-w-[55px] text-center">
                {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
              </span>
              <button
                onClick={() => onUpdatePeopleCount(Math.min(15, peopleCount + 1))}
                disabled={peopleCount >= 15}
                className="w-6 h-6 rounded-md bg-white hover:bg-orange-100 disabled:opacity-30 text-orange-800 text-xs font-bold transition-colors cursor-pointer border border-orange-200 flex items-center justify-center"
                title="Increase people count"
              >
                +
              </button>
            </div>

            {onNavigateToGrocery && (
              <button
                id="plan-view-grocery-btn"
                onClick={onNavigateToGrocery}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Weekly Grocery</span>
              </button>
            )}

            <button
              id="plan-regenerate-all-btn"
              onClick={onRegenerateAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Regenerate</span>
            </button>

            <button
              id="plan-export-whatsapp-btn"
              onClick={handleExportWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer relative"
            >
              {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{copiedNotification ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              id="plan-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Multi-Cuisine Interactive Selection Interface */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-2">
                <span>Regional Cuisines</span>
                <span className="text-[10px] normal-case font-mono px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                  {selectedCuisines.length} active
                </span>
              </label>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onSelectAllCuisines}
                className={`px-2.5 py-0.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  selectedCuisines.length === CUISINES_LIST.length
                    ? 'bg-orange-600 text-white border-orange-600 font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                }`}
              >
                All Cuisines
              </button>
              {selectedState.traditionalCuisine && (
                <button
                  type="button"
                  onClick={onResetToStateCuisine}
                  className="px-2.5 py-0.5 text-xs font-medium rounded-lg bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer"
                  title={`Select only ${selectedState.traditionalCuisine} (Native)`}
                >
                  Native ({selectedState.traditionalCuisine})
                </button>
              )}
            </div>
          </div>

          {/* Cuisine Multi-Select Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CUISINES_LIST.map((cuisine) => {
              const isSelected = selectedCuisines.includes(cuisine);
              const isNative = cuisine === selectedState.traditionalCuisine;

              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => onToggleCuisine(cuisine)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-xs font-semibold'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-white text-orange-600 font-bold' : 'border border-stone-300 bg-white'
                  }`}>
                    {isSelected && '✓'}
                  </span>
                  <span>{cuisine}</span>
                  {isNative && (
                    <span className="text-[10px] font-bold opacity-80">•</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hybrid Day Selector (Visible when Hybrid Mode is active) */}
        {dietMode === 'hybrid' && (
          <div className="pt-3 border-t border-amber-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <span className="text-xs font-bold text-stone-700">
                Hybrid Day Allocation ({hybridSettings.nonVegDays.length} Non-Veg / {7 - hybridSettings.nonVegDays.length} Veg):
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
              {ALL_DAYS.map(day => {
                const isNonVegDay = hybridSettings.nonVegDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => handleToggleHybridDay(day)}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                      isNonVegDay
                        ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-xs'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    }`}
                  >
                    <span>{day.slice(0, 3)}</span>
                    <span className="text-[10px] font-mono font-bold">
                      {isNonVegDay ? '🍗 Non-Veg' : '🥦 Veg'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Weekly Nutrition Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-5">
        <div className="bg-gradient-to-br from-amber-50 to-orange-100/70 border border-amber-200 rounded-2xl p-3.5 shadow-xs">
          <div className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">Avg Daily Calories</div>
          <div className="text-xl font-bold text-amber-950 font-mono mt-0.5">
            {weeklyStats.avgDailyCalories} <span className="text-xs font-normal text-amber-700">kcal/day</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-100/70 border border-emerald-200 rounded-2xl p-3.5 shadow-xs">
          <div className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider">Avg Daily Protein</div>
          <div className="text-xl font-bold text-emerald-950 font-mono mt-0.5">
            {weeklyStats.avgDailyProtein}g <span className="text-xs font-normal text-emerald-700">/day</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-cyan-100/70 border border-sky-200 rounded-2xl p-3.5 shadow-xs">
          <div className="text-[11px] text-sky-800 font-bold uppercase tracking-wider">Dietary Fiber</div>
          <div className="text-xl font-bold text-sky-950 font-mono mt-0.5">
            {weeklyStats.avgDailyFiber}g <span className="text-xs font-normal text-sky-700">/day</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100/70 border border-purple-200 rounded-2xl p-3.5 shadow-xs">
          <div className="text-[11px] text-purple-800 font-bold uppercase tracking-wider">Seasonal Produce</div>
          <div className="text-xl font-bold text-purple-950 font-mono mt-0.5">
            {weeklyStats.uniqueVegetables.length} <span className="text-xs font-normal text-purple-700">varieties</span>
          </div>
        </div>
      </div>

      {/* 7-Day Meal Plan Grid */}
      <div className="space-y-4">
        {weeklyPlan.map((day) => {
          return (
            <div
              key={day.dayId}
              className="bg-white border border-amber-200/70 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-orange-300 transition-all"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-base sm:text-lg font-bold text-stone-800 font-serif">
                    {day.dayName}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${
                    day.isNonVeg 
                      ? 'bg-rose-100 text-rose-800 border-rose-300' 
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {day.isNonVeg ? 'Non-Vegetarian' : 'Pure Vegetarian'}
                  </span>
                </div>

                <div className="text-xs text-stone-500 hidden sm:block">
                  Featured Produce: <span className="text-orange-950 font-semibold">{day.seasonalHighlights.join(', ')}</span>
                </div>
              </div>

              {/* 4 Meal Slots: Breakfast, Lunch, Snack, Dinner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Breakfast */}
                <MealSlotCard
                  slotLabel="Breakfast"
                  slotTheme="amber"
                  recipe={day.breakfast}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'breakfast')}
                />

                {/* Lunch */}
                <MealSlotCard
                  slotLabel="Lunch"
                  slotTheme="emerald"
                  recipe={day.lunch}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'lunch')}
                />

                {/* Snack */}
                <MealSlotCard
                  slotLabel="Snack"
                  slotTheme="orange"
                  recipe={day.snack}
                  onSelectRecipe={onSelectRecipe}
                  onSwap={() => onSwapMeal(day.dayId, 'snack')}
                />

                {/* Dinner */}
                <MealSlotCard
                  slotLabel="Dinner"
                  slotTheme="indigo"
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
  slotTheme: 'amber' | 'emerald' | 'orange' | 'indigo';
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  onSwap: () => void;
}

const MealSlotCard: React.FC<MealSlotCardProps> = ({
  slotLabel,
  slotTheme,
  recipe,
  onSelectRecipe,
  onSwap
}) => {
  const isNonVeg = recipe.dietType === 'Non-Vegetarian';
  const isEgg = recipe.dietType === 'Eggitarian';

  const themeStyles = {
    amber: {
      bg: 'bg-amber-50/70 border-amber-200/90 hover:border-amber-400',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      label: 'text-amber-800'
    },
    emerald: {
      bg: 'bg-emerald-50/70 border-emerald-200/90 hover:border-emerald-400',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      label: 'text-emerald-800'
    },
    orange: {
      bg: 'bg-orange-50/70 border-orange-200/90 hover:border-orange-400',
      badge: 'bg-orange-100 text-orange-900 border-orange-300',
      label: 'text-orange-800'
    },
    indigo: {
      bg: 'bg-indigo-50/70 border-indigo-200/90 hover:border-indigo-400',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      label: 'text-indigo-800'
    }
  }[slotTheme];

  return (
    <div className={`${themeStyles.bg} border rounded-xl p-3.5 flex flex-col justify-between transition-all group shadow-xs hover:shadow-sm`}>
      <div>
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${themeStyles.label}`}>
            {slotLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold border ${themeStyles.badge}`}>
              {recipe.cuisine}
            </span>
            <span className={`w-2 h-2 rounded-full ${
              isNonVeg ? 'bg-rose-500' : isEgg ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <span className="text-[10px] text-stone-500 font-mono font-medium">
              {recipe.prepTimeMins + recipe.cookTimeMins}m
            </span>
          </div>
        </div>

        <h4 
          onClick={() => onSelectRecipe(recipe)}
          className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-orange-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {recipe.title}
        </h4>
        <p className="text-[11px] text-orange-700 font-medium mt-0.5 line-clamp-1">
          {recipe.hindiTitle}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {recipe.featuredVegetables.slice(0, 2).map((veg, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded-md bg-white/80 border border-stone-200/80 text-[10px] text-stone-700 font-medium">
              {veg}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
        <div className="text-[11px] text-stone-600 font-mono">
          <strong className="text-stone-800">{recipe.calories}</strong> kcal • <strong className="text-emerald-700">{recipe.proteinGrams}g</strong> P
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSwap();
          }}
          title="Swap recipe"
          className="p-1 rounded-md text-stone-400 hover:text-stone-800 hover:bg-white transition-colors cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
