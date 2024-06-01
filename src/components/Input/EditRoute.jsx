

import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";
import { getFullRouteTime, getFullRouteTimeMinutes } from "../../scripts/compareRoutes";

const EditRoute = () => {
  const startLoc = sessionStorage.getItem('startPoint');
  const waypoints = JSON.parse(sessionStorage.getItem('waypoints'));
  const [startInput, setStartInput] = useState(startLoc); 
  const [fields, setFields] = useState(waypoints.map((waypoint) => ({ value: waypoint }))); // INIT fields with waypoints
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handleChangeStart = (e) => {
    setStartInput(e.target.value);
  };

  const handleChangeStop = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { value: "" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let startingLocation = startInput;
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
    <div className="main" style={{ borderRadius: '10%' }}>
      <h3 className="topText">Edit locations</h3>
      <FloatingLabel className="ms-3 me-5 pe-2 pt-3 mb-5 flex-grow-1" controlId="start" label="Starting Point">
        <Form.Control
          style={{ border: '1px solid black' }}
          className="w-100 startinput"
          type="text"
          placeholder="Starting Point"
          value={startInput} 
          onChange={handleChangeStart}
        ></Form.Control>
        <Autocomplete
       style={{borderRadius:".5em", outlineColor:"black",fontSize:"1.5em",padding:".5em",width:"90%",backgroundColor:"#FFFFFF"}}
        placeholder="Starting Point"
        className="autocomplete"
        apiKey={import.meta.env.VITE_api_key}
        onPlaceSelected={(place) => {
          document.getElementById("start").value=place.formatted_address;
          handleChangeStart();
        }}
        options={{
          types: ["geocode"],
        }}
      />
      </FloatingLabel>
      {fields.map((field, index) => (
        <div key={index} className="ms-3 my-2 d-flex align-items-center">
          <FloatingLabel controlId={`stop${index}`} label="Edit Stop" className="flex-grow-1">
            <Form.Control
              style={{ border: '1px solid black' }}
              className="w-100 inputctrl"
              type="text"
              placeholder="Edit Stop"
              value={field.value}
              onChange={(e) => handleChangeStop(index, e)}
            />
          </FloatingLabel>
          <Autocomplete
          style={{outlineColor:"black",borderRadius:".5em",fontSize:"1.5em",padding:".5em",width:"90%",borderColor:"black", backgroundColor:"#FFFFFF"}}
          placeholder={field.value}
          className="autocomplete"
          apiKey={import.meta.env.VITE_api_key}
            onPlaceSelected={(place) => {
                console.log(place)
                document.getElementById(`stop${index}`).value=place.formatted_address;
                handleChangeStop(index,place.formatted_address)
              }}
        options={{
          types: ["geocode"],
        }}
      />
          <Button className="ms-2" variant="primary" size="lg" onClick={() => removeField(index)}>-</Button>
        </div>
      ))}
      <div className="mt-3 mb-1 me-5 d-flex justify-content-end">
        <Button variant="primary" className="btnsize" onClick={addField}>+</Button>
      </div>
      <div className="mb-5 pb-5 d-flex justify-content-center">
        <Button className="my-4" variant="success" onClick={handleFormSubmit}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditRoute;




// import React, { useState } from "react";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';

// let startLoc = sessionStorage.getItem('startPoint')
// let waypoints = sessionStorage.getItem('waypoints')

// const EditRoute = ({ start, stops = [] }) => {
//   const [startInput, setStartInput] = useState(startLoc); // Initialize startInput with startLoc
//   const [fields, setFields] = useState(stops.map((stop) => ({ value: stop })));
//   const navigate = useNavigate();

//   const handleChangeStart = (e) => {
//     setStartInput(e.target.value);
//   };

//   const handleChangeStop = (index, e) => {
//     const updatedFields = [...fields];
//     updatedFields[index].value = e.target.value;
//     setFields(updatedFields);
//   };

//   const addField = () => {
//     setFields([...fields, { value: "" }]);
//   };

//   const removeField = (index) => {
//     const updatedFields = [...fields];
//     updatedFields.splice(index, 1);
//     setFields(updatedFields);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here

//     navigate('/MapSpaceOld');
//   };

//   return (
//     <div className="main" style={{ borderRadius: '10%' }}>
//       <h5 className="topText">Edit locations</h5>
//       <FloatingLabel className="ms-3 me-5 pe-2 pt-3 mb-5 flex-grow-1" controlId="start" label="Starting Point">
//         <Form.Control
//           style={{ border: '1px solid black' }}
//           className="w-100 startinput"
//           type="text"
//           placeholder="Starting Point"
//           value={startInput} // Set value to startInput
//           onChange={handleChangeStart}
//         ></Form.Control>
//       </FloatingLabel>
//       {fields.map((field, index) => (
//         <div key={index} className="ms-3 my-2 d-flex align-items-center">
//           <FloatingLabel controlId={`stop${index}`} label="Edit Stop" className="flex-grow-1">
//             <Form.Control
//               style={{ border: '1px solid black' }}
//               className="w-100 inputctrl"
//               type="text"
//               placeholder="Edit Stop"
//               value={field.value}
//               onChange={(e) => handleChangeStop(index, e)}
//             />
//           </FloatingLabel>
//           <Button className="ms-2" variant="outline-danger" size="lg" onClick={() => removeField(index)}>Remove</Button>
//         </div>
//       ))}
//       <div className="mt-3 mb-1 me-5 d-flex justify-content-end">
//         <Button variant="primary" className="btnsize" onClick={addField}>+</Button>
//       </div>
//       <div className="mb-5 pb-5 d-flex justify-content-center">
//         <Button className="my-4" variant="success" onClick={handleFormSubmit}>Save Changes</Button>
//       </div>
//     </div>
//   );
// };

// export default EditRoute;
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
