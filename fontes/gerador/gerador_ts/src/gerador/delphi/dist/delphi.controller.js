"use strict";
exports.__esModule = true;
exports.DelphiController = void 0;
var lodash = require("lodash");
var DelphiController = /** @class */ (function () {
    function DelphiController(tabela) {
        // nome da classe
        this["class"] = lodash.camelCase(tabela);
        this["class"] = lodash.upperFirst(this["class"]);
        // nome da tabela
        this.table = tabela.toUpperCase();
        // path
        this.path = lodash.replace(tabela.toLowerCase(), '_', '-');
    }
    return DelphiController;
}());
exports.DelphiController = DelphiController;
