import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import spacing from "../theme/spacing";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { registerUser, setSessionUser } from "../utils/authStorage";
import { useTheme } from "../theme/ThemeContext";

export default function SignupScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    const name = fullName.trim();
    const mail = email.trim();

    if (!name) nextErrors.fullName = "Full name is required";

    if (!mail) nextErrors.email = "Email is required";
    else if (!mail.includes("@")) nextErrors.email = "Enter a valid email";

    if (!password.trim()) nextErrors.password = "Password is required";
    else if (password.trim().length < 6)
      nextErrors.password = "Password must be at least 6 characters";

    if (!confirmPassword.trim())
      nextErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSignup() {
    if (loading) return;
    if (!validate()) return;

    setLoading(true);

    try {
      const user = await registerUser({
        name: fullName.trim(),
        email: email.trim(),
        password: password,
      });

      await setSessionUser(user);

      setLoading(false);
      navigation.replace("Dashboard");
    } catch (e) {
      setLoading(false);
      Alert.alert("Signup failed", e?.message || "Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ResumeAIFixer</Text>
      <Text style={styles.heading}>Create account</Text>
      <Text style={styles.subheading}>
        Sign up to start fixing and improving your resume with AI.
      </Text>

      <View style={styles.card}>
        <AppInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="e.g. Sameer Tyagi"
          autoCapitalize="words"
          error={errors.fullName}
        />

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
          placeholder="At least 6 characters"
          secureTextEntry
          error={errors.password}
        />

        <AppInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter password"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <AppButton
          title="Create Account"
          onPress={onSignup}
          loading={loading}
        />

        <View style={styles.row}>
          <Text style={styles.rowText}>Already have an account?</Text>
          <Pressable
            onPress={() => navigation.replace("Login")}
            disabled={loading}
            style={({ pressed }) => pressed && { opacity: 0.6 }}
          >
            <Text style={styles.link}> Log in</Text>
          </Pressable>
        </View>

        <Text style={styles.terms}>
          By signing up, you agree to our{" "}
          <Text style={styles.termsBold}>Terms</Text> &{" "}
          <Text style={styles.termsBold}>Privacy Policy</Text>.
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
    terms: {
      marginTop: spacing.lg,
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
    },
    termsBold: {
      color: colors.text,
      fontWeight: "700",
    },
  });
