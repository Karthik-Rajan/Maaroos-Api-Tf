"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = void 0;
var models_1 = require("../models");
var helper_1 = require("../utils/helper");
var WalletRecharge_1 = require("../models/WalletRecharge");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, sub, _a, customer_email, customer_mobile, amount, medium_payment_id, mode, medium, user;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                body = event.body;
                sub = ((_c = (_b = event === null || event === void 0 ? void 0 : event.requestContext) === null || _b === void 0 ? void 0 : _b.authorizer) === null || _c === void 0 ? void 0 : _c.claims).sub;
                _a = JSON.parse(body), customer_email = _a.customer_email, customer_mobile = _a.customer_mobile, amount = _a.amount, medium_payment_id = _a.medium_payment_id, mode = _a.mode, medium = _a.medium;
                return [4 /*yield*/, models_1.User.findOne({
                        where: {
                            uuid: sub
                        }
                    })];
            case 1:
                user = _d.sent();
                console.log({
                    customer_uuid: sub,
                    customer_email: customer_email,
                    customer_mobile: customer_mobile,
                    amount: amount,
                    medium_payment_id: medium_payment_id,
                    mode: mode,
                    medium: medium
                });
                if (!(mode === 'CREDIT' && amount)) return [3 /*break*/, 4];
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.increment('wallet_balance', { by: parseFloat(amount) }).then(function () {
                    }))];
            case 2:
                _d.sent();
                return [4 /*yield*/, WalletRecharge_1["default"].create({
                        customer_uuid: sub,
                        customer_email: customer_email,
                        customer_mobile: customer_mobile,
                        amount: amount,
                        medium_payment_id: medium_payment_id,
                        mode: mode,
                        medium: medium,
                        status: 'INITIATED'
                    }).then(function (res) { return console.log(res); })];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4: return [2 /*return*/, (0, helper_1.response)(200, {})];
        }
    });
}); };
exports.handler = handler;
