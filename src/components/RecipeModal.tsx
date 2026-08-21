import React, { useState } from 'react';
import { Recipe, IndianState, AyurvedicRitu } from '../types';
import { 
  X, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  UtensilsCrossed, 
  Check, 
  Copy, 
  Lightbulb, 
  ArrowRight
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  selectedState: IndianState;
  activeRitu: AyurvedicRitu;
  onAskAiRecipe: (recipe: Recipe, tweakGoal?: string) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  selectedState,
  activeRitu,
  onAskAiRecipe
}) => {
  const [copied, setCopied] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  if (!recipe) return null;

  const handleCopyRecipe = () => {
    let text = `🍲 *${recipe.title}* (${recipe.hindiTitle})\n`;
    text += `Cuisine: ${recipe.cuisine} | Region: ${recipe.region} India | Time: ${recipe.prepTimeMins + recipe.cookTimeMins} mins\n`;
    text += `Nutrition: ${recipe.calories} kcal, ${recipe.proteinGrams}g Protein, ${recipe.fiberGrams}g Fiber\n\n`;
    text += `📋 *Ingredients*:\n`;
    recipe.ingredients.forEach(ing => {
      text += `• ${ing.item}: ${ing.quantity}\n`;
    });
    text += `\n🍳 *Cooking Steps*:\n`;
    recipe.instructions.forEach((step, idx) => {
      text += `${idx + 1}. ${step}\n`;
    });
    text += `\n🌿 *Ayurvedic Health Note*: ${recipe.ayurvedicNote}\n`;
    text += `Pairing: ${recipe.accompaniments}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white border border-stone-200 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 flex items-start justify-between gap-4 bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-emerald-50/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold uppercase ${
                recipe.dietType === 'Vegetarian'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : recipe.dietType === 'Eggitarian'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}>
                {recipe.dietType}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                {recipe.cuisine} Cuisine
              </span>
              <span className="text-xs text-stone-600 font-medium">
                {recipe.region} India • {recipe.mealType}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-800 font-serif">
              {recipe.title}
            </h2>
            <p className="text-sm text-orange-700 font-bold">{recipe.hindiTitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-stone-700 text-sm">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-center">
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-bold">Prep + Cook</span>
              <span className="font-bold text-stone-800 text-base">{recipe.prepTimeMins + recipe.cookTimeMins}m</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-bold">Calories</span>
              <span className="font-bold text-orange-700 text-base">{recipe.calories} kcal</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-bold">Protein</span>
              <span className="font-bold text-emerald-700 text-base">{recipe.proteinGrams}g</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-bold">Fiber</span>
              <span className="font-bold text-teal-700 text-base">{recipe.fiberGrams}g</span>
            </div>
          </div>

          {/* Ayurvedic Health Insight Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-orange-950 block mb-0.5">Ayurvedic Seasonal Insight:</span>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">{recipe.ayurvedicNote}</p>
            </div>
          </div>

          {/* Ingredients List */}
          <div>
            <h3 className="font-bold text-stone-800 mb-2 flex items-center justify-between">
              <span>Ingredients (Everyday Household Staples):</span>
              <span className="text-xs font-normal text-stone-500 font-medium">Serves 3-4</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                    ing.isStaple 
                      ? 'bg-stone-50 border-stone-200 text-stone-700' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                  }`}
                >
                  <span>{ing.item}</span>
                  <span className="font-mono text-stone-500 font-semibold shrink-0 ml-2">{ing.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Cooking Guide */}
          <div>
            <h3 className="font-bold text-stone-800 mb-2">Step-by-Step Cooking Instructions:</h3>
            <ol className="space-y-2">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200 text-xs sm:text-sm">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed text-stone-700 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Accompaniments & Substitutions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200">
              <span className="font-bold text-amber-950 block mb-1">Traditional Pairing:</span>
              <p className="text-stone-600">{recipe.accompaniments}</p>
            </div>
            <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-200">
              <span className="font-bold text-orange-950 block mb-1">Pantry Substitution:</span>
              <p className="text-stone-600">{recipe.pantrySubstitutions}</p>
            </div>
          </div>

          {/* AI Customizer Box */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-emerald-950">AI Custom Recipe Modification:</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Make it Jain (no onion/garlic), diabetic-friendly, or child-friendly..."
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                className="flex-1 bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
              <button
                onClick={() => onAskAiRecipe(recipe, customGoal)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shrink-0 cursor-pointer shadow-2xs"
              >
                Customize
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 flex items-center justify-between bg-stone-50">
          <button
            onClick={handleCopyRecipe}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
            <span>{copied ? 'Copied Recipe!' : 'Copy Recipe'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-900 text-white transition-all cursor-pointer shadow-2xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
