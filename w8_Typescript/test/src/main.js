"use strict";
exports.__esModule = true;
var cart_1 = require("./module/cart");
console.log(cart_1.pageName);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var s = Color[2];
console.log('c:', c, s);
