var testrunner = require("qunit");

testrunner.run([
    {
        code: "matharray.js",
        tests: "test/tests/inherited.js"
    },
    {
        code: "matharray.js",
        tests: "test/tests/overwrites.js"
    },
    {
        code: "matharray.js",
        tests: "test/tests/operations.js"
    }
]);