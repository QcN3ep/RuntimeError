import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ComputerIcon from '@mui/icons-material/Computer';
import { useThemeMode } from '../context/ThemeContext';

export default function SettingsPage() {
  const { mode, setMode } = useThemeMode();
  const theme = useTheme();

  return (
    <Container maxWidth='sm' sx={{ py: 6, px: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' gutterBottom sx={{ fontWeight: 600 }}>
          设置
        </Typography>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4, // 增加内部 padding
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant='h6' gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          外观
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant='subtitle1' sx={{ fontWeight: 500, mb: 0.5 }}>
              主题模式
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              选择您喜欢的主题模式
            </Typography>
          </Box>
          
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, v) => v && setMode(v)}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              '& .MuiToggleButton-root': {
                px: 2,
                py: 1,
                border: 0,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                },
                '&:not(:first-of-type)': {
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  marginLeft: 0,
                }
              }
            }}
          >
            <ToggleButton value='light'>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60 }}>
                <LightModeIcon fontSize='small' sx={{ mb: 0.5 }} />
                <Typography variant='caption'>浅色</Typography>
              </Box>
            </ToggleButton>
            
            <ToggleButton value='dark'>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60 }}>
                <DarkModeIcon fontSize='small' sx={{ mb: 0.5 }} />
                <Typography variant='caption'>深色</Typography>
              </Box>
            </ToggleButton>
            
            <ToggleButton value='system'>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60 }}>
                <ComputerIcon fontSize='small' sx={{ mb: 0.5 }} />
                <Typography variant='caption'>系统</Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>
    </Container>
  );
}
