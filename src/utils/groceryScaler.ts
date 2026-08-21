import { MealPlanDay, RecipeIngredient } from '../types';

export interface ScaledIngredient {
  id: string;
  name: string;
  category: 'produce' | 'grains_dals' | 'dairy_protein' | 'spices_oils';
  baseQuantity: string;
  scaledQuantity: string;
  isStaple: boolean;
  usedInMeals: {
    dayName: string;
    mealSlot: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
    recipeTitle: string;
    cuisine: string;
  }[];
}

export interface CategorizedScaledIngredients {
  produce: ScaledIngredient[];
  grainsDals: ScaledIngredient[];
  dairyProtein: ScaledIngredient[];
  spicesOils: ScaledIngredient[];
  totalUniqueItems: number;
}

// Categorize ingredient by name pattern
export function categorizeIngredientName(name: string): 'produce' | 'grains_dals' | 'dairy_protein' | 'spices_oils' {
  const lower = name.toLowerCase();

  // Fresh Vegetables, Greens, Roots, Gourds, Aromatics
  if (
    lower.includes('lauki') || lower.includes('turai') || lower.includes('karela') || 
    lower.includes('bhindi') || lower.includes('sarson') || lower.includes('palak') || 
    lower.includes('methi') || lower.includes('mooli') || lower.includes('gajar') || 
    lower.includes('parwal') || lower.includes('drumstick') || lower.includes('pumpkin') ||
    lower.includes('kaddu') || lower.includes('matar') || lower.includes('arbi') || 
    lower.includes('onion') || lower.includes('tomato') || lower.includes('ginger') || 
    lower.includes('coriander') || lower.includes('chili') || lower.includes('chilli') ||
    lower.includes('garlic') || lower.includes('lemon') || lower.includes('mint') ||
    lower.includes('curry leave') || lower.includes('cucumber') || lower.includes('potato') ||
    lower.includes('aloo') || lower.includes('gourd') || lower.includes('capsicum') ||
    lower.includes('shimla') || lower.includes('brinjal') || lower.includes('baingan') ||
    lower.includes('raw papaya') || lower.includes('banana') || lower.includes('bathua') ||
    lower.includes('haak') || lower.includes('radish') || lower.includes('beetroot')
  ) {
    return 'produce';
  }

  // Dals, Pulses, Grains, Flours, Rice, Semolina
  if (
    lower.includes('dal') || lower.includes('gram') || lower.includes('atta') || 
    lower.includes('rice') || lower.includes('besan') || lower.includes('flour') ||
    lower.includes('poha') || lower.includes('rava') || lower.includes('suji') ||
    lower.includes('oats') || lower.includes('quinoa') || lower.includes('millet') ||
    lower.includes('ragi') || lower.includes('jowar') || lower.includes('bajra') ||
    lower.includes('chickpea') || lower.includes('chole') || lower.includes('rajma')
  ) {
    return 'grains_dals';
  }

  // Dairy, Eggs, Seafood, Meats
  if (
    lower.includes('chicken') || lower.includes('fish') || lower.includes('mutton') || 
    lower.includes('egg') || lower.includes('paneer') || lower.includes('curd') || 
    lower.includes('dahi') || lower.includes('butter') || lower.includes('ghee') ||
    lower.includes('milk') || lower.includes('cream') || lower.includes('malai') ||
    lower.includes('prawn') || lower.includes('keema') || lower.includes('rohu')
  ) {
    return 'dairy_protein';
  }

  // Default to Spices, Condiments, Seeds, Oils
  return 'spices_oils';
}

// Clean and normalize ingredient item name for aggregation
export function normalizeIngredientName(name: string): string {
  // Extract primary name before comma (e.g. "Lauki (Bottle Gourd), peeled and cubed" -> "Lauki (Bottle Gourd)")
  let clean = name.split(',')[0].trim();
  // Remove parenthetical details if too specific, or keep short vernacular
  clean = clean.replace(/\s+/g, ' ');
  return clean;
}

// Parse unit and numeric value from quantity string
interface ParsedQty {
  val: number;
  unit: 'g' | 'kg' | 'cup' | 'tbsp' | 'tsp' | 'piece' | 'inch' | 'pinch' | 'custom';
  rawUnit: string;
}

