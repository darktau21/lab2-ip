import { Box, Paper } from "@mui/material";
import { ModelProvider } from "../context/ModelContext";
import { ModelForm } from "./ModelForm";
import { Calculations } from "./Calculations";
import { Modeling } from "./Modeling";

export const App = () => {
  return (
    <ModelProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Paper elevation={3} sx={{ width: "90%", padding: "2rem" }}>
          <ModelForm />
        </Paper>
        <Paper elevation={3} sx={{ width: "90%", padding: "2rem" }}>
          <Calculations />
        </Paper>
        <Paper elevation={3} sx={{ width: "90%", padding: "2rem" }}>
          <Modeling />
        </Paper>
      </Box>
    </ModelProvider>
  );
};
