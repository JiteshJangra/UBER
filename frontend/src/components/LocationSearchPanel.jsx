import React from "react";

const LocationSearchPanel = (props) => {
  

  const locations = [
    "24B, Near Kapoor's Cafe Dehswaldfg Complex jhajjar haryana",
    "24B, Near malhotra's Cafe Dehswaldfg Complex jhajjar haryana",
    "24B, Near singhal's Cafe Dehswaldfg Complex jhajjar haryana",
    "24B, Near sharma's Cafe Dehswaldfg Complex jhajjar haryana",
  ];
  return (
    <div>
      {locations.map(function (element,idx) {
        return (
          <div key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className=" flex items-center justify-start gap-4 my-2 border-2 border-gray-50 p-3 active:border-black rounded-xl "
          >
            <div className="aspect-square">
              <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
                <i className="ri-map-pin-fill"></i>
              </h2>
            </div>
            <h4 className="font-medium">{element}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
