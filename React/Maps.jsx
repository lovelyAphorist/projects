import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import './style.css';
import 'leaflet/dist/leaflet.css';
import * as statesService from '../../services/mapsService';
import logger from 'sabio-debug';
const _logger = logger.extend('Maps');

function Maps() {
    const [pageStateData, setPageStateData] = useState();
    const center = [-103.63086, 26.66108];

    useEffect(() => {
        statesService.retreiveState().then(onFetchStatesSuccess).catch(onFetchStatesFail);
    }, []);

    function onFetchStatesSuccess(response) {
        let data = response.item;
        const testingTwo = JSON.parse(data);
        setPageStateData(testingTwo);
    }

    function onFetchStatesFail(response) {
        _logger('--Fail--', response);
    }
    return (
        <React.Fragment>
            <MapContainer center={center} zoom={13} id="mapid">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pageStateData && <GeoJSON key={pageStateData.properties.id} data={pageStateData} />}
            </MapContainer>
        </React.Fragment>
    );
}

export default Maps;