function parseQuantity(qtyStr: string): ParsedQty {
  const str = qtyStr.trim().toLowerCase();

  // Fraction conversions
  let numStr = str;
  let fractionVal = 0;

  if (str.includes('1/2') || str.includes('½')) {
    fractionVal = 0.5;
    numStr = str.replace('1/2', '').replace('½', '').trim();
  } else if (str.includes('1/4') || str.includes('¼')) {
    fractionVal = 0.25;
    numStr = str.replace('1/4', '').replace('¼', '').trim();
  } else if (str.includes('3/4') || str.includes('¾')) {
    fractionVal = 0.75;
    numStr = str.replace('3/4', '').replace('¾', '').trim();
  } else if (str.includes('1/3')) {
    fractionVal = 0.33;
    numStr = str.replace('1/3', '').trim();
  }

  const matchNum = numStr.match(/(\d+(\.\d+)?)/);
  let baseVal = matchNum ? parseFloat(matchNum[1]) : 0;
  let totalVal = baseVal + fractionVal;
  if (totalVal === 0) totalVal = 1; // Default fallback count

  if (str.includes('kg')) {
    return { val: totalVal, unit: 'kg', rawUnit: 'kg' };
  }
  if (str.includes('gm') || str.includes('gram') || str.includes('g')) {
    return { val: totalVal, unit: 'g', rawUnit: 'g' };
  }
  if (str.includes('cup')) {
    return { val: totalVal, unit: 'cup', rawUnit: totalVal > 1 ? 'cups' : 'cup' };
  }
  if (str.includes('tbsp') || str.includes('tablespoon')) {
    return { val: totalVal, unit: 'tbsp', rawUnit: 'tbsp' };
  }
  if (str.includes('tsp') || str.includes('teaspoon')) {
    return { val: totalVal, unit: 'tsp', rawUnit: 'tsp' };
  }
  if (str.includes('inch')) {
    return { val: totalVal, unit: 'inch', rawUnit: 'inch' };
  }
  if (str.includes('pinch')) {
    return { val: totalVal, unit: 'pinch', rawUnit: 'pinch' };
  }

  return { val: totalVal, unit: 'piece', rawUnit: totalVal > 1 ? 'pcs' : 'pc' };
}

// Format scaled quantities nicely
function formatScaledValue(totalVal: number, unit: ParsedQty['unit']): string {
  if (unit === 'g') {
    if (totalVal >= 1000) {
      const inKg = (totalVal / 1000).toFixed(1).replace(/\.0$/, '');
      return `${inKg} kg`;
    }
    return `${Math.round(totalVal)}g`;
  }

  if (unit === 'kg') {
    const formatted = totalVal.toFixed(1).replace(/\.0$/, '');
    return `${formatted} kg`;
  }

  if (unit === 'cup') {
    if (totalVal < 1) {
      if (Math.abs(totalVal - 0.5) < 0.1) return '1/2 cup';
      if (Math.abs(totalVal - 0.25) < 0.1) return '1/4 cup';
      if (Math.abs(totalVal - 0.75) < 0.1) return '3/4 cup';
    }
    const formatted = totalVal.toFixed(1).replace(/\.0$/, '');
    return `${formatted} ${totalVal > 1 ? 'cups' : 'cup'}`;
  }

  if (unit === 'tbsp') {
    if (totalVal >= 16) {
      const inCups = (totalVal / 16).toFixed(1).replace(/\.0$/, '');
      return `${inCups} cups (${Math.round(totalVal)} tbsp)`;
    }
    const formatted = totalVal.toFixed(1).replace(/\.0$/, '');
    return `${formatted} tbsp`;
  }

  if (unit === 'tsp') {
    if (totalVal >= 3 && totalVal % 3 === 0) {
      return `${totalVal / 3} tbsp (${totalVal} tsp)`;
    }
    const formatted = totalVal.toFixed(1).replace(/\.0$/, '');
    return `${formatted} tsp`;
  }

  if (unit === 'inch') {
    const formatted = totalVal.toFixed(1).replace(/\.0$/, '');
    return `${formatted} inch piece`;
  }

  if (unit === 'pinch') {
    return totalVal > 1 ? `${Math.round(totalVal)} pinches` : '1 pinch (to taste)';
  }

  // Pieces / items count
  const count = Math.ceil(totalVal);
  return `${count} ${count > 1 ? 'pcs' : 'pc'}`;
}

