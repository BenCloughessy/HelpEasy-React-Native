import { FlatList, Text, SafeAreaView, View } from "react-native";
import { Avatar, Card, Divider, Icon, ListItem } from "@rneui/themed";

// Convert distance from 
function metersToMi (dist) {
    return dist = (dist * 0.000621371).toFixed(2)
}

const Item = ({name, dist, id}) => {

    return ( 
            <Card>
                <Card.Title style={{ fontSize: 20 }}>{name}</Card.Title>
                <Card.Divider></Card.Divider>
                <ListItem key={id}>
                    <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 23 }}>
                            {`${dist} miles`}
                        </Text>
                    </ListItem.Content>
                        <Avatar
                            size={50} 
                            rounded
                            icon={{ name: 'arrow-forward-outline', type: 'ionicon' }}
                            containerStyle={{ backgroundColor: '#4f7ba5' }}
                        />  
                </ListItem>   
            </Card>
    );
}
    
const SearchResultsView = (results) => {
    console.log('searchResultsView:', results)
    console.log('searchResultsView 2:', results.results)
    console.log('searchResultsView 3:', results.results[0].poi.name)
    const renderItem = ({ item }) => (
        <Item id={item.id} name={item.poi.name} dist={metersToMi(item.dist)} />
    )

    return (
    <SafeAreaView>
        <FlatList 
            data={results.results}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
    );
}

export default SearchResultsView;