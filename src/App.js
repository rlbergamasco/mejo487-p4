import React, { useState, useEffect } from "react";
import { Typography, Link, IconButton, Box, CssBaseline } from "@mui/material";
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Menu, Info } from "@mui/icons-material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { WelcomeDialog, InfoDialog, Sidebar } from "components";
import axios from 'axios';
import 'styles.css';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App = () => {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedIdx, setSelectedIdx] = useState(1);
  const [openWelcome, setOpenWelcome] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const zoom = () => {
    if (window.innerWidth < 400) {
      return 3;
    } else if (window.innerWidth < 1250) {
      return 4;
    } else {
      return 5;
    }
  }

  axios.get('data.json')
    .then(res => setLocations(res.data))
    .catch(err => console.log(err));

  const mapStyles = {
    display: "flex",
    flex: "1 1 auto",
    width: "100%",
  };

  const defaultCenter = { lat: 39.936735262817066, lng: -97.68019476129098 };

  const [center, setCenter] = useState(defaultCenter);

  const handleClose = () => {
    setOpenDialog(false);
    setSelected({});
  };

  const handleMarkerClick = (item) => {
    setSelected(item);
    setOpenInfo(true);
  }

  const handleMenuClick = () => {
    setOpenSidebar(true);
    setOpenInfo(false);
  }

  const handleCloseInfo = () => {
    setSelected({});
    setOpenInfo(false);
  }

  const changeSelectedIdx = (amount) => {
    setSelectedIdx(selectedIdx + amount);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    setSelected(locations.find(e => e.index === selectedIdx) ? locations.find(e => e.index === selectedIdx) : {});
  }, [selectedIdx, locations]);

  return (
    <ThemeProvider theme={theme}>
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
          <IconButton onClick={handleMenuClick}>
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
            zoom={zoom()}
            center={center}
          >
            {locations.map((item) => {
              return (
                <Marker
                  key={item.name}
                  name={item.name}
                  position={item.location}
                  onClick={() => handleMarkerClick(item)}
                  icon="images/castle-icon.png"
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
          changeSelectedIdx={changeSelectedIdx}
          selected={selected}
        />
        <Sidebar
          locations={locations}
          open={openSidebar}
          setOpenSidebar={setOpenSidebar}
          setOpenDialog={setOpenDialog}
          setOpenInfo={setOpenInfo}
          setSelected={setSelected}
        />
      </Box>
    </ThemeProvider >
  );
};

export default App;
