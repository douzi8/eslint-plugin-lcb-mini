const Linter = require("eslint").Linter;
const linter = new Linter();

const rule = require('../index')


linter.defineRule("require", rule.rules.require);

const results = linter.verify(`
  var a = require('./a.js')
`, { 
  rules: { 
    "require": "error" 
  } 
});


console.log(results)