import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Platform } from "react-native";
import spacing from "../theme/spacing";
import AppButton from "../components/AppButton";
import ScreenHeader from "../components/ScreenHeader";

import { pick, types, isErrorWithCode, errorCodes } from "@react-native-documents/picker";
import { useTheme } from "../theme/ThemeContext";

export default function UploadResumeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const prettySize = useMemo(() => {
    if (!file?.size && file?.size !== 0) return "";
    const bytes = file.size;
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${kb.toFixed(0)} KB`;
  }, [file]);

  async function onPickResume() {
    try {
      setLoading(true);

      const result = await pick({
        allowMultiSelection: false,
        type: [types.pdf, types.doc, types.docx, types.images],
      });

      const picked = result?.[0];
      if (!picked) return;

      setFile({
        name: picked.name,
        size: picked.size ?? null,
        type: picked.type ?? null,
        uri: picked.uri,
      });
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        return;
      }
      Alert.alert("Couldn’t pick file", "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function onRemove() {
    setFile(null);
  }

  function onContinue() {
    if (!file) return;
    navigation.navigate("Analyze", { file });
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Upload Resume"
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
          else navigation.replace("Login");
        }}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>ResumeAIFixer</Text>
        <Text style={styles.heading}>Upload your resume</Text>
        <Text style={styles.subheading}>
          Upload a PDF/DOC/DOCX and we’ll scan it for ATS issues, grammar, and impact.
        </Text>
      </View>

      <View style={styles.card}>
        <Pressable
          onPress={onPickResume}
          style={({ pressed }) => [styles.dropZone, pressed && styles.pressed]}
        >
          <Text style={styles.dropIcon}>📄</Text>
          <Text style={styles.dropTitle}>{file ? "Change file" : "Tap to choose resume"}</Text>
          <Text style={styles.dropHint}>Supported: PDF, DOC, DOCX</Text>
        </Pressable>

        {file ? (
          <View style={styles.fileCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fileName} numberOfLines={1}>
                {file.name}
              </Text>
              <Text style={styles.fileMeta}>
                {prettySize ? `${prettySize} • ` : ""}
                {file.type || "Unknown type"}
              </Text>
              <Text style={styles.fileMetaSmall} numberOfLines={1}>
                {Platform.OS === "android" ? "Android URI" : "iOS URI"}: {file.uri}
              </Text>
            </View>

            <Pressable onPress={onRemove} style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyInfo}>
            <Text style={styles.emptyText}>
              Tip: Export your resume as PDF for best formatting & ATS results.
            </Text>
          </View>
        )}

        <AppButton
          title={file ? "Continue" : "Select a resume to continue"}
          onPress={onContinue}
          disabled={!file}
          loading={loading}
        />
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
    },
    header: {
      marginBottom: spacing.lg,
    },
    brand: {
      color: colors.mutedText,
      fontSize: 14,
      letterSpacing: 1,
      marginBottom: spacing.sm,
    },
    heading: {
      color: colors.text,
      fontSize: 30,
      fontWeight: "800",
    },
    subheading: {
      color: colors.mutedText,
      marginTop: spacing.sm,
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
    dropZone: {
      borderRadius: 16,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: colors.border,
      paddingVertical: spacing.xl,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
      backgroundColor: colors.subtle,
    },
    pressed: {
      opacity: 0.9,
    },
    dropIcon: {
      fontSize: 40,
      marginBottom: spacing.sm,
    },
    dropTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
    },
    dropHint: {
      marginTop: spacing.sm,
      color: colors.mutedText,
      fontSize: 12,
      textAlign: "center",
    },
    fileCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      backgroundColor: colors.subtle,
      borderRadius: 14,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },
    fileName: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
    },
    fileMeta: {
      marginTop: 4,
      color: colors.mutedText,
      fontSize: 12,
    },
    fileMetaSmall: {
      marginTop: 4,
      color: colors.mutedText,
      fontSize: 11,
    },
    removeBtn: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.bg,
    },
    removeText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "700",
    },
    emptyInfo: {
      backgroundColor: colors.subtle,
      borderRadius: 14,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },
    emptyText: {
      color: colors.mutedText,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
    },
  });
