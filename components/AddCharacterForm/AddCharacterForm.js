import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native"

export default function AddcCharacterForm() {
    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                style={styles.input}
                placeholder="🧑‍🎤 Nome do novo personagem…"
                value={newCharacter}
                onChangeText={setNewCharacter}
                onSubmitEditing={addCharacter}
                theme={{ colors: { primary: "#E69A28" } }}
            />
            <Button
                mode="contained"
                onPress={addCharacter}
                style={styles.button}
                contentStyle={{ height: 48 }}
                labelStyle={{ fontSize: 22, color: "#1A0E0A" }}
                buttonColor="#E69A28"
                textColor="black"
            >
                ➕
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    button: {
        borderRadius: 8,
        justifyContent: "center",
        backgroundColor: "#E69A28",
        margin: 10
    }
})