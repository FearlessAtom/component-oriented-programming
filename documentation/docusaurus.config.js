import { themes as prismThemes } from "prism-react-renderer";

const config = {
    title: "Memory Cards",
    tagline: "Memory Cards",
    favicon: "img/favicon.ico",

    future: {
        v4: true,
    },

    url: "https://navi.gg",
    baseUrl: "/",
    organizationName: "fearlessatom",
    projectName: "memory_cards",
    onBrokenLinks: "warn",

    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            ({
                docs: {
                    sidebarPath: "./sidebars.js",
                    editUrl: "https://github.com/fearlessatom/component-oriented-programming",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    themeConfig:
    ({
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: "Memory Cards",
            logo: {
                alt: "Memory Cards Logo",
                src: "img/logo.png",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Tutorial",
                },
                {
                    href: "https://github.com/fearlessatom/component-oriented-programming",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Tutorial",
                            to: "/docs/quick-start",
                        },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/fearlessatom/component-oriented-programming",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Memory Cards, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    }),
};

export default config;
