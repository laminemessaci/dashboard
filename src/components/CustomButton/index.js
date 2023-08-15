import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ label, theme, onPress }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.primaryDark,
        borderRadius: 10,
        padding:20,
        marginBottom: 30,
        marginHorizontal: 8,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
