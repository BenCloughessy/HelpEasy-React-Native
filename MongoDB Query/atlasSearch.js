import calcDist from "./calcDist"

// Query MongoDB Atlas database for shelters
const atlasSearch = async(lng, lat) => {
    const atlasResults = await fetch(`http://192.168.50.244:3001/shelters/${lng}/${lat}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    }).then((response) => response.json())

    // extracting user location to pass to calcDist()
    const userCoord = {
      lng,
      lat
    }

    // Loop through each result from Atlas, pass coordinates to calcDist() to calculate distance
    for (let i = 0; i < atlasResults.length; i++) {

      // Extracting atlas location to pass to calcDist()
      let atlasCoord = {
        lng: atlasResults[i].location.coordinates[0],
        lat: atlasResults[i].location.coordinates[1]
      }

      // Pass in both sets of coordinates, return and set new calculated distance
      let dist = calcDist(userCoord, atlasCoord)
      atlasResults[i].dist = dist
    }

    return atlasResults
  }

  export default atlasSearch