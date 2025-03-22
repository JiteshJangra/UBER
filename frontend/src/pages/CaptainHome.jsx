import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { captain} = useContext(CaptainDataContext);
  useGSAP(
    function () {
      if (ridePopupPanel)
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel)
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen ">
        <img
          className=" w-16 ml-9 pt-11"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber_logo"
        />
        <div className="mt-10 ml-1">
          <Link
            to="/captain-logout"
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full "
          >
            <i className="text-lg font-medium ri-logout-box-r-line" />
          </Link>
        </div>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0  translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full z-10 bottom-0 h-screen translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <ConfirmRidePopup
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
