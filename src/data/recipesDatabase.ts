import { Recipe, IndianCuisine } from '../types';

export const RECIPES_DATABASE: Recipe[] = [
  // ==========================================
  // --- PUNJABI CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_sarson_saag',
    title: 'Punjabi Sarson ka Saag (Mustard & Bathua Greens)',
    hindiTitle: 'सरसों का साग (Sarson Da Saag)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 15,
    cookTimeMins: 35,
    calories: 260,
    proteinGrams: 7,
    fiberGrams: 9,
    featuredVegetables: ['Mustard Greens (Sarson)', 'Spinach (Palak)'],
    ingredients: [
      { item: 'Sarson (Mustard leaves), washed & chopped', quantity: '400g', isStaple: false },
      { item: 'Palak (Spinach) or Bathua leaves', quantity: '200g', isStaple: false },
      { item: 'Makki Atta (Maize flour)', quantity: '2 tbsp', isStaple: true },
      { item: 'Ginger-Garlic, crushed', quantity: '2 tbsp', isStaple: true },
      { item: 'Green chilies, chopped', quantity: '2', isStaple: true },
      { item: 'Desi Ghee', quantity: '2 tbsp', isStaple: true },
      { item: 'Onions, finely chopped', quantity: '1 large', isStaple: true }
    ],
    instructions: [
      'Boil chopped sarson, palak, green chilies, and ginger with 1 cup water and salt for 15-20 minutes until tender.',
      'Blend roughly using a traditional wooden churner (mathani) or coarse pulse in a mixer.',
      'Whisk in 2 tbsp makki atta dissolved in 3 tbsp water to bind the saag and simmer for 10 minutes on low flame.',
      'In a separate pan, heat desi ghee, brown the chopped onions and garlic until fragrant, and pour the tadka over the bubbling saag.',
      'Serve hot topped with a dollop of white butter or ghee.'
    ],
    ayurvedicNote: 'Generates deep thermogenic warmth during Hemanta and Shishira winter, fortifying Vata against dry cold.',
    accompaniments: 'Makki ki Roti with jaggery (Gud) and fresh white radish salad.',
    pantrySubstitutions: 'If Bathua is unavailable, use equal parts tender Methi leaves.'
  },
  {
    id: 'rec_lauki_chana_dal',
    title: 'Punjabi Lauki Chana Dal (Bottle Gourd with Bengal Gram)',
    hindiTitle: 'लौकी चना दाल (Lauki Chana Dal)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 10,
    cookTimeMins: 20,
    calories: 220,
    proteinGrams: 9,
    fiberGrams: 6,
    featuredVegetables: ['Bottle Gourd (Lauki)'],
    ingredients: [
      { item: 'Lauki (Bottle Gourd), peeled and cubed', quantity: '300g', isStaple: false },
      { item: 'Chana Dal (Bengal Gram), soaked 30 mins', quantity: '1/2 cup', isStaple: true },
      { item: 'Cumin seeds (Jeera)', quantity: '1 tsp', isStaple: true },
      { item: 'Turmeric powder (Haldi)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Ginger, finely chopped', quantity: '1 inch', isStaple: true },
      { item: 'Green chili, slit', quantity: '1-2', isStaple: true },
      { item: 'Mustard oil or Ghee', quantity: '1 tbsp', isStaple: true },
      { item: 'Fresh coriander leaves for garnish', quantity: '2 tbsp', isStaple: false }
    ],
    instructions: [
      'In a pressure cooker or heavy pot, combine soaked chana dal, cubed lauki, turmeric, salt, chopped ginger, and 1.5 cups water.',
      'Pressure cook for 3-4 whistles on medium flame until dal is soft but retains its shape.',
      'In a small tadka pan, heat ghee or mustard oil. Add cumin seeds and let them crackle.',
      'Add slit green chilies and a pinch of hing. Pour sizzling tadka directly over the cooked dal.',
      'Simmer for 2 minutes. Garnish with fresh coriander and serve warm with phulkas or steamed rice.'
    ],
    ayurvedicNote: 'Bottle gourd cools summer Pitta while Chana dal provides sustained grounding protein without sluggishness.',
    accompaniments: 'Steamed Jeera Rice or Warm Phulkas with a side of cucumber slices.',
    pantrySubstitutions: 'Can substitute Lauki with Ridge Gourd (Turai) or Ash Gourd (Petha).'
  },
  {
    id: 'rec_mooli_paratha',
    title: 'Amritsari Mooli Paratha (Spiced Radish Flatbread)',
    hindiTitle: 'अमृतसरी मूली पराठा (Amritsari Mooli Paratha)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 15,
    cookTimeMins: 10,
    calories: 230,
    proteinGrams: 5,
    fiberGrams: 4,
    featuredVegetables: ['White Radish (Mooli)'],
    ingredients: [
      { item: 'White Radish (Mooli), grated & squeezed', quantity: '2 cups', isStaple: false },
      { item: 'Whole wheat flour (Atta)', quantity: '1.5 cups', isStaple: true },
      { item: 'Ajwain (Carom seeds)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Fresh coriander & green chilies, chopped', quantity: '2 tbsp', isStaple: true },
      { item: 'Desi Ghee / Butter', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Grate the radish, sprinkle 1/2 tsp salt, wait 5 minutes, and squeeze out all excess water completely.',
      'Toss grated radish with ajwain, chopped green chili, coriander, and red chili powder.',
      'Stuff into rolled atta dough or knead the seasoned radish directly into the flour for easy rolling.',
      'Roast on a hot griddle with ghee until golden, flaky, and crispy on both surfaces.'
    ],
    ayurvedicNote: 'Squeezing excess water and adding ajwain prevents bloating and warms respiratory passages on chilly winter mornings.',
    accompaniments: 'Fresh home-set Dahi (yogurt) and lemon-ginger seasonal pickle.',
    pantrySubstitutions: 'Can mix half grated mooli and half grated red carrots.'
  },
  {
    id: 'rec_palak_paneer',
    title: 'Punjabi Palak Paneer (Spinach Cottage Cheese Curry)',
    hindiTitle: 'पालक पनीर (Palak Paneer)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 10,
    cookTimeMins: 15,
    calories: 280,
    proteinGrams: 14,
    fiberGrams: 4,
    featuredVegetables: ['Indian Spinach (Palak)'],
    ingredients: [
      { item: 'Fresh Palak (Spinach), blanched', quantity: '300g', isStaple: false },
      { item: 'Fresh Paneer cubes', quantity: '150g', isStaple: true },
      { item: 'Garlic, minced', quantity: '1 tbsp', isStaple: true },
      { item: 'Ginger, grated', quantity: '1 tsp', isStaple: true },
      { item: 'Cumin seeds', quantity: '1 tsp', isStaple: true },
      { item: 'Ghee or butter', quantity: '1 tbsp', isStaple: true },
      { item: 'Kasuri Methi (Dried fenugreek)', quantity: '1 tsp', isStaple: true }
    ],
    instructions: [
      'Blanch spinach leaves in boiling water for 2 minutes, then transfer immediately to ice-cold water to retain emerald green color.',
      'Puree the blanched spinach with 1 green chili into a smooth sauce.',
      'Heat ghee in a pan, add cumin seeds, minced garlic, and grated ginger until aromatic.',
      'Pour in the spinach puree, add salt, and simmer gently for 3-4 minutes on low flame.',
      'Add fresh paneer cubes and crushed kasuri methi. Warm through for 2 minutes and serve.'
    ],
    ayurvedicNote: 'Spinach provides bioavailable iron and magnesium, tempered with warming cumin and garlic to prevent Vata dryness.',
    accompaniments: 'Hot Phulkas or Garlic Naan with a lemon wedge.',
    pantrySubstitutions: 'Can replace Paneer with Tofu for a vegan alternative.'
  },
  {
    id: 'rec_khatti_meethi_kaddu',
    title: 'Khatta Meetha Kaddu (Sweet & Sour Spiced Pumpkin)',
    hindiTitle: 'खट्टा मीठा कद्दू (Khatta Meetha Kaddu)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 10,
    cookTimeMins: 15,
    calories: 160,
    proteinGrams: 3,
    fiberGrams: 4,
    featuredVegetables: ['Yellow / Red Pumpkin (Kaddu)'],
    ingredients: [
      { item: 'Yellow Pumpkin, peeled and diced', quantity: '400g', isStaple: false },
      { item: 'Methi seeds (Fenugreek)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Fennel seeds (Saunf)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Amchur (Dry mango powder)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Jaggery (Gud), crushed', quantity: '1 tbsp', isStaple: true },
      { item: 'Mustard oil or Ghee', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Heat mustard oil in a kadai. Add methi seeds and fennel seeds; allow to release sweet aroma.',
      'Add pumpkin cubes, turmeric, red chili powder, and salt. Stir well.',
      'Sprinkle 2 tbsp water, cover tightly, and cook on low heat for 10-12 minutes until soft.',
      'Add jaggery and amchur powder. Mash a few pumpkin pieces with back of the ladle for luscious consistency.'
    ],
    ayurvedicNote: 'Pumpkin soothes Autumn Pitta, while fennel and jaggery balance metabolic acid without spiking inflammation.',
    accompaniments: 'Bedmi Puri or whole wheat rotis and plain moong dal.',
    pantrySubstitutions: 'Can replace jaggery with raw honey (added after cooling slightly).'
  },
  {
    id: 'rec_bhindi_do_pyaza',
    title: 'Punjabi Bhindi Do Pyaza (Okra with Caramelized Onions)',
    hindiTitle: 'भिंडी दो प्याज़ा (Bhindi Do Pyaza)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 10,
    cookTimeMins: 15,
    calories: 170,
    proteinGrams: 4,
    fiberGrams: 5,
    featuredVegetables: ['Okra / Ladyfinger (Bhindi)'],
    ingredients: [
      { item: 'Bhindi, washed completely dry and sliced', quantity: '350g', isStaple: false },
      { item: 'Onions, diced into layers', quantity: '2 medium', isStaple: true },
      { item: 'Ajwain (Carom seeds)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Amchur (Dry mango powder)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Coriander powder (Dhania)', quantity: '1 tsp', isStaple: true },
      { item: 'Mustard oil', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Wipe bhindi thoroughly dry before cutting to prevent slime.',
      'Heat mustard oil in a wide kadai until smoking hot. Add ajwain seeds.',
      'Add sliced bhindi and sauté on medium-high heat uncovered for 6-7 minutes until lightly crisped.',
      'Add diced onions, turmeric, chili powder, and coriander powder. Sauté for another 5 minutes.',
      'Sprinkle amchur powder and salt at the very end. Turn off heat and keep uncovered to preserve crispness.'
    ],
    ayurvedicNote: 'Ajwain and amchur break down okra mucilage, creating a Vata-balancing, easy-to-digest lunch dish.',
    accompaniments: 'Steamed Basmati Rice with Arhar/Toor Dal, or hot Roti.',
    pantrySubstitutions: 'Can substitute amchur with fresh lemon juice squeezed at the end.'
  },
  {
    id: 'rec_punjabi_rajma_gajar',
    title: 'Punjabi Tariwale Rajma with Winter Carrots',
    hindiTitle: 'पंजाबी तरी वाले राजमा (Punjabi Tariwale Rajma)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 15,
    cookTimeMins: 30,
    calories: 290,
    proteinGrams: 13,
    fiberGrams: 9,
    featuredVegetables: ['Red Delhi Carrot (Gajar)'],
    ingredients: [
      { item: 'Chitra Rajma (Kidney beans), soaked overnight', quantity: '1 cup', isStaple: true },
      { item: 'Winter Red Carrots (Gajar), diced', quantity: '1 cup', isStaple: false },
      { item: 'Onion & Tomato puree', quantity: '1 cup each', isStaple: true },
      { item: 'Ginger-garlic paste', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Kasuri methi & Garam masala', quantity: '1 tsp each', isStaple: true },
      { item: 'Desi Ghee or Mustard Oil', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Pressure cook soaked rajma with whole black cardamom, bay leaf, and salt for 5-6 whistles until melt-in-mouth soft.',
      'In a heavy pot, heat ghee and sauté ginger-garlic and onion puree until deep reddish brown.',
      'Add tomato puree, coriander powder, turmeric, and diced carrots. Cook until oil leaves the masala.',
      'Add cooked rajma along with its cooking broth. Lightly mash 20% of the beans to create a rich velvety curry.',
      'Simmer for 10 minutes on low heat. Finish with crushed kasuri methi and fresh coriander.'
    ],
    ayurvedicNote: 'Combining rajma with sweet grounding carrots and warming ginger pacifies Vata while supplying iron and complex carbs.',
    accompaniments: 'Steamed Long-Grain Basmati Rice (Rajma Chawal) with pickled onions.',
    pantrySubstitutions: 'Can substitute red carrots with tender turnips (Shalgam).'
  },
  {
    id: 'rec_egg_curry_palak',
    title: 'Dhaba-Style Egg Curry with Wilted Spinach (Palak Anda)',
    hindiTitle: 'पालक अंडा करी (Palak Anda Curry)',
    mealType: 'Dinner',
    dietType: 'Eggitarian',
    region: 'North',
    cuisine: 'Punjabi',
    prepTimeMins: 10,
    cookTimeMins: 18,
    calories: 240,
    proteinGrams: 15,
    fiberGrams: 4,
    featuredVegetables: ['Indian Spinach (Palak)'],
    ingredients: [
      { item: 'Boiled Eggs, pricked and lightly pan-seared', quantity: '4', isStaple: true },
      { item: 'Spinach (Palak) leaves, washed & shredded', quantity: '250g', isStaple: false },
      { item: 'Tomato puree & Onion paste', quantity: '1/2 cup each', isStaple: true },
      { item: 'Ginger-Garlic, minced', quantity: '1 tbsp', isStaple: true },
      { item: 'Garam masala, coriander powder, cumin', quantity: '1 tsp each', isStaple: true },
      { item: 'Mustard oil or Ghee', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Pan-sear boiled eggs with a pinch of turmeric and chili powder until blistered golden.',
      'In a kadai, heat oil, sauté cumin, ginger-garlic, onion paste, and tomato puree until oil separates.',
      'Add spices, salt, and finely shredded spinach. Cook for 3-4 minutes until spinach wilts into the curry.',
      'Add 1/2 cup water, gently drop in the golden eggs, and simmer for 5 minutes.'
    ],
    ayurvedicNote: 'High protein dinner with alkalizing greens for optimal muscle recovery after active days.',
    accompaniments: 'Phulkas or Steamed Brown/White Rice.',
    pantrySubstitutions: 'Can swap eggs for tofu or boiled chickpeas.'
  },

  // ==========================================
  // --- BENGALI CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_macha_jhola_potol',
    title: 'Bengali Rohu Fish Curry with Parwal (Macher Jhol)',
    hindiTitle: 'মাছের ঝোল পটল (Macher Jhol with Potol)',
    mealType: 'Lunch',
    dietType: 'Non-Vegetarian',
    region: 'East',
    cuisine: 'Bengali',
    prepTimeMins: 15,
    cookTimeMins: 20,
    calories: 310,
    proteinGrams: 24,
    fiberGrams: 3,
    featuredVegetables: ['Pointed Gourd (Parwal)'],
    ingredients: [
      { item: 'Fresh Rohu or Katla fish steaks', quantity: '350g', isStaple: true },
      { item: 'Parwal (Pointed gourd), scraped and halved', quantity: '4-5 pieces', isStaple: false },
      { item: 'Potato, cut into wedges', quantity: '1 medium', isStaple: true },
      { item: 'Panch Phoron (Bengali 5 spice) & Kalo Jeere', quantity: '1 tsp', isStaple: true },
      { item: 'Ginger paste & Cumin powder', quantity: '1 tbsp', isStaple: true },
      { item: 'Pure Kachi Ghani Mustard Oil', quantity: '2 tbsp', isStaple: true }
    ],
    instructions: [
      'Marinate fish steaks with turmeric and salt; shallow fry lightly in smoking mustard oil and set aside.',
      'In the same fragrant oil, fry parwal and potato wedges until light golden.',
      'Add kalo jeere (nigella seeds), ginger paste, cumin powder, and turmeric dissolved in 2 tbsp water.',
      'Sauté until oil separates, add 1.5 cups hot water, and simmer vegetables until tender.',
      'Slide the fried fish steaks into the light soupy gravy (jhol), cook for 4 minutes, and finish with fresh green chilies.'
    ],
    ayurvedicNote: 'Parwal and light fish jhol are the ultimate monsoon and summer digestive nourishment in Eastern India, easily absorbed by the liver.',
    accompaniments: 'Steamed Gobindobhog or Sonamasuri White Rice with a lime wedge.',
    pantrySubstitutions: 'Can use any firm freshwater fish or prawns.'
  },
  {
    id: 'rec_bengali_shukto',
    title: 'Traditional Bengali Shukto (Bitter-Sweet Seasonal Stew)',
    hindiTitle: 'শুক্তো (Authentic Bengali Shukto)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Bengali',
    prepTimeMins: 15,
    cookTimeMins: 25,
    calories: 190,
    proteinGrams: 5,
    fiberGrams: 6,
    featuredVegetables: ['Bitter Gourd (Karela)', 'Pointed Gourd (Parwal)', 'Raw Green Papaya / Kaccha Papita'],
    ingredients: [
      { item: 'Bitter Gourd (Karela), sliced thin', quantity: '1 small', isStaple: false },
      { item: 'Raw Papaya & Parwal, cut into batons', quantity: '1 cup', isStaple: false },
      { item: 'Raw Green Banana (Kanchkolar) & Sweet Potato', quantity: '1 cup', isStaple: false },
      { item: 'Moringa Drumstick, cut into batons', quantity: '1 stalk', isStaple: false },
      { item: 'Bori (Sun-dried urad dal dumplings)', quantity: '8-10 pieces', isStaple: true },
      { item: 'Mustard-Poppy seed (Posto) paste & Ginger paste', quantity: '2 tbsp', isStaple: true },
      { item: 'Randhuni or Panch Phoron & Milk', quantity: '1/2 cup milk', isStaple: true },
      { item: 'Mustard Oil & Ghee', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Fry the bori dumplings in mustard oil until crisp; shallow fry sliced bitter gourd separately and set aside.',
      'In the same pan, temper with randhuni/panch phoron, add all mixed seasonal vegetables, and sauté for 5 minutes.',
      'Add ginger paste, mustard-posto paste, turmeric, and 1.5 cups warm water. Simmer covered until vegetables are tender.',
      'Add milk, fried bori, fried karela, a pinch of sugar, and 1 tsp ghee with crushed roasted cumin-fennel powder.',
      'Traditional first course of an authentic Bengali meal to stimulate digestive enzymes.'
    ],
    ayurvedicNote: 'The Tikta (bitter) taste of karela combined with cooling raw papaya gently stimulates bile flow and detoxifies the liver.',
    accompaniments: 'Hot Steamed Rice with a spoon of desi ghee.',
    pantrySubstitutions: 'If Randhuni is unavailable, use celery seeds or ajwain.'
  },
  {
    id: 'rec_aloo_posto_turai',
    title: 'Bengali Jhinge Aloo Posto (Ridge Gourd & Poppy Seeds)',
    hindiTitle: 'ঝিঙে আলু পোস্ত (Jhinge Aloo Posto)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Bengali',
    prepTimeMins: 12,
    cookTimeMins: 15,
    calories: 215,
    proteinGrams: 6,
    fiberGrams: 5,
    featuredVegetables: ['Ridge Gourd (Turai)'],
    ingredients: [
      { item: 'Jhinge (Ridge Gourd / Turai), peeled and cubed', quantity: '350g', isStaple: false },
      { item: 'Potato (Aloo), peeled and cubed', quantity: '1 medium', isStaple: true },
      { item: 'Posto (White Poppy seeds), soaked and ground with 2 green chilies', quantity: '3 tbsp', isStaple: true },
      { item: 'Kalo Jeere (Nigella seeds)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Pure Mustard Oil', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Slit green chilies', quantity: '2-3', isStaple: true }
    ],
    instructions: [
      'Heat mustard oil to smoking point in a kadai. Add kalo jeere and slit green chilies.',
      'Add potato cubes and fry for 3-4 minutes until pale golden. Add ridge gourd cubes and salt.',
      'Cover with lid; the water released from the juicy ridge gourd will cook both vegetables without extra water.',
      'Once vegetables are tender (8-10 mins), stir in the fresh poppy seed paste and green chili paste.',
      'Cook on low heat for 2 minutes until creamy and fragrant. Drizzle 1 tsp raw mustard oil on top before turning off heat.'
    ],
    ayurvedicNote: 'Poppy seeds (Posto) and ridge gourd provide deep calming and cooling nourishment against hot humid weather.',
    accompaniments: 'Biulir Dal (Fennel-tempered Urad Dal) and Steamed Rice.',
    pantrySubstitutions: 'Can replace half the poppy seeds with soaked white sesame or melon seeds.'
  },
  {
    id: 'rec_mutton_papaya_stew',
    title: 'Bengali Mangshor Jhol with Raw Green Papaya',
    hindiTitle: 'পেঁপে দিয়ে কচি পাঁঠার ঝোল (Mutton Jhol with Raw Papaya)',
    mealType: 'Lunch',
    dietType: 'Non-Vegetarian',
    region: 'East',
    cuisine: 'Bengali',
    prepTimeMins: 20,
    cookTimeMins: 40,
    calories: 420,
    proteinGrams: 32,
    fiberGrams: 4,
    featuredVegetables: ['Raw Green Papaya / Kaccha Papita'],
    ingredients: [
      { item: 'Mutton / Goat meat, bone-in', quantity: '400g', isStaple: true },
      { item: 'Raw green papaya, peeled and chunked', quantity: '200g', isStaple: false },
      { item: 'Onions, sliced', quantity: '2 large', isStaple: true },
      { item: 'Whole spices (Bay leaf, Cardamom, Cinnamon, Cloves)', quantity: '1 tbsp', isStaple: true },
      { item: 'Ginger-Garlic paste & Mustard oil', quantity: '2 tbsp each', isStaple: true }
    ],
    instructions: [
      'The natural papain enzyme in raw papaya tenderizes tough meat fibers naturally.',
      'Heat mustard oil, add whole aromatic spices and sliced onions; brown slowly.',
      'Add mutton pieces and ginger-garlic paste; bhunao (sauté vigorously) for 10 minutes until oil glistens.',
      'Add raw papaya chunks, turmeric, Kashmiri chili powder, and 2 cups warm water.',
      'Pressure cook for 5-6 whistles or slow braise for 45 minutes until meat melts off the bone.'
    ],
    ayurvedicNote: 'Raw papaya papain breaks down heavy red meat collagens, rendering a light, easy-to-digest nourishing broth.',
    accompaniments: 'Fragrant Steamed Basmati Rice or Gobindobhog Rice with lemon wedges.',
    pantrySubstitutions: 'Can replace raw papaya with winter white radish or bottle gourd.'
  },
  {
    id: 'rec_bengali_chholar_dal',
    title: 'Bengali Chholar Dal with Coconut & Ginger',
    hindiTitle: 'ছোলার ডাল নারকেল দিয়ে (Chholar Dal with Coconut)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Bengali',
    prepTimeMins: 10,
    cookTimeMins: 25,
    calories: 240,
    proteinGrams: 10,
    fiberGrams: 7,
    featuredVegetables: ['Fresh Ginger'],
    ingredients: [
      { item: 'Chana Dal (Bengal gram), soaked 1 hr', quantity: '1 cup', isStaple: true },
      { item: 'Fresh coconut slices (Narkel kuchi), fried in ghee', quantity: '3 tbsp', isStaple: false },
      { item: 'Whole Garam Masala & Bay leaf', quantity: '1 tbsp', isStaple: true },
      { item: 'Ginger paste & Cumin powder', quantity: '1 tbsp', isStaple: true },
      { item: 'Pure Desi Ghee & Hing', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Dry red chilies & Green chilies', quantity: '2 each', isStaple: true }
    ],
    instructions: [
      'Boil soaked chana dal with turmeric, salt, and bay leaf until cooked yet whole.',
      'In a pan, fry thin coconut slices in ghee until golden brown; set aside.',
      'In the same ghee, temper with whole spices, dry red chili, and hing. Add ginger paste and cumin paste.',
      'Pour in the cooked dal, add fried coconut pieces, a touch of sweetness, and simmer for 5 minutes.',
      'Finish with warm ghee and fragrant Bengali garam masala.'
    ],
    ayurvedicNote: 'Ginger and coconut temper the dry heavy qualities of Bengal gram for energized morning digestion.',
    accompaniments: 'Fluffy Luchi (Puri) or Soft Roti.',
    pantrySubstitutions: 'Can use desiccated coconut or grated coconut if fresh slices are unavailable.'
  },

  // ==========================================
  // --- SOUTH INDIAN CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_murungakkai_sambar',
    title: 'Traditional Murungakkai Sambar (Drumstick Lentil Stew)',
    hindiTitle: 'सहजन सांभर (Murungakkai Sambar)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'South',
    cuisine: 'South Indian',
    prepTimeMins: 12,
    cookTimeMins: 20,
    calories: 210,
    proteinGrams: 9,
    fiberGrams: 7,
    featuredVegetables: ['Moringa / Drumstick (Sahjan)'],
    ingredients: [
      { item: 'Fresh Drumstick, cut into 2-inch pieces', quantity: '2 stalks', isStaple: false },
      { item: 'Toor Dal (Split Pigeon Pea), pressure cooked', quantity: '1/2 cup', isStaple: true },
      { item: 'Shallots (Small Sambar Onions), peeled', quantity: '10-12', isStaple: true },
      { item: 'Tamarind pulp extracted in warm water', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Sambar Powder (Coriander, Fenugreek, Chili)', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Mustard seeds, curry leaves, hing for tempering', quantity: '1 tsp', isStaple: true },
      { item: 'Sesame (Gingelly) or Coconut oil', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'In a pot, boil drumstick pieces and shallots with tamarind water, turmeric, sambar powder, and salt for 10 minutes until drumsticks are tender.',
      'Add the mashed cooked toor dal and 1 cup water. Simmer on low heat for 5-7 minutes allowing flavors to blend.',
      'In a small pan, heat oil, add mustard seeds, dry red chili, curry leaves, and a generous pinch of hing.',
      'Pour hot tempering over the sambar and finish with fresh coriander leaves.'
    ],
    ayurvedicNote: 'Moringa seeds and pulp stimulate joint mobility and lymphatic circulation during Spring and Autumn.',
    accompaniments: 'Steamed Idlis, Crispy Dosas, or Steamed Ponni Rice with a spoon of ghee and papad.',
    pantrySubstitutions: 'If drumsticks run out, pair with yellow pumpkin or bottle gourd.'
  },
  {
    id: 'rec_kerala_avial',
    title: 'Authentic Kerala Avial (Mixed Seasonal Vegetables in Coconut Yogurt)',
    hindiTitle: 'केरल अवियल (Traditional Kerala Avial)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'South',
    cuisine: 'South Indian',
    prepTimeMins: 15,
    cookTimeMins: 15,
    calories: 220,
    proteinGrams: 5,
    fiberGrams: 6,
    featuredVegetables: ['Ash Gourd (Petha / Safed Petha)', 'Moringa / Drumstick (Sahjan)', 'Raw Green Banana (Kachha Kela)'],
    ingredients: [
      { item: 'Ash gourd (Kumbalanga), Drumstick, Raw banana, Snake gourd batons', quantity: '400g total', isStaple: false },
      { item: 'Fresh grated coconut', quantity: '1 cup', isStaple: true },
      { item: 'Cumin seeds & Green chilies', quantity: '1 tsp & 3 chilies', isStaple: true },
      { item: 'Thick sour yogurt / Curd', quantity: '1/3 cup', isStaple: true },
      { item: 'Fresh Curry leaves & Coconut Oil', quantity: '2 sprigs & 1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Cut all vegetables into uniform 2-inch batons. Steam with minimal water, turmeric, and salt until just tender (do not overcook).',
      'Coarsely grind fresh coconut, cumin seeds, and green chilies without making a fine paste.',
      'Add the coarse coconut mixture to the steamed vegetables and gently toss on low heat for 3 minutes.',
      'Turn off heat, stir in whisked yogurt, and immediately pour 1.5 tbsp raw pure virgin coconut oil with fresh curry leaves over it.',
      'Cover with lid for 10 minutes to allow the coconut aroma to penetrate.'
    ],
    ayurvedicNote: 'Ash gourd and coconut provide supreme Pitta-pacifying Sheeta (cooling) virya, perfect for hot coastal climates.',
    accompaniments: 'Kerala Matta Rice with Moru Curry or hot Steamed Rice.',
    pantrySubstitutions: 'Can substitute raw banana with carrot and beans.'
  },
  {
    id: 'rec_chettinad_chicken_drumstick',
    title: 'Chettinad Chicken with Drumsticks & Pepper',
    hindiTitle: 'चेट्टीनाड चिकन सहजन (Chettinad Chicken with Moringa)',
    mealType: 'Dinner',
    dietType: 'Non-Vegetarian',
    region: 'South',
    cuisine: 'South Indian',
    prepTimeMins: 15,
    cookTimeMins: 25,
    calories: 360,
    proteinGrams: 28,
    fiberGrams: 4,
    featuredVegetables: ['Moringa / Drumstick (Sahjan)'],
    ingredients: [
      { item: 'Skinless Chicken, curry cut pieces', quantity: '400g', isStaple: true },
      { item: 'Fresh Drumsticks, cut into pieces', quantity: '2 stalks', isStaple: false },
      { item: 'Shallots & Curry leaves', quantity: '1 cup', isStaple: true },
      { item: 'Black peppercorns, Fennel, Coriander seeds (Freshly crushed)', quantity: '2 tbsp', isStaple: true },
      { item: 'Ginger-garlic paste', quantity: '1 tbsp', isStaple: true },
      { item: 'Sesame (Gingelly) or Coconut oil', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Dry roast black peppercorns, fennel seeds, dry red chili, and coriander seeds; grind into coarse Chettinad masala.',
      'Heat oil in a kadai, add shallots, curry leaves, and ginger-garlic paste until browned.',
      'Add chicken pieces and sear for 5 minutes. Add the crushed masala, turmeric, and salt.',
      'Add drumstick pieces and 1 cup water. Cover and simmer for 15 minutes until chicken is tender and drumstick juices permeate the curry.'
    ],
    ayurvedicNote: 'Drumsticks and black pepper enhance bio-availability of poultry proteins and clear upper respiratory Kapha.',
    accompaniments: 'Kerala Parotta, Steamed Dosa, or hot Ponni Rice.',
    pantrySubstitutions: 'Can be made with mutton or paneer/mushroom for vegetarian days.'
  },
  {
    id: 'rec_mangalore_fish_curry',
    title: 'Mangalorean Fish Curry with Ladyfinger (Meen Gassi)',
    hindiTitle: 'मेंगलूरु फिश करी (Mangalore Fish Curry with Bhindi)',
    mealType: 'Lunch',
    dietType: 'Non-Vegetarian',
    region: 'South',
    cuisine: 'South Indian',
    prepTimeMins: 15,
    cookTimeMins: 20,
    calories: 340,
    proteinGrams: 26,
    fiberGrams: 3,
    featuredVegetables: ['Okra / Ladyfinger (Bhindi)'],
    ingredients: [
      { item: 'Kingfish (Surmai) or Pomfret steaks', quantity: '350g', isStaple: true },
      { item: 'Bhindi (Okra), slit lengthwise', quantity: '8-10 pieces', isStaple: false },
      { item: 'Fresh grated coconut, ground to paste', quantity: '1/2 cup', isStaple: true },
      { item: 'Byadagi dried red chilies & Coriander seeds', quantity: '4-5', isStaple: true },
      { item: 'Tamarind pulp or Kudampuli', quantity: '1 tbsp', isStaple: true },
      { item: 'Coconut oil & Fenugreek seeds', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Grind roasted red chilies, coriander seeds, cumin, fenugreek, garlic, and coconut into a fine fragrant paste.',
      'In a clay pot or deep pan, heat coconut oil, add curry leaves, ground coconut masala, and tamarind water.',
      'Bring to a rolling boil. Add slit bhindi and cook for 5 minutes until half-done.',
      'Gently place fish steaks into the curry. Simmer on low heat for 6-8 minutes without stirring violently.',
      'Rest for 20 minutes before serving to let coastal flavors infuse.'
    ],
    ayurvedicNote: 'Tamarind and coconut fats balance the heating potency of sea fish while okra adds protective soothing fiber.',
    accompaniments: 'Boiled Red Matta Rice or Neer Dosa.',
    pantrySubstitutions: 'Can substitute fish with Prawns or hard-boiled eggs.'
  },

  // ==========================================
  // --- GUJARATI CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_methi_thepla',
    title: 'Gujarati Methi Thepla (Fenugreek Flatbreads)',
    hindiTitle: 'मेथी थेपला (Methi Thepla)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Gujarati',
    prepTimeMins: 15,
    cookTimeMins: 12,
    calories: 195,
    proteinGrams: 6,
    fiberGrams: 4,
    featuredVegetables: ['Fresh Fenugreek Leaves (Methi)'],
    ingredients: [
      { item: 'Fresh Methi leaves, finely chopped', quantity: '1.5 cups', isStaple: false },
      { item: 'Whole wheat flour (Atta)', quantity: '1.5 cups', isStaple: true },
      { item: 'Besan (Gram flour)', quantity: '2 tbsp', isStaple: true },
      { item: 'Ajwain (Carom seeds), crushed', quantity: '1/2 tsp', isStaple: true },
      { item: 'Curd / Yogurt', quantity: '2 tbsp', isStaple: true },
      { item: 'Turmeric, red chili, sesame seeds (Til)', quantity: '1 tsp each', isStaple: true },
      { item: 'Oil / Ghee for kneading and roasting', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'In a wide mixing bowl, mix atta, besan, chopped methi leaves, ajwain, til, turmeric, chili powder, curd, 1 tbsp oil, and salt.',
      'Knead into a soft dough using minimal warm water. Rest for 10 minutes.',
      'Divide into small balls and roll out thinly with a rolling pin.',
      'Cook on a hot tawa with a few drops of oil/ghee on both sides until golden brown spots appear.',
      'Stays fresh for 2-3 days; excellent for travel or morning breakfast.'
    ],
    ayurvedicNote: 'Fenugreek leaves and ajwain stimulate morning sluggish digestion and regulate blood glucose spikes.',
    accompaniments: 'Fresh Chhundo (sweet mango pickle), plain curd, or spiced Masala Chai.',
    pantrySubstitutions: 'Can replace fresh methi with chopped spinach and 1 tbsp Kasuri methi.'
  },
  {
    id: 'rec_turai_moong_dal',
    title: 'Gujarati Turai Moong Dal (Ridge Gourd with Yellow Lentils)',
    hindiTitle: 'તોરી મગની દાળ (Tori Moong Dal)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Gujarati',
    prepTimeMins: 10,
    cookTimeMins: 15,
    calories: 185,
    proteinGrams: 8,
    fiberGrams: 5,
    featuredVegetables: ['Ridge Gourd (Turai)'],
    ingredients: [
      { item: 'Ridge gourd (Turai), peeled and sliced', quantity: '350g', isStaple: false },
      { item: 'Yellow Moong Dal, washed', quantity: '1/3 cup', isStaple: true },
      { item: 'Mustard seeds (Rai)', quantity: '1/2 tsp', isStaple: true },
      { item: 'Cumin seeds', quantity: '1/2 tsp', isStaple: true },
      { item: 'Curry leaves', quantity: '8-10', isStaple: true },
      { item: 'Asafoetida (Hing)', quantity: '1 pinch', isStaple: true },
      { item: 'Ghee or Peanut oil', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Heat ghee in a pan; temper with mustard seeds, cumin, hing, and curry leaves.',
      'Add chopped ridge gourd, turmeric powder, washed yellow moong dal, and salt.',
      'Add 1 cup water, cover with lid, and cook on low-medium flame for 12-15 minutes until both turai and dal are meltingly soft.',
      'Lightly mash with a ladle to achieve a comforting soupy consistency and finish with a squeeze of fresh lemon and jaggery pinch.'
    ],
    ayurvedicNote: 'Yellow moong and ridge gourd form the gold standard for easy night-time digestion during humid summer and monsoon evenings.',
    accompaniments: 'Warm Jowar Bhakri or Soft Phulkas.',
    pantrySubstitutions: 'Can replace Yellow Moong Dal with Masoor Dal.'
  },
  {
    id: 'rec_gujarati_undhiyu',
    title: 'Surti Undhiyu (Winter Vegetable Medley with Methi Muthiyas)',
    hindiTitle: 'સૂરતી ઊંધિયું (Surti Undhiyu)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Gujarati',
    prepTimeMins: 20,
    cookTimeMins: 30,
    calories: 310,
    proteinGrams: 9,
    fiberGrams: 8,
    featuredVegetables: ['Fresh Fenugreek Leaves (Methi)', 'Purple Yam (Kand)', 'Raw Green Banana (Kachha Kela)'],
    ingredients: [
      { item: 'Surti Papdi (Flat green beans) & Tuvar lilva', quantity: '200g', isStaple: false },
      { item: 'Purple Yam (Kand), Small Brinjals & Raw Banana', quantity: '200g', isStaple: false },
      { item: 'Methi Muthiyas (Steamed/fried fenugreek dumplings)', quantity: '8-10', isStaple: true },
      { item: 'Fresh green garlic, grated coconut & coriander paste', quantity: '1/2 cup', isStaple: true },
      { item: 'Ajwain, Til (Sesame) & Peanut oil', quantity: '2 tbsp', isStaple: true }
    ],
    instructions: [
      'Slit brinjals and small potatoes; stuff with the fresh green garlic, sesame, coconut, and coriander spice mix.',
      'In a heavy-bottomed pot or pressure cooker, heat peanut oil and temper with ajwain and hing.',
      'Layer flat beans (papdi), yam, stuffed brinjals, and raw banana pieces.',
      'Top with methi muthiyas and remaining green masala. Add 1/2 cup water, cover tightly, and slow-cook on low flame.',
      'Toss gently to avoid breaking muthiyas and garnish with fresh coriander and grated coconut.'
    ],
    ayurvedicNote: 'Winter surti papdi and methi muthiyas kindle digestive agni and provide deep grounding vitality against cold weather.',
    accompaniments: 'Hot Puris and Sweet Shrikhand or Jalebi.',
    pantrySubstitutions: 'Can substitute flat beans with French beans or green peas.'
  },

  // ==========================================
  // --- MAHARASHTRIAN CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_egg_bhurji_methi',
    title: 'Maharashtrian Egg Bhurji with Winter Methi',
    hindiTitle: 'अंडा भुर्जी मेथी (Anda Bhurji with Methi)',
    mealType: 'Breakfast',
    dietType: 'Eggitarian',
    region: 'West',
    cuisine: 'Maharashtrian',
    prepTimeMins: 8,
    cookTimeMins: 8,
    calories: 220,
    proteinGrams: 14,
    fiberGrams: 2,
    featuredVegetables: ['Fresh Fenugreek Leaves (Methi)'],
    ingredients: [
      { item: 'Farm fresh Eggs, whisked', quantity: '3 large', isStaple: true },
      { item: 'Fresh Methi leaves, finely chopped', quantity: '1 cup', isStaple: false },
      { item: 'Onion, finely chopped', quantity: '1 medium', isStaple: true },
      { item: 'Green chili and ginger, chopped', quantity: '1 tbsp', isStaple: true },
      { item: 'Turmeric and Pav Bhaji / Kanda Lasun masala', quantity: '1/2 tsp', isStaple: true },
      { item: 'Butter or Peanut Oil', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Melt butter in a pan; sauté chopped onions, ginger, and green chilies until translucent.',
      'Add chopped methi leaves and sauté for 2 minutes until wilted and aromatic.',
      'Add turmeric, salt, and spices. Pour in the whisked eggs.',
      'Scramble gently on medium-low heat until soft curds form. Do not overdry. Serve hot.'
    ],
    ayurvedicNote: 'Eggs provide bioavailable morning protein and healthy fats, balanced by bitter methi to prevent liver heaviness.',
    accompaniments: 'Warm Whole Wheat Pav or Jowar Bhakri.',
    pantrySubstitutions: 'Can substitute eggs with crumbled Paneer for vegetarian days.'
  },
  {
    id: 'rec_bharli_vangi',
    title: 'Maharashtrian Bharli Vangi (Stuffed Brinjal with Peanut Goda Masala)',
    hindiTitle: 'भरली वांगी (Bharli Vangi)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Maharashtrian',
    prepTimeMins: 15,
    cookTimeMins: 20,
    calories: 240,
    proteinGrams: 7,
    fiberGrams: 6,
    featuredVegetables: ['Small Brinjal / Eggplant (Baingan)'],
    ingredients: [
      { item: 'Small purple brinjals (Vangi), slit crosswise', quantity: '6-8', isStaple: false },
      { item: 'Roasted peanut powder (Shengdana koot)', quantity: '1/2 cup', isStaple: true },
      { item: 'Desiccated dry coconut & Goda Masala', quantity: '2 tbsp each', isStaple: true },
      { item: 'Ginger-garlic paste & Jaggery', quantity: '1 tbsp each', isStaple: true },
      { item: 'Peanut oil & Mustard seeds', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Mix roasted peanut powder, goda masala, coconut, ginger-garlic paste, jaggery, turmeric, red chili, and salt.',
      'Stuff this nutty mixture firmly inside each slit brinjal.',
      'Heat peanut oil in a kadai, temper with mustard seeds and hing, then add the stuffed brinjals.',
      'Sauté for 3-4 minutes, add the remaining stuffing with 1 cup warm water, cover, and simmer for 15 minutes until brinjals are meltingly tender.'
    ],
    ayurvedicNote: 'Peanut powder and goda masala ground the cooling Vata properties of autumn eggplants.',
    accompaniments: 'Hot Jowar (Sorghum) or Bajra Bhakri with Thecha.',
    pantrySubstitutions: 'Can replace Goda Masala with Garam Masala and coriander powder.'
  },

  // ==========================================
  // --- RAJASTHANI CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_rajasthani_gatte_methi',
    title: 'Rajasthani Methi Gatte ki Sabzi (Gram Flour Dumplings in Curd Gravy)',
    hindiTitle: 'मेथी गट्टे की सब्ज़ी (Methi Gatte ki Sabzi)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Rajasthani',
    prepTimeMins: 15,
    cookTimeMins: 20,
    calories: 270,
    proteinGrams: 11,
    fiberGrams: 5,
    featuredVegetables: ['Fresh Fenugreek Leaves (Methi)'],
    ingredients: [
      { item: 'Besan (Gram flour) & Fresh chopped methi', quantity: '1 cup & 1/2 cup', isStaple: true },
      { item: 'Whisked fresh curd / Yogurt', quantity: '1 cup', isStaple: true },
      { item: 'Ajwain (Carom seeds) & Fennel (Saunf)', quantity: '1/2 tsp each', isStaple: true },
      { item: 'Ginger & Green chili paste', quantity: '1 tbsp', isStaple: true },
      { item: 'Mustard oil or Desi Ghee', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Knead besan with chopped methi, ajwain, turmeric, chili powder, 1 tbsp oil, and 2 tbsp curd into a firm dough.',
      'Roll into 1/2-inch cylinders and boil in water for 10 minutes until dumplings float to top. Slice into bite-sized gatte.',
      'Whisk curd with coriander powder, turmeric, and chili powder.',
      'Heat ghee in a pot, temper with cumin, fennel, and hing. Pour whisked curd continuously on low flame to prevent splitting.',
      'Add boiled gatte with some gatta boiling broth and simmer for 8 minutes until gravy turns rich and aromatic.'
    ],
    ayurvedicNote: 'Ajwain and methi optimize digestion of high-protein besan, providing wholesome nourishment in arid desert climates.',
    accompaniments: 'Bajra Roti or Missi Roti with homemade white butter.',
    pantrySubstitutions: 'Can substitute fresh methi with Kasuri methi.'
  },

  // ==========================================
  // --- BIHARI CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_bihari_sarson_machhli',
    title: 'Bihari Sarson Machhli with Parwal (Mustard Fish Curry)',
    hindiTitle: 'बिहारी सरसों मछली (Bihari Mustard Fish Curry)',
    mealType: 'Lunch',
    dietType: 'Non-Vegetarian',
    region: 'East',
    cuisine: 'Bihari',
    prepTimeMins: 15,
    cookTimeMins: 22,
    calories: 320,
    proteinGrams: 25,
    fiberGrams: 3,
    featuredVegetables: ['Pointed Gourd (Parwal)'],
    ingredients: [
      { item: 'Rohu or Katla fish steaks', quantity: '350g', isStaple: true },
      { item: 'Parwal, scraped and slit', quantity: '4 pieces', isStaple: false },
      { item: 'Yellow & Black mustard seeds (Pili-Kali Sarson)', quantity: '2 tbsp', isStaple: true },
      { item: 'Garlic cloves (Lehsun), whole', quantity: '10-12 cloves', isStaple: true },
      { item: 'Kachi Ghani Mustard Oil & Methi seeds', quantity: '2 tbsp', isStaple: true },
      { item: 'Amchur or Tomato puree', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Grind mustard seeds, garlic cloves, and 1 green chili into an ultra-smooth yellow paste.',
      'Marinate fish in turmeric and salt; crisp-fry in mustard oil with the parwal pieces and set aside.',
      'In the same smoking oil, crackle methi seeds and red chilies. Add the mustard-garlic paste and turmeric on low heat.',
      'Cook gently until oil separates (do not burn mustard paste). Add 1.5 cups warm water and bring to a simmer.',
      'Add fried fish and parwal, cover, and cook for 5 minutes. Rest 15 minutes before serving.'
    ],
    ayurvedicNote: 'Warming mustard oil and pungent garlic kindle sluggish agni during wet monsoon seasons.',
    accompaniments: 'Steamed Rice with sliced onions and green chili.',
    pantrySubstitutions: 'Can be prepared with hard-boiled eggs or paneer for vegetarian days.'
  },

  // ==========================================
  // --- KASHMIRI CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_kashmiri_haak_saag',
    title: 'Kashmiri Haak Saag (Collard / Mustard Greens with Hing & Mustard Oil)',
    hindiTitle: 'कश्मीरी हाक साग (Kashmiri Haak Saag)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Kashmiri',
    prepTimeMins: 8,
    cookTimeMins: 12,
    calories: 140,
    proteinGrams: 4,
    fiberGrams: 5,
    featuredVegetables: ['Mustard Greens (Sarson)', 'Indian Spinach (Palak)'],
    ingredients: [
      { item: 'Haak leaves (Collard or Tender Mustard greens)', quantity: '350g', isStaple: false },
      { item: 'Whole dried Kashmiri red chilies (Waer)', quantity: '2-3', isStaple: true },
      { item: 'Asafoetida (Hing), dissolved in 1 tbsp warm water', quantity: '1/2 tsp', isStaple: true },
      { item: 'Mustard oil', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Whole green chilies', quantity: '2', isStaple: true }
    ],
    instructions: [
      'Wash haak leaves thoroughly and keep whole with tender stems.',
      'Heat mustard oil in a heavy pot until smoking. Drop in whole dry red chilies and green chilies.',
      'Add the haak leaves, salt, and hing water. Sauté for 1 minute.',
      'Add 1 cup water, cover, and cook on brisk flame for 8-10 minutes until leaves are tender yet bright emerald green.',
      'The broth (Haak rass) is drunk like a soothing tonic.'
    ],
    ayurvedicNote: 'Simplest sattvic green preparation preserving micronutrients without heavy spices, balancing all three Doshas.',
    accompaniments: 'Steamed Kashmiri White Rice.',
    pantrySubstitutions: 'Can use tender radish greens (Mooli ke patte) or tender spinach.'
  },

  // ==========================================
  // --- GOAN & ODIA CUISINE RECIPES ---
  // ==========================================
  {
    id: 'rec_goan_fish_caldino',
    title: 'Goan Fish Caldine with Bottle Gourd (Mild Coconut Stew)',
    hindiTitle: 'गोअन फिश कालदीन (Goan Fish Caldine with Lauki)',
    mealType: 'Lunch',
    dietType: 'Non-Vegetarian',
    region: 'West',
    cuisine: 'Goan',
    prepTimeMins: 12,
    cookTimeMins: 18,
    calories: 330,
    proteinGrams: 24,
    fiberGrams: 4,
    featuredVegetables: ['Bottle Gourd (Lauki)'],
    ingredients: [
      { item: 'Fresh Pomfret or Surmai fish steaks', quantity: '350g', isStaple: true },
      { item: 'Lauki (Bottle Gourd), peeled and sliced', quantity: '200g', isStaple: false },
      { item: 'Thick & Thin Coconut Milk', quantity: '1.5 cups total', isStaple: true },
      { item: 'Coriander seeds, cumin, turmeric, garlic, green chilies (Caldine paste)', quantity: '2 tbsp', isStaple: true },
      { item: 'Coconut oil & White vinegar or Kokum', quantity: '1 tbsp each', isStaple: true }
    ],
    instructions: [
      'Grind fresh coconut with cumin, coriander, turmeric, garlic, and 2 green chilies into a silky Caldine spice paste.',
      'Heat coconut oil, sauté sliced onions and bottle gourd pieces for 3 minutes.',
      'Add Caldine paste and thin coconut milk; bring to a gentle boil until bottle gourd is tender.',
      'Add fish steaks, simmer for 5 minutes, and finish with thick coconut milk and kokum/vinegar.',
      'Warm through without boiling to avoid curdling coconut milk.'
    ],
    ayurvedicNote: 'Mild coconut milk and cooling bottle gourd balance the salty marine heat of fish.',
    accompaniments: 'Goan Red Rice or Steamed Pao.',
    pantrySubstitutions: 'Can use prawns or paneer cubes.'
  },
  {
    id: 'rec_odia_dalma',
    title: 'Odia Temple Dalma (Toor Dal with Raw Papaya, Pumpkin & Drumstick)',
    hindiTitle: 'ଓଡ଼ିଆ ଡାଲମା (Authentic Odia Dalma)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Odia',
    prepTimeMins: 12,
    cookTimeMins: 20,
    calories: 230,
    proteinGrams: 9,
    fiberGrams: 6,
    featuredVegetables: ['Raw Green Papaya / Kaccha Papita', 'Yellow / Red Pumpkin (Kaddu)', 'Moringa / Drumstick (Sahjan)'],
    ingredients: [
      { item: 'Harada Dal (Toor Dal / Split Pigeon Pea)', quantity: '1 cup', isStaple: true },
      { item: 'Raw Papaya, Pumpkin, Drumstick, Taro (Saru) chunks', quantity: '350g total', isStaple: false },
      { item: 'Fresh grated coconut', quantity: '3 tbsp', isStaple: false },
      { item: 'Panch Phoron & Dried red chilies', quantity: '1 tsp', isStaple: true },
      { item: 'Roasted Cumin-Chili Powder (Bhaja Jeera Gunda)', quantity: '1.5 tsp', isStaple: true },
      { item: 'Pure Cow Ghee & Ginger, crushed', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Dry roast toor dal slightly until fragrant, then wash thoroughly.',
      'In a pot or pressure cooker, combine dal, all chopped seasonal vegetables, turmeric, salt, crushed ginger, and 3 cups water.',
      'Cook until dal is soft and vegetables are tender yet retain their shape.',
      'In a small tadka pan, heat ghee, crackle panch phoron and dry red chilies, then pour over the cooked dalma.',
      'Garnish generously with fresh grated coconut and aromatic Bhaja Jeera Gunda (roasted cumin powder).'
    ],
    ayurvedicNote: 'Jagannath temple sacred recipe; combines protein, digestive spices, and cooling seasonal vegetables in complete harmony.',
    accompaniments: 'Steamed Arwa Rice and crisp Roasted Papad.',
    pantrySubstitutions: 'Can include sweet potato or ridge gourd.'
  },

  // ==========================================
  // --- ADDITIONAL REGIONAL CUISINE EXPANSIONS ---
  // ==========================================
  // South Indian Extras
  {
    id: 'rec_south_rava_upma',
    title: 'South Indian Vegetable Rava Upma (Semolina with Mustard & Curry Leaves)',
    hindiTitle: 'रवा उपमा (Vegetable Rava Upma)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'South',
    cuisine: 'South Indian',
    prepTimeMins: 10,
    cookTimeMins: 12,
    calories: 210,
    proteinGrams: 5,
    fiberGrams: 4,
    featuredVegetables: ['Fresh Ginger', 'Carrot', 'Green Peas'],
    ingredients: [
      { item: 'Roasted Sooji / Rava (Semolina)', quantity: '1 cup', isStaple: true },
      { item: 'Carrot & Green beans, finely chopped', quantity: '1/2 cup', isStaple: false },
      { item: 'Mustard seeds, Urad dal, Chana dal', quantity: '1 tsp each', isStaple: true },
      { item: 'Fresh Ginger & Green chilies, minced', quantity: '1 tbsp', isStaple: true },
      { item: 'Curry leaves & Cashews', quantity: '10 leaves & 6 nuts', isStaple: true },
      { item: 'Ghee or Coconut oil', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Roast rava on medium flame until aromatic and set aside.',
      'Heat oil in a pan, crackle mustard seeds, urad dal, chana dal, cashews, and curry leaves.',
      'Add minced ginger, green chilies, and chopped vegetables; sauté for 3 minutes.',
      'Add 2.5 cups water and salt; bring to a rolling boil.',
      'Lower flame and slowly stream in roasted rava while stirring continuously to prevent lumps. Cover and steam for 3 minutes with 1 tsp ghee.'
    ],
    ayurvedicNote: 'Light and easy to digest; ginger and mustard kindle morning Agni without overheating.',
    accompaniments: 'Fresh Coconut Chutney or Tomato Chutney.',
    pantrySubstitutions: 'Can substitute semolina with broken wheat (Dalia) or foxtail millet.'
  },
  {
    id: 'rec_south_pepper_rasam',
    title: 'Spiced Pepper Tomato Rasam with Steamed Rice',
    hindiTitle: 'काली मिर्च टमाटर रसम (Pepper Rasam)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'South',
    cuisine: 'South Indian',
    prepTimeMins: 8,
    cookTimeMins: 10,
    calories: 140,
    proteinGrams: 4,
    fiberGrams: 3,
    featuredVegetables: ['Ripe Tomatoes', 'Fresh Coriander'],
    ingredients: [
      { item: 'Ripe country tomatoes, crushed', quantity: '2 medium', isStaple: false },
      { item: 'Tamarind water & Cooked toor dal water', quantity: '1/2 cup each', isStaple: true },
      { item: 'Black peppercorns & Cumin seeds (Freshly crushed)', quantity: '1.5 tsp', isStaple: true },
      { item: 'Garlic cloves, crushed with skin', quantity: '4-5', isStaple: true },
      { item: 'Mustard seeds, curry leaves, hing, ghee', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Boil crushed tomatoes with tamarind water, turmeric, crushed pepper-cumin powder, crushed garlic, and salt for 6 minutes.',
      'Add dal water and 1 cup water; bring to a gentle frothy simmer (do not boil vigorously).',
      'In a tadka pan, heat ghee, crackle mustard seeds, curry leaves, and hing.',
      'Pour tempering over rasam, cover immediately with lid, and garnish with fresh coriander.'
    ],
    ayurvedicNote: 'Supreme Ayurvedic medicinal soup for clearing respiratory phlegm, improving circulation, and soothing evening fatigue.',
    accompaniments: 'Hot Steamed Rice with a spoon of ghee and crisp papadum.',
    pantrySubstitutions: 'Can use lemon juice instead of tamarind.'
  },

  // Gujarati Extras
  {
    id: 'rec_gujarati_kadhi_khichdi',
    title: 'Gujarati Sweet-Tangy Kadhi with Moong Dal Khichdi',
    hindiTitle: 'ગુજરાતી કઢી અને ખીચડી (Gujarati Kadhi & Khichdi)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Gujarati',
    prepTimeMins: 10,
    cookTimeMins: 15,
    calories: 240,
    proteinGrams: 8,
    fiberGrams: 4,
    featuredVegetables: ['Fresh Ginger', 'Curry Leaves'],
    ingredients: [
      { item: 'Sour Curd / Yogurt & Besan (Gram flour)', quantity: '1 cup & 2 tbsp', isStaple: true },
      { item: 'Jaggery (Gud), grated', quantity: '1.5 tbsp', isStaple: true },
      { item: 'Ginger & Green chili paste', quantity: '1 tbsp', isStaple: true },
      { item: 'Cinnamon stick, Cloves, Methi seeds', quantity: '1/2 tsp each', isStaple: true },
      { item: 'Mustard seeds, Cumin, Hing, Curry leaves', quantity: '1 tsp', isStaple: true },
      { item: 'Pure Cow Ghee', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Whisk curd, besan, 2 cups water, ginger-chili paste, jaggery, and salt until completely smooth.',
      'Simmer on medium flame while stirring continuously until it comes to a gentle boil.',
      'In a tadka pan, heat ghee, add cinnamon, cloves, methi seeds, mustard, cumin, hing, and curry leaves.',
      'Pour sizzling aromatic tadka into the boiling kadhi and simmer for 5 minutes.'
    ],
    ayurvedicNote: 'The synergy of sweet jaggery, sour buttermilk, and pungent spices creates a deeply comforting, tridosha-balancing night meal.',
    accompaniments: 'Warm Moong Dal Khichdi topped with desi ghee and roasted papad.',
    pantrySubstitutions: 'Can add sliced okra or drumsticks.'
  },

  // Maharashtrian Extras
  {
    id: 'rec_maharashtrian_kanda_poha',
    title: 'Maharashtrian Kanda Batata Poha (Flattened Rice with Onions & Peanuts)',
    hindiTitle: 'कांदा पोहा (Kanda Poha)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Maharashtrian',
    prepTimeMins: 8,
    cookTimeMins: 10,
    calories: 220,
    proteinGrams: 5,
    fiberGrams: 3,
    featuredVegetables: ['Onions (Kanda)', 'Potatoes (Batata)'],
    ingredients: [
      { item: 'Thick Poha (Flattened rice), rinsed & drained', quantity: '2 cups', isStaple: true },
      { item: 'Onions, finely chopped & 1 small boiled potato cubed', quantity: '1 cup', isStaple: true },
      { item: 'Raw Peanuts (Shengdana)', quantity: '2 tbsp', isStaple: true },
      { item: 'Mustard seeds, Cumin, Green chilies, Curry leaves', quantity: '1 tbsp', isStaple: true },
      { item: 'Turmeric powder, Salt, Lemon juice', quantity: '1/2 tsp & 1 tbsp', isStaple: true },
      { item: 'Peanut oil & Fresh grated coconut', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Rinse poha in a colander for 30 seconds and let it rest to soften.',
      'Heat oil, fry peanuts until crunchy golden; set aside.',
      'In same oil, crackle mustard, cumin, green chilies, and curry leaves. Add chopped onions and potato cubes; sauté until soft.',
      'Add turmeric, salt, drained poha, and fried peanuts. Toss gently on low heat.',
      'Cover for 2 minutes to steam. Finish with fresh lemon juice and grated coconut.'
    ],
    ayurvedicNote: 'Easily digestible iron-rich breakfast, energizing metabolic Agni without heaviness.',
    accompaniments: 'Fresh Lemon wedge and hot Ginger Chai.',
    pantrySubstitutions: 'Can add green peas or finely chopped carrots.'
  },
  {
    id: 'rec_maharashtrian_pithla_bhakri',
    title: 'Maharashtrian Pithla with Jowar Bhakri & Thecha',
    hindiTitle: 'झणझणीत पिठलं भाकरी (Zunka / Pithla Bhakri)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Maharashtrian',
    prepTimeMins: 8,
    cookTimeMins: 12,
    calories: 260,
    proteinGrams: 10,
    fiberGrams: 6,
    featuredVegetables: ['Garlic & Green Chilies', 'Fresh Coriander'],
    ingredients: [
      { item: 'Besan (Gram flour), whisked with 2 cups water', quantity: '1/2 cup', isStaple: true },
      { item: 'Onions & Garlic, finely chopped', quantity: '1 medium & 8 cloves', isStaple: true },
      { item: 'Mustard seeds, Cumin, Hing, Curry leaves', quantity: '1 tsp', isStaple: true },
      { item: 'Green chili & Garlic Thecha', quantity: '1 tbsp', isStaple: true },
      { item: 'Peanut oil & Fresh Coriander', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Heat peanut oil in a kadai. Crackle mustard, cumin, hing, curry leaves, and lots of garlic.',
      'Add onions and sauté until translucent. Add turmeric and thecha paste.',
      'Pour in the whisked besan slurry while stirring continuously to avoid lumps.',
      'Cover with lid and steam on low flame for 6-8 minutes until glossy and thick.',
      'Garnish with fresh coriander.'
    ],
    ayurvedicNote: 'High protein, warming dinner ideal for cold or rainy evenings; stimulates digestive heat and satisfies appetite.',
    accompaniments: 'Hot Jowar (Sorghum) Bhakri with raw onion and green chili thecha.',
    pantrySubstitutions: 'Can make dry Zunka by using less water.'
  },

  // Rajasthani Extras
  {
    id: 'rec_rajasthani_missi_roti',
    title: 'Rajasthani Spiced Missi Roti with Green Mint Chutney',
    hindiTitle: 'मिस्सी रोटी (Rajasthani Missi Roti)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Rajasthani',
    prepTimeMins: 10,
    cookTimeMins: 10,
    calories: 215,
    proteinGrams: 7,
    fiberGrams: 5,
    featuredVegetables: ['Fresh Mint & Coriander', 'Onions'],
    ingredients: [
      { item: 'Besan (Gram flour) & Gehu Atta (Whole wheat flour)', quantity: '1 cup & 1 cup', isStaple: true },
      { item: 'Ajwain (Carom seeds) & Kasuri Methi', quantity: '1 tsp each', isStaple: true },
      { item: 'Onion & Green chilies, finely chopped', quantity: '1/2 cup', isStaple: true },
      { item: 'Desi Ghee / Butter', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Mix besan, atta, chopped onions, green chilies, ajwain, kasuri methi, turmeric, chili powder, and salt.',
      'Knead into a soft dough with warm water and 1 tsp ghee. Rest 10 minutes.',
      'Roll out medium-thick rotis and cook on hot tawa until crisp with brown spots.',
      'Apply generous desi ghee or white butter while hot.'
    ],
    ayurvedicNote: 'Besan provides slow-burning protein, while ajwain and kasuri methi prevent gas and balance Vata.',
    accompaniments: 'Garlic chutney, curd, or seasonal pickle.',
    pantrySubstitutions: 'Can add finely chopped fresh spinach leaves.'
  },
  {
    id: 'rec_rajasthani_panchmel_dal',
    title: 'Rajasthani Panchmel Dal (Five Lentil Stew with Ghee Tadka)',
    hindiTitle: 'पंचमेल दाल (Panchratna Dal)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Rajasthani',
    prepTimeMins: 10,
    cookTimeMins: 20,
    calories: 250,
    proteinGrams: 12,
    fiberGrams: 7,
    featuredVegetables: ['Tomatoes', 'Fresh Ginger & Green Chili'],
    ingredients: [
      { item: 'Mix of Toor, Moong, Chana, Urad, and Masoor dal', quantity: '1 cup total', isStaple: true },
      { item: 'Tomatoes, chopped & Ginger-garlic paste', quantity: '1/2 cup & 1 tbsp', isStaple: true },
      { item: 'Clove, Cardamom, Bay leaf, Cumin, Hing', quantity: '1 tbsp', isStaple: true },
      { item: 'Desi Ghee & Kasuri methi', quantity: '2 tbsp', isStaple: true }
    ],
    instructions: [
      'Pressure cook the mixed lentils with turmeric, salt, and 3 cups water for 4 whistles.',
      'In a heavy pot, heat ghee. Add whole spices, cumin, hing, and ginger-garlic paste.',
      'Add chopped tomatoes, coriander powder, chili powder, and sauté until ghee separates.',
      'Pour in the cooked dal, simmer for 8 minutes, and finish with crushed kasuri methi and 1 tbsp hot ghee.'
    ],
    ayurvedicNote: 'Balancing five distinct lentil profiles provides a complete amino acid spectrum and balanced digestive footprint.',
    accompaniments: 'Baati, Bajra Roti, or Steamed Basmati Rice.',
    pantrySubstitutions: 'Can use any 3 combinations of available lentils.'
  },

  // Bihari Extras
  {
    id: 'rec_bihari_sattu_paratha',
    title: 'Bihari Sattu Paratha with Roasted Tomato Chokha',
    hindiTitle: 'सत्तू पराठा (Bihari Sattu Paratha)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Bihari',
    prepTimeMins: 12,
    cookTimeMins: 10,
    calories: 240,
    proteinGrams: 9,
    fiberGrams: 5,
    featuredVegetables: ['Garlic & Green Chilies', 'Fresh Coriander', 'Lemon'],
    ingredients: [
      { item: 'Roasted Chana Sattu', quantity: '1 cup', isStaple: true },
      { item: 'Whole wheat flour (Atta)', quantity: '1.5 cups', isStaple: true },
      { item: 'Ajwain, Mangrela (Kalonji), Chopped Garlic & Chili', quantity: '1 tbsp total', isStaple: true },
      { item: 'Mustard Oil (Kachi Ghani) & Lemon juice', quantity: '1 tbsp each', isStaple: true },
      { item: 'Desi Ghee for roasting', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Prepare sattu stuffing: mix sattu with ajwain, kalonji, minced garlic, green chilies, coriander, raw mustard oil, lemon juice, and a splash of pickle masala.',
      'Roll atta dough into discs, stuff with 2 tbsp sattu mix, seal carefully, and roll out.',
      'Roast on a hot griddle with ghee or mustard oil until crispy golden.',
      'Serve hot.'
    ],
    ayurvedicNote: 'Roasted chana sattu is an ancient Indian superfood; cooling, high-protein, and gives steady sustained energy for hours.',
    accompaniments: 'Baingan-Tamatar Chokha and plain curd.',
    pantrySubstitutions: 'Can be made as un-fried Littis baked in an oven or air-fryer.'
  },
  {
    id: 'rec_bihari_litti_chokha',
    title: 'Authentic Bihari Litti with Roasted Baingan Chokha',
    hindiTitle: 'लिट्टी चोखा (Bihari Litti Chokha)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Bihari',
    prepTimeMins: 15,
    cookTimeMins: 25,
    calories: 290,
    proteinGrams: 10,
    fiberGrams: 7,
    featuredVegetables: ['Large Eggplant / Baingan for Roasting', 'Tomatoes', 'Garlic'],
    ingredients: [
      { item: 'Whole wheat flour (Atta) & Sattu', quantity: '1.5 cups & 1 cup', isStaple: true },
      { item: 'Large Baingan (Eggplant) & Tomatoes (Charcoal roasted)', quantity: '1 large & 2 medium', isStaple: false },
      { item: 'Mustard oil, Garlic, Green chili, Coriander', quantity: '2 tbsp', isStaple: true },
      { item: 'Desi Ghee (for dipping littis)', quantity: '2 tbsp', isStaple: true }
    ],
    instructions: [
      'Roast eggplant and tomatoes directly on flame until charred; peel skin and mash with raw mustard oil, minced garlic, green chili, and salt to make rustic Chokha.',
      'Stuff firm whole-wheat dough balls with seasoned sattu mixture.',
      'Bake littis on medium-low flame/oven until golden brown and cracked on surface.',
      'Dip hot littis into melted pure cow ghee and serve with smoky chokha.'
    ],
    ayurvedicNote: 'Charred eggplant pacifies Kapha, while raw mustard oil and roasted sattu ignite robust digestion in winter and autumn.',
    accompaniments: 'Baingan Chokha, Aloo Chokha, and Coriander Chutney.',
    pantrySubstitutions: 'Can roast veggies in an oven if open flame is unavailable.'
  },

  // Kashmiri Extras
  {
    id: 'rec_kashmiri_dum_aloo',
    title: 'Kashmiri Dum Aloo (Slow Cooked Potatoes in Fennel & Ginger Yogurt Gravy)',
    hindiTitle: 'कश्मीरी दम आलू (Kashmiri Dum Aloo)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Kashmiri',
    prepTimeMins: 15,
    cookTimeMins: 25,
    calories: 270,
    proteinGrams: 6,
    fiberGrams: 5,
    featuredVegetables: ['Baby Potatoes', 'Fennel (Saunf)'],
    ingredients: [
      { item: 'Baby Potatoes, peeled, pricked and golden-fried', quantity: '350g', isStaple: false },
      { item: 'Whisked fresh curd / Yogurt', quantity: '1 cup', isStaple: true },
      { item: 'Kashmiri Red Chili powder (Deggi Mirch) & Saunf (Fennel powder)', quantity: '1.5 tbsp each', isStaple: true },
      { item: 'Sonth (Dry Ginger powder) & Hing', quantity: '1 tsp & 1/2 tsp', isStaple: true },
      { item: 'Mustard oil & Cloves/Cardamom', quantity: '2 tbsp', isStaple: true }
    ],
    instructions: [
      'Prick baby potatoes all over and fry in mustard oil until crisp golden.',
      'Whisk yogurt with Kashmiri chili powder, fennel powder, dry ginger powder, and salt.',
      'Heat mustard oil, crackle whole cloves and cardamom with hing, and pour in the spiced yogurt on low heat while whisking.',
      'Add fried potatoes, seal the pot with tight lid (dum), and simmer on very low flame for 15 minutes until gravy is absorbed into potatoes.'
    ],
    ayurvedicNote: 'No onion and no garlic; fennel and dry ginger stimulate deep metabolic warmth and clear winter Vata.',
    accompaniments: 'Steamed Basmati Rice or Kashmiri Sheermal.',
    pantrySubstitutions: 'Can substitute baby potatoes with lotus stem (Nadru).'
  },
  {
    id: 'rec_kashmiri_nadru_yakhni',
    title: 'Kashmiri Nadru Yakhni (Lotus Stem in Minted Fennel Yogurt Gravy)',
    hindiTitle: 'कश्मीरी नदरू यखनी (Lotus Root Yakhni)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Kashmiri',
    prepTimeMins: 12,
    cookTimeMins: 20,
    calories: 210,
    proteinGrams: 6,
    fiberGrams: 6,
    featuredVegetables: ['Lotus Stem / Kamal Kakdi (Nadru)', 'Dried Mint (Pudina)'],
    ingredients: [
      { item: 'Nadru (Lotus root), sliced diagonally and boiled', quantity: '300g', isStaple: false },
      { item: 'Fresh curd / Yogurt, whisked smooth', quantity: '1.5 cups', isStaple: true },
      { item: 'Fennel powder (Saunf) & Dry ginger (Sonth)', quantity: '1 tbsp & 1 tsp', isStaple: true },
      { item: 'Black & Green Cardamom, Cumin, Bay leaf', quantity: '1 tsp', isStaple: true },
      { item: 'Mustard oil & Dried crushed mint', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Boil sliced lotus stem with salt until tender.',
      'In a pot, whisk curd and simmer continuously on medium heat until it comes to a single boil (prevents curdling).',
      'Add fennel powder, dry ginger, crushed cardamoms, and the boiled nadru slices.',
      'In a separate pan, heat mustard oil, crackle cumin seeds and hing, and pour tadka over the bubbling yakhni.',
      'Simmer for 5 minutes and sprinkle crushed dried mint on top.'
    ],
    ayurvedicNote: 'Lotus root is rich in dietary fiber and cooling minerals, pacifying Pitta and tonifying lung vitality.',
    accompaniments: 'Steamed Kashmiri Rice.',
    pantrySubstitutions: 'Can replace lotus stem with bottle gourd or white turnip.'
  },

  // Awadhi Extras
  {
    id: 'rec_awadhi_subz_biryani',
    title: 'Awadhi Dum Subz Biryani (Fragrant Layered Rice with Seasonal Veggies)',
    hindiTitle: 'अवधी दम बिरयानी (Awadhi Vegetable Dum Biryani)',
    mealType: 'Lunch',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Awadhi',
    prepTimeMins: 20,
    cookTimeMins: 30,
    calories: 320,
    proteinGrams: 8,
    fiberGrams: 6,
    featuredVegetables: ['Cauliflower (Phool Gobhi)', 'Carrots', 'Green Peas'],
    ingredients: [
      { item: 'Aged Basmati Rice, 70% parboiled with whole spices', quantity: '1.5 cups', isStaple: true },
      { item: 'Cauliflower florets, carrots, beans & green peas', quantity: '300g total', isStaple: false },
      { item: 'Fried onions (Birista) & Whisked yogurt', quantity: '1/2 cup each', isStaple: true },
      { item: 'Saffron milk & Kewra water', quantity: '2 tbsp', isStaple: true },
      { item: 'Pure Cow Ghee & Shahi Garam Masala', quantity: '2 tbsp', isStaple: true }
    ],
    instructions: [
      'Sauté mixed vegetables in ghee with shahi garam masala, ginger-garlic, and yogurt until half-cooked.',
      'In a heavy handi, layer half the cooked vegetables, topped with parboiled basmati rice, fried onions, fresh mint, and coriander.',
      'Repeat layer, drizzle saffron-infused warm milk and kewra water with dollops of desi ghee.',
      'Seal lid with dough or foil and slow-cook on dum (very low heat) for 15 minutes.'
    ],
    ayurvedicNote: 'Saffron, cardamom, and ghee elevate mood and nourish Ojas (vital immunity).',
    accompaniments: 'Burani Garlic Raita or Cucumber Mint Raita.',
    pantrySubstitutions: 'Can add paneer cubes or soya chunks.'
  },
  {
    id: 'rec_awadhi_paneer_korma',
    title: 'Awadhi Shahi Paneer Korma with Cashew & Cardamom',
    hindiTitle: 'अवधी शाही पनीर कोरमा (Awadhi Paneer Korma)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'North',
    cuisine: 'Awadhi',
    prepTimeMins: 12,
    cookTimeMins: 18,
    calories: 310,
    proteinGrams: 15,
    fiberGrams: 3,
    featuredVegetables: ['Fresh Ginger', 'Onions'],
    ingredients: [
      { item: 'Fresh soft Paneer cubes', quantity: '200g', isStaple: true },
      { item: 'Cashew nuts (Kaju) & Melon seeds paste', quantity: '3 tbsp', isStaple: true },
      { item: 'Whisked yogurt & Golden fried onion paste', quantity: '1/2 cup each', isStaple: true },
      { item: 'Green cardamom, mace (Javitri), cloves', quantity: '1 tsp', isStaple: true },
      { item: 'Desi Ghee & Fresh cream/milk', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Heat ghee, crackle cardamom, mace, and cloves.',
      'Add fried onion paste and ginger-garlic paste; cook for 2 minutes.',
      'Lower flame, add cashew paste and whisked yogurt; simmer until glossy.',
      'Add 1/2 cup warm milk, salt, and soft paneer cubes. Simmer gently for 4 minutes without boiling vigorously.'
    ],
    ayurvedicNote: 'Mace and cardamom aid digestion of rich dairy proteins while supporting restorative evening sleep.',
    accompaniments: 'Soft Phulkas, Sheermal, or Jeera Rice.',
    pantrySubstitutions: 'Can substitute paneer with boiled eggs or mushrooms.'
  },

  // Goan Extras
  {
    id: 'rec_goan_ross_omelette',
    title: 'Goan Street Ross Omelette with Mild Spiced Gravy',
    hindiTitle: 'गोअन रॉस आमलेट (Goan Ross Omelette)',
    mealType: 'Breakfast',
    dietType: 'Eggitarian',
    region: 'West',
    cuisine: 'Goan',
    prepTimeMins: 10,
    cookTimeMins: 12,
    calories: 260,
    proteinGrams: 16,
    fiberGrams: 3,
    featuredVegetables: ['Onions', 'Fresh Coriander', 'Tomatoes'],
    ingredients: [
      { item: 'Farm fresh Eggs, beaten with onions and chilies', quantity: '3 large', isStaple: true },
      { item: 'Goan coconut curry gravy (Ross)', quantity: '1 cup', isStaple: true },
      { item: 'Onions, finely chopped with fresh lime', quantity: '1/2 cup', isStaple: true },
      { item: 'Coconut oil or Butter', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Make a fluffy 3-egg omelette loaded with chopped onions, green chilies, and fresh coriander in coconut oil.',
      'Place hot omelette in a deep serving bowl.',
      'Ladle piping hot aromatic Goan coconut-spiced gravy (Ross) all over the omelette.',
      'Top with finely diced raw onions and a squeeze of fresh lime.'
    ],
    ayurvedicNote: 'Protein-dense coastal morning fuel balanced by the digestive properties of coconut and mild spices.',
    accompaniments: 'Warm Goan Pao or Whole Wheat Toast.',
    pantrySubstitutions: 'Can replace omelette with pan-seared paneer slabs for vegetarian days.'
  },
  {
    id: 'rec_goan_vegetable_khatkhate',
    title: 'Traditional Goan Vegetable Khatkhate (Mixed Gourd Stew with Teppal & Coconut)',
    hindiTitle: 'गोअन खातखाते (Goan Khatkhate)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'West',
    cuisine: 'Goan',
    prepTimeMins: 15,
    cookTimeMins: 20,
    calories: 215,
    proteinGrams: 7,
    fiberGrams: 6,
    featuredVegetables: ['Yellow Pumpkin', 'Sweet Potato', 'Raw Banana', 'Radish'],
    ingredients: [
      { item: 'Mixed pumpkin, sweet potato, raw banana, radish cubes', quantity: '350g total', isStaple: false },
      { item: 'Toor Dal (Pigeon pea), cooked', quantity: '1/2 cup', isStaple: true },
      { item: 'Fresh grated coconut & Jaggery', quantity: '1/2 cup & 1 tbsp', isStaple: true },
      { item: 'Teppal (Sichuan pepper/Tirphal), crushed in water', quantity: '6-8 berries', isStaple: true },
      { item: 'Tamarind pulp & Turmeric', quantity: '1 tbsp & 1/2 tsp', isStaple: true }
    ],
    instructions: [
      'Boil mixed vegetables with tamarind water, turmeric, and salt until tender.',
      'Grind fresh coconut with roasted red chilies and coriander seeds into a smooth paste.',
      'Add cooked dal and coconut masala to the boiled vegetables.',
      'Add crushed teppal water and jaggery; simmer for 8 minutes to release authentic coastal aroma.'
    ],
    ayurvedicNote: 'Teppal berries prevent gas from legumes and provide antimicrobial digestive protection in humid coastal weather.',
    accompaniments: 'Steamed Goan Red Rice or Phulkas.',
    pantrySubstitutions: 'If Teppal is unavailable, use a pinch of Sichuan pepper or black pepper.'
  },

  // Odia Extras
  {
    id: 'rec_odia_chakuli_pitha',
    title: 'Odia Chakuli Pitha with Spiced Aloo Jhola',
    hindiTitle: 'ଚକୁଳି ପିଠା (Odia Chakuli Pitha)',
    mealType: 'Breakfast',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Odia',
    prepTimeMins: 10,
    cookTimeMins: 10,
    calories: 220,
    proteinGrams: 6,
    fiberGrams: 4,
    featuredVegetables: ['Fresh Ginger', 'Curry Leaves'],
    ingredients: [
      { item: 'Rice & Urad dal fermented batter', quantity: '2 cups', isStaple: true },
      { item: 'Ginger, grated & Cumin seeds', quantity: '1 tsp each', isStaple: true },
      { item: 'Desi Ghee or Mustard oil for griddle', quantity: '1 tbsp', isStaple: true }
    ],
    instructions: [
      'Mix grated ginger, cumin seeds, and salt into the light fermented chakuli batter.',
      'Pour a ladle of batter on hot tawa; spread gently into a soft spongy crepe.',
      'Drizzle a few drops of ghee and cook until underside is soft golden.',
      'Serve hot and spongy.'
    ],
    ayurvedicNote: 'Fermentation breaks down phytic acid, making nutrients and gut-friendly probiotics readily absorbable.',
    accompaniments: 'Spiced Odia Aloo Jhola or Chhena Jaggery.',
    pantrySubstitutions: 'Can be made using instant oats and urad dal flour.'
  },
  {
    id: 'rec_odia_santula',
    title: 'Odia Vegetable Santula (Mild Steamed Vegetables Tempered with Panch Phoron)',
    hindiTitle: 'ଓଡ଼ିଆ ସନ୍ତୁଳା (Authentic Odia Santula)',
    mealType: 'Dinner',
    dietType: 'Vegetarian',
    region: 'East',
    cuisine: 'Odia',
    prepTimeMins: 10,
    cookTimeMins: 15,
    calories: 150,
    proteinGrams: 4,
    fiberGrams: 6,
    featuredVegetables: ['Raw Green Papaya', 'Ridge Gourd (Jhinga)', 'Pumpkin', 'Brinjal'],
    ingredients: [
      { item: 'Raw papaya, ridge gourd, pumpkin, brinjal, string beans', quantity: '350g total', isStaple: false },
      { item: 'Milk or Water for gentle boiling', quantity: '1/2 cup', isStaple: true },
      { item: 'Panch Phoron (Mustard, Cumin, Fennel, Fenugreek, Nigella)', quantity: '1 tsp', isStaple: true },
      { item: 'Garlic cloves, crushed & Green chilies', quantity: '8 cloves & 2 chilies', isStaple: true },
      { item: 'Pure Cow Ghee or Mustard Oil', quantity: '1.5 tbsp', isStaple: true }
    ],
    instructions: [
      'Boil all cut seasonal vegetables in 1/2 cup milk or water with salt and turmeric until tender.',
      'In a tadka pan, heat ghee/mustard oil. Crackle panch phoron, green chilies, and lots of crushed garlic until fragrant golden.',
      'Pour hot aromatic tempering directly into the boiled vegetables.',
      'Cover pot with lid immediately for 5 minutes so the steam traps the garlic-panch phoron essence.'
    ],
    ayurvedicNote: 'Ultra-light, soothing evening meal with minimal oil; easily processed by tired digestive systems before sleep.',
    accompaniments: 'Warm Soft Roti or Steamed Rice.',
    pantrySubstitutions: 'Can include bottle gourd or sweet potato.'
  }
];

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES_DATABASE.find(r => r.id === id);
}

export function filterRecipesByDiet(diet: 'Vegetarian' | 'Non-Vegetarian' | 'Eggitarian'): Recipe[] {
  if (diet === 'Vegetarian') {
    return RECIPES_DATABASE.filter(r => r.dietType === 'Vegetarian');
  }
  return RECIPES_DATABASE;
}

export function filterRecipesByCuisines(cuisines: IndianCuisine[]): Recipe[] {
  if (cuisines.includes('All Cuisines') || cuisines.length === 0) {
    return RECIPES_DATABASE;
  }
  return RECIPES_DATABASE.filter(r => cuisines.includes(r.cuisine));
}
