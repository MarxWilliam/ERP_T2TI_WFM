"use strict";
exports.__esModule = true;
exports.JavaRepository = void 0;
var lodash = require("lodash");
var JavaRepository = /** @class */ (function () {
    function JavaRepository(tabela) {
        // nome da classe
        this["class"] = lodash.camelCase(tabela);
        this["class"] = lodash.upperFirst(this["class"]);
        this.classLower = this["class"].toLowerCase();
        // nome da tabela
        this.table = tabela.toUpperCase();
        // path
        this.path = lodash.replace(tabela.toLowerCase(), '_', '-');
    }
    return JavaRepository;
}());
exports.JavaRepository = JavaRepository;
