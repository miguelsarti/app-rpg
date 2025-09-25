import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function CharacterCard({ item, onToggleRecruit, onRemove }) {
  return (
    <Card
      style={[
        styles.character,
        item.recruited ? styles.characterRecruited : null
      ]}
      onPress={() => onToggleRecruit(item)}
      onLongPress={() => onRemove(item)}
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

const styles = StyleSheet.create({
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