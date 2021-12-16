import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

class Card extends React.PureComponent {
    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity style={style.container}></TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',

    }
})

export default Card;