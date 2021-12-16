import React from 'react';
import { View, Text } from 'react-native';

class List extends React.PureComponent {
    render() {
        const {title, content} = this.props
        return (
            <View>
                <Text>{title}</Text>
            </View>
        );
    }
}

export default List;