import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function CharacterCard() {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.description}>{character.description}</Text>
            <Text style={styles.function}>{character.function}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    name: {

    },
    description: {

    },
    function: {

    }
})