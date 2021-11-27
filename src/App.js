import React, { useState } from 'react';
import { Typography, Button, AppBar, Toolbar, IconButton, Box, CssBaseline } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { DialogBox } from 'components';

const App = () => {
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);

  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 35.90871,
        lng: -79.063032,
      },
      info: "Hi"
    },
    {
      name: "Location 2",
      location: {
        lat: 35.90171,
        lng: -79.093032,
      },
      info: "Hello"
    },
  ];

  const mapStyles = {
    display: 'flex',
    flex: '1 1 auto',
    width: "100%"
  };

  const defaultCenter = {
    lat: 35.9114,
    lng: -79.0481
  }

  const handleClose = () => {
    setOpen(false);
    setSelected({});
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {
              locations.map(item => {
                return (
                  <Marker
                    key={item.name}
                    name={item.name}
                    position={item.location}
                    onClick={() => setSelected(item)}
                  // icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                  />
                )
              })
            }
            {
              selected.location &&
              (
                <InfoWindow
                  position={selected.location}
                  clickable={true}
                  onCloseClick={() => setSelected({})}
                >
                  <React.Fragment>
                    <Typography variant="h6">{selected.name}</Typography>
                    <Button onClick={() => setOpen(true)}>Read More</Button>
                  </React.Fragment>
                </InfoWindow>
              )
            }
          </GoogleMap>
        </LoadScript>
        <DialogBox handleClose={handleClose} open={open} selected={selected} />
      </Box>
    </React.Fragment>
  )
}

export default App;
