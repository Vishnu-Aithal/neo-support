module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            rotate: {
                360: "360deg",
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-in-out backwards",
            },
        },
    },
    plugins: [],
};
