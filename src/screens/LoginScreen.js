import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import spacing from "../theme/spacing";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { loginUser } from "../utils/authStorage";
import { useTheme } from "../theme/ThemeContext";

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    const mail = email.trim();

    if (!mail) nextErrors.email = "Email is required";
    else if (!mail.includes("@")) nextErrors.email = "Enter a valid email";

    if (!password) nextErrors.password = "Password is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onLogin() {
    if (loading) return;
    if (!validate()) return;

    setLoading(true);

    try {
      await loginUser({
        email: email.trim(),
        password,
      });

      setLoading(false);
      navigation.replace("Dashboard");
    } catch (e) {
      setLoading(false);

      const msg =
        e?.message === "Invalid credentials"
          ? "Wrong email or password."
          : e?.message || "Please try again.";

      Alert.alert("Login failed", msg);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.brand}>ResumeAIFixer</Text>

        <Text style={styles.heading}>Log in</Text>
        <Text style={styles.subheading}>
          Log in to continue improving your resume.
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

          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
          />

          <View style={styles.forgotRow}>
            <Pressable
              onPress={() => navigation.navigate("ForgotPassword")}
              disabled={loading}
              style={({ pressed }) => pressed && { opacity: 0.6 }}
            >
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </Pressable>
          </View>

          <AppButton title="Login" onPress={onLogin} loading={loading} />

          <View style={styles.row}>
            <Text style={styles.rowText}>New here?</Text>
            <Pressable
              onPress={() => navigation.navigate("Signup")}
              disabled={loading}
              style={({ pressed }) => pressed && { opacity: 0.6 }}
            >
              <Text style={styles.link}> Create account</Text>
            </Pressable>
          </View>

          <Text style={styles.helper}>
            Tip: Create an account first, then log in using the same email & password.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.bg,
      padding: spacing.xl,
      justifyContent: "center",
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
      borderRadius: 18,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    forgotRow: {
      alignItems: "flex-end",
      marginTop: -4,
      marginBottom: spacing.md,
    },
    forgotLink: {
      color: colors.primary,
      fontSize: 13,
      fontWeight: "700",
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.md,
    },
    rowText: {
      color: colors.mutedText,
      fontSize: 13,
    },
    link: {
      color: colors.primary,
      fontSize: 13,
      fontWeight: "700",
    },
    helper: {
      color: colors.mutedText,
      fontSize: 12,
      marginTop: spacing.md,
      textAlign: "center",
      lineHeight: 16,
    },
  });
