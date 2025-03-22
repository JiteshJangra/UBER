import axios from "axios";
import React, { useEffect, useState } from "react";

const LocationSearchPanel = (props) => {
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");

  async function findTrip() {
    try {

      console.log( src , dest)
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup:src, destination:dest },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      //console.log(response.data);
      props.setFare(response.data);
    } catch (error) {
      
      console.log("error", error)
    }
    
  }

  useEffect(() => {
    //console.log("Updated Values:", props.pickUp, props.destination);

    // If both source and destination are selected, show vehicle panel
    if (src && dest) {
      console.log(src, dest);
      props.setVehiclePanel(true);
      props.setPanelOpen(false);


      findTrip();
    }
  }, [props.pickUp, props.destination]);

  return (
    <div>
      {(props.activeField == "pickup"
        ? props.pickUpSuggestions
        : props.destinationSuggestions
      ).map(function (element, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.activeField == "pickup"
                ? (props.setPickUp(element), setSrc(element))
                : (props.setDestination(element), setDest(element));

              //forceUpdate();

              //console.log(props.pickUp , props.destination);

              // if (props.src && props.dest) {
              //   props.setVehiclePanel(true);
              //   props.setPanelOpen(false);
              // }
            }}
            className=" flex items-center justify-start gap-4 my-2 border-2 border-gray-50 p-3 active:border-black rounded-xl "
          >
            <div className="aspect-square">
              <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
                <i className="ri-map-pin-fill"></i>
              </h2>
            </div>
            <h4 className="font-medium ">{element}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
