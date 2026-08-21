import React, { useState, useMemo } from 'react';
import { MealPlanDay, IndianState, AyurvedicRitu, IndianCuisine } from '../types';
import { 
  aggregateWeeklyIngredients, 
  ScaledIngredient 
} from '../utils/groceryScaler';
import { 
  ShoppingCart, 
  Users, 
  Plus, 
  Minus, 
  Search, 
  Check, 
  Share2, 
  Printer, 
  Sprout, 
  Layers, 
  Egg, 
  Flame, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Filter,
  CheckSquare
} from 'lucide-react';

interface GroceryPageViewProps {
  weeklyPlan: MealPlanDay[];
  selectedState: IndianState;
  activeRitu: AyurvedicRitu;
  selectedCuisines: IndianCuisine[];
  peopleCount: number;
  onUpdatePeopleCount: (count: number) => void;
  onNavigateToPlanner: () => void;
  onOpenAiAdvisor: (promptText: string) => void;
}

export const GroceryPageView: React.FC<GroceryPageViewProps> = ({
  weeklyPlan,
  selectedState,
  activeRitu,
  selectedCuisines,
  peopleCount,
  onUpdatePeopleCount,
  onNavigateToPlanner,
  onOpenAiAdvisor
}) => {
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'produce' | 'grains_dals' | 'dairy_protein' | 'spices_oils'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'checked'>('all');

  // Interactive Checklist State (stored by item ID)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Expanded meal usage accordion state
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculate aggregated ingredients scaled for peopleCount
  const categorizedData = useMemo(() => {
    return aggregateWeeklyIngredients(weeklyPlan, peopleCount);
  }, [weeklyPlan, peopleCount]);

  // People presets
  const PEOPLE_PRESETS = [
    { count: 1, label: '1 Person (Solo)' },
    { count: 2, label: '2 People (Couple)' },
    { count: 4, label: '4 People (Family of 4)' },
    { count: 6, label: '6 People (Large Family)' },
    { count: 8, label: '8 People (Joint Family)' }
  ];

  const handleUpdatePeople = (delta: number) => {
    onUpdatePeopleCount(Math.min(20, Math.max(1, peopleCount + delta)));
  };

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleMarkAllPantryStaples = () => {
    const updated: Record<string, boolean> = { ...checkedItems };
    [
      ...categorizedData.grainsDals,
      ...categorizedData.dairyProtein,
      ...categorizedData.spicesOils,
      ...categorizedData.produce
    ].forEach(item => {
      if (item.isStaple) {
        updated[item.id] = true;
      }
    });
    setCheckedItems(updated);
    showToast('Marked all pantry staples as already in stock');
  };

  const handleResetChecklist = () => {
    setCheckedItems({});
    showToast('Checklist reset');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // WhatsApp formatted export with exact scaled quantities
  const handleExportWhatsApp = () => {
    let text = `🛒 *Season diet Weekly Mandi & Grocery Checklist*\n`;
    text += `📍 *Region*: ${selectedState.name} (${selectedCuisines.join(', ')}) | 🌿 *Season*: ${activeRitu.key} Ritu\n`;
    text += `👥 *Family Size*: Scaled for *${peopleCount} People* across 28 planned weekly meals\n\n`;

    if (categorizedData.produce.length > 0) {
      text += `🥬 *Fresh Seasonal Vegetables & Produce (${categorizedData.produce.length})*:\n`;
      categorizedData.produce.forEach(p => {
        const isDone = !!checkedItems[p.id];
        text += `${isDone ? '✅' : '▫️'} ${p.name}: *${p.scaledQuantity}*\n`;
      });
      text += `\n`;
    }

    if (categorizedData.grainsDals.length > 0) {
      text += `🌾 *Grains, Flours & Lentils (${categorizedData.grainsDals.length})*:\n`;
      categorizedData.grainsDals.forEach(g => {
        const isDone = !!checkedItems[g.id];
        text += `${isDone ? '✅' : '▫️'} ${g.name}: *${g.scaledQuantity}*\n`;
      });
      text += `\n`;
    }

    if (categorizedData.dairyProtein.length > 0) {
      text += `🥛 *Dairy, Eggs & Fresh Proteins (${categorizedData.dairyProtein.length})*:\n`;
      categorizedData.dairyProtein.forEach(d => {
        const isDone = !!checkedItems[d.id];
        text += `${isDone ? '✅' : '▫️'} ${d.name}: *${d.scaledQuantity}*\n`;
      });
      text += `\n`;
    }

    if (categorizedData.spicesOils.length > 0) {
      text += `🧂 *Pantry Spices, Oils & Aromatics (${categorizedData.spicesOils.length})*:\n`;
      categorizedData.spicesOils.forEach(s => {
        const isDone = !!checkedItems[s.id];
        text += `${isDone ? '✅' : '▫️'} ${s.name}: *${s.scaledQuantity}*\n`;
      });
      text += `\n`;
    }

    text += `_Generated via Season diet - Indian Seasonal Health & Meal Planning Architecture_`;

    navigator.clipboard.writeText(text);
    showToast('Grocery list with scaled quantities copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter helper
  const filterList = (items: ScaledIngredient[]) => {
    return items.filter(item => {
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesMeals = item.usedInMeals.some(m => m.recipeTitle.toLowerCase().includes(q));
        if (!matchesName && !matchesMeals) return false;
      }

      // Status
      const isChecked = !!checkedItems[item.id];
      if (statusFilter === 'pending' && isChecked) return false;
      if (statusFilter === 'checked' && !isChecked) return false;

      return true;
    });
  };

  const filteredProduce = filterList(categorizedData.produce);
  const filteredGrains = filterList(categorizedData.grainsDals);
  const filteredDairy = filterList(categorizedData.dairyProtein);
  const filteredSpices = filterList(categorizedData.spicesOils);

  const totalVisibleItems = filteredProduce.length + filteredGrains.length + filteredDairy.length + filteredSpices.length;
  
  // Total checked count across all items
  const allItemsList = [
    ...categorizedData.produce,
    ...categorizedData.grainsDals,
    ...categorizedData.dairyProtein,
    ...categorizedData.spicesOils
  ];
  const totalItemsCount = allItemsList.length;
  const checkedItemsCount = allItemsList.filter(item => !!checkedItems[item.id]).length;
  const progressPercent = totalItemsCount > 0 ? Math.round((checkedItemsCount / totalItemsCount) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-stone-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Comprehensive 7-Day Grocery & Mandi Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-100 font-serif">
              Weekly Ingredients & Market Checklist
            </h1>
            <p className="text-sm text-stone-400 mt-1 max-w-3xl leading-relaxed">
              Every single ingredient required to cook all 28 weekly meals (Breakfast, Lunch, Evening Snack & Dinner) tailored for <strong className="text-stone-200">{selectedState.name}</strong> ({selectedCuisines.join(', ')}) during <strong className="text-emerald-400">{activeRitu.key} Ritu</strong>.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Mandi Sheet</span>
            </button>

            <button
              onClick={onNavigateToPlanner}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all cursor-pointer"
            >
              <CalendarDays className="w-4 h-4 text-amber-400" />
              <span>View Meal Plan</span>
            </button>
          </div>
        </div>

        {/* 2. Scaler: Number of People / Family Members Control */}
        <div className="mt-6 pt-5 border-t border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-stone-200">Scale for Family Size:</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono font-bold">
                  {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
                </span>
                <span className="text-xs text-stone-500">
                  (×{(peopleCount / 2).toFixed(1)} base recipe ratio)
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Quantities across all 7 days automatically scale mathematically for your household.
              </p>
            </div>
          </div>

          {/* Stepper and Presets */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Interactive Stepper */}
            <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xl p-1">
              <button
                onClick={() => handleUpdatePeople(-1)}
                disabled={peopleCount <= 1}
                title="Decrease people"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:bg-stone-800 disabled:opacity-30 transition-all cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-12 text-center font-mono font-bold text-sm text-stone-100">
                {peopleCount}
              </span>

              <button
                onClick={() => handleUpdatePeople(1)}
                disabled={peopleCount >= 20}
                title="Increase people"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:bg-stone-800 disabled:opacity-30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="hidden sm:flex items-center gap-1">
              {PEOPLE_PRESETS.map(preset => (
                <button
                  key={preset.count}
                  onClick={() => onUpdatePeopleCount(preset.count)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                    peopleCount === preset.count
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow'
                      : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {preset.count}p
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Progress Bar & Checklist Quick Actions */}
        <div className="mt-4 pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="flex-1 bg-stone-950 rounded-full h-2.5 overflow-hidden border border-stone-800">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-stone-300 font-semibold shrink-0">
              {checkedItemsCount} / {totalItemsCount} ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPantryStaples}
              className="px-3 py-1 bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mark Staples in Stock</span>
            </button>

            <button
              onClick={handleResetChecklist}
              className="px-3 py-1 bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Search and Filter Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 mb-6 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredient (e.g. Lauki, Atta, Ghee, Mustard oil)..."
              className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 self-start md:self-auto">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {(['all', 'pending', 'checked'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  statusFilter === status
                    ? 'bg-amber-500 text-stone-950 border-amber-400'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {status === 'all' ? 'All Items' : status === 'pending' ? 'Need to Buy' : 'In Stock'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-stone-800/80 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategoryTab === 'all'
                ? 'bg-stone-100 text-stone-950 border-white'
                : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            All Categories ({totalItemsCount})
          </button>

          <button
            onClick={() => setSelectedCategoryTab('produce')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategoryTab === 'produce'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                : 'bg-stone-950 text-emerald-400 border-stone-800 hover:bg-stone-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Fresh Produce ({categorizedData.produce.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategoryTab('grains_dals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategoryTab === 'grains_dals'
                ? 'bg-amber-600 text-white border-amber-500 shadow'
                : 'bg-stone-950 text-amber-400 border-stone-800 hover:bg-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Grains & Dals ({categorizedData.grainsDals.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategoryTab('dairy_protein')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategoryTab === 'dairy_protein'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow'
                : 'bg-stone-950 text-cyan-400 border-stone-800 hover:bg-stone-900'
            }`}
          >
            <Egg className="w-3.5 h-3.5" />
            <span>Dairy & Proteins ({categorizedData.dairyProtein.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategoryTab('spices_oils')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategoryTab === 'spices_oils'
                ? 'bg-orange-600 text-white border-orange-500 shadow'
                : 'bg-stone-950 text-orange-400 border-stone-800 hover:bg-stone-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Spices & Oils ({categorizedData.spicesOils.length})</span>
          </button>
        </div>
      </div>

      {/* 5. Main Categorized Ingredient Grids */}
      <div className="space-y-8">
        
        {/* Section 1: Fresh Seasonal Produce & Herbs */}
        {(selectedCategoryTab === 'all' || selectedCategoryTab === 'produce') && filteredProduce.length > 0 && (
          <IngredientCategorySection
            title="Fresh Seasonal Vegetables, Greens & Herbs"
            subtitle="Local mandi produce at seasonal nutritional peak"
            icon={<Sprout className="w-5 h-5 text-emerald-400" />}
            badgeColor="bg-emerald-950 text-emerald-300 border-emerald-800"
            items={filteredProduce}
            checkedItems={checkedItems}
            onToggleCheck={toggleCheck}
            expandedItemId={expandedItemId}
            onToggleExpand={(id) => setExpandedItemId(prev => prev === id ? null : id)}
            peopleCount={peopleCount}
            onAskAiForProduce={(item) => {
              onOpenAiAdvisor(`How should I properly select and store fresh ${item.name} from the mandi for a family of ${peopleCount} during ${activeRitu.key} Ritu?`);
            }}
          />
        )}

        {/* Section 2: Dals, Pulses & Grains */}
        {(selectedCategoryTab === 'all' || selectedCategoryTab === 'grains_dals') && filteredGrains.length > 0 && (
          <IngredientCategorySection
            title="Dals, Pulses, Grains & Flours"
            subtitle="Primary sources of slow-carb energy, dietary fiber & plant protein"
            icon={<Layers className="w-5 h-5 text-amber-400" />}
            badgeColor="bg-amber-950 text-amber-300 border-amber-800"
            items={filteredGrains}
            checkedItems={checkedItems}
            onToggleCheck={toggleCheck}
            expandedItemId={expandedItemId}
            onToggleExpand={(id) => setExpandedItemId(prev => prev === id ? null : id)}
            peopleCount={peopleCount}
          />
        )}

        {/* Section 3: Dairy, Eggs & Fresh Proteins */}
        {(selectedCategoryTab === 'all' || selectedCategoryTab === 'dairy_protein') && filteredDairy.length > 0 && (
          <IngredientCategorySection
            title="Dairy, Eggs & Fresh Proteins"
            subtitle="Fresh daily essentials and protein foundations"
            icon={<Egg className="w-5 h-5 text-cyan-400" />}
            badgeColor="bg-cyan-950 text-cyan-300 border-cyan-800"
            items={filteredDairy}
            checkedItems={checkedItems}
            onToggleCheck={toggleCheck}
            expandedItemId={expandedItemId}
            onToggleExpand={(id) => setExpandedItemId(prev => prev === id ? null : id)}
            peopleCount={peopleCount}
          />
        )}

        {/* Section 4: Pantry Spices, Oils & Aromatics */}
        {(selectedCategoryTab === 'all' || selectedCategoryTab === 'spices_oils') && filteredSpices.length > 0 && (
          <IngredientCategorySection
            title="Pantry Spices, Cold-Pressed Oils & Seasonings"
            subtitle="Ayurvedic Agni igniters, digestive herbs, and traditional cooking fats"
            icon={<Flame className="w-5 h-5 text-orange-400" />}
            badgeColor="bg-orange-950 text-orange-300 border-orange-800"
            items={filteredSpices}
            checkedItems={checkedItems}
            onToggleCheck={toggleCheck}
            expandedItemId={expandedItemId}
            onToggleExpand={(id) => setExpandedItemId(prev => prev === id ? null : id)}
            peopleCount={peopleCount}
          />
        )}

        {/* Empty State */}
        {totalVisibleItems === 0 && (
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-12 text-center">
            <ShoppingCart className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-200">No ingredients match your filter</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or reset status filters to view the full 7-day grocery list.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSelectedCategoryTab('all');
              }}
              className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* 6. Footer Ayurvedic Pantry Guidance Note */}
      <div className="mt-10 p-5 bg-gradient-to-r from-stone-900 to-amber-950/40 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-100">
              Seasonal Buying & Storage Tip for {activeRitu.key} Ritu
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">
              In {selectedState.name}, prioritize purchasing fresh leafy greens twice a week rather than bulk storing to preserve vital Prana and micronutrients.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAiAdvisor(`Give me expert Ayurvedic kitchen tips on how to inspect, wash, and safely prep seasonal ingredients for a family of ${peopleCount} during ${activeRitu.key} season in ${selectedState.name}.`)}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Ask AI Storage Advice
        </button>
      </div>

    </div>
  );
};

// Subcomponent: Ingredient Category Section
interface IngredientCategorySectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badgeColor: string;
  items: ScaledIngredient[];
  checkedItems: Record<string, boolean>;
  onToggleCheck: (id: string) => void;
  expandedItemId: string | null;
  onToggleExpand: (id: string) => void;
  peopleCount: number;
  onAskAiForProduce?: (item: ScaledIngredient) => void;
}

const IngredientCategorySection: React.FC<IngredientCategorySectionProps> = ({
  title,
  subtitle,
  icon,
  badgeColor,
  items,
  checkedItems,
  onToggleCheck,
  expandedItemId,
  onToggleExpand,
  peopleCount,
  onAskAiForProduce
}) => {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
            {icon}
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-100 font-serif flex items-center gap-2">
              {title}
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${badgeColor}`}>
                {items.length} items
              </span>
            </h2>
            <p className="text-xs text-stone-400">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => {
          const isChecked = !!checkedItems[item.id];
          const isExpanded = expandedItemId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onToggleCheck(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isChecked
                  ? 'bg-stone-950/40 border-stone-800/60 opacity-60'
                  : 'bg-stone-950 border-stone-800 hover:border-amber-500/50 hover:bg-stone-950/90 shadow-sm'
              }`}
            >
              <div>
                {/* Top Row: Checkbox, Name, and Scaled Quantity */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-400 text-stone-950'
                        : 'border-stone-700 group-hover:border-amber-500 bg-stone-900'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isChecked ? 'line-through text-stone-400' : 'text-stone-200 group-hover:text-amber-400'
                      }`}>
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          item.isStaple
                            ? 'bg-stone-900 text-stone-400 border border-stone-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                        }`}>
                          {item.isStaple ? 'Pantry Staple' : 'Fresh Buy'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scaled Quantity Highlight Badge */}
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-mono font-bold shadow-inner">
                      {item.scaledQuantity}
                    </span>
                    <div className="text-[10px] text-stone-500 mt-0.5 font-mono">
                      for {peopleCount} {peopleCount === 1 ? 'person' : 'people'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Used in Meals Accordion */}
              <div 
                className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(item.id);
                }}
              >
                <span className="hover:text-stone-200 transition-colors flex items-center gap-1">
                  Used in {item.usedInMeals.length} meal{item.usedInMeals.length > 1 ? 's' : ''}
                  {isExpanded ? <ChevronUp className="w-3 h-3 text-amber-400" /> : <ChevronDown className="w-3 h-3 text-stone-500" />}
                </span>

                {onAskAiForProduce && !item.isStaple && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAiForProduce(item);
                    }}
                    title="Ask AI how to select this vegetable at the mandi"
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> Select Tips
                  </button>
                )}
              </div>

              {/* Expanded Meals Sublist */}
              {isExpanded && (
                <div 
                  className="mt-2 p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-[11px] space-y-1 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="font-semibold text-stone-300 text-[10px] uppercase tracking-wider mb-1">
                    Scheduled In This Week's Menu:
                  </div>
                  {item.usedInMeals.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-stone-400">
                      <span>• {m.dayName} {m.mealSlot}:</span>
                      <span className="text-stone-300 font-medium text-right truncate max-w-[140px]">{m.recipeTitle}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
