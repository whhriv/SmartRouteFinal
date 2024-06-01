


import '../../main.css'
import React, { useState, createContext, useContext } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import {getRouteTime, getFullRouteTime, getFullRouteTimeMinutes} from "../../scripts/compareRoutes"
// import GetDirectionMapOver from "../geolocation/GetDirectionsMapOver";
import { wait } from "../../scripts/utils";
// const ResponsesContext = createContext(null)
import { initAutocomplete,initAutocompleteAllFields } from "../../scripts/autocomplete";

import Autocomplete from "react-google-autocomplete";


const AddRemoveStop = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false)
  
  // const ResponsesContext = createContext(null)
  // const [responses, setResponses] = useState(null)

  //                   const [showButton, setShowButton] = useState(false);
  //                   const [currentIndex, setCurrentIndex] = useState(null);
  //                             const handleMouseEnter = (index) => {
  //                               setCurrentIndex(index);
  //                               setShowButton(true);
  //                             };

  //                             const handleMouseLeave = () => {
  //                               setShowButton(false);
  //                             };

  sessionStorage.setItem('startPoint', start)

  const navigate = useNavigate()
  const addField = () => {
    setFields([...fields, { label: "Stop", type: "text" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    console.log('UPDATING STOPS', updatedFields)
    setFields(updatedFields);
  };
// Saves Start and Stop  Variables




const handleFormSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let startingLocation = start;
  const stops = fields.map((field) => field.value);

  const directionsService = new google.maps.DirectionsService();
  
  // Need to permute times
  // feed permute routes into google maps instead of stretches?
  
  const permutations = permute(stops)
  let fastestTime = Infinity
  let fastestRoute = []

  // The fastest route function works, but had to be wrapped in a promise
new Promise((resolve, reject)=>{
    permutations.forEach(async (perm,index, array) => {

      console.log("Perumutation: "+perm);
      // const totalTime = await calculateRouteTime(startingLocation, perm, startingLocation,directionsService)
      const totalTime = await getFullRouteTime(startingLocation, perm, startingLocation,directionsService )
      sessionStorage.setItem("FooterTime", await getFullRouteTimeMinutes(startingLocation, perm, startingLocation,directionsService));

      console.log("total time: "+totalTime)
        if (totalTime < fastestTime) {
          fastestTime = totalTime
          fastestRoute = perm
          console.log("Fastest Route is "+fastestRoute)
        }

        if(index=array.length-1){
          resolve();
        }
    }
    
    )
  }).then(
    async ()=>{
      console.log('fastest overall route is...', fastestRoute)
      sessionStorage.setItem("waypoints",JSON.stringify(fastestRoute));
      setTimeout(() => { navigate('/MapSpaceOld'); }, 500)

    }

  )


};


  return (
    
    <div className="main" style={{borderRadius: '10%'}}>
      <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro&libraries=places"></script>
      <h5 class="topText">Mix and match stops -
        <br></br>
       We'll map the smartest route.
      </h5>
    <FloatingLabel className="ms-3 me-5 pe-2 pt-3 mb-5 flex-grow-1" controlId="start" label="Starting Point">

      <Form.Control
      style= {{ border: '1px solid black'}}
        className="w-100 startinput"
        type="text"
        placeholder="Starting Point"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
    </FloatingLabel>
    {/* {initAutocomplete("start")} */}
    {fields.map((field, index) => (
      <div key={index} className="ms-3 my-2 d-flex align-items-center ">
        <FloatingLabel controlId={`stop${index}`} label="Add Stop" className="flex-grow-1">
          <Form.Control
            style= {{ border: '1px solid black'}}
            className="w-100 inputctrl"
            type="text"
            placeholder="Add Stop"
            value={field.value || ""}
            onChange={(e) => handleChange(index, e)}
          />
        </FloatingLabel>
        <Button className="ms-2" variant="outline-danger" size="lg" onClick={() => removeField(index)}>
          -
        </Button>
      </div>
    ))
    }
    {initAutocompleteAllFields(fields)}
    <div className="mt-3 mb-1 me-5 d-flex justify-content-end">
      <Button variant="primary" className="btnsize" onClick={addField}>+
      </Button>
    </div>
    <div className="mb-5 pb-5 d-flex justify-content-center ">
      <Button className="my-4 " variant="success" onClick={handleFormSubmit}>Generate Your Route</Button>
    </div>
  </div>
);
};

export default AddRemoveStop;


//MOVE TO OWN JSX ELEMENT
//needs to record time - but should if input aligns. 
                function permute(arr) {
                  const result = [];

                  function permuteHelper(arr, start) {
                      if (start === arr.length - 1) {
                          result.push([...arr]);
                          return;
                      }

                      for (let i = start; i < arr.length; i++) {
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap elements
                          permuteHelper(arr, start + 1);
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Restore original array
                      }
                  }

                  permuteHelper(arr, 0);
                  console.log('permutations', result)
                  return result;
                }

                // Function to calculate the total time for a route
                async function calculateRouteTime(origin, stops, destination, directionsService) {
                  let totalTime = 0;
                
                  for (let i = 0; i < stops.length; i++) {
                    totalTime += await getRouteTime(origin, stops[i],directionsService);
                    origin = stops[i];
                  }
                
                  totalTime += await getRouteTime(origin, destination,directionsService);
                  return totalTime;
                }
                