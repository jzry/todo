import React, { Component, Button, TextInput } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateView: this.props.updateView
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.updateView = nextProps.updateView;
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={this.props.checked ? styles.square : styles.blanksquare} >
                    </View>
                    
                        <Text style={styles.itemText}>{this.props.text}</Text>
                
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#517470',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    blanksquare: {
        width: 24,
        height: 24,
        backgroundColor: '#cccccc',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#558cf6',
        borderWidth: 2,
        borderRadius: 5,
    },
})

export default Task;