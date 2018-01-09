const modules = process.env.NODE_ENV === 'test' ? 'commonjs' : false
const loose = true

module.exports = {
  presets: [
    ["@babel/env", { modules, loose }],
    ["@babel/stage-0", { loose }],
    "@babel/react",
    "@babel/flow",
  ],
  plugins: [
    [
      "module-resolver",
      {"root": ["./src"]},
    ],
  ],
}
