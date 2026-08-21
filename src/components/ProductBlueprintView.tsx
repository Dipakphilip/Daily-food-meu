import React, { useState } from 'react';
import { 
  CORE_APP_FEATURES, 
  DATA_MODEL_SPEC, 
  STEP_BY_STEP_USER_JOURNEY 
} from '../data/productSpecs';
import { 
  FileText, 
  Database, 
  Milestone, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Code, 
  CheckCircle2, 
  ArrowRight, 
  Compass,
  Cpu,
  Copy,
  Check
} from 'lucide-react';

export const ProductBlueprintView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'features' | 'data_model' | 'user_journey' | 'ayurvedic_logic'>('features');
  const [copiedSchema, setCopiedSchema] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSchema(id);
    setTimeout(() => setCopiedSchema(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Blueprint Header */}
      <div className="bg-gradient-to-br from-emerald-50 via-amber-50/50 to-orange-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Product Architecture & Developer Specification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 font-serif">
              Season diet Product Blueprint
            </h1>
            <p className="text-sm text-stone-600 mt-1.5 max-w-3xl leading-relaxed font-medium">
              Comprehensive product management specifications, regional seasonality relational schemas, regional cuisine taxonomies, and step-by-step user journey maps for India's premier seasonal health and everyday meal planner.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-2xs self-start md:self-auto flex-wrap">
            <button
              onClick={() => setActiveSection('features')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'features'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Core Features
            </button>
            <button
              onClick={() => setActiveSection('data_model')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'data_model'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Data Architecture
            </button>
            <button
              onClick={() => setActiveSection('user_journey')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'user_journey'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              User Journey
            </button>
            <button
              onClick={() => setActiveSection('ayurvedic_logic')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'ayurvedic_logic'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Decision Engine
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: CORE APP FEATURES MATRIX */}
      {activeSection === 'features' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-800 font-serif">1. Core Application Features & Scope</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">Engineered to eliminate Indian kitchen decision fatigue through authentic agro-climatic intelligence.</p>
            </div>
            <span className="text-xs font-mono font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-lg border border-orange-200">
              6 Core Engines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_APP_FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-300 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                      {feat.category}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Production MVP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-800 mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4 font-medium">
                    {feat.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold">MVP Implementation Scope:</span>
                      <p className="text-stone-700 font-medium">{feat.mvpScope}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-100 bg-emerald-50/50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase block mb-1">User & Household Impact:</span>
                  <p className="text-xs text-stone-600 leading-snug">{feat.userImpact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: DATA STRUCTURE SPECIFICATION */}
      {activeSection === 'data_model' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-800 font-serif">2. Basic Data Structure for Regional Seasonality</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">Relational entity models bridging geography, agro-climatic months, and culinary recipes.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200">
              TypeScript / JSON Schema
            </span>
          </div>

          <div className="space-y-6">
            {DATA_MODEL_SPEC.map((entity, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-orange-600" />
                      <h3 className="text-lg font-bold text-stone-800 font-mono">
                        {entity.name}
                      </h3>
                      <span className="text-xs text-stone-400 font-medium">PK: {entity.primaryKey}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">{entity.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-mono">
                      Relationships: {entity.relationships.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Attribute Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase text-[10px]">
                        <th className="pb-2 font-bold">Attribute</th>
                        <th className="pb-2 font-bold">Type</th>
                        <th className="pb-2 font-bold">Description</th>
                        <th className="pb-2 font-bold">Sample Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-mono">
                      {entity.attributes.map((attr, aIdx) => (
                        <tr key={aIdx} className="hover:bg-stone-50/70">
                          <td className="py-2.5 font-bold text-orange-700">{attr.name}</td>
                          <td className="py-2.5 text-teal-700 font-semibold">{attr.type}</td>
                          <td className="py-2.5 text-stone-700 font-sans">{attr.description}</td>
                          <td className="py-2.5 text-stone-500">{attr.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: STEP-BY-STEP USER JOURNEY */}
      {activeSection === 'user_journey' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-800 font-serif">3. Step-by-Step User Journey Map</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">End-to-end user interaction cycle from state onboarding to weekly kitchen execution.</p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 px-3 py-1 rounded-lg border border-sky-200">
              5 Stage Flow
            </span>
          </div>

          <div className="space-y-4">
            {STEP_BY_STEP_USER_JOURNEY.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-start gap-6 hover:border-orange-300 transition-all"
              >
                {/* Step Marker */}
                <div className="flex items-center md:flex-col gap-3 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold font-mono text-xl flex items-center justify-center shadow-xs">
                    0{step.stepNumber}
                  </div>
                  <span className="text-xs font-bold text-orange-800 uppercase tracking-wider md:text-center">
                    Stage {step.stepNumber}
                  </span>
                </div>

                {/* Step Details */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 font-serif">
                      {step.stage}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-orange-50/40 p-3.5 rounded-xl border border-orange-100">
                      <span className="text-orange-950 font-bold uppercase text-[10px] block mb-1">
                        👤 User Action & Inputs:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{step.userAction}</p>
                    </div>

                    <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                      <span className="text-emerald-950 font-bold uppercase text-[10px] block mb-1">
                        ⚙️ System Logic & Response:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{step.systemResponse}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-400 font-semibold">Touchpoints:</span>
                      {step.touchpoints.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-[11px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{step.keyOutcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: AYURVEDIC & CLIMATIC DECISION ENGINE */}
      {activeSection === 'ayurvedic_logic' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-800 font-serif">4. Agro-Climatic & Ayurvedic Decision Matrix</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">The mathematical and biological rules governing seasonal vegetable recommendations.</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg border border-amber-200">
              6-Ritu Bio-Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                ritu: 'Shishira Ritu (Late Winter)',
                solar: 'Uttarayana (Jan - Mar)',
                dosha: 'Kapha Accumulation, High Agni',
                produce: 'Mustard Greens (Sarson), Bathua, Red Carrots, White Radish',
                rationale: 'Strong digestive fire requires dense, thermogenic root vegetables and pungent greens with ghee to ward off frost.'
              },
              {
                ritu: 'Vasanta Ritu (Spring)',
                solar: 'Uttarayana (Mar - May)',
                dosha: 'Kapha Liquefaction (Allergies, Sluggishness)',
                produce: 'Bitter Gourd (Karela), Drumsticks (Moringa), Raw Mango, Green Peas',
                rationale: 'Bitter and astringent tastes are required to melt and flush seasonal Kapha toxins and stimulate the liver.'
              },
              {
                ritu: 'Grishma Ritu (Summer)',
                solar: 'Uttarayana (May - Jul)',
                dosha: 'Pitta Surge, Agni Depletion',
                produce: 'Bottle Gourd (Lauki), Ridge Gourd (Turai), Ash Gourd, Cucumber',
                rationale: 'High water-content gourds (>95% water) provide cellular cooling, electrolyte replacement, and soothe acid reflux.'
              },
              {
                ritu: 'Varsha Ritu (Monsoon)',
                solar: 'Dakshinayana (Jul - Sep)',
                dosha: 'Vata Aggravation, Lowest Agni',
                produce: 'Pointed Gourd (Parwal), Teasle Gourd (Kantola), Bhindi, Arbi',
                rationale: 'Damp humidity weakens digestion; light gourds cooked with carminative ajwain and hing prevent waterborne gut distress.'
              },
              {
                ritu: 'Sharad Ritu (Autumn)',
                solar: 'Dakshinayana (Sep - Nov)',
                dosha: 'Pitta Peak Aggravation (October Heat)',
                produce: 'Yellow Pumpkin (Kaddu), Tinda, Lotus Stem (Kamal Kakdi), Sweet Potato',
                rationale: 'Sweet, grounding, alkaline vegetables pacify the intense post-monsoon solar glare and soothe the digestive tract.'
              },
              {
                ritu: 'Hemanta Ritu (Early Winter)',
                solar: 'Dakshinayana (Nov - Jan)',
                dosha: 'Vata Balanced by Peaked Agni',
                produce: 'Spinach (Palak), Sarson, Cauliflower, Desi Gajar, Fresh Peas',
                rationale: 'Body metabolic fire is at its annual peak; easily assimilates rich leafy greens, legumes, and brassicas.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-800 text-sm font-serif">{item.ritu}</h3>
                  <span className="text-[10px] font-mono font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    {item.solar}
                  </span>
                </div>

                <div className="text-xs">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Biological Dosha Effect:</span>
                  <p className="text-amber-800 font-semibold">{item.dosha}</p>
                </div>

                <div className="text-xs">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Star Seasonal Produce:</span>
                  <p className="text-emerald-700 font-bold">{item.produce}</p>
                </div>

                <div className="text-xs pt-2 border-t border-stone-100 text-stone-600 leading-relaxed font-medium">
                  {item.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
