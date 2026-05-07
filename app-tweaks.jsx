// app-tweaks.jsx — Expressive tweaks for RUKCON 11
// Three controls that reshape the feel of the page, not single-property pixel-pushing.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "intensity": "bold",
  "accent": "gold",
  "photoTreatment": "documentary"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  gold: {
    "--accent-400": "#D6A850",
    "--accent-300": "#E5BB6E",
    "--accent-200": "#F0CD8E",
    "--accent-glow": "rgba(214,168,80,0.40)",
    "--accent-soft": "rgba(214,168,80,0.18)",
  },
  teal: {
    "--accent-400": "#3FB8B0",
    "--accent-300": "#5FCFC7",
    "--accent-200": "#86E1D9",
    "--accent-glow": "rgba(63,184,176,0.40)",
    "--accent-soft": "rgba(63,184,176,0.18)",
  },
  bone: {
    "--accent-400": "#E8E2D2",
    "--accent-300": "#F1ECDF",
    "--accent-200": "#F8F5EC",
    "--accent-glow": "rgba(232,226,210,0.30)",
    "--accent-soft": "rgba(232,226,210,0.14)",
  },
};

const INTENSITY_PRESETS = {
  reverent: {
    "--int-display-weight": "300",
    "--int-display-tracking": "-0.005em",
    "--int-display-scale": "0.85",
    "--int-block-padding": "180px",
    "--int-grain-opacity": "0",
    "--int-section-rule": "0",
  },
  bold: {
    "--int-display-weight": "900",
    "--int-display-tracking": "-0.02em",
    "--int-display-scale": "1",
    "--int-block-padding": "120px",
    "--int-grain-opacity": "0.05",
    "--int-section-rule": "1",
  },
  rally: {
    "--int-display-weight": "900",
    "--int-display-tracking": "-0.035em",
    "--int-display-scale": "1.18",
    "--int-block-padding": "96px",
    "--int-grain-opacity": "0.12",
    "--int-section-rule": "1",
  },
};

const PHOTO_PRESETS = {
  documentary: {
    "--ph-grayscale": "0.5",
    "--ph-contrast": "1.05",
    "--ph-brightness": "0.85",
    "--ph-scrim-opacity": "0.55",
  },
  cinematic: {
    "--ph-grayscale": "0",
    "--ph-contrast": "1.15",
    "--ph-brightness": "0.7",
    "--ph-scrim-opacity": "0.7",
  },
  hifi: {
    "--ph-grayscale": "0",
    "--ph-contrast": "1.0",
    "--ph-brightness": "1.0",
    "--ph-scrim-opacity": "0.35",
  },
};

function applyTweaks(t) {
  const root = document.documentElement;
  const merged = {
    ...ACCENT_PRESETS[t.accent],
    ...INTENSITY_PRESETS[t.intensity],
    ...PHOTO_PRESETS[t.photoTreatment],
  };
  Object.entries(merged).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-intensity", t.intensity);
  root.setAttribute("data-accent", t.accent);
  root.setAttribute("data-photo", t.photoTreatment);
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTweaks(t);
  }, [t.intensity, t.accent, t.photoTreatment]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Intensity" />
      <TweakRadio
        label="Voice"
        value={t.intensity}
        options={[
          { value: "reverent", label: "Reverent" },
          { value: "bold", label: "Bold" },
          { value: "rally", label: "Rally" },
        ]}
        onChange={(v) => setTweak("intensity", v)}
      />

      <TweakSection label="Accent" />
      <TweakRadio
        label="Palette"
        value={t.accent}
        options={[
          { value: "gold", label: "Gold" },
          { value: "teal", label: "Teal" },
          { value: "bone", label: "Bone" },
        ]}
        onChange={(v) => setTweak("accent", v)}
      />

      <TweakSection label="Photo" />
      <TweakRadio
        label="Treatment"
        value={t.photoTreatment}
        options={[
          { value: "documentary", label: "Doc" },
          { value: "cinematic", label: "Cine" },
          { value: "hifi", label: "Hi-Fi" },
        ]}
        onChange={(v) => setTweak("photoTreatment", v)}
      />
    </TweaksPanel>
  );
}

// Apply defaults synchronously so first paint matches persisted state
applyTweaks(TWEAK_DEFAULTS);

Object.assign(window, { TweaksApp, applyTweaks, TWEAK_DEFAULTS });
