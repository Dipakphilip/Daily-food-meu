export interface ProductFeature {
  id: string;
  category: 'Seasonality Engine' | 'Climate & Weather Logic' | 'Meal Planning & Diet Flexibility' | 'Everyday Recipe System' | 'Smart Pantry & Grocery List' | 'Ayurvedic Wellness Engine';
  title: string;
  description: string;
  mvpScope: string;
  userImpact: string;
  iconName: string;
}

export interface DataModelEntity {
  name: string;
  description: string;
  primaryKey: string;
  relationships: string[];
  attributes: { name: string; type: string; description: string; example: string }[];
}

export interface UserJourneyStep {
  stepNumber: number;
  stage: string;
  userAction: string;
  systemResponse: string;
  touchpoints: string[];
  keyOutcome: string;
}

export const CORE_APP_FEATURES: ProductFeature[] = [
  {
    id: 'feat_regional_seasonality',
    category: 'Seasonality Engine',
    title: 'Multi-State Agro-Climatic Seasonality Matrix',
    description: 'Dynamic mapping across 28 Indian States & UTs divided into 6 agro-climatic zones (North, South, East, West, Central, Northeast) tracking peak harvest windows for 40+ native Indian vegetables.',
    mvpScope: 'Instant state selection, regional name display (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, etc.), and peak/early/late harvest status.',
    userImpact: 'Eliminates guesswork at the local sabzi mandi (vegetable market) by identifying naturally ripened, pesticide-minimal produce in peak season.',
    iconName: 'Sprout'
  },
  {
    id: 'feat_weather_adaptation',
    category: 'Climate & Weather Logic',
    title: 'Real-Time Climate & Ayurvedic Ritu Synthesis',
    description: 'Translates current environmental context (ambient temperature, humidity, monsoon precipitation, heatwaves) into classical 6-Ritu Ayurvedic wellness guidelines (Shishira, Vasanta, Grishma, Varsha, Sharad, Hemanta).',
    mvpScope: 'Live simulated / preset weather contextual alerts, Dosha impact breakdown (Vata/Pitta/Kapha), Virya (Cooling/Heating) balance recommendations.',
    userImpact: 'Protects the family against seasonal illnesses (summer heat exhaustion, monsoon waterborne sluggishness, winter dry coughs) through targeted food choices.',
    iconName: 'CloudSun'
  },
  {
    id: 'feat_flexible_meal_planner',
    category: 'Meal Planning & Diet Flexibility',
    title: 'Customizable 7-Day Hybrid Meal Chart Generator',
    description: 'Generates a balanced Monday-Sunday meal grid with 3 dietary modes: Strictly Vegetarian (100% Veg), Strictly Non-Vegetarian, or a Hybrid plan with custom veg/non-veg day allocations.',
    mvpScope: 'Custom non-veg count slider (1-6 days), day-by-day interactive toggle (e.g. reserving Tuesdays/Thursdays/Saturdays for sacred vegetarian days), single-click meal swap, and macro distribution.',
    userImpact: 'Honors deeply rooted Indian cultural dietary rhythms while ensuring high-protein, nutritionally complete meals for the entire household.',
    iconName: 'CalendarDays'
  },
  {
    id: 'feat_everyday_recipes',
    category: 'Everyday Recipe System',
    title: 'Everyday Pantry-First Recipe Engine',
    description: 'Simple, foolproof home-style recipes crafted exclusively with standard Indian household staples (Atta, Rice, Dals, Jeera, Haldi, Ghee/Mustard Oil) without requiring expensive exotic sauces.',
    mvpScope: 'Step-by-step instructions under 25 minutes, pantry swap suggestions, regional seasoning tips, and zero-waste vegetable peel usages (thogayal/peel stir-fries).',
    userImpact: 'Takes the daily "What to cook today?" decision fatigue away for working professionals and home cooks.',
    iconName: 'ChefHat'
  },
  {
    id: 'feat_smart_grocery',
    category: 'Smart Pantry & Grocery List',
    title: 'Smart Categorized Mandi Grocery List',
    description: 'Aggregates all ingredients across the 7-day meal plan into organized categories: Fresh Seasonal Produce, Lentils/Dals, Grains/Flours, Proteins, and Pantry Spices.',
    mvpScope: 'Interactive checkbox checklist, instant WhatsApp-ready text formatting, and printable weekly kitchen chart.',
    userImpact: 'Saves 30% on household grocery waste by purchasing exact seasonal portions.',
    iconName: 'ShoppingCart'
  },
  {
    id: 'feat_ai_assistant',
    category: 'Ayurvedic Wellness Engine',
    title: 'AI Indian Culinary & Wellness Advisor',
    description: 'Powered by server-side Gemini 3.7 Flash to offer personalized diet modifications for health conditions (diabetic-friendly, low-glycemic, post-fever convalescence, pregnancy) and custom vegetable substitutions.',
    mvpScope: 'Context-aware prompt queries directly referencing the user’s selected state, weather, and seasonal vegetables.',
    userImpact: 'Personalized dietary guidance at the tap of a button.',
    iconName: 'Sparkles'
  }
];

