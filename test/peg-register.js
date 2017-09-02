const peg = require("pegjs");
const fs = require("fs");

require.extensions[".pegjs"] = (module, filename) => {
    const grammar = fs.readFileSync(filename, "utf8");

    module.exports = peg.generate(grammar, {
        format: "commonjs",
        output: "parser",
    });

    return module;
};
