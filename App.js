import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Provider as PaperProvider,
  Card,
  Button,
  TextInput,
  Avatar,
} from "react-native-paper";

export default function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙 Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 }
  ]);
  const [newCharacter, setNewCharacter] = useState("");

  function addCharacter() {
    if (newCharacter === "") return;
    const newId = characters.length > 0 ? Math.max(...characters.map(c => c.id)) + 1 : 1;
    const newCharacterObj = {
      id: newId,
      name: newCharacter,
      recruited: 0
    };
    setCharacters([newCharacterObj, ...characters]);
    setNewCharacter("");
  }

  function toggleRecruit(character) {
    const newCharacters = characters.map((currentChar) =>
      currentChar.id === character.id
        ? { ...currentChar, recruited: currentChar.recruited ? 0 : 1 }
        : currentChar
    );
    setCharacters(newCharacters);
  }

  function renderCharacter({ item }) {
    return (
      <Card
        style={[
          styles.character,
          item.recruited ? styles.characterRecruited : null
        ]}
        onPress={() => toggleRecruit(item)}
        onLongPress={() =>
          Alert.alert(
            "Remover personagem",
            `Deseja remover ${item.name}?`,
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Remover",
                style: "destructive",
                onPress: () =>
                  setCharacters(characters.filter((c) => c.id !== item.id))
              }
            ]
          )
        }
      >
        <Card.Title
          title={item.name}
          titleStyle={{ color: "#fff", fontWeight: "bold" }}
          right={() => (
            <Text style={{ color: "#E69A28", fontSize: 24, marginRight: 16 }}>
              {item.recruited ? "⭐" : "🗡️"}
            </Text>
          )}
        />
      </Card>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.title}>🏰 Minha Party RPG</Text>
        <Text style={styles.subtitle}>
          ⭐ Recrutado • 🗡️ Disponível • Segure para remover
        </Text>
        <View style={styles.inputRow}>
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
          >
            ➕
          </Button>
        </View>
        <FlatList
          data={characters.filter(character => character.recruited == 1)}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCharacter}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A0E0A",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E69A28",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
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
  },
  list: {
    flex: 1,
  },
  character: {
    backgroundColor: "#2C1810",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 0,
    elevation: 4,
  },
  characterRecruited: {
    backgroundColor: "#58180D",
    borderColor: "#E69A28",
    borderWidth: 2,
  },
});