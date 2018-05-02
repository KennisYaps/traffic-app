import React from "react";
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  TrafficLayer
} = require("react-google-maps");
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{
      lat: 1.29027,
      lng: 103.851959
    }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={{ lat: marker.Latitude, lng: marker.Longitude }}
        />
      ))}
    </MarkerClusterer>
    <TrafficLayer autoUpdate />
  </GoogleMap>
));
export default MapWithAMarkerClusterer;
