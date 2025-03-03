import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-gray-400 text-3xl ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>

      <div
        onClick={() => props.setConfirmRidePanel(true)}
        className="p-1 pr-3 w-full border-2 mb-2 active:border-black  rounded-xl flex items-center justify-between"
      >
        <div className="w-1/4 flex justify-center">
          <img
            className="h-16"
            src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
          />
        </div>
        <div className="ml-2 w-2/3">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹192.3</h2>
      </div>

      <div
        onClick={() => props.setConfirmRidePanel(true)}
        className="p-1 pr-3 w-full border-2 mb-2 active:border-black  rounded-xl flex items-center justify-between"
      >
        <div className="w-1/4 flex justify-center">
          <img
            className="w-24"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          />
        </div>
        <div className="ml-2 w-2/3">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹65.2</h2>
      </div>

      <div
        onClick={() => props.setConfirmRidePanel(true)}
         className="p-1 pr-3 w-full border-2 mb-2 active:border-black  rounded-xl flex items-center justify-between"
      >
        <div className="w-1/4 flex justify-center">
          <img
            className="w-24"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          />
        </div>
        <div className="ml-2 w-2/3">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
            3
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹115.2</h2>
      </div>
    </div>
  );
}

export default VehiclePanel
