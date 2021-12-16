import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';


class List extends React.PureComponent {
    render() {
        const {title, content} = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View styles={styles.carousel}>
                <FlatList 
                    data={content}
                    horizontal={true} 
                    renderItem={({item}) => <Text>{item.title}</Text>}
                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 20
    },
    list: {
        marginTop: 25,
        
    }
})

export default List;