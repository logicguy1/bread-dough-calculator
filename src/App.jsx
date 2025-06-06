import React, { useState, useRef } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './App.css';

// Context Providers
import { HeadProvider } from './context/HeadContext';
import { SnackBarProvider } from './context/SnackBarContext';

// Components
import Sidebar from "./scenes/global/sidebar";
import Topbar from "./scenes/global/topbar";
import BreadDoughConfigurator from './scenes/calculator/BreadDoughConfigurator';
import NotFoundScene from './scenes/global/NotFoundScene';

const App = () => {
  // Theme and color mode
  const [theme, colorMode] = useMode();

  // State management
  const [headerData, setHeaderData] = useState({ location: ["FrNet", "Dashboard"] });
  const [expanded, setExpanded] = useState(false);
  const [snackText, setSnackText] = useState(false);

  // Screenshot functionality
  const appRef = useRef(null);

  return (
    <BrowserRouter basename="/bread-dough-calculator">
      <HeadProvider value={{ data: headerData, setData: setHeaderData, expanded }}>
        <SnackBarProvider value={{ text: snackText, setText: setSnackText }}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box
                className="App"
                display="flex"
                height="100%"
                ref={appRef}
              >
                {/*<Sidebar setExpanded={setExpanded} />*/}
                <Box>
                  <Topbar drawerOpen={expanded} setDrawerOpen={setExpanded} />
                  <Box component="main" sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: '52px', // Height of AppBar
                    width: { sm: `calc(100vw - ${expanded ? '240px' : '0px'})` },
                    ml: { sm:expanded ? '240px' : '0px' },
                    transition: theme.transitions.create(['margin', 'width'], {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.leavingScreen,
                    }),
                  }}>
                    <Routes>
                      {/* Routes will be added here */}
                      <Route path="/" element={<BreadDoughConfigurator />} />

                      {/* 404 Page - This should be the last route */}
                      <Route path="*" element={<NotFoundScene />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SnackBarProvider>
      </HeadProvider>
    </BrowserRouter>
  );
};

export default App;