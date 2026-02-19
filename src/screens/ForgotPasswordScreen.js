import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import spacing from "../theme/spacing";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { useTheme } from "../theme/ThemeContext";

export default function ForgotPasswordScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    if (email.trim() && !email.includes("@")) {
      nextErrors.email = "Enter a valid email";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSendLink() {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      Alert.alert(
        "Check your email 📩",
        "If an account exists for this email, you'll receive a reset link.",
        [{ text: "Back to Login", onPress: () => navigation.replace("Login") }]
      );
    }, 900);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ResumeAIFixer</Text>
      <Text style={styles.heading}>Forgot password?</Text>
      <Text style={styles.subheading}>
        Enter your email and we’ll send you a reset link.
      </Text>

      <View style={styles.card}>
        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <AppButton
          title="Send Reset Link"
          onPress={onSendLink}
          loading={loading}
        />

        <View style={styles.row}>
          <Pressable onPress={() => navigation.replace("Login")}>
            <Text style={styles.link}>Back to Login</Text>
          </Pressable>
        </View>

        <Text style={styles.helper}>
          Tip: In real apps, we show this same message even if the email doesn’t
          exist (for security).
        </Text>
      </View>
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: spacing.xl,
      paddingTop: spacing.xl,
    },
    brand: {
      color: colors.mutedText,
      fontSize: 14,
      letterSpacing: 1,
      marginBottom: spacing.sm,
    },
    heading: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "800",
    },
    subheading: {
      color: colors.mutedText,
      marginTop: spacing.sm,
      marginBottom: spacing.lg,
      fontSize: 14,
      lineHeight: 20,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: {
      alignItems: "center",
      marginTop: spacing.md,
    },
    link: {
      color: colors.primary,
      fontSize: 13,
      fontWeight: "700",
    },
    helper: {
      marginTop: spacing.lg,
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
    },
  });
