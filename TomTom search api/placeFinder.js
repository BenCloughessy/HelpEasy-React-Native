import axios from "axios";

export default class PlaceFinder {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // search individual locations
    async searchLocation (keyword, lat, lng, limit = 15, radius = 20000) {
        let query = keyword
        let baseUrl = 'https://api.tomtom.com/search/2/poiSearch';
        let queryString = `limit=${limit}&lat=${lat}&lon=${lng}&radius=${radius}&categorySet=9663005%2C%209663004%2C%209663003%2C%209663002%2C%209663002%2C%209152%2C%209153&view=Unified&relatedPois=off&key=${this.apiKey}`;
        console.log(`${baseUrl}/${query}.json?${queryString}`)

        try {
            let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
            return response.data.results;
        } catch(error) {
            console.error("Error during searchLocation API call:", error.message);
            return [];
        }
    }

    // Filter function to keep only relevant results
    filterResults(results) {
        const relevantKeywords = ["homeless", "shelter", "emergency shelter", "transitional", "housing", "homeless services"];

        return results.filter(result => {
            const name = result.poi.name.toLowerCase();
            // const address = result.address.freeformAddress.toLowerCase();
            // const description = result.poi.description ? result.poi.description.toLowerCase() : "";

            return relevantKeywords.some(keyword => name.includes(keyword));
        });
    }

    async getNearbyPlaces(lat, lng) {
        const keywords = ["homeless%20shelter", "emergency%20shelter", "transitional%20housing", "homeless%20services"]
        const allResults = []

        // loop through keywords and make api calls
        for (const keyword of keywords) {
            console.log("keyword:", keyword, "lat:", lat, "lng:", lng)
            const results = await this.searchLocation(keyword, lat, lng)
            console.log(results)
            allResults.push(...results)
        }


        // Call the filter function to keep only relevant results
        const filteredResults = this.filterResults(allResults);

        console.log(filteredResults)
        return filteredResults
    }
}