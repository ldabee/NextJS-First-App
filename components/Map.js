import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //Transform the searchResults as required 
  const coordinates = searchResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  });

  return <ReactMapGL
    mapStyle='mapbox://styles/lionel-dabee/ckskktyii2vti18p8k38o7l76'
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nexViewport) => setViewport(nexViewport)}
  >
    {searchResults?.map(result => (
      <div key={result.long}>
        <Marker
          longitude={result.long}
          latitude={result.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <p
            role="img"
            onClick={() => setSelectedLocation(result)}
            className="cursor-pointer text-2xl animate-bounce"
            aria-label="push-pin"
          >📌</p>
        </Marker>

        {/* The popup that should show if we click on a Marker */}
        {selectedLocation.long === result.long ? (
          <Popup
            onClose={() => setSelectedLocation({})}
            closeOnClick={true}
            latitude={result.lat}
            longitude={result.long}
          >{result.title}</Popup>
        ) : (false)}
      </div>
    ))}
  </ReactMapGL>
}

export default Map
