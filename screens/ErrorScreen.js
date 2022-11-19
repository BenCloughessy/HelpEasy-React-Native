import { Button, Text } from "@rneui/themed";
import { View, StyleSheet, ScrollView} from "react-native";

const ErrorScreen = ({ errorMsg }) => {
    // Hard-coding coordinates for demonstration search
    const shelterSearch = async(city) => {
        let lat
        let lng

        if(city === '') {
            lat = 
            lng = 
        } else if()
        
    
        let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
        let results = await placeFinder.getNearbyPlaces(lat, lng)
        results = results.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
        setResults(results);
        
        return results
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
                />
                <Button
                    title="Chicago, IL"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
                />
                <Button
                    title="Dallas, TX"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ fontWeight: 'bold' }}
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