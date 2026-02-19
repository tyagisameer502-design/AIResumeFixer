import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import spacing from "../theme/spacing";
import { useTheme } from "../theme/ThemeContext";

const STEPS = [
  { key: "ats", label: "ATS Scan", desc: "Checking structure, sections & parsing…" },
  { key: "grammar", label: "Grammar", desc: "Fixing clarity, tense & errors…" },
  { key: "keywords", label: "Keywords", desc: "Matching role keywords & impact…" },
  { key: "format", label: "Formatting", desc: "Consistency, spacing & readability…" },
];

export default function AnalyzeScreen({ navigation, route }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const file = route?.params?.file || null;

  const progressAnim = useRef(new Animated.Value(0)).current; // 0..1
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const id = progressAnim.addListener(({ value }) => {
      setPercent(Math.min(100, Math.round(value * 100)));
    });

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: false,
    }).start();

    return () => {
      progressAnim.removeListener(id);
    };
  }, [progressAnim]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStepIndex(0), 0),
      setTimeout(() => setActiveStepIndex(1), 1500),
      setTimeout(() => setActiveStepIndex(2), 3200),
      setTimeout(() => setActiveStepIndex(3), 4800),
      setTimeout(() => navigation.replace("Results", { file }), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigation, file]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ResumeAIFixer</Text>
      <Text style={styles.heading}>Analyzing your resume</Text>

      <Text style={styles.subheading} numberOfLines={2}>
        {file?.name ? `File: ${file.name}` : "Preparing analysis…"}
      </Text>

      {/* Progress */}
      <View style={styles.card}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progress</Text>
          <Text style={styles.progressPercent}>{percent}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Text style={styles.progressHint}>
          This usually takes a few seconds. We’re running multiple checks.
        </Text>
      </View>

      {/* Steps */}
      <View style={styles.stepsCard}>
        <Text style={styles.stepsTitle}>What we’re checking</Text>

        {STEPS.map((s, idx) => {
          const done = idx < activeStepIndex;
          const active = idx === activeStepIndex;

          return (
            <View key={s.key} style={styles.stepRow}>
              <View
                style={[
                  styles.bullet,
                  done && styles.bulletDone,
                  active && styles.bulletActive,
                ]}
              >
                <Text style={styles.bulletText}>{done ? "✓" : active ? "•" : ""}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.stepLabel}>{s.label}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </View>
          );
        })}
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
      fontSize: 28,
      fontWeight: "800",
    },
    subheading: {
      color: colors.mutedText,
      marginTop: spacing.sm,
      marginBottom: spacing.lg,
      fontSize: 13,
      lineHeight: 18,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.lg,
    },
    progressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: spacing.sm,
    },
    progressTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
    },
    progressPercent: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "800",
    },
    progressTrack: {
      height: 12,
      borderRadius: 999,
      backgroundColor: colors.subtle,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 999,
      backgroundColor: colors.primary,
    },
    progressHint: {
      marginTop: spacing.md,
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 18,
    },
    stepsCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    stepsTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "800",
      marginBottom: spacing.md,
    },
    stepRow: {
      flexDirection: "row",
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    bullet: {
      width: 26,
      height: 26,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.bg,
      marginTop: 2,
    },
    bulletDone: {
      backgroundColor: colors.subtle,
    },
    bulletActive: {
      borderColor: colors.primary,
    },
    bulletText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "800",
    },
    stepLabel: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
    },
    stepDesc: {
      marginTop: 3,
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 16,
    },
  });
