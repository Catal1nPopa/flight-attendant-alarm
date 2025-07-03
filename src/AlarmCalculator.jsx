import { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function AlarmCalculator() {
  const [flightTime, setFlightTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");

  const calculateWakeUp = () => {
    if (!flightTime || !prepTime) {
      setWakeUpTime("Completează toate câmpurile!");
      return;
    }

    const [flightHours, flightMinutes] = flightTime.split(":").map(Number);
    const prepMinutes = parseInt(prepTime, 10);

    const flightDate = new Date();
    flightDate.setHours(flightHours);
    flightDate.setMinutes(flightMinutes);
    flightDate.setSeconds(0);

    const wakeUpDate = new Date(flightDate.getTime() - prepMinutes * 60000);

    const formattedTime = wakeUpDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setWakeUpTime(`Trebuie să te trezești la: ${formattedTime}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        zIndex: 2,
        p: 2
      }}
    >
      <Paper elevation={12} sx={{ p: 4, maxWidth: 400, textAlign: "center", borderRadius: 4, backdropFilter: 'blur(10px)' }}>
        <FlightTakeoffIcon sx={{ fontSize: 50, color: "#1976d2" }} />
        <Typography variant="h5" gutterBottom>
          Calculator Trezire Zbor
        </Typography>
        <TextField
          fullWidth
          label="Ora Zborului (HH:MM)"
          type="time"
          value={flightTime}
          onChange={(e) => setFlightTime(e.target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Minute Pregătire"
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={calculateWakeUp}
        >
          Calculează Ora de Trezire
        </Button>
        {wakeUpTime && (
          <Typography variant="body1" sx={{ mt: 3 }}>
            {wakeUpTime}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default AlarmCalculator;
