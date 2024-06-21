export const i18n = {
    defaultLocale: "ca",
    locales: ["ca", "es", "en"],
    mapping: {
        "ca": {
            "label": "Català",
            "flag": "es-ct",
        },
        "es": {
            "label": "Español",
            "flag": "es",
        },
        "en": {
            "label": "English",
            "flag": "gb",
        },
    },
} as const;

export type Locale = (typeof i18n)["locales"][number];
