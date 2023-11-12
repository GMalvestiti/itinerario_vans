import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import InformationForm from "./components/info/info-form";

export default function Page() {
  return (
    <Box component="main" sx={{ display: "flex", flexGrow: 1, p: 2 }}>
      <Container component="main" maxWidth="xl" disableGutters sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Informações:</Typography>
              </Grid>
              <Grid item xs={12}>
                <InformationForm />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              {/* TODO: Mostrar Resultado */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
