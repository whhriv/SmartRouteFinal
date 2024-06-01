import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import './navbar.css'
import GoogleMapsLink from './Mapping/GoogleMapsLink'
export default function Footer() {
    let timeDuration = sessionStorage.getItem("FooterTime");
    let start = sessionStorage.getItem("startPoint");
    let waypoints = sessionStorage.getItem("waypoints");

    console.log(waypoints);
    console.log(start);
    console.log("footer time: "+timeDuration);
    //Wrapped logic to check for things in session storage before using it
    if(timeDuration!=null&&start!=null&&waypoints!=null){

      
      let timeDuration = JSON.parse(sessionStorage.getItem("FooterTime"));
      let start = sessionStorage.getItem("startPoint");
      let waypoints = JSON.parse(sessionStorage.getItem("waypoints"));

      const waypointsWithSpaces = waypoints.map((waypoint, index) => (
        <span key={index}>
          {index+1+") "}
          {waypoint}
          {index !== waypoints.length - 1 }
          <br></br>
        </span>
      ));

  return (
    <MDBFooter bgColor='light' className='text-start text-lg-left mdbfooter' style={{ position: 'sticky', bottom: 0, width: '100%', }}>
      <MDBContainer className='footer ps-3' style={{margin: 0, padding: 0, }} >
        <MDBRow style={{ paddingInlineEnd: '50px'}}>
            <MDBCol className='' size='auto'>
           
              <GoogleMapsLink /> 
            </MDBCol>
            <MDBCol size='auto mt-2'>
              <span className="timeDuration ">Route Time: {timeDuration} minutes</span>
              <span className="ps-5"><br></br><b>Starting Location: </b>{start},</span><br></br><span><b>Stops </b><br></br>{waypointsWithSpaces}</span>
   
      </MDBCol>
      <MDBCol>              <p style={{ fontSize: 'x-small', textAlign: 'end' }}>&copy; 2024 SmartRoute W.C.C.C all rights reserved</p>
   
</MDBCol>

        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
    }else{
      return (
        <MDBFooter bgColor='light' className='text-start text-lg-left'style={{ position: 'sticky', bottom: 0, width: '100vh'}}>
          <MDBContainer className='footer'>
            <MDBRow>
                <MDBCol size='auto'>
              
                  {/* <GoogleMapsLink />  */}
                </MDBCol>
                <MDBCol size='auto mt-2'>
                  {/* <span className="timeDuration ">Route Time: {timeDuration} seconds</span>
                  <span className="ps-5"><b>Starting Location: </b>{start},</span><span> <b>Stops </b>{waypointsWithSpaces}</span>
      
        */}
          </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBFooter>
      )
    };
}

//     <MDBFooter bgColor='light' className='text-start text-lg-left'>
//       <MDBContainer className='footer'>
//         <MDBRow>
//           {/* <MDBCol size='auto' className='mt-0 mb-4 mb-md-0'> */}
//            <div>
//               <GoogleMapsLink /> 
//               {/* </MDBCol>
//               <MDBCol> */}
                
//               <span className="timeDuration ">Route Time: {timeDuration}</span>
            
//           {/* </MDBCol> */}
//           {/* <MDBCol><p className="timeDuration ">Route Time: {timeDuration}</p></MDBCol> */}
//         </div>
//         </MDBRow>
//       </MDBContainer>
//     </MDBFooter>
//   );
// }