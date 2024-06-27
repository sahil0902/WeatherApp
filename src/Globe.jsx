import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = `${import.meta.env.VITE_MAPAPIKEY}`;

const MapComponent = ({ loc, city }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        const defaultCenter = [30, 15];
        const zoomLevel = 1;
        if (mapRef.current && !map) {
            // Create a new map instance
            const newMap = new mapboxgl.Map({
                container: 'map', // Specify the container element
                style: 'mapbox://styles/mapbox/streets-v11', // Specify the map style
                projection: 'globe', // Set the projection to globe
                zoom: zoomLevel, // Set the initial zoom level
                center: defaultCenter, // Set the initial center coordinates
            });

            // Add navigation control to the map
            newMap.addControl(new mapboxgl.NavigationControl());
            setMap(newMap);
        }

        return () => map?.remove(); // Cleanup map on unmount
    }, [map]);

    useEffect(() => {
        if (map && loc.lat && loc.lon) {
            // If location coordinates are available, set the map center and zoom level accordingly
            map.setCenter([loc.lon, loc.lat]);
            map.setZoom(10);
            mapRef.current.style.display = 'block';
        } else if (map) {
            // If location coordinates are not available, reset the map center and zoom level
            map.setCenter([0, 0]);
            map.setZoom(1);
            mapRef.current.style.display = 'block';
        }
    }, [map, loc]);

    useEffect(() => {
        if (!city || !map) return;

        const geocodeCity = async () => {
            const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapboxgl.accessToken}`;

            try {
                // Fetch geocoding data for the specified city
                const response = await axios.get(geocodeUrl);
                const data = response.data;

                if (data.features && data.features.length > 0) {
                    const [lon, lat] = data.features[0].center;

                    // Fly to the coordinates of the city with animation
                    map.flyTo({
                        center: [lon, lat],
                        zoom: 10,
                        speed: 1.5,
                        curve: 1,
                        easing: (t) => t
                    });
                    mapRef.current.style.display = 'block';
                } else {
                    console.log("City not found");
                }
            } catch (error) {
                console.error("Error fetching geocoding data:", error);
            }
        };

        geocodeCity();
    }, [map, city]);

    return <div ref={mapRef} id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapComponent;
