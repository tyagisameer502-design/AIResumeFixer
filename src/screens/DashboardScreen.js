import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function DashboardScreen({ navigation }) {
  const recent = [
    { id: "1", title: "Software Engineer Resume", score: 78, date: "Today" },
    { id: "2", title: "Product Manager Resume", score: 71, date: "Yesterday" },
    { id: "3", title: "Data Analyst Resume", score: 83, date: "3 days ago" },
  ];

  const stats = useMemo(() => {
    const scores = recent.map((r) => r.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return {
      avgScore: avg,
      analyzed: recent.length,
      lastScore: recent[0]?.score ?? 0,
    };
  }, [recent]);

  function ScorePill({ score }) {
    const tone =
      score >= 85 ? colors.success : score >= 70 ? colors.warning : colors.danger;

    return (
      <View style={[styles.scorePill, { borderColor: tone }]}>
        <Text style={[styles.scoreText, { color: tone }]}>{score}/100</Text>
      </View>
    );
  }

  function goSettings() {
    navigation.push("Settings");
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Header Row */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.brand}>ResumeAIFixer</Text>
              <Text style={styles.smallHint}>Your resume improvement hub</Text>
            </View>

            <Pressable
              onPress={goSettings}
              hitSlop={14}
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}
            >
              {/* Vector icon (best) */}
              <Icon name="settings-outline" size={22} color={colors.text} />
              {/* Fallback text (still clickable even if font missing) */}
                          </Pressable>
          </View>

          <Text style={styles.heading}>Dashboard</Text>
          <Text style={styles.subheading}>
            Upload a resume and get ATS + keyword + formatting fixes.
          </Text>

          {/* Primary CTA */}
          <Pressable
            onPress={() => navigation.navigate("UploadResume")}
            style={({ pressed }) => [
              styles.primaryCard,
              pressed && { opacity: 0.92 },
            ]}
          >
            <Text style={styles.primaryTitle}>Upload Resume</Text>
            <Text style={styles.primaryDesc}>
              Start a new analysis in under 10 seconds.
            </Text>

            <View style={styles.primaryBtnRow}>
              <View style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Get Started</Text>
              </View>
              <Icon name="arrow-forward" size={20} color="white" />
            </View>
          </Pressable>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Avg ATS</Text>
              <Text style={styles.statValue}>{stats.avgScore}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Analyzed</Text>
              <Text style={styles.statValue}>{stats.analyzed}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Last Score</Text>
              <Text style={styles.statValue}>{stats.lastScore}</Text>
            </View>
          </View>

          {/* Recent */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Recent analyses</Text>
              <Pressable>
                <Text style={styles.link}>View all</Text>
              </Pressable>
            </View>

            {recent.map((r, index) => {
              const isLast = index === recent.length - 1;

              return (
                <Pressable
                  key={r.id}
                  onPress={() =>
                    navigation.navigate("Results", { file: { name: r.title } })
                  }
                  style={({ pressed }) => [
                    styles.recentRow,
                    !isLast && styles.recentRowBorder,
                    pressed && { opacity: 0.9 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recentTitle} numberOfLines={1}>
                      {r.title}
                    </Text>
                    <Text style={styles.recentMeta}>{r.date}</Text>
                  </View>

                  <ScorePill score={r.score} />
                </Pressable>
              );
            })}
          </View>

          {/* Secondary CTA */}
          <Pressable
            onPress={() => navigation.navigate("UploadResume")}
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.92 },
            ]}
          >
            <Text style={styles.secondaryBtnText}>Analyze another resume</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  brand: {
    color: colors.mutedText,
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "700",
  },
  smallHint: {
    marginTop: 4,
    color: colors.mutedText,
    fontSize: 12,
  },

  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: colors.subtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // ✅ This will show only if icon font is missing (still ok)
  fallbackText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  heading: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
  },
  subheading: {
    color: colors.mutedText,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    fontSize: 14,
    lineHeight: 20,
  },

  primaryCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
  primaryDesc: {
    color: "rgba(255,255,255,0.9)",
    marginTop: spacing.sm,
    fontSize: 13,
    lineHeight: 18,
  },
  primaryBtnRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  primaryBtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "800",
  },

  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
  },
  statValue: {
    marginTop: 8,
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },

  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  recentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  recentMeta: {
    marginTop: 5,
    color: colors.mutedText,
    fontSize: 12,
  },

  scorePill: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1.5,
    backgroundColor: colors.subtle,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "900",
  },

  secondaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.subtle,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
});
