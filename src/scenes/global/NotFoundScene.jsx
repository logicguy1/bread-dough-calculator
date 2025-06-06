import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { ArrowBack, Home, Search } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFoundScene = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        bgcolor: 'background.default' 
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center" paragraph sx={{ mt: 2, mb: 4 }}>
            The page <Box component="span" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{location.pathname}</Box> you're looking for doesn't exist or has been moved.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<Home />} 
              onClick={() => navigate('/')}
              size="large"
            >
              Go to Home
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<ArrowBack />} 
              onClick={() => navigate(-1)}
              size="large"
            >
              Go Back
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<Search />} 
              onClick={() => navigate('/patients')}
              size="large"
            >
              Search Patients
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundScene;