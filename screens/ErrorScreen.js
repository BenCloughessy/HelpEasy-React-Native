import { Button, Text } from "@rneui/themed";
import { View, StyleSheet, ScrollView} from "react-native";
import PlaceFinder from "../TomTom search api/placeFinder.js";
import LoadingScreen from "./LoadingScreen";
import SearchResultsView from "../TomTom search api/SearchResultsView";
import { useState, useEffect } from "react";

const ErrorScreen = ({ errorMsg }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState([])
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)

    // Hard-coding coordinates for demonstration search
    const getLoc = (city) => {
        setIsLoading(true)

        if(city === 'Cinci') {
            setLat(39.103119)
            setLng(-84.512016)
        } else if(city === 'Chicago') {
            setLat(41.739685)
            setLng(-87.554420)
        } else if(city === 'Dallas') {
            setLat(32.779167)
            setLng(-96.808891)
        }
        
        return (lat, lng)
    }

    // Call to TomTom's placeFinder API passing my API key 
    const shelterSearch = async() => {
        let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
        let results = await placeFinder.getNearbyPlaces(lat, lng)
        results = results.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names

        setResults(results)
        
        return results
    }
        
      // Using location to search for shelters after lat and lng have been set
    useEffect(() => {
        if (lat) {
          shelterSearch()
        }
        
      }, [lat])

       // Error and loading handling after search request
       if (isLoading && !lat) {
        return <LoadingScreen />
      }

    //   // If error or no results
    //   if (location && results.length === 0) { 
    //     return <ErrorScreen errorMsg={errorMsg} />
    //   } 

      // If results is populated
      if (results.length > 0) {
        return <SearchResultsView results={results} />
      }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={[styles.text, { fontStyle: 'italic', fontSize: 25, fontWeight: 'bold' }]}>We're Sorry,</Text>
                <Text style={[styles.text, { marginBottom: 70 }]}>It seems we were unable to find any shelters near your location.</Text>
                <Text style={[styles.text, { fontStyle: 'italic', fontSize: 25, fontWeight: 'bold' }]}>Remember:</Text>
                <Text style={[styles.text, { marginBottom: 30 }]}>You can still be helpful!</Text>
                <Text style={[styles.text, { marginBottom: 0 }]}>Take a moment to introduce yourself</Text>
                <Text style={[styles.text, { marginBottom: 30 }]}>And get to know them</Text>
                <Text style={styles.text}>Kindness goes a long way.</Text>
            </View>

            <View style={styles.container}>
                <Text 
                    style={[styles.text, { fontStyle: 'italic', fontSize: 23, fontWeight: 'bold', marginBottom: 0 }]}
                >
                    For demonstration purposes,
                </Text>
                <Text 
                    style={[styles.text, { fontStyle: 'italic', fontSize: 23, fontWeight: 'bold' }]}
                >
                    you may choose a major city:
                </Text>
                <Button
                    title="Cincinnati, OH"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => getLoc('Cinci')}
                />
                <Button
                    title="Chicago, IL"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => getLoc('Chicago')}
                />
                <Button
                    title="Dallas, TX"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => getLoc('Dallas')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {
        fontSize: 20,
        color: '#4f7ba5',
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#60b593',
        borderWidth: 2,
        borderColor: '#60b593',
         borderRadius: 30
    },
    buttonContainer: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10
    }
})

export default ErrorScreen;