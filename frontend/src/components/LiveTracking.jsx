import React, { useEffect, useRef, useState } from "react";

const HERE_API_KEY = `${import.meta.env.MAPS_API}`;

const LiveTracking = () => {
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    console.log("LiveTracking rendered", Math.random());

    // Load HERE Maps Scripts Dynamically
    const loadHereMapsScripts = async () => {
      if (!window.H || !window.H.service) {
        const scripts = [
          "https://js.api.here.com/v3/3.1/mapsjs-core.js",
          "https://js.api.here.com/v3/3.1/mapsjs-service.js",
          "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
        ];

        for (let src of scripts) {
          await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = resolve;
            document.body.appendChild(script);
          });
        }
      }
      initializeMap();
    };

    loadHereMapsScripts();

    return () => {
      if (map) {
        map.dispose(); // Cleanup map on unmount
      }
    };
  }, []);

  const initializeMap = () => {
    const platform = new window.H.service.Platform({ apikey: HERE_API_KEY });
    const defaultLayers = platform.createDefaultLayers();

    const mapInstance = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        zoom: 15,
        center: currentPosition,
      }
    );

    // Enable map interactivity
    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(mapInstance));

    // Resize map when window size changes
    window.addEventListener("resize", () => mapInstance.getViewPort().resize());

    // Drag event to update current position
    mapInstance.addEventListener("dragend", () => {
      const newCenter = mapInstance.getCenter();
      setCurrentPosition({ lat: newCenter.lat, lng: newCenter.lng });
    });

    setMap(mapInstance);
    trackUserLocation(mapInstance);
  };

  const trackUserLocation = (mapInstance) => {
    if (navigator.geolocation) {
      const updatePosition = (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });

        if (userMarker) {
          userMarker.setGeometry({ lat: latitude, lng: longitude });
        } else {
          const newMarker = new window.H.map.Marker({ lat: latitude, lng: longitude });
          mapInstance.addObject(newMarker);
          setUserMarker(newMarker);
        }

        mapInstance.setCenter({ lat: latitude, lng: longitude });
      };

      navigator.geolocation.getCurrentPosition(updatePosition);
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(updatePosition);
      }, 5000);

      return () => clearInterval(intervalId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        ref={mapRef}
        className="w-full h-full border rounded-lg shadow-md"
        style={{ minHeight: "400px" }} // Ensure visible height
      />
    </div>
  );
};

export default LiveTracking;
