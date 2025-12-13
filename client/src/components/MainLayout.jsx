import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from './Navbar';

export default function MainLayout() {
  const [navHeight, setNavHeight] = React.useState(80);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        component='main'
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          boxSizing: 'border-box',
          pb: `calc(${navHeight}px + env(safe-area-inset-bottom))`,
        }}
      >
        <Outlet />
      </Box>
      <Navbar onHeight={(h) => setNavHeight(h)} />
    </Box>
  );
}