export const DATA_MODEL_SPEC: DataModelEntity[] = [
  {
    name: 'IndianRegionState',
    description: 'Master record for geographic and climatic characteristics of Indian states.',
    primaryKey: 'id (e.g., "maharashtra", "tamil_nadu")',
    relationships: ['1-to-Many with AgroZone', '1-to-Many with RegionalVegetableMapping'],
    attributes: [
      { name: 'id', type: 'String (UUID / Slug)', description: 'Unique state identifier', example: '"west_bengal"' },
      { name: 'name', type: 'String', description: 'Official state name', example: '"West Bengal"' },
      { name: 'zone', type: 'Enum (North|South|East|West|Central|Northeast)', description: 'Agro-climatic zone', example: '"East"' },
      { name: 'primaryClimate', type: 'String', description: 'Dominant seasonal climate pattern', example: '"Tropical Wet & Dry"' },
      { name: 'traditionalCuisine', type: 'Enum (Punjabi|Bengali|South Indian|Gujarati|Maharashtrian|Rajasthani|Bihari|Kashmiri|Goan|Odia)', description: 'Traditional regional cuisine style', example: '"Bengali"' },
      { name: 'stapleGrain', type: 'String', description: 'Primary regional dietary starch', example: '"Gobindobhog Rice"' },
      { name: 'stapleFat', type: 'String', description: 'Traditional regional cooking medium', example: '"Kachi Ghani Mustard Oil"' },
      { name: 'regionalLanguages', type: 'Array<String>', description: 'Spoken languages for vernacular names', example: '["Bengali"]' }
    ]
  },
  {
    name: 'AyurvedicRituSeason',
    description: 'The classical 6-Ritu Ayurvedic calendar linking solar movement (Ayana) to environmental dosha changes.',
    primaryKey: 'key (e.g., "Grishma", "Varsha")',
    relationships: ['1-to-Many with MonthMapping', '1-to-Many with SeasonalVegetableMatrix'],
    attributes: [
      { name: 'key', type: 'Enum (Shishira|Vasanta|Grishma|Varsha|Sharad|Hemanta)', description: 'Ritu key identifier', example: '"Grishma"' },
      { name: 'sanskritName', type: 'String', description: 'Devanagari Sanskrit title', example: '"ग्रीष्म (Grishma Ritu)"' },
      { name: 'englishSeason', type: 'String', description: 'English seasonal equivalent', example: '"Summer"' },
      { name: 'monthNumbers', type: 'Array<Number>', description: 'Gregorian calendar months (1-12)', example: '[5, 6]' },
      { name: 'solarMovement', type: 'Enum (Uttarayana|Dakshinayana)', description: 'Solar trajectory phase', example: '"Uttarayana"' },
      { name: 'doshaEffect', type: 'String', description: 'Impact on bodily bio-energies', example: '"Pitta aggregation, Agni depletion"' },
      { name: 'dietaryPrinciple', type: 'String', description: 'Core nutritional rule of thumb', example: '"Cooling, hydrating, sweet, light"' }
    ]
  },
  {
    name: 'SeasonalVegetable',
    description: 'Botanical and nutritional master data for Indian vegetables with multilingual names and Ayurvedic properties.',
    primaryKey: 'id (e.g., "lauki", "karela")',
    relationships: ['Many-to-Many with AgroZone', 'Many-to-Many with Recipe'],
    attributes: [
      { name: 'id', type: 'String', description: 'Unique produce key', example: '"turai"' },
      { name: 'englishName', type: 'String', description: 'Common English title', example: '"Ridge Gourd"' },
      { name: 'hindiName', type: 'String', description: 'Standard Hindi name', example: '"तुरई / तोरी (Turai)"' },
      { name: 'botanicalName', type: 'String', description: 'Scientific binomial', example: '"Luffa acutangula"' },
      { name: 'regionalNames', type: 'Map<Language, String>', description: 'Vernacular translations', example: '{"tamil": "Peerkangai", "telugu": "Beerakaya"}' },
      { name: 'category', type: 'Enum', description: 'Botanical produce classification', example: '"Gourds & Melons"' },
      { name: 'peakMonths', type: 'Array<Number>', description: 'Peak harvesting calendar months', example: '[5, 6, 7, 8, 9]' },
      { name: 'virya', type: 'Enum (Cooling|Heating|Neutral)', description: 'Post-digestive thermal effect', example: '"Cooling (Sheeta)"' },
      { name: 'digestionEase', type: 'Enum (Very Light|Moderate|Heavy)', description: 'Gastrointestinal load on Agni', example: '"Very Light"' },
      { name: 'healthBenefits', type: 'Array<String>', description: 'Clinically validated benefits', example: '["High insulin-like peptides", "Hydrating"]' }
    ]
  },
  {
    name: 'EverydayRecipe',
    description: 'Culinary blueprint featuring seasonal produce and standard Indian household pantry staples.',
    primaryKey: 'id (e.g., "rec_lauki_chana_dal")',
    relationships: ['Many-to-One with RegionalZone', 'Many-to-Many with SeasonalVegetable'],
    attributes: [
      { name: 'id', type: 'String', description: 'Unique recipe code', example: '"rec_sarson_saag"' },
      { name: 'title', type: 'String', description: 'Recipe title in English', example: '"Punjabi Sarson ka Saag"' },
      { name: 'hindiTitle', type: 'String', description: 'Devanagari title', example: '"सरसों का साग"' },
      { name: 'cuisine', type: 'Enum (Punjabi|Bengali|South Indian|Gujarati|Maharashtrian|Rajasthani|Bihari|Kashmiri|Goan|Odia)', description: 'Regional Indian culinary style', example: '"Punjabi"' },
      { name: 'mealType', type: 'Enum (Breakfast|Lunch|Dinner|Snack)', description: 'Appropriate meal slot', example: '"Lunch"' },
      { name: 'dietType', type: 'Enum (Vegetarian|Non-Vegetarian|Eggitarian)', description: 'Dietary classification', example: '"Vegetarian"' },
      { name: 'prepTimeMins', type: 'Number', description: 'Preparation time in minutes', example: '15' },
      { name: 'cookTimeMins', type: 'Number', description: 'Active cooking time in minutes', example: '35' },
      { name: 'featuredVegetables', type: 'Array<String>', description: 'Star seasonal produce items', example: '["Sarson", "Spinach"]' },
      { name: 'pantryIngredients', type: 'Array<IngredientObject>', description: 'Staples vs fresh items', example: '[{"item": "Makki Atta", "isStaple": true}]' },
      { name: 'ayurvedicNote', type: 'String', description: 'Seasonal health rationale', example: '"Generates thermogenic winter warmth"' }
    ]
  },
  {
    name: 'WeeklyMealPlan',
    description: 'User-customized 7-day schedule with per-day dietary rules and swap slots.',
    primaryKey: 'planId',
    relationships: ['1-to-7 with MealPlanDay', 'Many-to-1 with UserProfile'],
    attributes: [
      { name: 'dietMode', type: 'Enum (strictly_veg|strictly_nonveg|hybrid)', description: 'Global plan preference', example: '"hybrid"' },
      { name: 'hybridSettings', type: 'Object { nonVegCount: 3, nonVegDays: ["Wed", "Fri", "Sun"] }', description: 'Non-veg schedule rules', example: '{"nonVegCount": 2, "nonVegDays": ["Wed", "Sun"]}' },
      { name: 'days', type: 'Array<MealPlanDay>', description: '7 distinct day configurations (Mon-Sun)', example: '[{ "dayName": "Monday", "isNonVeg": false, "breakfast": ..., "lunch": ... }]' }
    ]
  }
];

