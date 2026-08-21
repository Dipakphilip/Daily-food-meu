import React, { useState, useMemo, useEffect } from 'react';
import { 
  IndianState, 
  Vegetable, 
  Recipe, 
  MealPlanDay, 
  DietPlanMode, 
  HybridSettings, 
  WeatherContext, 
  AyurvedicRitu,
  IndianCuisine 
} from './types';
import { INDIAN_STATES, getRituForMonth } from './data/indianRegionsData';
import { SEASONAL_VEGETABLES } from './data/seasonalVegetablesData';
import { RECIPES_DATABASE } from './data/recipesDatabase';

// Subcomponents
import { Header } from './components/Header';
import { RegionWeatherBar } from './components/RegionWeatherBar';
import { WeeklyMealPlanner } from './components/WeeklyMealPlanner';
import { SeasonalVegetableShowcase } from './components/SeasonalVegetableShowcase';
import { RecipeModal } from './components/RecipeModal';
import { GroceryPageView } from './components/GroceryPageView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ProductBlueprintView } from './components/ProductBlueprintView';
import { aggregateWeeklyIngredients } from './utils/groceryScaler';

// Icons
import { ChevronRight, CookingPot, Filter, Search } from 'lucide-react';

const DAYS_OF_WEEK: MealPlanDay['dayName'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const CUISINES_LIST: IndianCuisine[] = [
  'All Cuisines',
  'Punjabi',
  'Bengali',
  'South Indian',
  'Gujarati',
  'Maharashtrian',
  'Rajasthani',
  'Bihari',
  'Kashmiri',
  'Goan',
  'Odia'
];

export default function App() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'planner' | 'seasonality' | 'recipes' | 'grocery' | 'blueprint'>('planner');

  // Geographic & Climatic Context
  const [selectedState, setSelectedState] = useState<IndianState>(INDIAN_STATES[0]); // Punjab by default
  const [selectedMonth, setSelectedMonth] = useState<number>(5); // May (Summer/Grishma) default for rich gourd season demo
  
  // Multi-Cuisine Selection (Multiple cuisines can be active simultaneously)
  const [selectedCuisines, setSelectedCuisines] = useState<IndianCuisine[]>(['Punjabi']);

  // People / Family Size Scaler (1 to 20 people)
  const [peopleCount, setPeopleCount] = useState<number>(4);

  // Sync state default cuisine when state is switched
  const handleSelectState = (state: IndianState) => {
    setSelectedState(state);
    if (state.traditionalCuisine) {
      setSelectedCuisines([state.traditionalCuisine]);
    }
  };

  // Cuisine multi-selection toggle
  const handleToggleCuisine = (cuisine: IndianCuisine) => {
    setSelectedCuisines(prev => {
      if (prev.includes(cuisine)) {
        // Don't allow empty selection, fallback to All Cuisines or keep at least 1
        if (prev.length === 1) return prev;
        return prev.filter(c => c !== cuisine);
      } else {
        return [...prev, cuisine];
      }
    });
  };

  const handleSelectAllCuisines = () => {
    setSelectedCuisines([
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
    ]);
  };

  const handleResetToStateCuisine = () => {
    if (selectedState.traditionalCuisine) {
      setSelectedCuisines([selectedState.traditionalCuisine]);
    }
  };

  // Real-Time / Preset Weather Context
  const [weather, setWeather] = useState<WeatherContext>({
    temperatureC: 38,
    humidity: 45,
    condition: 'Sunny & Hot',
    heatIndex: 'High Pitta Aggravation',
    ayurvedicGuidance: 'Prioritize cooling gourds (Lauki, Turai), tender coconut water, mint, and fennel. Avoid fiery chili curries.',
    hydrationRecommendation: '3.5 - 4.0 Liters (Include Chaas, Sattu drink, or Aam Panna)'
  });

  // Active Ayurvedic Season (Ritu) calculated from selected month
  const activeRitu: AyurvedicRitu = useMemo(() => {
    return getRituForMonth(selectedMonth);
  }, [selectedMonth]);

  // Dietary Preferences & Hybrid Schedule
  const [dietMode, setDietMode] = useState<DietPlanMode>('hybrid');
  const [hybridSettings, setHybridSettings] = useState<HybridSettings>({
    nonVegCount: 3,
    nonVegDays: ['Wednesday', 'Friday', 'Sunday']
  });

  // Recipe Tab Filters
  const [recipeFilterCuisine, setRecipeFilterCuisine] = useState<IndianCuisine>('All Cuisines');
  const [recipeFilterDiet, setRecipeFilterDiet] = useState<'All' | 'Vegetarian' | 'Non-Vegetarian' | 'Eggitarian'>('All');
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');

  // Modal & Drawer States
  const [activeRecipeModal, setActiveRecipeModal] = useState<Recipe | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [aiPromptOverride, setAiPromptOverride] = useState<string>('');

  // Generate a balanced weekly meal plan based on State, Month/Ritu, Multi-Cuisine and Dietary Settings
  const generateWeeklyMealPlan = (): MealPlanDay[] => {
    // Filter recipes strictly by selected cuisines if any are chosen
    const activeRecipesPool = (selectedCuisines.length === 0 || selectedCuisines.includes('All Cuisines'))
      ? RECIPES_DATABASE
      : RECIPES_DATABASE.filter(r => selectedCuisines.includes(r.cuisine));

    // Separate by meal slots
    const getSlotOptions = (mealType: Recipe['mealType']) => {
      let pool = activeRecipesPool.filter(r => r.mealType === mealType);
      if (pool.length === 0) {
        // Fallback to broader database if specific meal slot has few recipes in a small cuisine set
        pool = RECIPES_DATABASE.filter(r => r.mealType === mealType);
      }
      return pool;
    };

    const breakfastOptions = getSlotOptions('Breakfast');
    const lunchOptions = getSlotOptions('Lunch');
    const snackOptions = [...getSlotOptions('Breakfast'), ...getSlotOptions('Dinner')];
    const dinnerOptions = getSlotOptions('Dinner');

    // Identify seasonal vegetables for current month & zone
    const seasonalVegs = SEASONAL_VEGETABLES.filter(v => 
      v.peakMonths.includes(selectedMonth) && 
      (v.zones.includes(selectedState.zone) || v.zones.length >= 4)
    );
    const topSeasonalVegNames = seasonalVegs.map(v => v.englishName.split(' ')[0]);

    return DAYS_OF_WEEK.map((dayName, index) => {
      let isNonVegDay = false;
      if (dietMode === 'strictly_nonveg') {
        isNonVegDay = true;
      } else if (dietMode === 'hybrid') {
        isNonVegDay = hybridSettings.nonVegDays.includes(dayName);
      }

      // Select Breakfast
      const validBreakfasts = breakfastOptions.filter(r => 
        isNonVegDay ? true : r.dietType === 'Vegetarian'
      );
      const breakfast = validBreakfasts[index % validBreakfasts.length] || breakfastOptions[0];

      // Select Lunch (Main meal)
      const validLunches = lunchOptions.filter(r => 
        isNonVegDay ? (r.dietType === 'Non-Vegetarian' || r.dietType === 'Vegetarian') : r.dietType === 'Vegetarian'
      );
      // If it's a non-veg day, prioritize non-veg lunch or dinner
      const nonVegLunch = validLunches.find(r => r.dietType === 'Non-Vegetarian');
      const lunch = (isNonVegDay && nonVegLunch && index % 2 === 0) 
        ? nonVegLunch 
        : validLunches[(index + 1) % validLunches.length] || lunchOptions[0];

      // Select Snack / Drink
      const snack = snackOptions[(index + 2) % snackOptions.length] || breakfastOptions[0];

      // Select Dinner (Light & warm)
      const validDinners = dinnerOptions.filter(r => 
        isNonVegDay ? true : r.dietType === 'Vegetarian'
      );
      const nonVegDinner = validDinners.find(r => r.dietType === 'Non-Vegetarian' || r.dietType === 'Eggitarian');
      const dinner = (isNonVegDay && nonVegDinner && index % 2 === 1)
        ? nonVegDinner
        : validDinners[(index + 2) % validDinners.length] || dinnerOptions[0];

      return {
        dayId: `day_${index + 1}`,
        dayName,
        isNonVeg: isNonVegDay,
        breakfast,
        lunch,
        snack,
        dinner,
        seasonalHighlights: topSeasonalVegNames.slice(0, 3)
      };
    });
  };

  const [weeklyPlan, setWeeklyPlan] = useState<MealPlanDay[]>(generateWeeklyMealPlan);

  // Weekly ingredients count for Header badge
  const groceryItemsCount = useMemo(() => {
    if (!weeklyPlan || weeklyPlan.length === 0) return 0;
    return aggregateWeeklyIngredients(weeklyPlan, peopleCount).totalUniqueItems;
  }, [weeklyPlan, peopleCount]);

  // Re-generate plan when state, month, multi-cuisine, or dietary settings change
  useEffect(() => {
    setWeeklyPlan(generateWeeklyMealPlan());
  }, [selectedState, selectedMonth, selectedCuisines, dietMode, hybridSettings]);

  // Swap an individual meal slot
  const handleSwapMeal = (dayId: string, slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    setWeeklyPlan(prev => prev.map(day => {
      if (day.dayId !== dayId) return day;

      const currentRecipe = day[slot];
      const activePool = (selectedCuisines.length === 0 || selectedCuisines.includes('All Cuisines'))
        ? RECIPES_DATABASE
        : RECIPES_DATABASE.filter(r => selectedCuisines.includes(r.cuisine));

      let pool = activePool.filter(r => {
        const matchesMeal = slot === 'lunch' ? r.mealType === 'Lunch' :
                            slot === 'dinner' ? r.mealType === 'Dinner' :
                            r.mealType === 'Breakfast';
        const matchesDiet = day.isNonVeg ? true : r.dietType === 'Vegetarian';
        return matchesMeal && matchesDiet && r.id !== currentRecipe.id;
      });

      if (pool.length === 0) {
        pool = RECIPES_DATABASE.filter(r => {
          const matchesMeal = slot === 'lunch' ? r.mealType === 'Lunch' :
                              slot === 'dinner' ? r.mealType === 'Dinner' :
                              r.mealType === 'Breakfast';
          const matchesDiet = day.isNonVeg ? true : r.dietType === 'Vegetarian';
          return matchesMeal && matchesDiet && r.id !== currentRecipe.id;
        });
      }

      if (pool.length === 0) return day;
      const randomSwap = pool[Math.floor(Math.random() * pool.length)];

      return {
        ...day,
        [slot]: randomSwap
      };
    }));
  };

  const handleRegenerateAll = () => {
    setWeeklyPlan(generateWeeklyMealPlan());
  };

  // Recipe view trigger from vegetable card
  const handleSelectVegForRecipe = (veg: Vegetable) => {
    // Find recipe featuring this vegetable or show first relevant recipe
    const matching = RECIPES_DATABASE.find(r => 
      r.featuredVegetables.some(fv => fv.toLowerCase().includes(veg.englishName.toLowerCase().split(' ')[0]))
    ) || RECIPES_DATABASE[0];
    setActiveRecipeModal(matching);
  };

  // AI prompt triggers
  const handleAskAiForVeg = (veg: Vegetable) => {
    setAiPromptOverride(`What are the Ayurvedic health benefits of ${veg.englishName} (${veg.hindiName}) during ${activeRitu.key} Ritu, and how can I prepare a simple everyday dish with it in ${selectedState.name} (${selectedCuisines.join(', ')} cuisine)?`);
    setIsAiDrawerOpen(true);
  };

  const handleAskAiForRecipe = (recipe: Recipe, customGoal?: string) => {
    const goal = customGoal ? `Customize this recipe for: "${customGoal}"` : 'Explain how this recipe benefits gut digestion';
    setAiPromptOverride(`Regarding the ${recipe.cuisine} recipe "${recipe.title}" (${recipe.hindiTitle}): ${goal}. Provide simple step-by-step guidance using everyday Indian pantry ingredients.`);
    setIsAiDrawerOpen(true);
  };

  // Filtered recipes list for Recipe Tab
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATABASE.filter(recipe => {
      // Cuisine filter
      if (recipeFilterCuisine !== 'All Cuisines' && recipe.cuisine !== recipeFilterCuisine) {
        return false;
      }
      // Diet filter
      if (recipeFilterDiet !== 'All' && recipe.dietType !== recipeFilterDiet) {
        return false;
      }
      // Search filter
      if (recipeSearchQuery.trim() !== '') {
        const query = recipeSearchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query) || recipe.hindiTitle.toLowerCase().includes(query);
        const matchesCuisine = recipe.cuisine.toLowerCase().includes(query);
        const matchesVeg = recipe.featuredVegetables.some(v => v.toLowerCase().includes(query));
        const matchesIng = recipe.ingredients.some(i => i.item.toLowerCase().includes(query));
        return matchesTitle || matchesCuisine || matchesVeg || matchesIng;
      }
      return true;
    });
  }, [recipeFilterCuisine, recipeFilterDiet, recipeSearchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-stone-50 to-orange-50/40 text-stone-800 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* 1. Header Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedState={selectedState}
        activeRitu={activeRitu}
        weather={weather}
        onOpenAi={() => {
          setAiPromptOverride('');
          setIsAiDrawerOpen(true);
        }}
        groceryCount={groceryItemsCount}
      />

      {/* 2. Region, Month & Climate Context Bar */}
      <RegionWeatherBar
        selectedState={selectedState}
        onSelectState={handleSelectState}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        weather={weather}
        onUpdateWeather={setWeather}
        activeRitu={activeRitu}
      />

      {/* 3. Main Dynamic Content Views */}
      <main className="flex-1 pb-16">
        {activeTab === 'planner' && (
          <WeeklyMealPlanner
            weeklyPlan={weeklyPlan}
            dietMode={dietMode}
            onUpdateDietMode={setDietMode}
            hybridSettings={hybridSettings}
            onUpdateHybridSettings={setHybridSettings}
            selectedCuisines={selectedCuisines}
            onToggleCuisine={handleToggleCuisine}
            onSelectAllCuisines={handleSelectAllCuisines}
            onResetToStateCuisine={handleResetToStateCuisine}
            onSwapMeal={handleSwapMeal}
            onRegenerateAll={handleRegenerateAll}
            onSelectRecipe={setActiveRecipeModal}
            selectedState={selectedState}
            activeRitu={activeRitu}
            weather={weather}
            peopleCount={peopleCount}
            onUpdatePeopleCount={setPeopleCount}
            onNavigateToGrocery={() => setActiveTab('grocery')}
          />
        )}

        {activeTab === 'grocery' && (
          <GroceryPageView
            weeklyPlan={weeklyPlan}
            selectedState={selectedState}
            activeRitu={activeRitu}
            selectedCuisines={selectedCuisines}
            peopleCount={peopleCount}
            onUpdatePeopleCount={setPeopleCount}
            onNavigateToPlanner={() => setActiveTab('planner')}
            onOpenAiAdvisor={(promptText) => {
              setAiPromptOverride(promptText);
              setIsAiDrawerOpen(true);
            }}
          />
        )}

        {activeTab === 'seasonality' && (
          <SeasonalVegetableShowcase
            selectedState={selectedState}
            selectedMonth={selectedMonth}
            activeRitu={activeRitu}
            onSelectVegetableForRecipe={handleSelectVegForRecipe}
            onAskAiForVeg={handleAskAiForVeg}
          />
        )}

        {activeTab === 'recipes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 rounded-2xl p-5 sm:p-6 mb-6 shadow-md text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif flex items-center gap-2 text-white">
                    <CookingPot className="w-6 h-6 text-amber-200" />
                    Everyday Homestyle Regional Indian Recipes
                  </h2>
                  <p className="text-sm text-orange-100 mt-1 max-w-2xl">
                    Authentic recipes spanning Punjabi, Bengali, South Indian, Gujarati, Maharashtrian, Rajasthani, Bihari, Kashmiri, Goan, and Odia culinary traditions.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={recipeSearchQuery}
                    onChange={(e) => setRecipeSearchQuery(e.target.value)}
                    placeholder="Search vegetable or recipe..."
                    className="w-full pl-10 pr-4 py-2 bg-white/95 text-stone-800 placeholder-stone-400 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-inner"
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="mt-5 pt-4 border-t border-white/20 flex flex-col gap-3">
                {/* Cuisine Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-xs font-semibold text-amber-100 uppercase tracking-wide shrink-0 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Cuisine:
                  </span>
                  {CUISINES_LIST.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => setRecipeFilterCuisine(cuisine)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        recipeFilterCuisine === cuisine
                          ? 'bg-white text-orange-700 shadow-md font-bold'
                          : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>

                {/* Diet Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-orange-100 uppercase tracking-wide shrink-0">
                    Diet:
                  </span>
                  {(['All', 'Vegetarian', 'Non-Vegetarian', 'Eggitarian'] as const).map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setRecipeFilterDiet(diet)}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        recipeFilterDiet === diet
                          ? 'bg-white text-orange-700 shadow font-bold'
                          : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                  <span className="text-xs text-orange-100 ml-auto font-medium">
                    Showing {filteredRecipes.length} recipes
                  </span>
                </div>
              </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => setActiveRecipeModal(recipe)}
                  className="bg-white border border-amber-200/70 rounded-2xl p-5 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                          recipe.dietType === 'Vegetarian'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : recipe.dietType === 'Eggitarian'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {recipe.dietType}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-orange-100 text-orange-800 border border-orange-200 rounded-md">
                          {recipe.cuisine}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500 font-medium">
                        {recipe.prepTimeMins + recipe.cookTimeMins} mins
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-orange-600 font-medium mb-3">{recipe.hindiTitle}</p>

                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p className="line-clamp-2">{recipe.ayurvedicNote}</p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {recipe.featuredVegetables.map((v, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[10px] text-amber-900 font-medium">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-500">
                      <strong className="text-stone-800">{recipe.calories}</strong> kcal • <strong className="text-emerald-700">{recipe.proteinGrams}g</strong> P
                    </span>
                    <span className="text-orange-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      View Recipe <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-amber-200/80 shadow-sm">
                <p className="text-stone-500 text-sm">No recipes match your selected cuisine and dietary filters.</p>
                <button
                  onClick={() => {
                    setRecipeFilterCuisine('All Cuisines');
                    setRecipeFilterDiet('All');
                    setRecipeSearchQuery('');
                  }}
                  className="mt-3 px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blueprint' && (
          <ProductBlueprintView />
        )}
      </main>

      {/* 4. Recipe Modal */}
      <RecipeModal
        recipe={activeRecipeModal}
        onClose={() => setActiveRecipeModal(null)}
        selectedState={selectedState}
        activeRitu={activeRitu}
        onAskAiRecipe={handleAskAiForRecipe}
      />

      {/* 5. AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        selectedState={selectedState}
        selectedMonth={selectedMonth}
        activeRitu={activeRitu}
        weather={weather}
        dietMode={dietMode}
        initialPrompt={aiPromptOverride}
      />

      {/* Footer */}
      <footer className="border-t border-amber-200/60 bg-white/80 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium text-stone-600">Season diet • Indian Seasonal Health & Regional Cuisine Meal Planning</span>
          <span>Designed with Ayurvedic 6-Ritu Principles & Household Staples</span>
        </div>
      </footer>

    </div>
  );
}
