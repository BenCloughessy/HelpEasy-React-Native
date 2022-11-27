import { Text, Button, Icon, Card } from "@rneui/themed"
import { StyleSheet, ScrollView, Linking } from "react-native"
import * as Animatable from 'react-native-animatable';


const ResultDetailScreen = ({ navigation, route }) => {
    const { shelter } = route.params

    return (
        <ScrollView>
            <Animatable.View animation='bounceInUp' duration={1500} delay={100}>
                <Button
                    type="solid"
                    containerStyle={{ width: 100, marginLeft: 14, marginTop: 8 }}
                    buttonStyle={{ borderRadius: 25 }}
                    color='#4f7ba5'
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back-outline" type='ionicon' color="white" />
                    Back
                </Button>
            </Animatable.View>    
            
            <Animatable.View animation='bounceInUp' duration={1500} delay={350}>
                <Card>
                    <Card.Title style={{ fontSize: 20 }}>{shelter.poi.name}</Card.Title>
                    <Card.Divider></Card.Divider>

                    <Text style={styles.textLabel}>Contact Info:</Text>

                    {shelter.poi.phone &&
                        <Text style={styles.textLink} onPress={() => Linking.openURL(`tel:${shelter.poi.phone}`)}>{shelter.poi.phone}</Text>
                    }

                    {shelter.poi.url &&
                        <Text style={styles.textLink} onPress={() => Linking.openURL(`http://${shelter.poi.url}`)} >{shelter.poi.url}</Text>
                    }
                    
                    <Text style={styles.textLink} onPress={() => Linking.openURL(`http://maps.apple.com/?daddr=${shelter.address.freeformAddress}`)} >{shelter.address.freeformAddress}</Text>

                    <Card.Divider></Card.Divider>

                    <Card.Title style={{ fontSize: 20 }}>How to Use this Information:</Card.Title>
                    <Text style={styles.helpText}>1.)   Introduce yourself!</Text>
                    <Text style={styles.helpTextMultiLine}>2.)   Ask if they are interested in</Text>
                    <Text style={[styles.helpTextMultiLine, { marginBottom: 30 } ]}>        connecting with a local shelter.</Text>
                    <Text style={styles.helpTextMultiLine}>3.)   Tap the number to give </Text>
                    <Text style={styles.helpTextMultiLine}>        the shelter a call, explain</Text>
                    <Text style={styles.helpTextMultiLine}>        you just met someone who</Text>
                    <Text style={styles.helpTextMultiLine}>        needs shelter, and ask if they</Text>
                    <Text style={styles.helpTextMultiLine}>        have space for them!</Text>
                    <Text style={[styles.helpTextMultiLine, { marginTop: 30 } ]}>4.)   If you have time, offer to walk</Text>
                    <Text style={styles.helpTextMultiLine}>        with them now to the shelter.</Text>
                    <Text style={[styles.helpTextMultiLine, { marginTop: 8}]}>        Otherwise, write down the </Text>
                    <Text style={styles.helpTextMultiLine}>        information for them, and </Text>
                    <Text style={styles.helpTextMultiLine}>        emphasize that there are people </Text>
                    <Text style={styles.helpTextMultiLine}>        there who care about them, and </Text>
                    <Text style={styles.helpTextMultiLine}>        want to help. </Text>
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    textLink: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        color: '#4f7ba5'
    },
    textLabel: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    helpText: {
        textAlign: 'left',
        fontSize: 22,
        marginBottom: 30,
        marginTop: 20
    },
    helpTextMultiLine: {
        textAlign: 'left',
        fontSize: 22,
        marginBottom: 1,
        marginTop: 1
    }
})

export default ResultDetailScreen