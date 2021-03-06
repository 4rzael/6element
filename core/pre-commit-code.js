"use strict";

var eslint = require('eslint');
// 'git ls-files -om --exclude-standard' to list all files that were changed then filter out non-JS files

process.chdir(__dirname);

var exitCode = eslint.cli.execute("./");

/*
 * Wait for the stdout buffer to drain.
 * See https://github.com/eslint/eslint/issues/317
 */
process.on("exit", function() {
    process.exit(exitCode);
});
