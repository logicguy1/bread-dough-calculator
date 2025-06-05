// RecipeConfiguration.jsx
import React from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { BakeryDining as BakeryDiningIcon } from '@mui/icons-material';
import IngredientSection from './IngredientSection';
import { COMMON_INGREDIENTS } from './types';

const RecipeConfiguration = ({
  flourIngredients,
  hydrationIngredients,
  extraIngredients,
  flourTotal,
  hydrationTotal,
  extraTotal,
  totalPercentage,
  newIngredientNames,
  onNewIngredientNameChange,
  onAddIngredient,
  onUpdatePercentage,
  onRemoveIngredient,
  onAddCommonIngredient,
}) => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BakeryDiningIcon color="primary" />
          Configure Your Recipe
        </Typography>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <IngredientSection
          title="Flour"
          ingredients={flourIngredients}
          category="flour"
          total={flourTotal}
          color="primary.main"
          newIngredientName={newIngredientNames.flour}
          commonIngredients={COMMON_INGREDIENTS.flour}
          onNewIngredientNameChange={onNewIngredientNameChange}
          onAddIngredient={onAddIngredient}
          onUpdatePercentage={onUpdatePercentage}
          onRemoveIngredient={onRemoveIngredient}
          onAddCommonIngredient={onAddCommonIngredient}
        />
        
        <IngredientSection
          title="Hydration"
          ingredients={hydrationIngredients}
          category="hydration"
          total={hydrationTotal}
          color="info.main"
          newIngredientName={newIngredientNames.hydration}
          commonIngredients={COMMON_INGREDIENTS.hydration}
          onNewIngredientNameChange={onNewIngredientNameChange}
          onAddIngredient={onAddIngredient}
          onUpdatePercentage={onUpdatePercentage}
          onRemoveIngredient={onRemoveIngredient}
          onAddCommonIngredient={onAddCommonIngredient}
        />
        
        <IngredientSection
          title="Extras"
          ingredients={extraIngredients}
          category="extra"
          total={extraTotal}
          color="secondary.main"
          newIngredientName={newIngredientNames.extra}
          commonIngredients={COMMON_INGREDIENTS.extra}
          onNewIngredientNameChange={onNewIngredientNameChange}
          onAddIngredient={onAddIngredient}
          onUpdatePercentage={onUpdatePercentage}
          onRemoveIngredient={onRemoveIngredient}
          onAddCommonIngredient={onAddCommonIngredient}
        />
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.alternate', borderRadius: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="primary.main">
              Flour: {flourTotal.toFixed(1)}%
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="info.main">
              Hydration: {hydrationTotal.toFixed(1)}%
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="secondary.main">
              Extras: {extraTotal.toFixed(1)}%
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary">
              Total: {totalPercentage.toFixed(1)}%
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {totalPercentage === 0 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          Please add at least one ingredient with a percentage greater than 0
        </Alert>
      )}
    </Box>
  );
};

export default RecipeConfiguration;