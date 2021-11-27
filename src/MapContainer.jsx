import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { DialogBox } from './DialogBox';

const MapContainer = () => {
    const [selected, setSelected] = useState({});
    const [open, setOpen] = useState(false);

    const markers = [
        {
            name: "Location 1",
            location: {
                lat: 35.90871,
                lng: -79.063032,
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 35.90171,
                lng: -79.093032,
            },
        },
    ];

    const mapStyles = {
        height: "100vh",
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
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}
                >
                    {
                        markers.map(marker => {
                            return (
                                <Marker
                                    key={marker.name}
                                    name={marker.name}
                                    position={marker.location}
                                    onClick={() => setSelected(marker)}
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
            <DialogBox handleClose={handleClose} open={open} name={selected.name} />
        </React.Fragment>
    )
}

export default MapContainer;