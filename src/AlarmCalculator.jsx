import { useState } from "react";
import { TextField, Button, Typography, Box, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function AlarmCalculator() {
  const [flightTime, setFlightTime] = useState("");
  const [planeType, setPlaneType] = useState(""); // "romanesc" sau "moldovenesc"
  const [transportType, setTransportType] = useState(""); // "masina" sau "taxi"
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [getOutTime, setGetOutTime] = useState("");

  const calculateWakeUp = () => {
    if (!flightTime || !planeType || !transportType) {
      setWakeUpTime("Completează toate câmpurile!");
      return;
    }

    const [flightHours, flightMinutes] = flightTime.split(":").map(Number);

    const flightDate = new Date();
    flightDate.setHours(flightHours, flightMinutes, 0, 0);

    // 1. timp sosire aeroport
    let airportArrivalMinutes = planeType === "romanesc" ? 80 : 60;

    // 2. timp transport plecare de acasa
    let transportMinutes = transportType === "masina" ? 30 : 40;

    // 3. timp machiaj/pregatire in functie de ora zborului
   let prepMinutes = (flightHours >= 12 || flightHours < 2) ? 80 : 70;

    // 4. la ce ora trebuie sa iasa din casa
    let outFromHouse = new Date(flightDate.getTime() - (airportArrivalMinutes + transportMinutes) * 60000)
    const wakeUpDateFormatted = outFromHouse.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // total timp in minute
    const totalPrepMinutes = airportArrivalMinutes + transportMinutes + prepMinutes;

    const wakeUpDate = new Date(flightDate.getTime() - totalPrepMinutes * 60000);

    const formattedTime = wakeUpDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setWakeUpTime(`Trebuie să te trezești la: ${formattedTime}`);
    setGetOutTime(`Trebuie să iesi la: ${wakeUpDateFormatted}`);
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

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Tip avion</FormLabel>
          <RadioGroup
            row
            value={planeType}
            onChange={(e) => setPlaneType(e.target.value)}
          >
            <FormControlLabel value="romanesc" control={<Radio />} label="Românesc" />
            <FormControlLabel value="moldovenesc" control={<Radio />} label="Moldovenesc" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Transport</FormLabel>
          <RadioGroup
            row
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
          >
            <FormControlLabel value="masina" control={<Radio />} label="Mașină" />
            <FormControlLabel value="taxi" control={<Radio />} label="Taxi" />
          </RadioGroup>
        </FormControl>

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
        {getOutTime && (
          <Typography variant="body1" sx={{ mt: 3 }}>
            {getOutTime}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default AlarmCalculator;
