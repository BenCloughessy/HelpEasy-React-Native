
const addressToCoord = async(address, city, state) => {

    const apiKey = aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV
    const url = `https://api.tomtom.com/search/2/geocode/${address}, ${city}, ${state}.json?key=${apiKey}`
    
    let coords = await fetch(url, {
      method: 'GET',
      })

    console.log(coords)
  }

  module.exports = addressToCoord