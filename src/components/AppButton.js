import React, { useMemo } from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import spacing from "../theme/spacing";
import { useTheme } from "../theme/ThemeContext";

export default function AppButton({ title, onPress, loading, disabled }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        isDisabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    button: {
      height: 50,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.sm,

      // iOS shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,

      // Android elevation
      elevation: 3,
    },
    title: {
      color: "white",
      fontSize: 16,
      fontWeight: "700",
    },
    pressed: {
      opacity: 0.9,
    },
    disabled: {
      opacity: 0.6,
    },
  });
