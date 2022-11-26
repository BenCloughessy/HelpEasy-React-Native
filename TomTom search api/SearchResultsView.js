import { FlatList, Text, SafeAreaView } from "react-native";
import { Avatar, Card, ListItem, Icon, Button } from "@rneui/themed";


// Convert distance from location (meters to miles)
function metersToMi (dist) {
    return dist = (dist * 0.000621371).toFixed(2)
}

// // // Content of each item in flatlist
// // const Item = ({ name, dist, id, navigation }) => {
// //     return ( 
            
// //     );
// }
  
const SearchResultsView = ({route, navigation}) => {
    const { results } = route.params;
    console.log('searchResultsView,', results)

    const renderItem = ({ item: shelter }, dist) => {
        console.log('shelter name', shelter.poi.name)
        return (
            <Card>
                <Card.Title style={{ fontSize: 20 }}>{shelter.poi.name}</Card.Title>
                <Card.Divider></Card.Divider>
                <ListItem key={shelter.id}>
                    <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 23 }}>
                            {`${metersToMi(shelter.dist)} miles`}
                        </Text>
                    </ListItem.Content>
                        <Avatar
                            size={50} 
                            rounded
                            icon={{ name: 'arrow-forward-outline', type: 'ionicon' }}
                            containerStyle={{ backgroundColor: '#4f7ba5' }}
                            onPress={() => navigation.navigate('resultDetails', { shelter })}
                        />  
                </ListItem>   
            </Card>
        )
    }

    return (
        <>
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

            <SafeAreaView style={{ flex: 1}}>
                <FlatList 
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </>
    );
}

export default SearchResultsView;