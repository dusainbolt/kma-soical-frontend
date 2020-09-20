module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "max-len": ["error", { code: 200 }],
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "object-curly-spacing": ["error", "always"],
        "react/jsx-closing-bracket-location": [1, "line-aligned"],
        "arrow-parens": ["error", "as-needed"],
        "no-unused-vars": "off",
        "react/prop-types": 0
    }
    
};