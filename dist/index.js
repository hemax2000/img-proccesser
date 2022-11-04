"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var PORT = 3000;
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
app.use('/api', index_1.default);
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at localhost:".concat(PORT));
});
exports.default = app;
