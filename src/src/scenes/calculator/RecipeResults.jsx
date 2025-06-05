// RecipeResults.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { 
  BakeryDining as BakeryDiningIcon, 
  RestartAlt as RestartIcon 
} from '@mui/icons-material';
import RecipeResultsTable from './RecipeResultsTable';

const RecipeResults = ({
  calculatedResults,
  onModifyWeight,
  onReset,
}) => {
  const totalWeight = [
    ...calculatedResults.flour,
    ...calculatedResults.hydration,
    ...calculatedResults.extra
  ].reduce((sum, ing) => sum + ing.grams, 0);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BakeryDiningIcon color="primary" />
          Your Bread Recipe
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 3, bgcolor: 'success.main', color: 'success.contrastText', borderRadius: 1 }}>
        <Typography variant="h6">
          Total Dough Weight: {totalWeight.toFixed(1)}g
        </Typography>
      </Box>

      {/* Flour Results */}
      <RecipeResultsTable
        title="Flour"
        ingredients={calculatedResults.flour}
        color="primary.main"
      />

      {/* Hydration Results */}
      <RecipeResultsTable
        title="Hydration"
        ingredients={calculatedResults.hydration}
        color="info.main"
      />

      {/* Extras Results */}
      <RecipeResultsTable
        title="Extras"
        ingredients={calculatedResults.extra}
        color="secondary.main"
      />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button
          variant="outlined"
          onClick={onModifyWeight}
          sx={{ px: 3, py: 1.5 }}
        >
          Modify Weight
        </Button>
        <Button
          variant="contained"
          onClick={onReset}
          startIcon={<RestartIcon />}
          sx={{ px: 3, py: 1.5 }}
        >
          Start New Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeResults;