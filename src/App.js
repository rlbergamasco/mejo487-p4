import React, { useState } from 'react';
import { Typography, Button, AppBar, Toolbar, IconButton, Box, CssBaseline } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { DialogBox, Sidebar } from 'components';

const App = () => {
  const [selected, setSelected] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 35.90871,
        lng: -79.063032,
      },
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      name: "Location 2",
      location: {
        lat: 35.90171,
        lng: -79.093032,
      },
      blurb: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      description: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
    setOpenDialog(false);
    setSelected({});
  }

  const toggleDrawer = (status) => (event) => {
    setOpenSidebar(status);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: '40px', width: '40px', backgroundColor: 'white', position: 'absolute', zIndex: 10, right: 0, margin: '10px' }}>
          <IconButton onClick={toggleDrawer(true)} >
            <Menu />
          </IconButton>
        </Box>
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '300px' }}>
                    <Typography variant="h6" align="center">{selected.name}</Typography>
                    <Typography align="center">{selected.blurb}</Typography>
                    <Button onClick={() => setOpenDialog(true)}>Read More</Button>
                  </Box>
                </InfoWindow>
              )
            }
          </GoogleMap>
        </LoadScript>
        <DialogBox handleClose={handleClose} open={openDialog} selected={selected} />
        <Sidebar locations={locations} open={openSidebar} toggleDrawer={toggleDrawer} setOpenDialog={setOpenDialog} setSelected={setSelected} />
      </Box>
    </React.Fragment >
  )
}

export default App;
