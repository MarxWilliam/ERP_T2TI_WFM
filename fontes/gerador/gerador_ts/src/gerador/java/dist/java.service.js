"use strict";
exports.__esModule = true;
exports.JavaService = void 0;
var lodash = require("lodash");
var JavaService = /** @class */ (function () {
    function JavaService(tabela) {
        // nome da classe
        this["class"] = lodash.camelCase(tabela);
        this["class"] = lodash.upperFirst(this["class"]);
        this.classLower = this["class"].toLowerCase();
        // nome da tabela
        this.table = tabela.toUpperCase();
        // path
        this.path = lodash.replace(tabela.toLowerCase(), '_', '-');
    }
    return JavaService;
}());
exports.JavaService = JavaService;
