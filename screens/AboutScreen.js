import { Card, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, Linking } from "react-native";

const AboutScreen = () => {
    return (
        <ScrollView>
            <Card>
                <Card.Title style={styles.title}>Our Mission</Card.Title>
                <Card.Divider></Card.Divider>
                <Text style={styles.header}>Make helping Easy.</Text>
                <Text style={styles.text}>Many people want to help those experiencing homelessness, but don't know where to start.</Text>
                <Text style={[styles.text, { marginBottom: 0 }]}>The truth is,</Text>
                <Text style={[styles.text, { marginBottom: 20 }]}>it's a complicated issue.</Text>
                <Text style={styles.text}>Thankfully, one part is quite simple:</Text>
                <Card.Divider></Card.Divider>
                <Text style={styles.quote}>"Almost nobody experiencing homelessness will get better on their own."</Text>
                <Card.Divider></Card.Divider>
                <Text style={styles.header}>Enter, 'Help Easy'</Text>
                <Text style={styles.text}>A project designed to help you, help those experiencing homelessness.</Text>
                <Text style={styles.text}>It may seem like a small step, but at least it's in the right direction.</Text>
                <Card.Divider></Card.Divider>
                <Text style={styles.text}>To learn more about homelessness, check out our website:</Text>
                <Text style={styles.link} onPress={() => Linking.openURL('https://scintillating-palmier-0daeab.netlify.app/#invitation')}>Are We So Different?</Text>
            </Card>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#4f7ba5'
    },
    header: {
        fontSize: 25,
        marginBottom: 25,
        textAlign: 'center'
    },
    text: {
        fontSize: 23,
        textAlign: 'center',
        marginBottom: 15
    },
    quote: {
        fontSize: 25,
        marginBottom: 25,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#4f7ba5'
    },
    link: {
        fontSize: 23,
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#60b593',
        fontWeight: 'bold'
    }
})

export default AboutScreen;