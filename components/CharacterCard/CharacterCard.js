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
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#2C1810",
        marginBottom: 12,
        borderWidth: 0,        
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#E69A28"
    },
    description: {
        fontSize: 16,
        color: "#fff"
    },
    function: {
        fontSize: 16,
        color: "#fff"
    }
})