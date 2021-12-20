import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';


const Search = ({navigation}) => {
    const [text, onChangeText] = useState();

    const onSubmit = (query) => {
        console.log(query)
    }

    return (
        <React.Fragment>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Search Movie or TV Show'}
                            onChangeText={onChangeText}
                            value={text}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {onSubmit(text)}}>
                        <Icon name={'search-outline'} size={30} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: 15,
        borderWidth: 0.5,
        height: 50,
        padding: 8
    },
    container: {
        padding: 10,
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    form: {
        flexBasis: 'auto',
        flexGrow: 1,
        paddingRight: 8
    }
})

export default Search;