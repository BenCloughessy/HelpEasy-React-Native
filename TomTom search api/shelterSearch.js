import PlaceFinder from "../TomTom search api/placeFinder.js";

// Call to TomTom's placeFinder API passing my API key and user location
const shelterSearch = async(lat, lng) => {
    let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
    let tomtomResults = await placeFinder.getNearbyPlaces(lat, lng)

    tomtomResults = tomtomResults.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
    return tomtomResults
  }

  export default shelterSearch