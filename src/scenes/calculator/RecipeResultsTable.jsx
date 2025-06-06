// RecipeResultsTable.jsx
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

const RecipeResultsTable = ({ title, ingredients, color }) => {
  const totalWeight = ingredients.reduce((sum, ing) => sum + ing.grams, 0);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" color={color} gutterBottom sx={{ mb: 2 }}>
        {title} ({totalWeight.toFixed(1)}g)
      </Typography>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table size="small">
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell sx={{ py: 2 }}>{ingredient.name}</TableCell>
                <TableCell align="right" sx={{ py: 2 }}>{ingredient.percentage}%</TableCell>
                <TableCell align="right" sx={{ py: 2 }}>
                  <strong>{ingredient.grams}g</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecipeResultsTable;