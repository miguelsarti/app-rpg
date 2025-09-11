import React, { useState } from "react";
import {
  SafeAreaView,      // 🛡️ Área segura da tela
  View,              // 📦 Container básico
  Text,              // 📝 Texto na tela
  TextInput,         // 🧾 Campo de entrada
  TouchableOpacity,  // 👆 Botão tocável
  FlatList,          // 📋 Lista de itens
  StyleSheet,        // 🎨 Estilos CSS-like
  Alert,             // 🚨 Alertas nativos
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // 🦸 Lista de personagens (estado inicial com 3 heróis)
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙 Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 }
  ]);

  // ✍️ Texto do novo personagem (começa vazio)
  const [newCharacter, setNewCharacter] = useState("");

  // 🆕 Adicionar novo personagem à party
  function addCharacter() {
    // 🚫 Se estiver vazio, não adicionar
    if (newCharacter === "") return;

    // 🆔 ID simples: próximo número
    const newId = characters.length > 0 ? Math.max(...characters.map(c => c.id)) + 1 : 1;

    // 🛠️ Criar objeto do novo personagem
    const newCharacterObj = {
      id: newId,
      name: newCharacter,
      recruited: 0 // Começa não recrutado
    };

    // 📋 Colocar novo personagem no topo da lista
    const allCharacters = [newCharacterObj, ...characters];

    // ✨ Atualizar estado e limpar campo
    setCharacters(allCharacters);
    setNewCharacter("");
  }

  // ⭐ Recrutar/dispensar personagem
  function toggleRecruit(character) {
    const newCharacters = characters.map((currentChar) =>
      currentChar.id === character.id
        ? { ...currentChar, recruited: currentChar.recruited ? 0 : 1 }
        : currentChar
    );
    setCharacters(newCharacters);
  }

  // 🧑‍🎤 Renderizar personagem na lista
  function renderCharacter({ item }) {
    return (
      <TouchableOpacity
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
        <Text style={{ color: "#fff" }}>{item.name}</Text>
        <Text style={{ color: "#E69A28" }}>
          {item.recruited ? "⭐" : "🗡️"}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 🏰 Título do App */}
      <Text style={styles.title}>🏰 Minha Party RPG</Text>
      <Text style={styles.subtitle}>
        ⭐ Recrutado • 🗡️ Disponível • Segure para remover
      </Text>

      {/* ✍️ Campo para adicionar personagem */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="🧑‍🎤 Nome do novo personagem…"
          value={newCharacter}
          onChangeText={setNewCharacter}
          onSubmitEditing={addCharacter}
        />
        <TouchableOpacity style={styles.button} onPress={addCharacter}>
          <Text style={styles.buttonText}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* 📋 Lista de personagens */}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCharacter}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

// 🎨 Estilos com tema D&D épico!
const styles = StyleSheet.create({
  container: {
    flex: 1,                        // Ocupar tela toda
    backgroundColor: "#1A0E0A",     // 🏰 Preto D&D
    paddingTop: 50,                 // Espaço do topo
    paddingHorizontal: 20,          // Espaço lateral
  },
  title: {
    fontSize: 28,                   // Tamanho grande
    fontWeight: "bold",             // Texto em negrito
    textAlign: "center",            // Centralizado
    color: "#E69A28",               // 🟠 Dourado D&D
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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#E69A28",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#1A0E0A",
    fontWeight: "bold",
    fontSize: 18,
  },
  list: {
    flex: 1,
  },
  character: {
    backgroundColor: "#2C1810",     // 🤎 Marrom D&D
    padding: 15,
    borderRadius: 8,                // Bordas arredondadas
    marginBottom: 10,               // Espaço entre itens
    flexDirection: "row",           // Lado a lado
    justifyContent: "space-between",
  },
  characterRecruited: {
    backgroundColor: "#58180D",     // 🔴 Vermelho para recrutado
    borderColor: "#E69A28",         // Borda dourada
    borderWidth: 2,
  },
});