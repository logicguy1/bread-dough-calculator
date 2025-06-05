// types.js - Type definitions and constants

export const INGREDIENT_CATEGORIES = {
    FLOUR: 'flour',
    HYDRATION: 'hydration',
    EXTRA: 'extra'
  };
  
  export const WEIGHT_TYPES = {
    PRIMARY: 'primary',
    TOTAL: 'total'
  };
  
  export const STEPS = ['Configure Recipe', 'Set Primary & Weight', 'Calculate Results'];
  
  export const COMMON_INGREDIENTS = {
    flour: ['Bread Flour', 'Whole Wheat', 'Rye Flour', 'Semolina', 'Einkorn', 'Kamut'],
    hydration: ['Milk', 'Buttermilk', 'Beer', 'Wine', 'Olive Oil', 'Butter'],
    extra: ['Sugar', 'Yeast', 'Honey', 'Salt', 'Malt Extract', 'Vital Wheat Gluten', 'Diastatic Malt']
  };
  
  export const DEFAULT_INGREDIENTS = {
    flour: [
      { id: 1, name: 'Wheat Flour', percentage: 70 },
      { id: 2, name: 'Spelt Flour', percentage: 30 },
    ],
    hydration: [
      { id: 3, name: 'Water', percentage: 68 },
    ],
    extra: [
      { id: 4, name: 'Salt', percentage: 2.3 },
      { id: 5, name: 'Enzymes', percentage: 2 },
      { id: 6, name: 'Sourdough', percentage: 5 },
    ]
  };