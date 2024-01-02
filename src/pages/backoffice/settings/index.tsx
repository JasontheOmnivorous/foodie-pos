import { useAppSelector } from "@/store/hooks";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const SettingsPage = () => {
  const locations = useAppSelector((store) => store.location.items);
  const [locationId, setLocationId] = useState<number>(
    locations.length > 0 ? locations[0].id : 1
  );

  const handleLocationChange = (event: SelectChangeEvent<number>) => {
    // store selected locationId in localStorage to control the whole app's data state based on location
    localStorage.setItem("selectedLocationId", String(event.target.value));
    setLocationId(Number(event.target.value));
  };

  return (
    <Box sx={{ m: 2 }}>
      <FormControl sx={{ width: 400, p: 1 }}>
        <InputLabel>Select Location</InputLabel>
        <Select
          value={locationId}
          label="Location"
          onChange={handleLocationChange}
        >
          {locations.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingsPage;
