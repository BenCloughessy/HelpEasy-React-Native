

const calcDist = (userCoord, atlasCoord) => {

    // Convert coordinates from deg to radians
    userCoord.lng = userCoord.lng * Math.PI / 180
    userCoord.lat = userCoord.lat * Math.PI / 180

    atlasCoord.lng = atlasCoord.lng * Math.PI / 180
    atlasCoord.lat = atlasCoord.lat * Math.PI / 180
   
        // Haversine formula
        let dlon = atlasCoord.lng - userCoord.lng;
        let dlat = atlasCoord.lat - userCoord.lat;
        let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(userCoord.lat) * Math.cos(atlasCoord.lat)
                 * Math.pow(Math.sin(dlon / 2),2);
               
        let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in meters
        let r = 6371000;
   
        // calculate the result
        return(c * r);
}

export default calcDist