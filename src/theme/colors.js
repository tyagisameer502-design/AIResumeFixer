export const lightColors = {
  // Base
  bg: "#FFFFFF",
  card: "#FFFFFF",

  // Text
  text: "#111827",
  mutedText: "#6B7280",
  placeholder: "#9CA3AF",

  
  // Brand
  primary: "#4F46E5",

  // Borders / surfaces
  border: "#E5E7EB",
  subtle: "#F3F4F6",

  // Status
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
};

export const darkColors = {
  // Base
  bg: "#0B1220",       // deep navy
  card: "#111827",     // near-slate

  // Text
  text: "#F9FAFB",     // near-white
  mutedText: "#9CA3AF",
  placeholder: "#6B7280",

  // Brand (same brand works well)
  primary: "#6366F1",  // slightly brighter indigo for dark bg

  // Borders / surfaces
  border: "#1F2937",
  subtle: "#0F172A",

  // Status
  danger: "#F87171",
  success: "#34D399",
  warning: "#FBBF24",
};

// convenience helper (optional)
export const getColors = (mode) => (mode === "dark" ? darkColors : lightColors);

// keep default export for backwards compat if you want:
export default lightColors;
