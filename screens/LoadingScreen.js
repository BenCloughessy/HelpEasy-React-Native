import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from 'react-native-animatable';

const LoadingScreen = () => {
    const [animStage, setAnimStage] = useState(1)

    if (animStage === 1) {
        return (
            <View style={styles.container}>
                <Animatable.Text 
                    animation='slideInLeft'
                    onAnimationEnd={() => setAnimStage(2)}
                    style={styles.loadingText}
                >
                    Searching...
                </Animatable.Text>
            </View>
        )
    } else if (animStage === 2) {
        return (
            <View style={styles.container}>
                <Animatable.Text 
                    animation='slideOutRight' 
                    onAnimationEnd={() => setAnimStage(3)}
                    style={styles.loadingText}
                >
                    Searching...
                </Animatable.Text>
            </View>
        )
    } else if (animStage === 3) {
        return (
            <View style={styles.container}>
                <Animatable.Text 
                    animation='slideInRight' 
                    onAnimationEnd={() => setAnimStage(4)}
                    style={styles.loadingText}
                >
                    Searching...
                </Animatable.Text>
            </View>
        )
    } else if (animStage === 4) {
        return (
            <View style={styles.container}>
                <Animatable.Text 
                    animation='slideOutLeft' 
                    onAnimationEnd={() => setAnimStage(1)}
                    style={styles.loadingText}
                >
                    Searching...
                </Animatable.Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 30,
        justifyContent: 'center',
        color: '#4f7ba5',
        marginBottom: 50
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default LoadingScreen