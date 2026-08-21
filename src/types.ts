export type RegionZone = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export type IndianCuisine = 
  | 'All Cuisines'
  | 'Punjabi' 
  | 'Bengali' 
  | 'South Indian' 
  | 'Gujarati' 
  | 'Maharashtrian' 
  | 'Rajasthani' 
  | 'Bihari' 
  | 'Kashmiri' 
  | 'Awadhi' 
  | 'Goan' 
  | 'Odia';

export interface IndianState {
  id: string;
  name: string;
  zone: RegionZone;
  primaryClimate: string;
  capital: string;
  stapleGrain: string;
  stapleFat: string;
  regionalLanguages: string[];
  climateCharacteristics: string;
  traditionalCuisine?: IndianCuisine;
}

export type AyurvedicRituKey = 'Shishira' | 'Vasanta' | 'Grishma' | 'Varsha' | 'Sharad' | 'Hemanta';

export interface AyurvedicRitu {
  key: AyurvedicRituKey;
  sanskritName: string;
  englishSeason: string;
  months: string;
  monthNumbers: number[]; // 1-12
  solarMovement: 'Uttarayana (Ascending)' | 'Dakshinayana (Descending)';
  elementalDominance: string;
  doshaEffect: string;
  dietaryPrinciple: string;
  recommendedTastes: string[];
  recommendedFoods: string[];
  foodsToMinimize: string[];
}

export interface WeatherContext {
  temperatureC: number;
  humidity: number;
  condition: 'Sunny & Hot' | 'Humid / Muggy' | 'Rainy / Monsoon' | 'Pleasant & Mild' | 'Chilly / Cold' | 'Dry Heatwave';
  heatIndex: string;
  ayurvedicGuidance: string;
  hydrationRecommendation: string;
}

export interface Vegetable {
  id: string;
  englishName: string;
  hindiName: string;
  botanicalName: string;
  regionalNames: {
    tamil?: string;
    telugu?: string;
    kannada?: string;
    malayalam?: string;
    bengali?: string;
    marathi?: string;
    gujarati?: string;
    punjabi?: string;
    odia?: string;
  };
  category: 'Gourds & Melons' | 'Leafy Greens (Saag)' | 'Roots & Tubers' | 'Pods & Beans' | 'Cruciferous' | 'Local Nightshades & Fruits';
  peakMonths: number[]; // 1 to 12
  zones: RegionZone[];
  ayurvedicProperties: {
    taste: string[]; // e.g., Madhura (Sweet), Tikta (Bitter), Kashaya (Astringent)
    virya: string; // e.g., 'Cooling (Sheeta)' | 'Heating (Ushna)' | 'Neutral'
    doshaBalance: string; // e.g., "Pacifies Pitta & Kapha"
    digestionEase: string; // e.g., 'Very Light' | 'Moderate' | 'Heavy & Nourishing'
  };
  healthBenefits: string[];
  nutritionalHighlights: string[];
  pantryPairings: string[];
  flavorProfile: string;
  selectionTips: string;
  associatedRecipeIds: string[];
}

export interface RecipeIngredient {
  item: string;
  quantity: string;
  isStaple: boolean; // Pantry staple vs Fresh seasonal buy
}

export interface Recipe {
  id: string;
  title: string;
  hindiTitle: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  dietType: 'Vegetarian' | 'Non-Vegetarian' | 'Eggitarian';
  region: RegionZone;
  cuisine: IndianCuisine;
  prepTimeMins: number;
  cookTimeMins: number;
  calories: number;
  proteinGrams: number;
  fiberGrams: number;
  featuredVegetables: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  ayurvedicNote: string;
  accompaniments: string;
  pantrySubstitutions: string;
}

export interface MealPlanDay {
  dayId: string;
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isNonVeg: boolean;
  breakfast: Recipe;
  lunch: Recipe;
  snack: Recipe;
  dinner: Recipe;
  seasonalHighlights: string[];
}

export type DietPlanMode = 'strictly_veg' | 'strictly_nonveg' | 'hybrid';

export interface HybridSettings {
  nonVegCount: number; // 1 to 6
  nonVegDays: string[]; // e.g. ['Wednesday', 'Friday', 'Sunday']
}

export interface GroceryItem {
  name: string;
  quantity: string;
  category: 'Fresh Seasonal Produce' | 'Dals & Lentils' | 'Grains & Flours' | 'Dairy & Proteins' | 'Pantry Spices & Oils';
  checked: boolean;
}
