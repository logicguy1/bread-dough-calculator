// RecipeSidebar.jsx
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Receipt as ReceiptIcon } from '@mui/icons-material';

const RecipeSidebar = ({
  activeStep,
  flourIngredients,
  hydrationIngredients,
  extraIngredients,
  calculatedResults,
  flourTotal,
  hydrationTotal,
  extraTotal,
  totalPercentage,
  weightValue,
  weightType,
  primaryIngredient,
}) => {
  const renderIngredientList = (ingredients, calculatedIngredients, title, total, color) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" color={color} gutterBottom>
        {title} ({total.toFixed(1)}%)
        {activeStep === 2 && calculatedIngredients.length > 0 && (
          <Typography component="span" variant="body2" sx={{ ml: 1, fontWeight: 'normal' }}>
            - {calculatedIngredients.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g
          </Typography>
        )}
      </Typography>
      <List dense sx={{ pl: 1 }}>
        {(activeStep === 2 && calculatedIngredients.length > 0 
          ? calculatedIngredients 
          : ingredients
        ).map((ingredient) => (
          <ListItem key={ingredient.id} sx={{ py: 0.5, px: 1 }}>
            <ListItemText
              primary={ingredient.name}
              secondary={
                activeStep === 2 && ingredient.grams !== undefined
                  ? `${ingredient.percentage}% - ${ingredient.grams}g`
                  : `${ingredient.percentage}%`
              }
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getTotalWeight = () => {
    if (activeStep === 2 && calculatedResults.flour.length > 0) {
      return [...calculatedResults.flour, ...calculatedResults.hydration, ...calculatedResults.extra]
        .reduce((sum, ing) => sum + ing.grams, 0);
    }
    return 0;
  };

  return (
    <Box sx={{ width: 280, p: 2, height: '100vh', overflow: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptIcon color="primary" />
        <Typography variant="h6" color="primary">
          Recipe Overview
        </Typography>
      </Box>

      {/* Flour Section */}
      {renderIngredientList(
        flourIngredients,
        calculatedResults.flour,
        'Flour',
        flourTotal,
        'primary.main'
      )}

      <Divider sx={{ my: 2 }} />

      {/* Hydration Section */}
      {renderIngredientList(
        hydrationIngredients,
        calculatedResults.hydration,
        'Hydration',
        hydrationTotal,
        'info.main'
      )}

      <Divider sx={{ my: 2 }} />

      {/* Extras Section */}
      {renderIngredientList(
        extraIngredients,
        calculatedResults.extra,
        'Extras',
        extraTotal,
        'secondary.main'
      )}

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
        <Typography variant="h6" align="center" color="text.primary">
          Total: {totalPercentage.toFixed(1)}%
          {activeStep === 2 && calculatedResults.flour.length > 0 && (
            <Typography variant="body2" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
              {getTotalWeight().toFixed(1)}g
            </Typography>
          )}
        </Typography>
      </Box>

      {/* Calculation Info */}
      {activeStep >= 1 && weightValue && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography variant="caption" color="primary.contrastText" display="block">
            {weightType === 'primary' ? 'Primary Method' : 'Total Weight Method'}
          </Typography>
          <Typography variant="body2" color="primary.contrastText">
            {weightType === 'primary' && primaryIngredient 
              ? `${primaryIngredient}: ${weightValue}g` 
              : `Total: ${weightValue}g`
            }
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecipeSidebar;