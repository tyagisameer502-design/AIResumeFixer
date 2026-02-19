import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import ScreenHeader from "../components/ScreenHeader";

export default function ResultsScreen({ navigation, route }) {
  const file = route?.params?.file || null;

  // Fake data for now (later: backend will return this)
  const score = 78; // out of 100

  const summaryChips = [
    { label: "Grammar", value: "Good" },
    { label: "Keywords", value: "Medium" },
    { label: "Formatting", value: "Strong" },
  ];

  const fixes = [
    { title: "Add stronger section headings", note: "Use: Summary, Experience, Projects, Skills.", level: "High" },
    { title: "Add measurable impact", note: "Include numbers: +20%, 10k users, ₹5L saved.", level: "High" },
    { title: "Improve keyword match", note: "Add role keywords in skills + bullets naturally.", level: "Medium" },
    { title: "Shorten long bullet points", note: "Aim 1–2 lines per bullet for readability.", level: "Low" },
  ];

  const scoreLabel = useMemo(() => {
    if (score >= 85) return { text: "Excellent", tone: "success" };
    if (score >= 70) return { text: "Good", tone: "warning" };
    return { text: "Needs work", tone: "danger" };
  }, [score]);

  const barWidth = `${Math.max(0, Math.min(100, score))}%`;

  const toneColor =
    scoreLabel.tone === "success"
      ? colors.success
      : scoreLabel.tone === "warning"
      ? colors.warning
      : colors.danger;

  function LevelTag({ level }) {
    const bg =
      level === "High"
        ? "#FEE2E2"
        : level === "Medium"
        ? "#FEF3C7"
        : "#E5E7EB";

    const fg =
      level === "High"
        ? "#B91C1C"
        : level === "Medium"
        ? "#92400E"
        : "#374151";

    return (
      <View style={[styles.tag, { backgroundColor: bg }]}>
        <Text style={[styles.tagText, { color: fg }]}>{level}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Results" onBack={() => navigation.replace("UploadResume")} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <Text style={styles.brand}>ResumeAIFixer</Text>
        <Text style={styles.heading}>Your resume score</Text>

        <Text style={styles.subheading} numberOfLines={2}>
          {file?.name ? `Analyzed: ${file.name}` : "Your resume analysis is ready."}
        </Text>

        {/* HERO SCORE CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroLabel}>ATS Score</Text>
              <Text style={styles.heroScore}>
                {score}
                <Text style={styles.heroOutOf}>/100</Text>
              </Text>
            </View>

            <View style={[styles.pill, { backgroundColor: colors.subtle, borderColor: colors.border }]}>
              <View style={[styles.dot, { backgroundColor: toneColor }]} />
              <Text style={styles.pillText}>{scoreLabel.text}</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: barWidth, backgroundColor: toneColor }]} />
          </View>

          <Text style={styles.heroHint}>
            Tip: Improving headings + keywords usually gives the fastest ATS boost.
          </Text>

          {/* quick chips */}
          <View style={styles.chipsRow}>
            {summaryChips.map((c) => (
              <View key={c.label} style={styles.chip}>
                <Text style={styles.chipLabel}>{c.label}</Text>
                <Text style={styles.chipValue}>{c.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* TOP FIXES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top fixes</Text>

          {fixes.map((f, index) => {
            const isLast = index === fixes.length - 1;
            return (
              <View key={f.title} style={[styles.fixRow, isLast && { borderBottomWidth: 0 }]}>
                <View style={{ flex: 1 }}>
                  <View style={styles.fixTitleRow}>
                    <Text style={styles.fixTitle}>{f.title}</Text>
                    <LevelTag level={f.level} />
                  </View>
                  <Text style={styles.fixNote}>{f.note}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* CTA */}
        <Pressable
          onPress={() => {
            // next we can navigate to a Fix/Preview screen
            // navigation.navigate("FixResume", { file })
          }}
          style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.primaryBtnText}>Fix My Resume</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.replace("UploadResume")}
          style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.secondaryBtnText}>Analyze another resume</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  heroLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
  },
  heroScore: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    marginTop: 2,
  },
  heroOutOf: {
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "800",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  pillText: {
    color: colors.text,
    fontSize: 12,
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
  },
  heroHint: {
    marginTop: spacing.md,
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 18,
  },

  chipsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  chip: {
    flex: 1,
    backgroundColor: colors.subtle,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
  },
  chipLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
  },
  chipValue: {
    marginTop: 6,
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: spacing.md,
  },

  fixRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fixTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  fixTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    flex: 1,
  },
  fixNote: {
    marginTop: 6,
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 16,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "900",
  },

  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.subtle,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  secondaryBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
});
