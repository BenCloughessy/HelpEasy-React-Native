
// Sorting results by distance from user
const sortData = (results) => {
    results.sort((a, b) => a.dist - b.dist) 
    return results
}

// Merging tomtom and atlas results
const mergeData = (atlasResults, tomtomResults) => {
    // If we have results from both sources, merge.
    if(tomtomResults.length > 0 && atlasResults.length > 0) {
        let mergedArray = [...atlasResults, ...tomtomResults]
        return sortData(mergedArray) 
    } 
    else if (tomtomResults.length > 0 && !(atlasResults.length > 0)) {
        return sortData(tomtomResults)
    } 
    else if (!(tomtomResults.length > 0) && atlasResults.length > 0) {
        return sortData(atlasResults)
    } 
    else {
        return []
    }
}

export default mergeData
