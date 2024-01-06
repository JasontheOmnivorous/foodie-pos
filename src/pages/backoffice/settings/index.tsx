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
  const firstLocationId = locations[0].id as number;
  // if locationId hasnt been selected initially, set it's value to the id of first element of locations array
  const [locationId, setLocationId] = useState<number>(
    localStorage.getItem("selectedLocationId")
      ? Number(localStorage.getItem("selectedLocationId"))
      : firstLocationId
  );

  const handleLocationChange = (event: SelectChangeEvent<number>) => {
    // store selected locationId in localStorage to control the whole app's data state based on location
    localStorage.setItem("selectedLocationId", String(event.target.value));
    setLocationId(Number(event.target.value));
  };

  if (!locations) return null;

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
