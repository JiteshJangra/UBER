import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const location = useLocation();
  const rideData = location.state?.ride;


  const finishRidePanelRef = useRef(null);
  useGSAP(
    function () {
      if (finishRidePanel)
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen ">
        <img
          className=" w-16 ml-9 pt-11"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber_logo"
        />
        <div className="mt-10 ml-1">
          <Link
            to="/captain-home"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full "
          >
            <i className="text-lg font-medium ri-logout-box-r-line" />
          </Link>
        </div>
      </div>
      <div className="h-4/5">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>

      <div
        className="h-1/5 p-6 relative flex items-center justify-between bg-yellow-400 "
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="p-1 text-center w-[95%] absolute top-0"
          onClick={() => {}}
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <FinishRide ride={ rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
