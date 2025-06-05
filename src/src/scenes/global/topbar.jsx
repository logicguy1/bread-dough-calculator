import { 
  AppBar, 
  Box, 
  IconButton, 
  useTheme, 
  Typography, 
  Tooltip, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton, 
  Divider,
  useMediaQuery
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme.js";
import { useNavigate, Link } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined.js";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined.js";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined.js";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined.js";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined.js';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined.js';
import MenuIcon from '@mui/icons-material/Menu.js';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft.js';
import { HeadContext } from '../../context/HeadContext.js';

// Import your sidebar menu items/icons here
// For example:
import DashboardIcon from '@mui/icons-material/Dashboard.js';
import KitchenIcon from '@mui/icons-material/Kitchen.js';
import RestaurantIcon from '@mui/icons-material/Restaurant.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart.js';

const ResponsiveAppBar = ({ drawerOpen, setDrawerOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const headSettings = useContext(HeadContext);
  
  // Menu items for the drawer
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'My Fridge', icon: <KitchenIcon />, path: '/fridge' },
    { text: 'Recipes', icon: <RestaurantIcon />, path: '/recipes' },
    { text: 'Shopping List', icon: <ShoppingCartIcon />, path: '/shopping' },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 1,
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          p={1}
          pl={5}
          pr={2}
        >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {headSettings.data?.title || "Bread bread bread"}
            </Typography>

          {/* RIGHT SIDE ICONS */}
          <Box display="flex">
            <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} theme`}>
              <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            {/*<Tooltip title="Notifications">
              <IconButton color="inherit">
                <NotificationsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit">
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>*/}
          </Box>
        </Box>
      </AppBar>
      
      {/* Navigation Drawer */}
      <Drawer
        variant={"temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '52px', // Height of AppBar
            height: 'calc(100% - 52px)', // Subtract AppBar height
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.text} 
                disablePadding
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ 
                    color: theme.palette.text.secondary
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveAppBar;