import axios from "axios";

export default class PlaceFinder {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getNearbyPlaces(lat, lng, query, limit = 15, radius = 20000) {
        let baseUrl = 'https://api.tomtom.com/search/2/poiSearch';
        let queryString = `limit=${limit}&lat=${lat}&lon=${lng}&radius=${radius}&categorySet=9663005%2C%209663004%2C%209663003%2C%209663002%2C%209663002%2C%209152%2C%209153&view=Unified&relatedPois=off&key=${this.apiKey}`;
        let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
        return response.data.results;
    }
}