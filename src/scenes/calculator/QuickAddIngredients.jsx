// QuickAddIngredients.jsx
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const QuickAddIngredients = ({ 
  commonIngredients, 
  currentIngredients, 
  category, 
  onAddCommonIngredient 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="caption" display="block" gutterBottom sx={{ mb: 2 }}>
        Quick Add:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {commonIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            onClick={() => onAddCommonIngredient(category, ingredient)}
            variant="outlined"
            size="small"
            disabled={currentIngredients.some(ing => 
              ing.name.toLowerCase() === ingredient.toLowerCase()
            )}
            sx={{ mb: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuickAddIngredients;