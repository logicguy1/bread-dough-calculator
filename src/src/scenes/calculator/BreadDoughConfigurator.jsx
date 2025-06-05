import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Divider,
  Grid,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListSubheader,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Calculate as CalculateIcon,
  RestartAlt as RestartIcon,
  BakeryDining as BakeryDiningIcon,
  ExpandMore as ExpandMoreIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const BreadDoughConfigurator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  
  // Separate ingredient categories
  const [flourIngredients, setFlourIngredients] = useState([
    { id: 1, name: 'Wheat Flour', percentage: 70 },
    { id: 2, name: 'Spelt Flour', percentage: 30 },
  ]);
  
  const [hydrationIngredients, setHydrationIngredients] = useState([
    { id: 3, name: 'Water', percentage: 68 },
  ]);
  
  const [extraIngredients, setExtraIngredients] = useState([
    { id: 4, name: 'Salt', percentage: 2.3 },
    { id: 5, name: 'Enzymes', percentage: 2 },
    { id: 6, name: 'Sourdough', percentage: 5 },
  ]);

  const [newIngredientNames, setNewIngredientNames] = useState({
    flour: '',
    hydration: '',
    extra: ''
  });

  const [primaryIngredient, setPrimaryIngredient] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [weightType, setWeightType] = useState('primary');
  const [calculatedResults, setCalculatedResults] = useState({
    flour: [],
    hydration: [],
    extra: []
  });

  const steps = ['Configure Recipe', 'Set Primary & Weight', 'Calculate Results'];

  const commonIngredients = {
    flour: ['Bread Flour', 'Whole Wheat', 'Rye Flour', 'Semolina', 'Einkorn', 'Kamut'],
    hydration: ['Milk', 'Buttermilk', 'Beer', 'Wine', 'Olive Oil', 'Butter'],
    extra: ['Sugar', 'Yeast', 'Honey', 'Salt', 'Malt Extract', 'Vital Wheat Gluten', 'Diastatic Malt']
  };

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

  const addIngredient = (category) => {
    const name = newIngredientNames[category].trim();
    if (!name) return;

    const newId = Math.max(...allIngredients.map(i => i.id), 0) + 1;
    const newIngredient = { id: newId, name, percentage: 0 };

    switch (category) {
      case 'flour':
        setFlourIngredients([...flourIngredients, newIngredient]);
        break;
      case 'hydration':
        setHydrationIngredients([...hydrationIngredients, newIngredient]);
        break;
      case 'extra':
        setExtraIngredients([...extraIngredients, newIngredient]);
        break;
    }

    setNewIngredientNames(prev => ({ ...prev, [category]: '' }));
  };

  const removeIngredient = (category, id) => {
    switch (category) {
      case 'flour':
        setFlourIngredients(flourIngredients.filter(ingredient => ingredient.id !== id));
        break;
      case 'hydration':
        setHydrationIngredients(hydrationIngredients.filter(ingredient => ingredient.id !== id));
        break;
      case 'extra':
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
      case 'flour':
        setFlourIngredients(updateFunction);
        break;
      case 'hydration':
        setHydrationIngredients(updateFunction);
        break;
      case 'extra':
        setExtraIngredients(updateFunction);
        break;
    }
  };

  const addCommonIngredient = (category, name) => {
    const currentIngredients = category === 'flour' ? flourIngredients : 
                              category === 'hydration' ? hydrationIngredients : 
                              extraIngredients;
    
    if (!currentIngredients.some(ingredient => ingredient.name.toLowerCase() === name.toLowerCase())) {
      const newId = Math.max(...allIngredients.map(i => i.id), 0) + 1;
      const newIngredient = { id: newId, name, percentage: 0 };

      switch (category) {
        case 'flour':
          setFlourIngredients([...flourIngredients, newIngredient]);
          break;
        case 'hydration':
          setHydrationIngredients([...hydrationIngredients, newIngredient]);
          break;
        case 'extra':
          setExtraIngredients([...extraIngredients, newIngredient]);
          break;
      }
    }
  };

  const calculateResults = () => {
    const weight = parseFloat(weightValue);
    if (!weight || !primaryIngredient) return;

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
    
    setCalculatedResults(results);
    setActiveStep(2);
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
    setFlourIngredients([
      { id: 1, name: 'Wheat Flour', percentage: 70 },
      { id: 2, name: 'Spelt Flour', percentage: 30 },
    ]);
    setHydrationIngredients([
      { id: 3, name: 'Water', percentage: 68 },
    ]);
    setExtraIngredients([
      { id: 4, name: 'Salt', percentage: 2.3 },
      { id: 5, name: 'Enzymes', percentage: 2 },
      { id: 6, name: 'Sourdough', percentage: 5 },
    ]);
    setPrimaryIngredient('');
    setWeightValue('');
    setWeightType('primary');
    setCalculatedResults({ flour: [], hydration: [], extra: [] });
    setNewIngredientNames({ flour: '', hydration: '', extra: '' });
  };

  const renderSidebar = () => (
    <Box sx={{ width: 280, p: 2, height: '100vh', overflow: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptIcon color="primary" />
        <Typography variant="h6" color="primary">
          Recipe Overview
        </Typography>
      </Box>

      {/* Flour Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="primary.main" gutterBottom>
          Flour ({flourTotal.toFixed(1)}%)
          {activeStep === 2 && calculatedResults.flour.length > 0 && (
            <Typography component="span" variant="body2" sx={{ ml: 1, fontWeight: 'normal' }}>
              - {calculatedResults.flour.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g
            </Typography>
          )}
        </Typography>
        <List dense sx={{ pl: 1 }}>
          {(activeStep === 2 && calculatedResults.flour.length > 0 ? calculatedResults.flour : flourIngredients).map((ingredient) => (
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

      <Divider sx={{ my: 2 }} />

      {/* Hydration Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="info.main" gutterBottom>
          Hydration ({hydrationTotal.toFixed(1)}%)
          {activeStep === 2 && calculatedResults.hydration.length > 0 && (
            <Typography component="span" variant="body2" sx={{ ml: 1, fontWeight: 'normal' }}>
              - {calculatedResults.hydration.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g
            </Typography>
          )}
        </Typography>
        <List dense sx={{ pl: 1 }}>
          {(activeStep === 2 && calculatedResults.hydration.length > 0 ? calculatedResults.hydration : hydrationIngredients).map((ingredient) => (
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

      <Divider sx={{ my: 2 }} />

      {/* Extras Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="secondary.main" gutterBottom>
          Extras ({extraTotal.toFixed(1)}%)
          {activeStep === 2 && calculatedResults.extra.length > 0 && (
            <Typography component="span" variant="body2" sx={{ ml: 1, fontWeight: 'normal' }}>
              - {calculatedResults.extra.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g
            </Typography>
          )}
        </Typography>
        <List dense sx={{ pl: 1 }}>
          {(activeStep === 2 && calculatedResults.extra.length > 0 ? calculatedResults.extra : extraIngredients).map((ingredient) => (
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

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
        <Typography variant="h6" align="center" color="text.primary">
          Total: {totalPercentage.toFixed(1)}%
          {activeStep === 2 && calculatedResults.flour.length > 0 && (
            <Typography variant="body2" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
              {([...calculatedResults.flour, ...calculatedResults.hydration, ...calculatedResults.extra]
                .reduce((sum, ing) => sum + ing.grams, 0)).toFixed(1)}g
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
            {weightType === 'primary' && primaryIngredient ? `${primaryIngredient}: ${weightValue}g` : `Total: ${weightValue}g`}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderIngredientSection = (title, ingredients, category, total, color) => (
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
                  value={newIngredientNames[category]}
                  onChange={(e) => setNewIngredientNames(prev => ({ ...prev, [category]: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && addIngredient(category)}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => addIngredient(category)}
                  startIcon={<AddIcon />}
                  disabled={!newIngredientNames[category].trim()}
                  size="small"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Common ingredients */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="caption" display="block" gutterBottom sx={{ mb: 2 }}>
              Quick Add:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {commonIngredients[category].map((ingredient) => (
                <Chip
                  key={ingredient}
                  label={ingredient}
                  onClick={() => addCommonIngredient(category, ingredient)}
                  variant="outlined"
                  size="small"
                  disabled={ingredients.some(ing => ing.name.toLowerCase() === ingredient.toLowerCase())}
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </Box>

          {/* Ingredients table */}
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
                        onChange={(e) => updateIngredientPercentage(category, ingredient.id, e.target.value)}
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
                        onClick={() => removeIngredient(category, ingredient.id)}
                        color="error"
                        disabled={ingredients.length <= 1 && category === 'flour'}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BakeryDiningIcon color="primary" />
                Configure Your Recipe
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              {renderIngredientSection('Flour', flourIngredients, 'flour', flourTotal, 'primary.main')}
              {renderIngredientSection('Hydration', hydrationIngredients, 'hydration', hydrationTotal, 'info.main')}
              {renderIngredientSection('Extras', extraIngredients, 'extra', extraTotal, 'secondary.main')}
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

      case 1:
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
                    onChange={(e) => setWeightType(e.target.value)}
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
                      onChange={(e) => {console.log(e); setPrimaryIngredient(e.target.value)}}
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
                  onChange={(e) => setWeightValue(e.target.value)}
                  inputProps={{ min: 0, step: 0.1 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>

            {weightType === 'primary' && primaryIngredient && weightValue && (
              <Box sx={{ mt: 4, p: 3, bgcolor: 'background.alternate', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                  Calculation Preview:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {primaryIngredient === 'Flour' ? (
                    `With ${weightValue}g of total flour, your total dough will weigh approximately ${Math.round((parseFloat(weightValue) * totalPercentage) / flourTotal)}g`
                  ) : primaryIngredient === 'Hydration' ? (
                    `With ${weightValue}g of total hydration, your total dough will weigh approximately ${Math.round((parseFloat(weightValue) * totalPercentage) / hydrationTotal)}g`
                  ) : (
                    `With ${weightValue}g of ${primaryIngredient}, your total dough will weigh approximately ${Math.round((parseFloat(weightValue) * totalPercentage) / allIngredients.find(ing => ing.name === primaryIngredient)?.percentage || 0)}g`
                  )}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={calculateResults}
                disabled={!weightValue || (weightType === 'primary' && !primaryIngredient)}
                startIcon={<CalculateIcon />}
                sx={{ px: 4, py: 1.5 }}
              >
                Calculate Recipe
              </Button>
            </Box>
          </Box>
        );

      case 2:
        const totalWeight = [...calculatedResults.flour, ...calculatedResults.hydration, ...calculatedResults.extra]
          .reduce((sum, ing) => sum + ing.grams, 0);

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
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="primary.main" gutterBottom sx={{ mb: 2 }}>
                Flour ({calculatedResults.flour.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g)
              </Typography>
              <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                  <TableBody>
                    {calculatedResults.flour.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell sx={{ py: 2 }}>{ingredient.name}</TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>{ingredient.percentage}%</TableCell>
                        <TableCell align="right" sx={{ py: 2 }}><strong>{ingredient.grams}g</strong></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Hydration Results */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="info.main" gutterBottom sx={{ mb: 2 }}>
                Hydration ({calculatedResults.hydration.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g)
              </Typography>
              <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                  <TableBody>
                    {calculatedResults.hydration.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell sx={{ py: 2 }}>{ingredient.name}</TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>{ingredient.percentage}%</TableCell>
                        <TableCell align="right" sx={{ py: 2 }}><strong>{ingredient.grams}g</strong></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Extras Results */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="secondary.main" gutterBottom sx={{ mb: 2 }}>
                Extras ({calculatedResults.extra.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g)
              </Typography>
              <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                  <TableBody>
                    {calculatedResults.extra.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell sx={{ py: 2 }}>{ingredient.name}</TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>{ingredient.percentage}%</TableCell>
                        <TableCell align="right" sx={{ py: 2 }}><strong>{ingredient.grams}g</strong></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(1)}
                sx={{ px: 3, py: 1.5 }}
              >
                Modify Weight
              </Button>
              <Button
                variant="contained"
                onClick={handleReset}
                startIcon={<RestartIcon />}
                sx={{ px: 3, py: 1.5 }}
              >
                Start New Recipe
              </Button>
            </Box>
          </Box>
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
                {steps.map((label) => (
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
          {renderSidebar()}
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
          {renderSidebar()}
        </Drawer>
      )}
    </Box>
  );
};

export default BreadDoughConfigurator;