import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import spacing from "../theme/spacing";
import { useTheme } from "../theme/ThemeContext";

export default function ScreenHeader({ title, onBack }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.backText}>←</Text>
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* spacer to keep title centered */}
      <View style={styles.rightSpacer} />
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.lg,
      marginBottom: spacing.lg,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.subtle,   // ✅ theme-aware
      borderWidth: 1,
      borderColor: colors.border,
    },
    backText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800",
    },
    title: {
      flex: 1,
      textAlign: "center",
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
      marginHorizontal: spacing.md,
    },
    rightSpacer: {
      width: 40,
      height: 40,
    },
  });
