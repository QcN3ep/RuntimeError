import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import MainLayout from './components/MainLayout.jsx';
import MainPage from './pages/MainPage.jsx';
import MapPage from './pages/MapPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/map' element={<MapPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
