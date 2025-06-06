// IngredientSection.jsx
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { 
  Add as AddIcon, 
  ExpandMore as ExpandMoreIcon 
} from '@mui/icons-material';
import IngredientTable from './IngredientTable';
import QuickAddIngredients from './QuickAddIngredients';

const IngredientSection = ({
  title,
  ingredients,
  category,
  total,
  color,
  newIngredientName,
  commonIngredients,
  onNewIngredientNameChange,
  onAddIngredient,
  onUpdatePercentage,
  onRemoveIngredient,
  onAddCommonIngredient,
}) => {
  const canDelete = !(ingredients.length <= 1 && category === 'flour');

  return (
    <Box sx={{ mb: 3 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2 }}>
            <Typography variant="h6" color={color}>
              {title}
            </Typography>
            <Typography variant="h6" color={color}>
              {total.toFixed(1)}%
            </Typography>
          </Box>
        </AccordionSummary>
        
        <AccordionDetails sx={{ pt: 3 }}>
          {/* Add new ingredient */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label={`Add ${title} Ingredient`}
                  value={newIngredientName}
                  onChange={(e) => onNewIngredientNameChange(category, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onAddIngredient(category)}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onAddIngredient(category)}
                  startIcon={<AddIcon />}
                  disabled={!newIngredientName.trim()}
                  size="small"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Quick add common ingredients */}
          <QuickAddIngredients
            commonIngredients={commonIngredients}
            currentIngredients={ingredients}
            category={category}
            onAddCommonIngredient={onAddCommonIngredient}
          />

          {/* Ingredients table */}
          <IngredientTable
            ingredients={ingredients}
            category={category}
            onUpdatePercentage={onUpdatePercentage}
            onRemoveIngredient={onRemoveIngredient}
            canDelete={canDelete}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default IngredientSection;