import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Task extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    {
                        this.props.checked
                        ?   
                        <View style={styles.square}>
                        </View>
                        : 
                        <View style={styles.blanksquare}>
                        </View>
                    }
                    <Text style={styles.itemText}>{this.props.text}</Text>
                </View>
                <View style={styles.circular}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
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