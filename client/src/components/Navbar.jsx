import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function Navbar({ onHeight }) {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current && typeof onHeight === 'function') {
      onHeight(ref.current.offsetHeight);
    }
  }, [onHeight]);

  const getCurrentValue = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/map') return 'map';
    if (path === '/settings') return 'settings';
    return 'home';
  };

  const [value, setValue] = React.useState(getCurrentValue());

  React.useEffect(() => {
    setValue(getCurrentValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 'home':
        navigate('/');
        break;
      case 'map':
        navigate('/map');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: 80,
          '& .MuiBottomNavigationAction-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 32,
            }
          }
        }}
      >
        <BottomNavigationAction label='主页' value='home' icon={<HomeIcon />} />
        <BottomNavigationAction label='地图' value='map' icon={<MapIcon />} />
        <BottomNavigationAction label='设置' value='settings' icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}