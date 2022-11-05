import { Text, View } from "react-native";


const textStyle = {
    headerStyle: {
        backgroundColor: '#5637DD'
    },
    headerTintColor: '#fff',
    backgroundColor: '#60b593', 
}

const HomeScreen = () => {
    return (
        <View>
            <Text>Hello!</Text>
            <Text>Welcome to Help Easy</Text>
            <Text>We're here to help you help others</Text>
            <Text>Check out more about our project, dive into some reccomended reading, or jump right in by pressing "Lift Off"</Text>
        </View>
    );
}

export default HomeScreen;