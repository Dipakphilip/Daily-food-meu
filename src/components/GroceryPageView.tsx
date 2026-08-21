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
      <div className="bg-gradient-to-br from-emerald-50 via-amber-50/50 to-orange-50 border border-emerald-200 rounded-2xl p-5 mb-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
              <span>7-Day Grocery Checklist</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-800 font-serif">
              Weekly Ingredients & Market List
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Ingredient quantities for 28 weekly meals for <span className="text-orange-950 font-bold">{selectedState.name}</span> during <span className="text-emerald-950 font-bold">{activeRitu.key} Ritu</span>.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onNavigateToPlanner}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 transition-colors cursor-pointer"
            >
              <CalendarDays className="w-3.5 h-3.5 text-orange-600" />
              <span>Meal Plan</span>
            </button>
          </div>
        </div>

        {/* 2. Scaler: Number of People / Family Members Control */}
        <div className="mt-4 pt-4 border-t border-emerald-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/80 p-3.5 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-700 font-bold">Household Scale:</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200 font-mono font-bold text-[11px]">
                  {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}
                </span>
                <span className="text-stone-500 text-[11px]">
                  (×{(peopleCount / 2).toFixed(1)} ratio)
                </span>
              </div>
            </div>
          </div>

          {/* Stepper and Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg p-0.5">
              <button
                onClick={() => handleUpdatePeople(-1)}
                disabled={peopleCount <= 1}
                title="Decrease people"
                className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors cursor-pointer text-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="w-8 text-center font-mono font-bold text-xs text-stone-800">
                {peopleCount}
              </span>

              <button
                onClick={() => handleUpdatePeople(1)}
                disabled={peopleCount >= 20}
                title="Increase people"
                className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-200 disabled:opacity-30 transition-colors cursor-pointer text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="hidden sm:flex items-center gap-1">
              {PEOPLE_PRESETS.map(preset => (
                <button
                  key={preset.count}
                  onClick={() => onUpdatePeopleCount(preset.count)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                    peopleCount === preset.count
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {preset.count}p
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Progress Bar & Checklist Quick Actions */}
        <div className="mt-3 pt-3 border-t border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="flex-1 bg-stone-200 rounded-full h-2 overflow-hidden border border-stone-300">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-stone-600 font-bold text-[11px] shrink-0">
              {checkedItemsCount}/{totalItemsCount} ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPantryStaples}
              className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <CheckSquare className="w-3 h-3 text-emerald-600" />
              <span>Mark Staples Stocked</span>
            </button>

            <button
              onClick={handleResetChecklist}
              className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <RotateCcw className="w-3 h-3 text-stone-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Search and Filter Bar */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-4 mb-5 space-y-3 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredients..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {(['all', 'pending', 'checked'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                  statusFilter === status
                    ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {status === 'all' ? 'All Items' : status === 'pending' ? 'Need to Buy' : 'In Stock'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-stone-100 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategoryTab('all')}
            className={`px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategoryTab === 'all'
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            All ({totalItemsCount})
          </button>

          <button
            onClick={() => setSelectedCategoryTab('produce')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategoryTab === 'produce'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-emerald-50/60 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Sprout className="w-3 h-3 text-emerald-600" />
            <span>Produce ({categorizedData.produce.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategoryTab('grains_dals')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategoryTab === 'grains_dals'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-amber-50/60 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Layers className="w-3 h-3 text-amber-600" />
            <span>Grains & Dals ({categorizedData.grainsDals.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategoryTab('dairy_protein')}
            className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategoryTab === 'dairy_protein'
                ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                : 'bg-sky-50/60 text-sky-800 border-sky-200 hover:bg-sky-100'
            }`}
          >
            <Egg className="w-3 h-3 text-sky-600" />
            <span>Dairy & Proteins ({categorizedData.dairyProtein.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategoryTab('spices_oils')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategoryTab === 'spices_oils'
                ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                : 'bg-orange-50/60 text-orange-800 border-orange-200 hover:bg-orange-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-600" />
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
            icon={<Sprout className="w-5 h-5 text-emerald-600" />}
            badgeColor="bg-emerald-100 text-emerald-800 border-emerald-200"
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
            icon={<Layers className="w-5 h-5 text-amber-600" />}
            badgeColor="bg-amber-100 text-amber-800 border-amber-200"
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
            icon={<Egg className="w-5 h-5 text-sky-600" />}
            badgeColor="bg-sky-100 text-sky-800 border-sky-200"
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
            icon={<Flame className="w-5 h-5 text-orange-600" />}
            badgeColor="bg-orange-100 text-orange-800 border-orange-200"
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
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center shadow-sm">
            <ShoppingCart className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No ingredients match your filter</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or reset status filters to view the full 7-day grocery list.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSelectedCategoryTab('all');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* 6. Footer Ayurvedic Pantry Guidance Note */}
      <div className="mt-10 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-800">
              Seasonal Buying & Storage Tip for {activeRitu.key} Ritu
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              In {selectedState.name}, prioritize purchasing fresh leafy greens twice a week rather than bulk storing to preserve vital Prana and micronutrients.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAiAdvisor(`Give me expert Ayurvedic kitchen tips on how to inspect, wash, and safely prep seasonal ingredients for a family of ${peopleCount} during ${activeRitu.key} season in ${selectedState.name}.`)}
          className="px-3.5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
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
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
            {icon}
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-800 font-serif flex items-center gap-2">
              {title}
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                {items.length} items
              </span>
            </h2>
            <p className="text-xs text-stone-500">{subtitle}</p>
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
                  ? 'bg-stone-50/70 border-stone-200 opacity-60'
                  : 'bg-stone-50/40 border-stone-200 hover:border-orange-300 hover:bg-orange-50/20 shadow-2xs'
              }`}
            >
              <div>
                {/* Top Row: Checkbox, Name, and Scaled Quantity */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 group-hover:border-orange-400 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isChecked ? 'line-through text-stone-400' : 'text-stone-800 group-hover:text-orange-700'
                      }`}>
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                          item.isStaple
                            ? 'bg-stone-100 text-stone-600 border border-stone-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {item.isStaple ? 'Pantry Staple' : 'Fresh Buy'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scaled Quantity Highlight Badge */}
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-orange-100 text-orange-900 border border-orange-200 text-xs sm:text-sm font-mono font-bold shadow-2xs">
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
                className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(item.id);
                }}
              >
                <span className="hover:text-stone-800 transition-colors flex items-center gap-1">
                  Used in {item.usedInMeals.length} meal{item.usedInMeals.length > 1 ? 's' : ''}
                  {isExpanded ? <ChevronUp className="w-3 h-3 text-orange-600" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
                </span>

                {onAskAiForProduce && !item.isStaple && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAiForProduce(item);
                    }}
                    title="Ask AI how to select this vegetable at the mandi"
                    className="text-[10px] text-orange-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> Select Tips
                  </button>
                )}
              </div>

              {/* Expanded Meals Sublist */}
              {isExpanded && (
                <div 
                  className="mt-2 p-2.5 bg-white rounded-lg border border-stone-200 text-[11px] space-y-1 shadow-2xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="font-bold text-stone-700 text-[10px] uppercase tracking-wider mb-1">
                    Scheduled In This Week's Menu:
                  </div>
                  {item.usedInMeals.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-stone-600">
                      <span>• {m.dayName} {m.mealSlot}:</span>
                      <span className="text-stone-800 font-semibold text-right truncate max-w-[140px]">{m.recipeTitle}</span>
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
