
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./imageSplashStyle.css"

const ImageDisplay = ({ navigateToRoute }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/createRoute');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigateToRoute]);
  
  return (
    <div id="splashContainer">
      <img src="/smart_route_logo.png" id="startScreen" alt="Your Image" />
    </div>
  );
};

export default ImageDisplay;