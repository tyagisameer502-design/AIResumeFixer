import React, { useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import spacing from "../theme/spacing";
import { useTheme } from "../theme/ThemeContext";

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input, error ? styles.inputError : null]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: spacing.md,
    },
    label: {
      color: colors.text,
      marginBottom: spacing.xs,
      fontSize: 14,
    },
    input: {
      height: 48,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.subtle,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      fontSize: 16,
    },
    inputError: {
      borderColor: colors.danger,
    },
    error: {
      marginTop: spacing.xs,
      color: colors.danger,
      fontSize: 12,
    },
  });
