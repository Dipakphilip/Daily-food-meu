import { Vegetable } from '../types';

export const SEASONAL_VEGETABLES: Vegetable[] = [
  // --- SUMMER & MONSOON GOURDS (Grishma & Varsha) ---
  {
    id: 'lauki',
    englishName: 'Bottle Gourd',
    hindiName: 'लौकी / घिया (Lauki / Ghiya)',
    botanicalName: 'Lagenaria siceraria',
    regionalNames: {
      tamil: 'Suraakkai (சுரைக்காய்)',
      telugu: 'Sorakaya (సొరకాయ)',
      kannada: 'Sorekayi (ಸೋರೆಕಾಯಿ)',
      malayalam: 'Churakka (ചുരയ്ക്ക)',
      bengali: 'Lau (লাউ)',
      marathi: 'Dudhi (दुधी)',
      gujarati: 'Dudhi (દૂધી)',
      punjabi: 'Ghiya / Kaddu (ਘੀਆ)'
    },
    category: 'Gourds & Melons',
    peakMonths: [4, 5, 6, 7, 8],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Vata, light on Kapha',
      digestionEase: 'Very Light'
    },
    healthBenefits: [
      '96% water content provides deep cellular hydration during summer heatwaves.',
      'Soothes digestive acidity, heartburn, and promotes liver detoxification.',
      'Extremely gentle on the gut, ideal during recovery or light evening dinners.',
      'Helps regulate blood pressure due to high potassium and low sodium.'
    ],
    nutritionalHighlights: ['Vitamin C (12% DV)', 'Potassium (150mg)', 'Dietary Fiber (1.2g)', 'Zero Cholesterol'],
    pantryPairings: ['Chana Dal', 'Cumin (Jeera)', 'Turmeric (Haldi)', 'Ginger', 'Curry Leaves', 'Mustard Seeds'],
    flavorProfile: 'Mild, subtle sweet undertone, absorbs spices delicately.',
    selectionTips: 'Look for pale green, firm, unblemished skin that punctures easily with a gentle fingernail test.',
    associatedRecipeIds: ['rec_lauki_chana_dal', 'rec_lauki_raita', 'rec_lauki_thepla']
  },
  {
    id: 'turai',
    englishName: 'Ridge Gourd',
    hindiName: 'तुरई / तोरी (Turai / Tori)',
    botanicalName: 'Luffa acutangula',
    regionalNames: {
      tamil: 'Peerkangai (பீர்க்கங்காய்)',
      telugu: 'Beerakaya (బీరకాయ)',
      kannada: 'Heerekayi (ಹೀರೇಕಾಯಿ)',
      malayalam: 'Peechinga (പീച്ചിങ്ങ)',
      bengali: 'Jhinge (ঝিঙে)',
      marathi: 'Dodka (दोडका)',
      gujarati: 'Turia (તુરીયા)',
      punjabi: 'Tori (ਤੋਰੀ)'
    },
    category: 'Gourds & Melons',
    peakMonths: [5, 6, 7, 8, 9],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)', 'Tikta (Mild Bitter)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Kapha, cleanses Rakta (blood)',
      digestionEase: 'Very Light'
    },
    healthBenefits: [
      'High in peptides that act like insulin to assist blood sugar moderation.',
      'Rich in cellulose fiber preventing summer sluggishness and constipation.',
      'High beta-carotene for vision and skin nourishment under harsh sunlight.',
      'Peel can be turned into a fiber-dense regional chutney/thogayal without zero waste.'
    ],
    nutritionalHighlights: ['Vitamin A & C', 'Zinc', 'Magnesium', 'Low Calorie (17 kcal/100g)'],
    pantryPairings: ['Moong Dal', 'Crushed Peanuts', 'Mustard Seeds', 'Asafoetida (Hing)', 'Green Chilies'],
    flavorProfile: 'Soft, naturally sweet flesh with slight herbal crunch from the ridge ribs.',
    selectionTips: 'Pick slim, dark green gourds with sharp defined ridges; avoid thick, fibrous mature ones.',
    associatedRecipeIds: ['rec_turai_moong_dal', 'rec_beerakaya_pappu', 'rec_dodka_bhaji']
  },
  {
    id: 'karela',
    englishName: 'Bitter Gourd',
    hindiName: 'करेला (Karela)',
    botanicalName: 'Momordica charantia',
    regionalNames: {
      tamil: 'Pavakkai (பாகற்காய்)',
      telugu: 'Kakarakaya (కాకరకాయ)',
      kannada: 'Hagalkayi (ಹಾಗಲಕಾಯಿ)',
      malayalam: 'Pavakka (പാവയ്ക്ക)',
      bengali: 'Uchhe / Korola (উচ্ছে / করলা)',
      marathi: 'Karle (कारले)',
      gujarati: 'Karela (કારેલા)',
      punjabi: 'Karela (ਕਰੇਲਾ)'
    },
    category: 'Gourds & Melons',
    peakMonths: [3, 4, 5, 6, 7, 8],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Tikta (Bitter)'],
      virya: 'Cooling post-digestive / Heating initial',
      doshaBalance: 'Strongly pacifies Kapha & Pitta, purifies liver and blood',
      digestionEase: 'Light & Stimulating'
    },
    healthBenefits: [
      'Contains Charantin and Polypeptide-p with clinically studied anti-hyperglycemic properties.',
      'Deeply detoxifies the liver, clears skin acne, and boosts seasonal immunity.',
      'Stimulates bile secretion to rejuvenate sluggish Spring/Summer digestion.',
      'Natural anthelmintic (clears internal gut parasites).'
    ],
    nutritionalHighlights: ['Vitamin C (84mg/100g)', 'Folate', 'Iron', 'Potassium'],
    pantryPairings: ['Jaggery / Tamarind (to balance bitterness)', 'Onions', 'Fennel (Saunf)', 'Amchur', 'Mustard Oil'],
    flavorProfile: 'Distinct pungent bitter with earthy complexity when pan-seared or tempered.',
    selectionTips: 'Small to medium dark-green gourds with tight prickles have the most active medicinal compounds.',
    associatedRecipeIds: ['rec_karela_pyaz_sabzi', 'rec_pavakkai_pitlai', 'rec_karela_crisps']
  },
  {
    id: 'bhindi',
    englishName: 'Okra / Ladyfinger',
    hindiName: 'भिंडी (Bhindi)',
    botanicalName: 'Abelmoschus esculentus',
    regionalNames: {
      tamil: 'Vendakkai (வெண்டைக்காய்)',
      telugu: 'Bendakaya (బెండకాయ)',
      kannada: 'Bhendekayi (ಬೆಂಡೆಕಾಯಿ)',
      malayalam: 'Vendakka (വെണ്ടയ്ക്ക)',
      bengali: 'Dherosh (ঢ্যাঁড়শ)',
      marathi: 'Bhendi (भेंडी)',
      gujarati: 'Bhinda (ભીંડા)',
      punjabi: 'Bhindi (ਭਿੰਡੀ)'
    },
    category: 'Pods & Beans',
    peakMonths: [4, 5, 6, 7, 8, 9],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)', 'Kashaya (Astringent)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Vata & Pitta, increases Kapha slightly if sticky',
      digestionEase: 'Moderate'
    },
    healthBenefits: [
      'Mucilage coating lines the stomach lining, shielding against gastric ulcers.',
      'Rich in soluble pectin fiber that lowers LDL blood cholesterol.',
      'High folate levels essential for maternal health and cellular DNA repair.',
      'Cooked dry with amchur or ajwain to eliminate sliminess and aid digestion.'
    ],
    nutritionalHighlights: ['Soluble Fiber', 'Vitamin K', 'Folate', 'Vitamin B6'],
    pantryPairings: ['Ajwain (Carom seeds)', 'Amchur (Dry mango)', 'Onions', 'Coriander powder', 'Mustard oil / Ghee'],
    flavorProfile: 'Tender grassy pod with mild earthy seeds that caramelize beautifully.',
    selectionTips: 'Tips should snap crisply when bent; avoid limp or overly long woody pods.',
    associatedRecipeIds: ['rec_bhindi_masala', 'rec_vendakkai_mandi', 'rec_dherosh_shorshe']
  },
  {
    id: 'drumstick',
    englishName: 'Moringa / Drumstick',
    hindiName: 'सहजन / सहिजन (Sahjan / Drumstick)',
    botanicalName: 'Moringa oleifera',
    regionalNames: {
      tamil: 'Murungakkai (முருங்கைக்காய்)',
      telugu: 'Mulakkada (మునగకాయ)',
      kannada: 'Nuggekayi (ನುಗ್ಗೆಕಾಯಿ)',
      malayalam: 'Muringakka (മുരിങ്ങയ്ക്ക)',
      bengali: 'Sojne Danta (সজনে ডাঁটা)',
      marathi: 'Shevga Sheng (शेवगा शेंग)',
      gujarati: 'Saragvo (સરગવો)',
      punjabi: 'Sohanjna (ਸੁਹਾਂਜਣਾ)'
    },
    category: 'Pods & Beans',
    peakMonths: [2, 3, 4, 5, 10, 11],
    zones: ['South', 'West', 'East', 'Central', 'North'],
    ayurvedicProperties: {
      taste: ['Katu (Pungent)', 'Tikta (Bitter)', 'Madhura (Sweet)'],
      virya: 'Heating (Ushna)',
      doshaBalance: 'Pacifies Kapha and Vata, stimulates metabolic Agni',
      digestionEase: 'Light'
    },
    healthBenefits: [
      'Known as the Indian Superfood Tree; pods contain 7x the Vitamin C of oranges.',
      'Potent anti-inflammatory bioactives for joint mobility and arthritis comfort.',
      'Strengthens bone density with bioavailable calcium and phosphorus.',
      'Antibacterial and immunity-fortifying during seasonal transition periods.'
    ],
    nutritionalHighlights: ['Calcium (30mg/100g)', 'Iron', 'Vitamin C (120mg)', 'Potassium'],
    pantryPairings: ['Toor Dal', 'Tamarind', 'Sambar Masala', 'Mustard Seeds', 'Shallots (Sambar Onions)'],
    flavorProfile: 'Woody outer sheath yielding gelatinous, umami-rich sweet and peppery pulp.',
    selectionTips: 'Choose tender green drumsticks as thick as a finger; avoid yellowing over-matured ones.',
    associatedRecipeIds: ['rec_murungakkai_sambar', 'rec_sojne_danta_chorchori', 'rec_shevga_rassa']
  },
  {
    id: 'parwal',
    englishName: 'Pointed Gourd',
    hindiName: 'परवल / पटल (Parwal / Patal)',
    botanicalName: 'Trichosanthes dioica',
    regionalNames: {
      bengali: 'Potol (পটল)',
      odia: 'Potala (ପୋଟଳ)',
      marathi: 'Parwal (परवळ)',
      gujarati: 'Parwal (પરવળ)',
      punjabi: 'Parwal (ਪਰਵਲ)',
      tamil: 'Kovakkai / Parwal (நாட்டுப்பாவக்காய்)'
    },
    category: 'Gourds & Melons',
    peakMonths: [6, 7, 8, 9, 10],
    zones: ['East', 'North', 'Central', 'West'],
    ayurvedicProperties: {
      taste: ['Tikta (Bitter)', 'Madhura (Sweet)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Balances all three doshas (Tridoshic), especially Pitta and Kapha',
      digestionEase: 'Very Light'
    },
    healthBenefits: [
      'Praised in classical Ayurveda as one of the best digestive tonics during Monsoon (Varsha Ritu).',
      'Acts as a natural blood cleanser and fever-reducing convalescent food.',
      'High in dietary fiber with nearly zero glycemic impact.',
      'Supports healthy bile drainage and gut microbiome during rainy humidity.'
    ],
    nutritionalHighlights: ['Vitamin A', 'Vitamin C', 'Potassium', 'Copper'],
    pantryPairings: ['Poppy seeds (Posto)', 'Panch Phoron', 'Mustard oil', 'Potatoes', 'Nigella (Kalonji)'],
    flavorProfile: 'Crisp skin with tender seeded center that absorbs nutty seeds and delicate gravies.',
    selectionTips: 'Bright green, striped, plump with firm flesh without wrinkles.',
    associatedRecipeIds: ['rec_potol_posto', 'rec_aloo_parwal_rasa', 'rec_bharwa_parwal']
  },
  {
    id: 'kantola',
    englishName: 'Teasle Gourd / Spiny Gourd',
    hindiName: 'कंटोला / काकरोल (Kantola / Kakrol)',
    botanicalName: 'Momordica dioica',
    regionalNames: {
      marathi: 'Kartule (कर्तुले)',
      bengali: 'Kakrol (কাঁকরোল)',
      odia: 'Kankada (କାଙ୍କଡ଼)',
      gujarati: 'Kankoda (કંકોડા)',
      telugu: 'Aakakarakaaya (ఆకాకరకాయ)',
      kannada: 'Mada Hagala (ಮಡ ಹಾಗಲ)'
    },
    category: 'Gourds & Melons',
    peakMonths: [7, 8, 9],
    zones: ['West', 'East', 'Central', 'South', 'North'],
    ayurvedicProperties: {
      taste: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Kapha, cleanses toxins (Ama)',
      digestionEase: 'Light'
    },
    healthBenefits: [
      'Wild monsoon delicacy harvested only during peak rains; packed with rare antioxidants.',
      'Contains 100% natural momordicin compounds that stabilize post-meal glucose spikes.',
      'Boosts seasonal immune resistance against monsoon viral infections.',
      'Helps clear skin rashes and excess humidity-induced inflammation.'
    ],
    nutritionalHighlights: ['Flavonoids', 'Lutein', 'Beta-Carotene', 'Dietary Fiber'],
    pantryPairings: ['Mustard oil', 'Nigella seeds', 'Turmeric', 'Green chili', 'Grated Coconut'],
    flavorProfile: 'Slightly crunchy, subtle earthy nuttiness with gentle mild bitterness.',
    selectionTips: 'Firm, small spiny oval pods of vibrant forest-green color.',
    associatedRecipeIds: ['rec_kakrol_bhaja', 'rec_kartule_sukka', 'rec_kantola_fry']
  },

  // --- WINTER GREENS & ROOTS (Hemanta & Shishira) ---
  {
    id: 'sarson',
    englishName: 'Mustard Greens',
    hindiName: 'सरसों का साग (Sarson Saag)',
    botanicalName: 'Brassica juncea',
    regionalNames: {
      punjabi: 'Sarson Da Saag (ਸਰ੍ਹੋਂ ਦਾ ਸਾਗ)',
      bengali: 'Sorshe Shaak (সর্ষে শাক)',
      odia: 'Sorisa Saga (ସୋରିଷ ଶାଗ)',
      marathi: 'Mohari Paane (मोहरीची पाने)',
      gujarati: 'Rai Bhaji (રાઈની ભાજી)'
    },
    category: 'Leafy Greens (Saag)',
    peakMonths: [11, 12, 1, 2],
    zones: ['North', 'East', 'Central', 'West'],
    ayurvedicProperties: {
      taste: ['Katu (Pungent)', 'Tikta (Bitter)'],
      virya: 'Heating (Ushna)',
      doshaBalance: 'Pacifies Vata and Kapha during harsh winter frost, generates internal metabolic heat',
      digestionEase: 'Moderate to Heavy (cooked traditionally with Makki/Ghee)'
    },
    healthBenefits: [
      'Immense concentrations of Glucosinolates and Sulforaphane for cellular longevity.',
      'Generates internal thermogenesis, defending the respiratory tract against winter cold and flu.',
      'Exceptional source of Vitamin K1 essential for arterial flexibility and bone density.',
      'Traditionally paired with Bathua and Makki roti for complementary amino acid profiles.'
    ],
    nutritionalHighlights: ['Vitamin K (500% DV)', 'Vitamin A', 'Iron (1.6mg)', 'Glucosinolates'],
    pantryPairings: ['Desi Ghee', 'Makki Atta (Cornmeal)', 'Ginger', 'Garlic', 'Green Chilies', 'Bathua'],
    flavorProfile: 'Peppery, robust, earthy green bitterness that mellows into velvety richness when slow-cooked.',
    selectionTips: 'Tender broad leaves with crisp, non-fibrous central stalks and no flowering buds.',
    associatedRecipeIds: ['rec_sarson_saag', 'rec_sorshe_shaak_bhaja']
  },
  {
    id: 'methi',
    englishName: 'Fresh Fenugreek Leaves',
    hindiName: 'मेथी (Methi)',
    botanicalName: 'Trigonella foenum-graecum',
    regionalNames: {
      tamil: 'Vendhaya Keerai (வெந்தயக் கீரை)',
      telugu: 'Menthaku (మెంతుకూర)',
      kannada: 'Menthya Soppu (ಮೆಂತ್ಯ ಸೊಪ್ಪು)',
      malayalam: 'Uluva Ila (ഉലുവ ഇല)',
      bengali: 'Methi Shaak (মেথি শাক)',
      marathi: 'Methichi Bhaji (मेथीची भाजी)',
      gujarati: 'Methi ni Bhaji (મેથીની ભાજી)',
      punjabi: 'Methi (ਮੇਥੀ)'
    },
    category: 'Leafy Greens (Saag)',
    peakMonths: [11, 12, 1, 2, 3],
    zones: ['North', 'West', 'Central', 'South', 'East'],
    ayurvedicProperties: {
      taste: ['Tikta (Bitter)', 'Katu (Pungent)'],
      virya: 'Heating (Ushna)',
      doshaBalance: 'Pacifies Vata and Kapha, warms stiff winter joints and stimulates Agni',
      digestionEase: 'Light'
    },
    healthBenefits: [
      'Stimulates insulin synthesis and reduces carbohydrate absorption in the gut.',
      'Soothes joint pain, sciatica, and lower back stiffness exacerbated by winter cold.',
      'High iron content prevents seasonal fatigue and increases hemoglobin levels.',
      'Galactagogue properties supporting postpartum nursing mothers.'
    ],
    nutritionalHighlights: ['Iron (2.9mg/100g)', 'Calcium (395mg)', 'Vitamin C', 'Soluble Galactomannan Fiber'],
    pantryPairings: ['Whole Wheat Atta', 'Besan (Gram flour)', 'Potatoes', 'Garlic', 'Green Chilies', 'Ghee'],
    flavorProfile: 'Aromatic, pleasantly herbaceous with distinctive appetising bitter undertones.',
    selectionTips: 'Small dark green oval leaves; avoid yellowed or thick stems.',
    associatedRecipeIds: ['rec_methi_thepla', 'rec_aloo_methi', 'rec_menthikura_pappu']
  },
  {
    id: 'palak',
    englishName: 'Indian Spinach',
    hindiName: 'पालक (Palak)',
    botanicalName: 'Spinacia oleracea',
    regionalNames: {
      tamil: 'Pasalai Keerai (பசலைக் கீரை)',
      telugu: 'Palakura (పాలకూర)',
      kannada: 'Palak Soppu (ಪಾಲಕ್ ಸೊಪ್ಪು)',
      malayalam: 'Palak Cheera (പാലക്ക് ചീര)',
      bengali: 'Palong Shaak (পালং শাক)',
      marathi: 'Palak (पालक)',
      gujarati: 'Palak (પાલક)'
    },
    category: 'Leafy Greens (Saag)',
    peakMonths: [10, 11, 12, 1, 2, 3],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)', 'Kashaya (Astringent)'],
      virya: 'Cooling to Neutral (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Kapha, mildly elevates Vata if eaten raw (always cook with cumin/garlic)',
      digestionEase: 'Light'
    },
    healthBenefits: [
      'High in lutein and zeaxanthin protecting retinal cells and eyesight.',
      'Loaded with non-heme iron and folate for vibrant cellular oxygenation.',
      'Magnesium and nitrates promote healthy cardiovascular vasodilation.',
      'Alkalizing greens that balance bodily pH after rich winter festive meals.'
    ],
    nutritionalHighlights: ['Iron (2.7mg)', 'Folate', 'Magnesium', 'Vitamin A'],
    pantryPairings: ['Paneer', 'Garlic (Lasun)', 'Cumin', 'Tomatoes', 'Moong Dal', 'Kasuri Methi'],
    flavorProfile: 'Earthy, lush green sweetness with silky smooth texture when pureed or sautéed.',
    selectionTips: 'Crisp, unblemished deep emerald leaves with slender tender stems.',
    associatedRecipeIds: ['rec_palak_paneer', 'rec_palong_shaak_ghonto', 'rec_palakura_pappu']
  },
  {
    id: 'desi_gajar',
    englishName: 'Red Winter Carrots',
    hindiName: 'देसी लाल गाजर (Desi Laal Gajar)',
    botanicalName: 'Daucus carota subsp. sativus',
    regionalNames: {
      punjabi: 'Lal Gajar (ਲਾਲ ਗਾਜਰ)',
      bengali: 'Laal Gajor (লাল গাজর)',
      marathi: 'Lal Gajar (लाल गाजर)',
      gujarati: 'Gajar (ગાજર)',
      tamil: 'Gajar / Carrot (கேரட்)'
    },
    category: 'Roots & Tubers',
    peakMonths: [11, 12, 1, 2],
    zones: ['North', 'East', 'Central', 'West'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)', 'Tikta (Subtle Bitter)'],
      virya: 'Heating (Ushna)',
      doshaBalance: 'Pacifies Vata and Kapha, deeply nourishing for Dhatus (tissues)',
      digestionEase: 'Moderate & Grounding'
    },
    healthBenefits: [
      'Distinct from western orange carrots; rich in Lycopene and Anthocyanins (powerful heart antioxidants).',
      'Sweet and juicy winter staple providing sustained metabolic energy without blood sugar spikes.',
      'Carotenes convert to Vitamin A to nourish dry winter skin and mucosal barriers.',
      'Promotes digestive fire when prepared with mustard seeds and ginger.'
    ],
    nutritionalHighlights: ['Lycopene', 'Beta-Carotene', 'Vitamin C', 'Potassium', 'Natural Sugars'],
    pantryPairings: ['Green Peas (Matar)', 'Mustard seeds', 'Ginger', 'Cardamom', 'Desi Ghee'],
    flavorProfile: 'Crisply sweet, floral, and vastly richer in nectar than year-round hybrid carrots.',
    selectionTips: 'Long, deep crimson red tapering roots with thin central cores and fresh green leafy crowns.',
    associatedRecipeIds: ['rec_gajar_matar_sabzi', 'rec_gajar_kanji', 'rec_gajar_halwa_light']
  },
  {
    id: 'mooli',
    englishName: 'White Radish',
    hindiName: 'मूली (Mooli)',
    botanicalName: 'Raphanus sativus',
    regionalNames: {
      tamil: 'Mullangi (முள்ளங்கி)',
      telugu: 'Mullangi (ముల్లంగి)',
      kannada: 'Moolangi (ಮೂಲಂಗಿ)',
      malayalam: 'Mullangi (മുള്ളങ്കി)',
      bengali: 'Mulo (মুলো)',
      marathi: 'Mula (मुळा)',
      gujarati: 'Mula (મૂળા)'
    },
    category: 'Roots & Tubers',
    peakMonths: [10, 11, 12, 1, 2],
    zones: ['North', 'South', 'East', 'West', 'Central'],
    ayurvedicProperties: {
      taste: ['Katu (Pungent)', 'Tikta (Bitter)', 'Madhura (Sweet when cooked)'],
      virya: 'Heating (Ushna) raw / Neutral cooked',
      doshaBalance: 'Clears sluggish Kapha and mucus, stimulates bile and liver filtration',
      digestionEase: 'Light (cooked with Ajwain/Hing)'
    },
    healthBenefits: [
      'Contains raphanin and mustard glycosides that thin respiratory congestion in winter.',
      'Exceptional diuretic that flushes uric acid and prevents kidney stones.',
      'High in sulfur-bearing phytochemicals that assist hepatic liver detox.',
      'Leaves (Mooli ke Patte) contain 6x more Vitamin C and calcium than the root itself.'
    ],
    nutritionalHighlights: ['Vitamin C (15mg)', 'Folate', 'Glucosinolates', 'Calcium'],
    pantryPairings: ['Ajwain', 'Green Chilies', 'Whole wheat Atta', 'Mustard oil', 'Lemon juice'],
    flavorProfile: 'Crisp, peppery, sharp bite that turns pleasantly sweet and mellow when braised or steamed.',
    selectionTips: 'Firm, heavy white roots with smooth uncracked skin and fresh, vibrant green leafy tops.',
    associatedRecipeIds: ['rec_mooli_paratha', 'rec_mullangi_sambar', 'rec_mulo_saag_bhaja']
  },
  {
    id: 'matar',
    englishName: 'Fresh Green Peas',
    hindiName: 'ताजा हरी मटर (Taza Hari Matar)',
    botanicalName: 'Pisum sativum',
    regionalNames: {
      bengali: 'Koraishuti (কড়াইশুঁটি)',
      marathi: 'Vatana (मटार / वाटाणा)',
      gujarati: 'Vatana (વટાણા)',
      tamil: 'Pattani (பச்சை பட்டாணி)',
      telugu: 'Bataani (బఠానీలు)'
    },
    category: 'Pods & Beans',
    peakMonths: [11, 12, 1, 2],
    zones: ['North', 'East', 'West', 'Central', 'South'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)', 'Kashaya (Astringent)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Kapha, may increase Vata if unspiced (always temper with ginger & hing)',
      digestionEase: 'Moderate'
    },
    healthBenefits: [
      'High plant-based protein (5.4g/100g) supporting muscle repair in active winter months.',
      'Loaded with Polyphenols like Coumestrol with proven cellular protective qualities.',
      'High prebiotic fiber feeding beneficial Bifidobacteria in the gut.',
      'Naturally sweet taste satisfies winter sweet cravings without refined sugar.'
    ],
    nutritionalHighlights: ['Protein (5.4g/100g)', 'Vitamin K', 'Manganese', 'Fiber (5.7g)'],
    pantryPairings: ['Ginger (Adrak)', 'Asafoetida (Hing)', 'Paneer', 'Potatoes', 'Cumin', 'Kasuri Methi'],
    flavorProfile: 'Plump, bursting sweet spheres with tender popping skins and fresh vegetal aroma.',
    selectionTips: 'Full, bright green pods that feel plump; avoid flat or dry yellowing shells.',
    associatedRecipeIds: ['rec_matar_paneer_homestyle', 'rec_koraishutir_kochuri_filling', 'rec_matar_pulao']
  },

  // --- AUTUMN & REGIONAL SPECIALTIES (Sharad & Year-Round Seasonal) ---
  {
    id: 'kaddu',
    englishName: 'Yellow / Red Pumpkin',
    hindiName: 'पीला कद्दू / सीताफल (Peela Kaddu / Sitaphal)',
    botanicalName: 'Cucurbita moschata',
    regionalNames: {
      tamil: 'Parangikai (பரங்கிக்காய்)',
      telugu: 'Gummadikaya (గుమ్మడికాయ)',
      kannada: 'Kumbalakayi (ಕುಂಬಳಕಾಯಿ)',
      malayalam: 'Mathanga (മത്തങ്ങ)',
      bengali: 'Kumro (কুমড়ো)',
      marathi: 'Bhopla (लाल भोपळा)',
      gujarati: 'Kolu (કોળું)',
      odia: 'Kakharu (କଖାରୁ)'
    },
    category: 'Gourds & Melons',
    peakMonths: [8, 9, 10, 11],
    zones: ['South', 'East', 'North', 'West', 'Central'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Vata, Tridoshic and soothing for nervous system',
      digestionEase: 'Very Light & Soothing'
    },
    healthBenefits: [
      'Exceptional concentration of provitamin A carotenoids for immune defense and mucous membranes.',
      'Soothes autumnal Pitta aggravation (acid reflux, irritability, skin heat) after monsoon.',
      'High in potassium and tryptophan, aiding calm sleep and muscular relaxation.',
      'Easy to digest for all ages from infants to the elderly.'
    ],
    nutritionalHighlights: ['Vitamin A (245% DV)', 'Lutein', 'Potassium', 'Low Glycemic Load'],
    pantryPairings: ['Methi seeds', 'Fennel (Saunf)', 'Amchur', 'Tamarind', 'Coconut', 'Jaggery'],
    flavorProfile: 'Velvety, honeyed sweet profile that pairs wonderfully with tangy tamarind and savory tempering.',
    selectionTips: 'Firm, heavy wedge with vibrant orange-amber flesh and tight seeds.',
    associatedRecipeIds: ['rec_khatti_meethi_kaddu', 'rec_mathanga_erissery', 'rec_kumro_chechki']
  },
  {
    id: 'raw_banana',
    englishName: 'Raw Plantain / Green Banana',
    hindiName: 'कच्चा केला (Kaccha Kela)',
    botanicalName: 'Musa paradisiaca',
    regionalNames: {
      tamil: 'Vazhaikkai (வாழைக்காய்)',
      telugu: 'Aratikaya (అరటికాయ)',
      kannada: 'Balekayi (ಬಾಳೆಕಾಯಿ)',
      malayalam: 'Vazhakka (വാഴയ്ക്ക)',
      bengali: 'Kanchkela (কাঁচকলা)',
      marathi: 'Kache Keli (कच्ची केळी)',
      odia: 'Kancha Kadali (କଞ୍ଚା କଦଳୀ)'
    },
    category: 'Roots & Tubers',
    peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    zones: ['South', 'East', 'West', 'Central'],
    ayurvedicProperties: {
      taste: ['Kashaya (Astringent)', 'Madhura (Sweet when cooked)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Pacifies Pitta and Kapha, binds loose bowels, tonifies intestine',
      digestionEase: 'Moderate'
    },
    healthBenefits: [
      'Supreme source of Resistant Starch Type 2, which fuels gut butyrate production for colon health.',
      'Lowers glycemic index of meals, making it a superior complex-carb substitute for potatoes.',
      'Astringent properties heal peptic ulcers and calm chronic diarrhea or IBS flare-ups.',
      'High potassium and Vitamin B6 supports steady daytime neural focus.'
    ],
    nutritionalHighlights: ['Resistant Starch', 'Potassium (358mg)', 'Vitamin B6', 'Prebiotics'],
    pantryPairings: ['Mustard oil', 'Coconut Oil', 'Curry leaves', 'Black pepper', 'Coriander powder'],
    flavorProfile: 'Starchy, firm, absorbs savory aromatic curries like a sponge without turning mushy.',
    selectionTips: 'Dark emerald green, unblemished, very firm skins without yellow patches.',
    associatedRecipeIds: ['rec_vazhaikkai_poriyal', 'rec_kanchkolar_kofta', 'rec_kela_masala_sukha']
  },
  {
    id: 'arbi',
    englishName: 'Colocasia / Taro Root',
    hindiName: 'अरबी / घुइयां (Arbi / Ghuiya)',
    botanicalName: 'Colocasia esculenta',
    regionalNames: {
      tamil: 'Seppankizhangu (சேப்பங்கிழங்கு)',
      telugu: 'Chamagadda (చామగడ్డ)',
      kannada: 'Kesuvina Gadde (ಕೆಸುವಿನ ಗಡ್ಡೆ)',
      malayalam: 'Chembu (ചേമ്പ്)',
      bengali: 'Kochu (কচু)',
      marathi: 'Alu Che Kand (अळू कंद)',
      gujarati: 'Arbi (અરવી)',
      punjabi: 'Arbi (ਅਰਬੀ)'
    },
    category: 'Roots & Tubers',
    peakMonths: [8, 9, 10, 11],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Madhura (Sweet)'],
      virya: 'Cooling (Sheeta)',
      doshaBalance: 'Nourishes Vata, increases Kapha; must be cooked with Ajwain and Hing to prevent flatulence',
      digestionEase: 'Moderate to Heavy'
    },
    healthBenefits: [
      'Twice the dietary fiber of regular potatoes, promoting steady satiety and gut bulk.',
      'Contains complex polysaccharides that boost immune mucosal strength.',
      'Provides high levels of copper and manganese for collagen synthesis.',
      'Cooked crisp with ajwain to neutralize oxalates and enhance digestive breakdown.'
    ],
    nutritionalHighlights: ['Dietary Fiber (5.1g)', 'Vitamin E', 'Manganese', 'Potassium'],
    pantryPairings: ['Ajwain (Essential)', 'Amchur', 'Mustard oil', 'Curry leaves', 'Sambar powder'],
    flavorProfile: 'Nutty, earthy, creamy interior with delightfully crisp caramel crust when roasted or pan-fried.',
    selectionTips: 'Small, firm, striped brown tubers without soft spots or sprouting eyes.',
    associatedRecipeIds: ['rec_arbi_ajwaini_masala', 'rec_seppankizhangu_roast', 'rec_kochu_sorshe']
  },
  {
    id: 'kairi',
    englishName: 'Raw Green Mango',
    hindiName: 'कच्चा आम / कैरी (Kaccha Aam / Kairi)',
    botanicalName: 'Mangifera indica',
    regionalNames: {
      tamil: 'Manga (மாங்காய்)',
      telugu: 'Mamidikaya (మామిడికాయ)',
      kannada: 'Mavinakayi (ಮಾವಿನಕಾಯಿ)',
      malayalam: 'Pacha Manga (പച്ച മാങ്ങ)',
      bengali: 'Aam / Kacha Aam (কাঁচা আম)',
      marathi: 'Kairi (कैरी)',
      gujarati: 'Keri (કાચી કેરી)'
    },
    category: 'Local Nightshades & Fruits',
    peakMonths: [3, 4, 5, 6],
    zones: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
    ayurvedicProperties: {
      taste: ['Amla (Sour)', 'Kashaya (Astringent)'],
      virya: 'Heating initial / Cooling electrolyte drink when boiled with mint (Aam Panna)',
      doshaBalance: 'Pacifies Kapha and Vata, stimulates sluggish Agni and salivation',
      digestionEase: 'Light & Appetizing'
    },
    healthBenefits: [
      'Supreme summer antidote against heat stroke (Loo) and acute electrolyte loss.',
      'Huge concentration of ascorbic acid (Vitamin C) aiding non-heme iron absorption.',
      'Stimulates bile acid secretion to cleanse bacterial buildup in the biliary tract.',
      'Rich in pectin and organic malic and citric acids.'
    ],
    nutritionalHighlights: ['Vitamin C (36mg)', 'Pectin', 'Malic Acid', 'Electrolytes'],
    pantryPairings: ['Mint (Pudina)', 'Roasted Cumin (Bhuna Jeera)', 'Black Salt (Kala Namak)', 'Jaggery', 'Mustard oil'],
    flavorProfile: 'Vibrant, tongue-tingling tartness with refreshing resinous tropical fragrance.',
    selectionTips: 'Rock hard, dark green, fragrant near the stem with no mushy depressions.',
    associatedRecipeIds: ['rec_aam_panna_concentrate', 'rec_mangai_pachadi', 'rec_kacha_aam_dal']
  }
];

export function getVegetablesForMonthAndZone(monthNumber: number, zone: string): Vegetable[] {
  return SEASONAL_VEGETABLES.filter(veg => {
    const matchesMonth = veg.peakMonths.includes(monthNumber);
    const matchesZone = veg.zones.includes(zone as any) || veg.zones.length >= 4;
    return matchesMonth && matchesZone;
  });
}
