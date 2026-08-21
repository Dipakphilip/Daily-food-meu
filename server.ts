import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini AI client initialization
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Personalized Seasonal Meal / Recipe Advisor
  app.post('/api/ai/advise', async (req, res) => {
    try {
      const { prompt, state, month, weather, dietType, healthGoal, selectedVeg, cuisine } = req.body;

      if (!ai) {
        return res.json({
          success: true,
          source: 'fallback',
          advice: `Based on ${state || 'your region'} in ${month || 'this season'} (${weather || 'normal climate'}) favoring ${cuisine || 'regional'} cuisine, prioritize easily digestible regional gourds and warming/cooling herbs according to the season. Maintain balanced hydration, incorporate seasonal greens with a pinch of hing and jeera to enhance bioavailability and gut health.`,
        });
      }

      const systemInstruction = `You are an expert Indian Clinical Nutritionist, Ayurvedic Dietetics Specialist, and Product Consultant for the Season diet Indian Seasonal Meal Planning App.
Provide highly practical, culturally authentic Indian culinary and wellness advice tailored to regional states, cuisines (Punjabi, Bengali, South Indian, Gujarati, Maharashtrian, Rajasthani, Bihari, Kashmiri, Goan, Odia), seasonal months, climate, and everyday pantry staples. Keep the response organized, encouraging, and easy to read with bullet points.`;

      const userPrompt = `Context:
- Indian State: ${state || 'General India'}
- Preferred Cuisine Style: ${cuisine || 'Regional'}
- Month/Season: ${month || 'Current'}
- Climate/Weather: ${weather || 'Seasonal'}
- Diet Preference: ${dietType || 'Hybrid'}
- Target Vegetable / Produce: ${selectedVeg || 'Seasonal vegetables'}
- User Query / Health Goal: ${prompt || 'How should I optimize my meals for this climate and produce?'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        source: 'gemini',
        advice: response.text || 'Unable to generate advice at this moment.',
      });
    } catch (error: any) {
      console.error('Error generating AI advice:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error',
        fallbackAdvice: 'Incorporate fresh local seasonal produce cooked with traditional digestive spices like cumin, ginger, and turmeric.',
      });
    }
  });

  // AI Custom Recipe Generator using Everyday Pantry Ingredients
  app.post('/api/ai/recipe-customizer', async (req, res) => {
    try {
      const { vegetable, state, dietPreference, pantryItems } = req.body;

      if (!ai) {
        return res.json({
          recipe: {
            title: `Everyday ${vegetable || 'Seasonal Veg'} Homestyle Curry`,
            cookingTime: '25 mins',
            servings: 4,
            keyIngredients: [vegetable || 'Seasonal Vegetable', 'Onion', 'Tomato', 'Cumin seeds', 'Turmeric', 'Mustard/Sunflower oil'],
            steps: [
              `Wash, peel, and chop the ${vegetable || 'vegetable'} into bite-sized pieces.`,
              'Heat oil in a kadai, add cumin seeds and let them splutter.',
              'Sauté onions until golden, then add turmeric, chili powder, and tomatoes.',
              `Add the chopped ${vegetable || 'vegetable'}, salt, and a splash of water. Cover and cook for 12-15 minutes until tender.`,
              'Garnish with fresh coriander and serve warm with phulkas or steamed rice.'
            ],
            ayurvedicTip: 'Cook with mild spices to enhance Agni (digestive fire) without aggravating Pitta.'
          }
        });
      }

      const prompt = `Create a simple, authentic, everyday home-style Indian recipe using "${vegetable}" as the star vegetable, tailored for the regional style of ${state || 'India'}.
Diet preference: ${dietPreference || 'Vegetarian'}.
Available pantry items: ${pantryItems || 'Standard Indian pantry (Atta, Rice, Dal, Onion, Tomato, Ginger, Garlic, Cumin, Mustard, Turmeric, Coriander powder, Chili, Oil/Ghee)'}.

Return ONLY valid JSON matching this exact structure:
{
  "title": "Recipe Name in English & Hindi/Regional",
  "cookingTime": "e.g. 20 mins",
  "servings": 4,
  "difficulty": "Easy",
  "keyIngredients": ["item 1", "item 2", "..."],
  "steps": ["Step 1", "Step 2", "..."],
  "healthBenefit": "Specific seasonal/nutritional benefit",
  "ayurvedicTip": "Ayurvedic insight (cooling/heating, dosha effect)"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      let parsed = {};
      try {
        parsed = JSON.parse(response.text || '{}');
      } catch (e) {
        parsed = { title: `${vegetable} Special`, steps: [response.text] };
      }

      res.json({ success: true, recipe: parsed });
    } catch (error: any) {
      console.error('Error generating AI recipe:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Season diet Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
