import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 35.90871,
          lng: -79.063032,
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'First'}
          position={{
            lat: 35.90171,
            lng: -79.093032,
          }}
          icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={'Second'}
          position={{
            lat: 35.90871,
            lng: -79.063032,
          }}
          icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
