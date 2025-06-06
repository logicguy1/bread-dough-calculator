// WeightConfiguration.jsx
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  InputAdornment,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

const WeightConfiguration = ({
  weightType,
  primaryIngredient,
  weightValue,
  flourIngredients,
  hydrationIngredients,
  extraIngredients,
  flourTotal,
  hydrationTotal,
  allIngredients,
  totalPercentage,
  onWeightTypeChange,
  onPrimaryIngredientChange,
  onWeightValueChange,
  onCalculate,
}) => {
  const getCalculationPreview = () => {
    if (weightType === 'primary' && primaryIngredient && weightValue) {
      const weight = parseFloat(weightValue);
      if (primaryIngredient === 'Flour') {
        return `With ${weightValue}g of total flour, your total dough will weigh approximately ${Math.round((weight * totalPercentage) / flourTotal)}g`;
      } else if (primaryIngredient === 'Hydration') {
        return `With ${weightValue}g of total hydration, your total dough will weigh approximately ${Math.round((weight * totalPercentage) / hydrationTotal)}g`;
      } else {
        const ingredient = allIngredients.find(ing => ing.name === primaryIngredient);
        return `With ${weightValue}g of ${primaryIngredient}, your total dough will weigh approximately ${Math.round((weight * totalPercentage) / (ingredient?.percentage || 0))}g`;
      }
    }
    return '';
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalculateIcon color="primary" />
          Set Primary Ingredient & Weight
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Weight Calculation Method</InputLabel>
            <Select
              value={weightType}
              onChange={(e) => onWeightTypeChange(e.target.value)}
              label="Weight Calculation Method"
            >
              <MenuItem value="primary">Based on Primary Ingredient</MenuItem>
              <MenuItem value="total">Based on Total Dough Weight</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {weightType === 'primary' && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Primary Ingredient/Category</InputLabel>
              <Select
                value={primaryIngredient}
                onChange={(e) => onPrimaryIngredientChange(e.target.value)}
                label="Primary Ingredient/Category"
                displayEmpty
              >
                {flourIngredients.length > 0 && (
                  <ListSubheader>Flour Ingredients</ListSubheader>
                )}
                {flourTotal !== 0 && (
                  <MenuItem value="Flour" key="~flour~">
                    Total Flour ({flourTotal.toFixed(1)}%)
                  </MenuItem>
                )}
                {flourIngredients.map((ingredient) => (
                  <MenuItem key={ingredient.id} value={ingredient.name}>
                    {ingredient.name} ({ingredient.percentage}%)
                  </MenuItem>
                ))}
                
                {hydrationIngredients.length > 0 && (
                  <ListSubheader>Hydration Ingredients</ListSubheader>
                )}
                {hydrationTotal !== 0 && (
                  <MenuItem value="Hydration" key="~hydration~">
                    Total Hydration ({hydrationTotal.toFixed(1)}%)
                  </MenuItem>
                )}
                {hydrationIngredients.map((ingredient) => (
                  <MenuItem key={ingredient.id} value={ingredient.name}>
                    {ingredient.name} ({ingredient.percentage}%)
                  </MenuItem>
                ))}
                
                {extraIngredients.length > 0 && (
                  <ListSubheader>Extra Ingredients</ListSubheader>
                )}
                {extraIngredients.map((ingredient) => (
                  <MenuItem key={ingredient.id} value={ingredient.name}>
                    {ingredient.name} ({ingredient.percentage}%)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label={weightType === 'primary' ? `${primaryIngredient} Weight` : 'Total Dough Weight'}
            value={weightValue}
            onChange={(e) => onWeightValueChange(e.target.value)}
            inputProps={{ min: 0, step: 0.1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      {getCalculationPreview() && (
        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.alternate', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            Calculation Preview:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getCalculationPreview()}
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={onCalculate}
          disabled={!weightValue || (weightType === 'primary' && !primaryIngredient)}
          startIcon={<CalculateIcon />}
          sx={{ px: 4, py: 1.5 }}
        >
          Calculate Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default WeightConfiguration;