module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    // "settings": {
    //     "import/resolver": {
    //         node: {paths: [path.resolve('./src')]}
    //     },
    // },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": 1,
        "comma-dangle": 0,
        "eol-last": 1,
        "no-console": 0,
        "semi": 1,
        "require-atomic-updates": "off"
    }

};
