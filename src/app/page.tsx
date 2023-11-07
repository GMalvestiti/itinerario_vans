import { Box, Container, Paper } from '@mui/material';

export default function Layout() {
  return (
    <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 2}}>
      <Container component="main" maxWidth="xl" disableGutters sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 3 }}>
          Teste
        </Paper>
      </Container>
    </Box>
  );
}