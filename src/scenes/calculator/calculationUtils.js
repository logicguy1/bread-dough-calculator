// calculationUtils.js - Calculation logic for bread recipes

export const calculateResults = (
    allIngredients,
    flourIngredients,
    hydrationIngredients,
    extraIngredients,
    flourTotal,
    hydrationTotal,
    totalPercentage,
    weightValue,
    weightType,
    primaryIngredient
  ) => {
    const weight = parseFloat(weightValue);
    if (!weight || !primaryIngredient) return null;
  
    let results = { flour: [], hydration: [], extra: [] };
    let totalWeight;
    
    if (weightType === 'primary') {
      if (primaryIngredient === 'Flour') {
        // Calculate based on total flour weight
        totalWeight = (weight * totalPercentage) / flourTotal;
      } else if (primaryIngredient === 'Hydration') {
        // Calculate based on total hydration weight
        totalWeight = (weight * totalPercentage) / hydrationTotal;
      } else {
        // Calculate based on individual ingredient weight
        const primaryIng = allIngredients.find(ing => ing.name === primaryIngredient);
        const primaryPercentage = primaryIng.percentage;
        totalWeight = (weight * totalPercentage) / primaryPercentage;
      }
      
      results.flour = flourIngredients.map(ingredient => ({
        ...ingredient,
        grams: Math.round(((ingredient.percentage / totalPercentage) * totalWeight) * 100) / 100
      }));
      
      results.hydration = hydrationIngredients.map(ingredient => ({
        ...ingredient,
        grams: Math.round(((ingredient.percentage / totalPercentage) * totalWeight) * 100) / 100
      }));
      
      results.extra = extraIngredients.map(ingredient => ({
        ...ingredient,
        grams: Math.round(((ingredient.percentage / totalPercentage) * totalWeight) * 100) / 100
      }));
    } else {
      // Calculate based on total dough weight
      results.flour = flourIngredients.map(ingredient => ({
        ...ingredient,
        grams: Math.round(((ingredient.percentage / totalPercentage) * weight) * 100) / 100
      }));
      
      results.hydration = hydrationIngredients.map(ingredient => ({
        ...ingredient,
        grams: Math.round(((ingredient.percentage / totalPercentage) * weight) * 100) / 100
      }));
      
      results.extra = extraIngredients.map(ingredient => ({
        ...ingredient,
        grams: Math.round(((ingredient.percentage / totalPercentage) * weight) * 100) / 100
      }));
    }
    
    return results;
  };