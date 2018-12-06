
var RuleTester = require("eslint").RuleTester;


var ruleTester = new RuleTester();
const rule = require('../index')


ruleTester.run("require", rule.rules.require, {
    valid: [
        { code: "require('./a')" }
    ],
    invalid: [
        {
            code: "require('a')",
            errors: 1
        }
    ]
});



ruleTester.run("page-null-callback", rule.rules['page-null-callback'], {
    valid: [
        { code: "class A { onCache() {this} }", parserOptions: { ecmaVersion: 6 } }
    ],
    invalid: [
        {
            code: `
                class Page {
                    onCreate () {
                      // abc注释
                    }
                    onCache () {

                    }
                }
            `,
            parserOptions: { ecmaVersion: 6 },
            errors: 2
        }
    ]
});
