import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submithandle = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          paddingTop: 10,
          paddingLeft: 25,
          paddingRight: 25,

          //opacity:1,
          ease: "power2.inOut",
          duration: 0.5,

          onStart: () => {
            panelRef.current.style.overflowY = "hidden"; 
          },
          onComplete: () => {
            panelRef.current.style.overflowY = "auto"; 
          },
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          //display:hidden,
          padding: 0,
          //opacity:0,
          ease: "power2.inOut", // Smooth closing
          duration: 0.5,
          onStart: () => {
            panelRef.current.style.overflowY = "hidden"; // Hide scroll when closing
          },
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel)
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel)
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
    },
    [confirmRidePanel]
  );


  useGSAP(
    function () {
      if (vehicleFound)
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver)
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      else
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
    },
    [waitingForDriver]
  );



  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className=" w-16 absolute ml-9 pt-11"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber_logo"
      />

      <div
        onClick={() => {
          setConfirmRidePanel(false);
          setPanelOpen(false);
          setVehicleFound(false);
          setWaitingForDriver(false);
          setVehiclePanel(false);
        }}
        className="h-screen w-screen"
      >
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className=" flex flex-col justify-end h-[70%] absolute bottom-0 w-full">
        <div className=" p-6 bg-white relative">
          <h5
            onClick={() => setPanelOpen(false)}
            className="absolute right-6 top-6 text-2xl"
          >
            {panelOpen && <i className="ri-arrow-down-wide-line"></i>}
          </h5>
          <h4 className="text-2xl font-semibold">Find trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[63%] ml-5 -translate-y-1/2 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
            ></input>
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            ></input>
          </form>
        </div>

        <div ref={panelRef} className="bg-white ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <ConfirmedRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  p-3 py-10 px-3 pt-14 bg-white"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
