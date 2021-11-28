import React, { useState } from "react";
import { Typography, Link, IconButton, Box, CssBaseline } from "@mui/material";
import { Menu, Info } from "@mui/icons-material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { WelcomeDialog, InfoDialog, Sidebar } from "components";
import axios from 'axios';

const App = () => {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState({});
  const [openWelcome, setOpenWelcome] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  axios.get('data.json')
    .then(res => setLocations(res.data))
    .catch(err => console.log(err));

  const mapStyles = {
    display: "flex",
    flex: "1 1 auto",
    width: "100%",
  };

  const defaultCenter = {
    lat: 35.9114,
    lng: -79.0481,
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelected({});
  };

  const handleMarkerClick = (item) => {
    setSelected(item);
    setOpenInfo(true);
  }

  const handleCloseInfo = () => {
    setSelected({});
    setOpenInfo(false);
  }

  const toggleDrawer = (status) => (event) => {
    setOpenSidebar(status);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "40px",
            width: "40px",
            backgroundColor: "white",
            position: "absolute",
            zIndex: 10,
            right: 0,
            margin: "10px",
          }}
        >
          <IconButton onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "40px",
            width: "40px",
            backgroundColor: "white",
            position: "absolute",
            zIndex: 10,
            right: 50,
            margin: "10px",
          }}
        >
          <IconButton onClick={() => setOpenWelcome(true)}>
            <Info />
          </IconButton>
        </Box>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {locations.map((item) => {
              return (
                <Marker
                  key={item.name}
                  name={item.name}
                  position={item.location}
                  onClick={() => handleMarkerClick(item)}
                // icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                />
              );
            })}
            {selected.location && openInfo && (
              <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={handleCloseInfo}
              >
                <Box
                  sx={{
                    maxWidth: "300px",
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {selected.name}
                  </Typography>
                  <Typography>{selected.address}</Typography>
                  <Link underline="hover" onClick={() => setOpenDialog(true)}>Read More</Link>
                </Box>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        <WelcomeDialog handleClose={() => setOpenWelcome(false)} open={openWelcome} />
        <InfoDialog
          handleClose={handleClose}
          open={openDialog}
          selected={selected}
        />
        <Sidebar
          locations={locations}
          open={openSidebar}
          toggleDrawer={toggleDrawer}
          setOpenDialog={setOpenDialog}
          setOpenInfo={setOpenInfo}
          setSelected={setSelected}
        />
      </Box>
    </React.Fragment>
  );
};

export default App;
