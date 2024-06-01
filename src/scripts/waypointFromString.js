
export function getWaypointArray(){


    let waypointsPlaces=sessionStorage.getItem("waypoints");

    console.log(waypointsPlaces);

    let waypointArray=[]

    let placeName ="";
    let foundSwiggle=false;

    for (let i =0;i<waypointsPlaces.length;i++){

      if(foundSwiggle&&waypointsPlaces[i]==','){
        foundSwiggle=false;
        continue;
      }

      if(waypointsPlaces[i]!='~'&&!foundSwiggle){
        placeName+=waypointsPlaces[i]
      }else if(waypointsPlaces[i]=='~'){
        waypointArray.push({location:placeName})
        placeName=""
        foundSwiggle=true
      }

      
    }

    return waypointArray;
}

export function stringArraytoWaypoint(arr){
  let output=[]
  for (let i=0; i < arr.length;i++){
    output.push({location:arr[i]})
  }

  return output;
}

// export function urlStringFromWaypoints(arr){
//   let output="";

//   console.log(arr);

//   for (let i=0;i< arr.length;i++) {
//    output+=replaceSpace(arr[i]);
//    if(i!=arr.length-1){
//     output+="|"
//    }
//   }
//   return output;
// }

export function replaceSpace(word){

  var replaced = word.replace(' ', '+');

  return replaced;
}