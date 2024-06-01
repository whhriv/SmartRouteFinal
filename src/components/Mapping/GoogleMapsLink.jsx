import React from "react";
import { replaceSpace } from '../../scripts/waypointFromString'
import '../../main.css'
import Button from 'react-bootstrap/Button';

export default function GoogleMapsLink(){

    let start=replaceSpace(sessionStorage.getItem("startPoint"));
  
  
    let waypoints=JSON.parse(sessionStorage.getItem("waypoints"));

    // const waypointString = waypoints ? waypoints.map(point => replaceSpace(point)).join('|') : '';



  
    console.log(waypoints);
    let waypointString="";
  
    for(let i=0;i<waypoints.length;i++){
      let point = replaceSpace(waypoints[i]);
      if(i<waypoints.length-1){
        waypointString+=point+"|";
      }else{
        waypointString+=point
      }
    }
    const handleGoogleMapsLink = () => {
        if (start && waypointString) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${start}&origin=${start}&waypoints=${waypointString}`)
        }
    }
    console.log(waypointString);
    return(
      <div className='footer'>
        <Button className="my-2" variant="success" onClick={handleGoogleMapsLink}>Open in GoogleMaps</Button>
        
      </div>
  
    )
}

{/* <a target='_blank' href={`https://www.google.com/maps/dir/?api=1&destination=${start}&origin=${start}&waypoints=${waypointString}`}>Open in Google Maps</a> */}