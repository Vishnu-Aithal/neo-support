module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "move-in-top": {
                    "0%": { transform: "translateY(-25%)", opacity: "0" },
                    "80%": { transform: "translateY(5%)" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "move-in-right": {
                    "0%": { transform: "translateX(-25%)", opacity: "0" },
                    "80%": { transform: "translateX(5%)" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    100: { opacity: "1" },
                },
            },
            animation: {
                "move-in-top": "move-in-top 1s ease-in-out backwards",
                "move-in-right": "move-in-right 1s ease-in-out backwards",
                "fade-in": "fade-in 0.5s ease-in-out backwards",
            },
            rotate: {
                360: "360deg",
            },
        },
    },
    plugins: [],
};
