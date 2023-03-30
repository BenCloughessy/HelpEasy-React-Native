import { Button, Text } from "@rneui/themed";
import { View, StyleSheet, ScrollView} from "react-native";
import shelterSearch from "../TomTom search api/shelterSearch.js";
import { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import atlasSearch from "../MongoDB Query/atlasSearch.js";
import mergeData from "../Merge Results/mergeAndSort.js";
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
  
      // Using location to call tomtom api after location has been set
      useEffect(() => {
        if (lng) {
          shelterSearch(lat, lng)
            .then((res) => setTomtomResults(res))
        }
      }, [lng])
  
      // Querying atlas database after results from tomtom are set
      useEffect(() => {
        if (lng) {
          atlasSearch(lng, lat)
            .then((res) => setAtlasResults(res))
        }
      }, [tomtomResults])
  
      // Merging tomtom and atlas results once both have been set
      useEffect(() => {
        let mergedResults = mergeData(atlasResults, tomtomResults)
        setResults(mergedResults)
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