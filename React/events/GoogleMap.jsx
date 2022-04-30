import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import * as eventService from "./eventService";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function MyComponent(props) {
  const [gLocation, setGLocation] = useState({});
  const [geoEvents, setGeoEvents] = useState({
    eventState: [],
    eventCoponents: [],
  });
  console.log(geoEvents);
  // console.log(geoEvents);
  // const [newLoaction, setNewLoaction] = useState({});
  // const [mapRef, setMapRef] = useState(null);
  const ref = useRef();
  useEffect(() => {
    setGLocation(props);
  }, []);

  const fetchGeoEvents = (lat, lng) => {
    eventService
      .findGeoEvent(lat, lng)
      .then(onFindGeoEventSuccess)
      .catch(onFindGeoEventFail);
  };

  const onFindGeoEventSuccess = (response) => {
    console.log(response.data.items);
    let events = response.data.items;

    setGeoEvents((prevState) => {
      const pED = { ...prevState };
      pED.eventState = events[0];
      pED.eventCoponents = events.map(mapEvents);
      return pED;
    });
  };
  // };

  const onFindGeoEventFail = (response) => {
    console.log(response);
  };

  const mapEvents = (aEvent) => {
    let lat = aEvent.metaData.location.latitude;
    let lng = aEvent.metaData.location.longitude;
    return (
      <Marker
        icon={
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }
        position={{ lat: lat, lng: lng }}
        key={"GroupA-" + aEvent.id}
      />
    );
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBxtbmL1VKbUNkHtQu1Q2ibDkY5kDycS4s",
  });

  return (
    isLoaded &&
    gLocation.lat && (
      <GoogleMap
        ref={ref}
        mapContainerStyle={containerStyle}
        center={{ lat: gLocation.lat, lng: gLocation.lng }}
        // center={{
        //   lat: ref.current.state.map.center.lat(),
        //   lng: ref.current.state.map.center.lng(),
        // }}
        zoom={12}
        onDragEnd={() => {
          console.log(ref);
          let newLat = ref.current.state.map.center.lat();
          let newLng = ref.current.state.map.center.lng();
          let newCoords = { lat: newLat, lng: newLng };
          setGLocation(newCoords);
          fetchGeoEvents(newLat, newLng);
        }}
        onClick={(e) => {
          console.log(e.latLng);
          
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          icon={
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          }
          position={{ lat: props.lat, lng: props.lng }}
        />
        {geoEvents.eventCoponents}

        <></>
      </GoogleMap>
    )
  );
}

export default React.memo(MyComponent);
