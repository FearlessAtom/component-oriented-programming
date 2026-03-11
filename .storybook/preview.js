import "../src/App"
import "./storybook-overrides.css"

const preview = {
    parameters: {
        backgrounds: {
            default: "light",
            values: [
              { name: 'light', value: '#ffffff' },
              { name: 'dark', value: '#333333' },
            ],
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo"
        },
    },
};

export default preview;
