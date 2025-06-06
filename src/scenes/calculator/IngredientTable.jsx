// IngredientTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const IngredientTable = ({ 
  ingredients, 
  category, 
  onUpdatePercentage, 
  onRemoveIngredient,
  canDelete = true 
}) => {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 2 }}>Ingredient</TableCell>
            <TableCell align="right" sx={{ py: 2 }}>Percentage (%)</TableCell>
            <TableCell align="right" sx={{ py: 2 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" fontWeight="medium">
                  {ingredient.name}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 2 }}>
                <TextField
                  type="number"
                  value={ingredient.percentage}
                  onChange={(e) => onUpdatePercentage(category, ingredient.id, e.target.value)}
                  inputProps={{ 
                    min: 0, 
                    step: 0.1,
                    style: { 
                      MozAppearance: 'textfield',
                      textAlign: 'right'
                    }
                  }}
                  size="small"
                  sx={{ 
                    width: 120,
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      display: 'none',
                    },
                    '& input[type=number]': {
                      MozAppearance: 'textfield',
                    },
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </TableCell>
              <TableCell align="right" sx={{ py: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => onRemoveIngredient(category, ingredient.id)}
                  color="error"
                  disabled={!canDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IngredientTable;