import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

import motoImage from "../assets/moto.webp";
import carImage from "../assets/car.jpg";
import autoImage from "../assets/auto.webp";
import { UserDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [fare, setFare] = useState({});
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { sendMessage, recieveMessage, socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    sendMessage(
      "join",
      { userType: "user", userId: user._id },
      { message: "heelow" }
    );

    if (vehicleType == "moto") setVehicleImage(motoImage);
    else if (vehicleType == "car") setVehicleImage(carImage);
    else if (vehicleType == "auto") setVehicleImage(autoImage);
  }, [vehicleType]);

  socket.on("ride-confirmed", (ride) => {

    setRide(ride);
    setVehicleFound(false);
    setWaitingForDriver(true);
  });

  const handlePickupChange = async (e) => {

    const value = e.target.value;
    setPickUp(value);


    if (value.length == 0) setPickUpSuggestions([]);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(async () => {
      try {
       
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPickUpSuggestions(response.data);
      } catch (error) {
       
      }
    }, 300);
    setTypingTimeout(timeout);
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length == 0) setDestinationSuggestions([]);

    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(async () => {
      try {
      
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      } catch (error) {}
    }, 300);
    setTypingTimeout(timeout);
  };
  const submitHandler = (e) => {
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

  function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: pickUp,
        destination,
        vehicleType,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    
  }
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
        <div className=" p-6 pb-3 bg-white relative">
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
            <div className="line absolute h-16 w-1.5 top-[70%] ml-2 -translate-y-1/2 bg-gradient-to-b from-gray-900 to-gray-100 rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickUp}
              onChange={(e) => {
                handlePickupChange(e);
              }}
              className="bg-[#eeee] px-3 py-2 text-base rounded-lg w-[95%] mt-5 ml-6"
              type="text"
              placeholder="Add a pickup location"
            ></input>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                handleDestinationChange(e);
              }}
              className="bg-[#eeee] px-3 py-2 text-base rounded-lg w-[95%] mt-3 ml-6"
              type="text"
              placeholder="Enter your destination"
            ></input>
          </form>
        </div>

        <div ref={panelRef} className="bg-white ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickUp={setPickUp}
            setDestination={setDestination}
            activeField={activeField}
            pickUpSuggestions={pickUpSuggestions}
            destinationSuggestions={destinationSuggestions}
            pickUp={pickUp}
            destination={destination}
            setFare={setFare}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <ConfirmedRide
          createRide={createRide}
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          vehicleImage={vehicleImage}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 pt-14 bg-white"
      >
        <LookingForDriver
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          vehicleImage={vehicleImage}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  p-3 py-10 px-3 pt-14 bg-white"
      >
        <WaitingForDriver
          ride={ride}
          vehicleImage={vehicleImage}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
