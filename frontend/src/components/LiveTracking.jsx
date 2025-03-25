import React, { useEffect, useRef, useState } from "react";

const HERE_API_KEY = `${import.meta.env.MAPS_API}`; // Replace with your HERE API Key
const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    if (!window.H || !window.H.service) {
      const coreScript = document.createElement("script");
      coreScript.src = "https://js.api.here.com/v3/3.1/mapsjs-core.js";
      coreScript.async = true;

      const serviceScript = document.createElement("script");
      serviceScript.src = "https://js.api.here.com/v3/3.1/mapsjs-service.js";
      serviceScript.async = true;

      const eventsScript = document.createElement("script");
      eventsScript.src = "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js";
      eventsScript.async = true;

      coreScript.onload = () => {
        document.body.appendChild(serviceScript);
      };

      serviceScript.onload = () => {
        document.body.appendChild(eventsScript);
      };

      eventsScript.onload = () => loadPlatform();

      document.body.appendChild(coreScript);
    } else {
      loadPlatform();
    }
  }, []);

  const loadPlatform = () => {
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

    const behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(mapInstance)
    );

    mapInstance.addEventListener("dragend", () => {
      const newCenter = mapInstance.getCenter();
      setCurrentPosition({ lat: newCenter.lat, lng: newCenter.lng });
    });

    window.addEventListener("resize", () => mapInstance.getViewPort().resize());
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
          const newMarker = new window.H.map.Marker({
            lat: latitude,
            lng: longitude,
          });
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

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default LiveTracking;
