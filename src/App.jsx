import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MapSpace from './components/Mapping/MapSpace';
import CreateRoute from './components/Input/AddRemoveStop'
import NavBar from './components/navbar'
import ImageDisplay  from './components/ImageDisplay';
import Directions from './components/Mapping/Directions'
import TabInputButton from './components/Input/TabInput';
// import UserLocation from './components/UserLocation'
import LocationSearch from './components/geolocation/LocationSearch';
// import ParentComponent from './components/ParentComponent';
import APIComponent from './components/geolocation/APIComponent'
import GetDirectionMapOver from './components/geolocation/GetDirectionsMapOver';
// import AddRemoveStop from './AddRemoveStopOutside'
import LandingPage from './components/LandingPage';
import MapSpaceOld from "./components/MapSpaceOld"
import DirectionsList from './components/DirectionList';
import Footer from './components/Footer'
import InputStops from './components/Input/InputStops';
import InputStopsFIrst from './components/Input/InputStopsFirst';

export default function App() {
  const [showNavBar, setshowNavBar] = useState(true)
  // const location = useLocation();
  const [responses, setResponses] = useState(null)

  useEffect(() => {
    const location =  window.location.pathname;
    if (location.pathname === "/") {
      setshowNavBar(false);
    } else {
      setshowNavBar(true)
    }
  }, [])

  const handleResponsesChange = (newResponses) => {
    setResponses(newResponses)
  }

  return (
    <BrowserRouter>
      <Container sx={{ minHeight: '100vh' }}>
        {/* {showNavBar && <NavBar />} */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/mapspace' element={<MapSpace />}/>
          <Route path='/editroute' element={<InputStops onResponseChange={handleResponsesChange} />}/>
          <Route path='/directionslist' element={<DirectionsList />}/>
          <Route path='/createroute' element={<InputStopsFIrst onResponseChange={handleResponsesChange} />}/>
          <Route path='/directions' element={<Directions />}/>
          <Route path='/tabinputbutton' element={<TabInputButton />}/>
          <Route path='/locationsearch' element={<LocationSearch />}/>
          <Route path='/apicomponent' element={<APIComponent/>}/>
          <Route path='/getdirectionsmapover' element={<GetDirectionMapOver/>}/>
          <Route path="/mapspaceOld" element={<MapSpaceOld/>}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
