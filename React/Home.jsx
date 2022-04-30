import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import * as statesService from "./mapService";
//import logger from "sabio-debug";
//const _logger = logger.extend("Maps");

function Maps() {
  const [pageStateData, setPageStateData] = useState();
  const center = [-103.63086, 26.66108];
  //setPageStateData
  useEffect(() => {
    statesService
      .retreiveState()
      .then(onFetchStatesSuccess)
      .catch(onFetchStatesFail);
  }, []);

  function onFetchStatesSuccess(response) {
    console.log(response);
    let data = response.data.item;
    const testingTwo = JSON.parse(data);
    setPageStateData(testingTwo);
    console.log(data);
    console.log(pageStateData);
  }
  console.log(pageStateData);
  function onFetchStatesFail(response) {
    console.log("--Fail--", response);
  }
  return (
    <React.Fragment>
      <MapContainer center={center} zoom={13} id="mapid">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pageStateData && <GeoJSON key={1} data={pageStateData} />}
      </MapContainer>
    </React.Fragment>
  );
}

export default Maps;
