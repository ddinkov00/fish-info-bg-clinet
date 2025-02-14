module.exports = {
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "singleQuote": true,
  "plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "importOrder": [
    "^(react(/.*)?$)|^(react-(.*)$)",
    "<THIRD_PARTY_MODULES>",
    "^src/(.*)$",
    "^@/(.*)$",
    "^.{1,2}/(.*)$|^@/(.*)$"
  ]
}
