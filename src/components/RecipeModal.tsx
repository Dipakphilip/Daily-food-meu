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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 flex items-start justify-between gap-4 bg-stone-900/90">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                recipe.dietType === 'Vegetarian'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : recipe.dietType === 'Eggitarian'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {recipe.dietType}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                {recipe.cuisine} Cuisine
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {recipe.region} India • {recipe.mealType}
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-100 font-serif">
              {recipe.title}
            </h2>
            <p className="text-sm text-amber-400 font-medium">{recipe.hindiTitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-stone-300 text-sm">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-center">
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Prep + Cook</span>
              <span className="font-bold text-stone-200">{recipe.prepTimeMins + recipe.cookTimeMins}m</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Calories</span>
              <span className="font-bold text-stone-200">{recipe.calories} kcal</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Protein</span>
              <span className="font-bold text-emerald-400">{recipe.proteinGrams}g</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Fiber</span>
              <span className="font-bold text-cyan-400">{recipe.fiberGrams}g</span>
            </div>
          </div>

          {/* Ayurvedic Health Insight Box */}
          <div className="bg-gradient-to-r from-amber-950/40 to-stone-900 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300 block mb-0.5">Ayurvedic Seasonal Insight:</span>
              <p className="text-xs text-stone-300 leading-relaxed">{recipe.ayurvedicNote}</p>
            </div>
          </div>

          {/* Ingredients List */}
          <div>
            <h3 className="font-bold text-stone-100 mb-2 flex items-center justify-between">
              <span>Ingredients (Everyday Household Staples):</span>
              <span className="text-xs font-normal text-stone-400">Serves 3-4</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg text-xs flex items-center justify-between border ${
                    ing.isStaple 
                      ? 'bg-stone-950 border-stone-800/80 text-stone-300' 
                      : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200 font-medium'
                  }`}
                >
                  <span>{ing.item}</span>
                  <span className="font-mono text-stone-400 shrink-0 ml-2">{ing.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Cooking Guide */}
          <div>
            <h3 className="font-bold text-stone-100 mb-2">Step-by-Step Cooking Instructions:</h3>
            <ol className="space-y-2">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80 text-xs sm:text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed text-stone-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Accompaniments & Substitutions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="font-semibold text-stone-300 block mb-1">Traditional Pairing:</span>
              <p className="text-stone-400">{recipe.accompaniments}</p>
            </div>
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <span className="font-semibold text-stone-300 block mb-1">Pantry Substitution:</span>
              <p className="text-stone-400">{recipe.pantrySubstitutions}</p>
            </div>
          </div>

          {/* AI Customizer Box */}
          <div className="bg-stone-800/80 border border-stone-700 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-stone-200">AI Custom Recipe Modification:</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Make it Jain (no onion/garlic), diabetic-friendly, or child-friendly..."
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                className="flex-1 bg-stone-950 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={() => onAskAiRecipe(recipe, customGoal)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all shrink-0 cursor-pointer"
              >
                Customize
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 flex items-center justify-between bg-stone-900/90">
          <button
            onClick={handleCopyRecipe}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Recipe!' : 'Copy Recipe'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