export function aggregateWeeklyIngredients(
  weeklyPlan: MealPlanDay[], 
  peopleCount: number = 2
): CategorizedScaledIngredients {
  // Standard base recipes are designed for 2 adults
  const scaleMultiplier = peopleCount / 2;

  // Intermediate aggregation map
  interface Accumulator {
    name: string;
    category: 'produce' | 'grains_dals' | 'dairy_protein' | 'spices_oils';
    isStaple: boolean;
    baseQtyTotal: number;
    unit: ParsedQty['unit'];
    baseSampleText: string;
    usedInMeals: {
      dayName: string;
      mealSlot: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
      recipeTitle: string;
      cuisine: string;
    }[];
  }

  const itemsMap = new Map<string, Accumulator>();

  weeklyPlan.forEach(day => {
    const slots: { slot: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'; recipe: typeof day.breakfast }[] = [
      { slot: 'Breakfast', recipe: day.breakfast },
      { slot: 'Lunch', recipe: day.lunch },
      { slot: 'Snack', recipe: day.snack },
      { slot: 'Dinner', recipe: day.dinner }
    ];

    slots.forEach(({ slot, recipe }) => {
      if (!recipe || !recipe.ingredients) return;

      recipe.ingredients.forEach((ing: RecipeIngredient) => {
        const normName = normalizeIngredientName(ing.item);
        const parsed = parseQuantity(ing.quantity);
        const category = categorizeIngredientName(ing.item);

        const mapKey = `${category}_${normName.toLowerCase()}_${parsed.unit}`;

        if (!itemsMap.has(mapKey)) {
          itemsMap.set(mapKey, {
            name: normName,
            category,
            isStaple: ing.isStaple,
            baseQtyTotal: parsed.val,
            unit: parsed.unit,
            baseSampleText: ing.quantity,
            usedInMeals: [{
              dayName: day.dayName,
              mealSlot: slot,
              recipeTitle: recipe.title,
              cuisine: recipe.cuisine
            }]
          });
        } else {
          const existing = itemsMap.get(mapKey)!;
          existing.baseQtyTotal += parsed.val;
          // Add meal usage if not already included
          const alreadyLogged = existing.usedInMeals.some(
            m => m.dayName === day.dayName && m.mealSlot === slot
          );
          if (!alreadyLogged) {
            existing.usedInMeals.push({
              dayName: day.dayName,
              mealSlot: slot,
              recipeTitle: recipe.title,
              cuisine: recipe.cuisine
            });
          }
        }
      });
    });
  });

  const produce: ScaledIngredient[] = [];
  const grainsDals: ScaledIngredient[] = [];
  const dairyProtein: ScaledIngredient[] = [];
  const spicesOils: ScaledIngredient[] = [];

  let idCounter = 1;

  itemsMap.forEach((acc) => {
    const scaledVal = acc.baseQtyTotal * scaleMultiplier;
    const formattedScaledQty = formatScaledValue(scaledVal, acc.unit);
    const formattedBaseQty = formatScaledValue(acc.baseQtyTotal, acc.unit);

    const item: ScaledIngredient = {
      id: `ing_${idCounter++}`,
      name: acc.name,
      category: acc.category,
      baseQuantity: formattedBaseQty,
      scaledQuantity: formattedScaledQty,
      isStaple: acc.isStaple,
      usedInMeals: acc.usedInMeals
    };

    if (acc.category === 'produce') {
      produce.push(item);
    } else if (acc.category === 'grains_dals') {
      grainsDals.push(item);
    } else if (acc.category === 'dairy_protein') {
      dairyProtein.push(item);
    } else {
      spicesOils.push(item);
    }
  });

  // Sort alphabetically within categories
  produce.sort((a, b) => a.name.localeCompare(b.name));
  grainsDals.sort((a, b) => a.name.localeCompare(b.name));
  dairyProtein.sort((a, b) => a.name.localeCompare(b.name));
  spicesOils.sort((a, b) => a.name.localeCompare(b.name));

  return {
    produce,
    grainsDals,
    dairyProtein,
    spicesOils,
    totalUniqueItems: produce.length + grainsDals.length + dairyProtein.length + spicesOils.length
  };
}
