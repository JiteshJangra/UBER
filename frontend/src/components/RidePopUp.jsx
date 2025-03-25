import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src="data:image/jpeg;base64,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"
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullName.firstName +
              " " +
              props.ride?.user.fullName.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.3 Km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              {/* <h3 className="text-lg font-medium">562/11-A</h3> */}
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
