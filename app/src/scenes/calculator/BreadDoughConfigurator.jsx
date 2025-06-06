// BreadDoughConfigurator.jsx - Main component
import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// Import our custom components
import RecipeConfiguration from './RecipeConfiguration';
import WeightConfiguration from './WeightConfiguration';
import RecipeResults from './RecipeResults';
import RecipeSidebar from './RecipeSidebar';

// Import utilities and constants
import { calculateResults } from './calculationUtils';
import { 
  STEPS, 
  DEFAULT_INGREDIENTS, 
  INGREDIENT_CATEGORIES,
  WEIGHT_TYPES,
  COMMON_INGREDIENTS 
} from './types';

const BreadDoughConfigurator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  
  // Separate ingredient categories
  const [flourIngredients, setFlourIngredients] = useState(DEFAULT_INGREDIENTS.flour);
  const [hydrationIngredients, setHydrationIngredients] = useState(DEFAULT_INGREDIENTS.hydration);
  const [extraIngredients, setExtraIngredients] = useState(DEFAULT_INGREDIENTS.extra);

  const [newIngredientNames, setNewIngredientNames] = useState({
    flour: '',
    hydration: '',
    extra: ''
  });

  const [primaryIngredient, setPrimaryIngredient] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [weightType, setWeightType] = useState(WEIGHT_TYPES.PRIMARY);
  const [calculatedResults, setCalculatedResults] = useState({
    flour: [],
    hydration: [],
    extra: []
  });

  // Combine all ingredients for calculations
  const allIngredients = useMemo(() => [
    ...flourIngredients,
    ...hydrationIngredients,
    ...extraIngredients
  ], [flourIngredients, hydrationIngredients, extraIngredients]);

  const flourTotal = useMemo(() => 
    flourIngredients.reduce((sum, ingredient) => sum + (ingredient.percentage || 0), 0)
  , [flourIngredients]);

  const hydrationTotal = useMemo(() => 
    hydrationIngredients.reduce((sum, ingredient) => sum + (ingredient.percentage || 0), 0)
  , [hydrationIngredients]);

  const extraTotal = useMemo(() => 
    extraIngredients.reduce((sum, ingredient) => sum + (ingredient.percentage || 0), 0)
  , [extraIngredients]);

  const totalPercentage = flourTotal + hydrationTotal + extraTotal;

  // Ingredient management functions
  const handleNewIngredientNameChange = (category, value) => {
    setNewIngredientNames(prev => ({ ...prev, [category]: value }));
  };

  const addIngredient = (category) => {
    const name = newIngredientNames[category].trim();
    if (!name) return;

    const newId = Math.max(...allIngredients.map(i => i.id), 0) + 1;
    const newIngredient = { id: newId, name, percentage: 0 };

    switch (category) {
      case INGREDIENT_CATEGORIES.FLOUR:
        setFlourIngredients([...flourIngredients, newIngredient]);
        break;
      case INGREDIENT_CATEGORIES.HYDRATION:
        setHydrationIngredients([...hydrationIngredients, newIngredient]);
        break;
      case INGREDIENT_CATEGORIES.EXTRA:
        setExtraIngredients([...extraIngredients, newIngredient]);
        break;
    }

    setNewIngredientNames(prev => ({ ...prev, [category]: '' }));
  };

  const removeIngredient = (category, id) => {
    switch (category) {
      case INGREDIENT_CATEGORIES.FLOUR:
        setFlourIngredients(flourIngredients.filter(ingredient => ingredient.id !== id));
        break;
      case INGREDIENT_CATEGORIES.HYDRATION:
        setHydrationIngredients(hydrationIngredients.filter(ingredient => ingredient.id !== id));
        break;
      case INGREDIENT_CATEGORIES.EXTRA:
        setExtraIngredients(extraIngredients.filter(ingredient => ingredient.id !== id));
        break;
    }
  };

  const updateIngredientPercentage = (category, id, percentage) => {
    const updateFunction = (ingredients) => 
      ingredients.map(ingredient => 
        ingredient.id === id 
          ? { ...ingredient, percentage: parseFloat(percentage) || 0 }
          : ingredient
      );

    switch (category) {
      case INGREDIENT_CATEGORIES.FLOUR:
        setFlourIngredients(updateFunction);
        break;
      case INGREDIENT_CATEGORIES.HYDRATION:
        setHydrationIngredients(updateFunction);
        break;
      case INGREDIENT_CATEGORIES.EXTRA:
        setExtraIngredients(updateFunction);
        break;
    }
  };

  const addCommonIngredient = (category, name) => {
    const currentIngredients = category === INGREDIENT_CATEGORIES.FLOUR ? flourIngredients : 
                              category === INGREDIENT_CATEGORIES.HYDRATION ? hydrationIngredients : 
                              extraIngredients;
    
    if (!currentIngredients.some(ingredient => ingredient.name.toLowerCase() === name.toLowerCase())) {
      const newId = Math.max(...allIngredients.map(i => i.id), 0) + 1;
      const newIngredient = { id: newId, name, percentage: 0 };

      switch (category) {
        case INGREDIENT_CATEGORIES.FLOUR:
          setFlourIngredients([...flourIngredients, newIngredient]);
          break;
        case INGREDIENT_CATEGORIES.HYDRATION:
          setHydrationIngredients([...hydrationIngredients, newIngredient]);
          break;
        case INGREDIENT_CATEGORIES.EXTRA:
          setExtraIngredients([...extraIngredients, newIngredient]);
          break;
      }
    }
  };

  // Calculation and navigation functions
  const handleCalculateResults = () => {
    const results = calculateResults(
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
    );
    
    if (results) {
      setCalculatedResults(results);
      setActiveStep(2);
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && totalPercentage > 0) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setFlourIngredients(DEFAULT_INGREDIENTS.flour);
    setHydrationIngredients(DEFAULT_INGREDIENTS.hydration);
    setExtraIngredients(DEFAULT_INGREDIENTS.extra);
    setPrimaryIngredient('');
    setWeightValue('');
    setWeightType(WEIGHT_TYPES.PRIMARY);
    setCalculatedResults({ flour: [], hydration: [], extra: [] });
    setNewIngredientNames({ flour: '', hydration: '', extra: '' });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <RecipeConfiguration
            flourIngredients={flourIngredients}
            hydrationIngredients={hydrationIngredients}
            extraIngredients={extraIngredients}
            flourTotal={flourTotal}
            hydrationTotal={hydrationTotal}
            extraTotal={extraTotal}
            totalPercentage={totalPercentage}
            newIngredientNames={newIngredientNames}
            onNewIngredientNameChange={handleNewIngredientNameChange}
            onAddIngredient={addIngredient}
            onUpdatePercentage={updateIngredientPercentage}
            onRemoveIngredient={removeIngredient}
            onAddCommonIngredient={addCommonIngredient}
          />
        );

      case 1:
        return (
          <WeightConfiguration
            weightType={weightType}
            primaryIngredient={primaryIngredient}
            weightValue={weightValue}
            flourIngredients={flourIngredients}
            hydrationIngredients={hydrationIngredients}
            extraIngredients={extraIngredients}
            flourTotal={flourTotal}
            hydrationTotal={hydrationTotal}
            allIngredients={allIngredients}
            totalPercentage={totalPercentage}
            onWeightTypeChange={setWeightType}
            onPrimaryIngredientChange={setPrimaryIngredient}
            onWeightValueChange={setWeightValue}
            onCalculate={handleCalculateResults}
          />
        );

      case 2:
        return (
          <RecipeResults
            calculatedResults={calculatedResults}
            onModifyWeight={() => setActiveStep(1)}
            onReset={handleReset}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        ...(isMobile ? {} : { ml: 0 })
      }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
                🥖 Bread Dough Calculator
              </Typography>
              
              <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStepContent(activeStep)}

              {activeStep < 2 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ px: 3, py: 1.5 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={activeStep === 0 && totalPercentage === 0}
                    sx={{ px: 3, py: 1.5 }}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Sidebar */}
      {!isMobile && (
        <Box sx={{ 
          width: 280, 
          flexShrink: 0, 
          bgcolor: 'background.default',
          borderRight: 1,
          borderColor: 'divider'
        }}>
          <RecipeSidebar
            activeStep={activeStep}
            flourIngredients={flourIngredients}
            hydrationIngredients={hydrationIngredients}
            extraIngredients={extraIngredients}
            calculatedResults={calculatedResults}
            flourTotal={flourTotal}
            hydrationTotal={hydrationTotal}
            extraTotal={extraTotal}
            totalPercentage={totalPercentage}
            weightValue={weightValue}
            weightType={weightType}
            primaryIngredient={primaryIngredient}
          />
        </Box>
      )}

      {/* Mobile Drawer for Sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="right"
          open={false}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
            },
          }}
        >
          <RecipeSidebar
            activeStep={activeStep}
            flourIngredients={flourIngredients}
            hydrationIngredients={hydrationIngredients}
            extraIngredients={extraIngredients}
            calculatedResults={calculatedResults}
            flourTotal={flourTotal}
            hydrationTotal={hydrationTotal}
            extraTotal={extraTotal}
            totalPercentage={totalPercentage}
            weightValue={weightValue}
            weightType={weightType}
            primaryIngredient={primaryIngredient}
          />
        </Drawer>
      )}
    </Box>
  );
};

export default BreadDoughConfigurator;