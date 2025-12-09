import { Box, Typography, Container } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function MapPage() {
  return (
    <Container>
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ConstructionIcon sx={{ fontSize: 60, mb: 2, color: 'grey.500' }} />
        <Typography variant="h5" color="text.secondary">
          Working In Progress
        </Typography>
      </Box>
    </Container>
  );
}