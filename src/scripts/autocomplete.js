// let autocomplete;
let autocomplete;

export function initAutocomplete(elementId) {
  // Create the autocomplete object
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById(elementId),
    { types: ['geocode'] }
  );

  // Listen for the 'place_changed' event
  autocomplete.addListener('place_changed', () => {
    geocodeSelectedPlace(elementId);
  });
}

async function geocodeSelectedPlace(elementId) {
  try {
    // Wait for the place to be retrieved
    const placeResult = await new Promise((resolve, reject) => {
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place) {
          resolve(place);
        } else {
          reject(new Error('Place not available'));
        }
      });
    });

    // Log the entire place object
    console.log(placeResult.formatted_address);

    // document.getElementById(elementId).value=placeResult.formatted_address;

    // Optionally, update the input value with the formatted address
    document.getElementById(elementId).value = placeResult.formatted_address;
  } catch (error) {
    console.error('Error getting place:', error);
  }
}

export function initAutocompleteAllFields(fields){
    for (let index=0;index<fields.length;index++){
        initAutocomplete(`stop${index}`)
    }
}

// Initialize the autocomplete when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//   initAutocomplete();
// });

// // Function to convert address to coordinates
// async function geocodeAddress() {
//   const addressInput = document.getElementById('addressInput');
//   const address = addressInput.value;

//   if (!address) {
//     console.log('Please enter an address.');
//     return;
//   }

//   // Replace 'YOUR_API_KEY' with your actual API key
//   const apiKey = 'AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro';
//   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//   try {
//     // Fetch geocoding data from Google API
    
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     // Check if the request was successful
//     if (data.status === 'OK') {
//       // Extract latitude and longitude from the response
//       const location = data.results[0].geometry.location;
//       const latitude = location.lat;
//       const longitude = location.lng;

//       // Output the coordinates
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     } else {
//       console.error(`Error: ${data.status}`);
//     }
//   } catch (error) {
//     console.error('Error fetching geocoding data:', error);
//   }
// }