export const STEP_BY_STEP_USER_JOURNEY: UserJourneyStep[] = [
  {
    stepNumber: 1,
    stage: 'Location & Climate Profiling',
    userAction: 'Selects their Indian home state (e.g. Maharashtra, Tamil Nadu, Punjab) and confirms the current calendar month / local weather.',
    systemResponse: 'Instantly identifies the agro-climatic zone, active Ayurvedic Ritu (e.g. Grishma/Summer), regional staple fats/grains, and sets baseline weather conditions.',
    touchpoints: ['Interactive State Selector', 'Month & Season Badge', 'Live Weather & Heat Index Sensor'],
    keyOutcome: 'Zero-configuration localization of culinary traditions and environmental context.'
  },
  {
    stepNumber: 2,
    stage: 'Seasonal Vegetable Discovery',
    userAction: 'Browses the curated seasonal harvest dashboard to see what is currently in peak season, early harvest, or to be avoided.',
    systemResponse: 'Displays vibrant produce cards with multi-lingual regional names (e.g., Peerkangai / Beerakaya / Turai), Ayurvedic Virya (Cooling/Heating), and top health benefits.',
    touchpoints: ['Vegetable Card Grid', 'Ayurvedic Dosha & Taste Badges', 'Storage & Mandi Selection Tips'],
    keyOutcome: 'Empowers the shopper with authentic market intelligence before visiting the local vendor.'
  },
  {
    stepNumber: 3,
    stage: 'Dietary Preference & Custom Split Configuration',
    userAction: 'Selects their household dietary framework: Strictly Vegetarian, Strictly Non-Vegetarian, or Hybrid Plan with custom non-veg days (e.g., Non-veg on Wed/Sun, Veg on Tue/Thu/Sat).',
    systemResponse: 'Dynamically calculates daily protein balance and renders a personalized 7-day breakfast, lunch, snack, and dinner meal schedule.',
    touchpoints: ['Diet Mode Selector (Veg / Non-Veg / Hybrid)', 'Interactive Non-Veg Day Checkboxes & Slider', 'Meal Slot Regeneration Engine'],
    keyOutcome: '100% culturally aligned meal plan that respects family fasting traditions and dietary preferences.'
  },
  {
    stepNumber: 4,
    stage: 'Everyday Recipe & Kitchen Execution',
    userAction: 'Clicks on any planned meal slot to view the step-by-step recipe, cooking time, and pantry ingredients.',
    systemResponse: 'Opens an interactive recipe drawer with simple 4-step home cooking guidelines, pantry substitutions, and zero-waste cooking tips.',
    touchpoints: ['Recipe Modal with Timer', 'Pantry Staple Checklist', 'One-Click Alternative Meal Swap'],
    keyOutcome: 'Stress-free, delicious homestyle meal prep under 25 minutes using everyday ingredients.'
  },
  {
    stepNumber: 5,
    stage: 'Grocery Consolidation & Export',
    userAction: 'Taps "View Grocery List" or "Export Weekly Plan" to share with household members or domestic helpers.',
    systemResponse: 'Aggregates all 7-day ingredients into a clean, categorized shopping checklist (Produce, Dals, Grains, Dairy/Proteins, Spices) with 1-click WhatsApp text copy and print layout.',
    touchpoints: ['Categorized Shopping Checklist', 'WhatsApp Format Copy Button', 'Print / PDF Layout'],
    keyOutcome: 'Efficient weekly mandi shopping with zero food waste and no forgotten ingredients.'
  }
];
