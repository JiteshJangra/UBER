import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submithandle = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "50%",
          padding: 25,
          //opacity:1,
          ease: "power2.inOut", // Smooth easing for better UX
          duration: 0.5,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          //display:hidden,
          padding: 0,
          //opacity:0,
          ease: "power2.inOut", // Smooth closing
          duration: 0.5,
        });
      }
    },
    [panelOpen]
  );
  return (
    <div className="h-screen relative">
      <img
        className=" w-16 absolute ml-9 pt-11"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber_logo"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className=" flex flex-col gap-0 p-0 align-center justify-end absolute left-1/2 -translate-x-1/2  h-screen w-[95%] top-0 leading-none">
        <div className="h-[30%] p-6 bg-white relative rounded">
          <h5
            onClick={() => setPanelOpen(false)}
            className="absolute top-6 right-6 text-2 xl"
          >
            {panelOpen && <i className="ri-arrow-down-wide-line"></i>}
          </h5>
          <h4 className="text-2xl font-semibold">Find trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
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

        <div
          ref={panelRef}
          className="bg-white m-0 h-0 -translate-y-1 overflow-hidden leading-none"
        >
          {panelOpen && <LocationSearchPanel />}
        </div>
      </div>
    </div>
  );
};

export default Home;
