import { Button, Text } from "@rneui/themed";
import { View, StyleSheet, ScrollView} from "react-native";
import PlaceFinder from "../TomTom search api/placeFinder.js";
import { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

const ErrorScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState(['empty']) // initialize to this string to catch a change even if results returns empty array
    const [atlasResults, setAtlasResults] = useState(['empty'])
    const [tomtomResults, setTomtomResults] = useState(['empty'])
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

    // Call to TomTom's placeFinder API passing my API key and user location
    const shelterSearch = async() => {
        let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
        let tomtomResults = await placeFinder.getNearbyPlaces(lat, lng)
        tomtomResults = tomtomResults.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
        tomtomResults = tomtomResults.sort((a, b) => a.dist - b.dist) // sorting results by distance from user
        console.log("tomtom results",tomtomResults)
        setTomtomResults(tomtomResults);
        return tomtomResults
      }
  
      // Query MongoDB Atlas database for shelters
      const atlasSearch = async() => {
        const atlasResults = await fetch(`http://192.168.50.244:3001/shelters/${lng}/${lat}`, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
        }).then((response) => response.json())
  
        console.log("atlas results",atlasResults)
  
        setAtlasResults(atlasResults)
        return atlasResults
      }
  
      // Using location to call tomtom api after location has been set
      useEffect(() => {
        if (lng) {
          shelterSearch()
        }
      }, [lng])
  
      // Querying atlas database after results from tomtom are set
      useEffect(() => {
        if (lng) {
          atlasSearch()
        }
      }, [tomtomResults])
  
      // Merging tomtom and atlas results once both have been set
      useEffect(() => {
        if(lng) {
          console.log("merging...",[...atlasResults, tomtomResults])
  
          // Include only non-empty arrays in the new array, else the array is empty.
          if(tomtomResults.length > 0 && atlasResults.length > 0) {
            setResults([...atlasResults, tomtomResults]) 
            console.log("push results",results)
          } else if (tomtomResults.length > 0 && !(atlasResults.length > 0)) {
            setResults(tomtomResults)
          }else if (!(tomtomResults.length > 0) && atlasResults.length > 0) {
            setResults(atlasResults)
          } else {
            setResults([])
          }
          
        }
      }, [atlasResults])

       // Navigate to loadingScreen when isLoading but before setting coordinates
       useEffect(() => {
        if (isLoading && !lat) {
            navigation.navigate('loading')
          }
       }, [lat])
       

      // Navigate to searchResultsView when results populates
      useEffect(() => {
        if(!(results[0] === 'empty')) {
            navigation.navigate('searchResults', {results})
        }
      }, [results])
      

    return (
        <ScrollView>
            <Animatable.View animation='fadeInLeft' duration={1000} delay={250} style={styles.container}>
                <Text style={[styles.text, { fontStyle: 'italic', fontSize: 25, fontWeight: 'bold' }]}>We're Sorry,</Text>
                <Text style={[styles.text, { marginBottom: 30 }]}>It seems we were unable to find any shelters near your location.</Text>
                <Button
                    title="Try Again"
                    buttonStyle={[styles.button, { borderRadius: 20 }]}
                    containerStyle={styles.tryAgainButtonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => {
                        navigation.dispatch(StackActions.popToTop)
                    }}
                />
                <Text style={[styles.text, { fontStyle: 'italic', fontSize: 25, fontWeight: 'bold' }]}>Remember:</Text>
                <Text style={[styles.text, { marginBottom: 30 }]}>You can still be helpful!</Text>
                <Text style={[styles.text, { marginBottom: 0 }]}>Take a moment to introduce yourself</Text>
                <Text style={[styles.text, { marginBottom: 30 }]}>And get to know them</Text>
                <Text style={styles.text}>Kindness goes a long way.</Text>
            </Animatable.View>

            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' duration={1000} delay={250}>
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
                </Animatable.View>
                <Animatable.View animation='bounceInLeft' duration={1500} delay={250}>
                <Button
                    title="Cincinnati, OH"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => getLoc('Cinci')}
                />
                </Animatable.View>
                <Animatable.View animation='bounceInLeft' duration={1500} delay={500}>
                <Button
                    title="Chicago, IL"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => getLoc('Chicago')}
                />
                </Animatable.View>
                <Animatable.View animation='bounceInLeft' duration={1500} delay={750}>
                <Button
                    title="Dallas, TX"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={() => getLoc('Dallas')}
                />
                </Animatable.View>
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
    },
    tryAgainButton: {
        backgroundColor: '#4f7ba5',
        borderColor: '#4f7ba5',
        borderRadius: 20
    },
    tryAgainButtonContainer: {
        width: 115,
        marginBottom: 30
    }
})

export default ErrorScreen;