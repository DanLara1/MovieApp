import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'


const propTypes = {
    errorTextOne: PropTypes.string,
    errorTextTwo: PropTypes.string,
};

const defaultProps = {
    errorTextOne: 'Oops! Something went wrong.',
    errorTextTwo: 'Make sure you are online and restart the App!'
}

class Error extends React.PureComponent {
    render() {
        const {errorTextOne, errorTextTwo} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{errorTextOne}</Text>
                <Text style={styles.text}>{errorTextTwo}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
    }
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;