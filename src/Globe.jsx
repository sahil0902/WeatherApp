import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = `${import.meta.env.VITE_MAPAPIKEY}`;

const MapComponent = ({ loc, city,weatherCondition }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
// Define map styles for different weather conditions
const mapStyles = {
    clear: 'mapbox://styles/mapbox/navigation-day-v1',
    clouds: 'mapbox://styles/mapbox/light-v10',
    rain: 'mapbox://styles/mapbox/dark-v10',
    snow: 'mapbox://styles/mapbox/winter-v1',
    default: 'mapbox://styles/mapbox/streets-v11'
};
    useEffect(() => {
        const defaultCenter = [30, 15];
        const zoomLevel = 1;
        if (mapRef.current && !map) {
            // Create a new map instance
            const newMap = new mapboxgl.Map({
                container: 'map', // Specify the container element
                style: mapStyles.default,// Specify the map style
                projection: 'globe', // Set the projection to globe
                zoom: zoomLevel, // Set the initial zoom level
                center: defaultCenter, // Set the initial center coordinates
            });

            // Add navigation control to the map
            newMap.addControl(new mapboxgl.NavigationControl());

// Define the boundary coordinates (southwest and northeast corners of the bounding box)
const bounds = [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91015624999999, 40.87764500765852]  // Northeast coordinates
];

// Update the map view to fit the specified bounds
newMap.fitBounds(bounds, {
    padding: {top: 10, bottom:25, left: 15, right: 5}
});

            setMap(newMap);
        }

        return () => map?.remove(); // Cleanup map on unmount
    }, [map]);

    useEffect(() => {
       if (map && loc.lat && loc.lon) {
    // Use flyTo animation to smoothly transition to the new location and zoom level
    map.flyTo({
        center: [loc.lon, loc.lat],
        zoom: 10
    });
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
 // Update map style based on weather condition
    useEffect(() => {
        if (map && weatherCondition) {
            const condition = weatherCondition.toLowerCase();
            const styleUrl = mapStyles[condition] || mapStyles.default;
            map.setStyle(styleUrl);
        }
    }, [map, weatherCondition]);
    return <div ref={mapRef} id="map" style={{ position: 'absolute', top: 0, bottom: 0, left:0,right:0, width: '100%' }} />;
};

export default MapComponent;
