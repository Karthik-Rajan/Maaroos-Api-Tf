"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var moment = require("moment");
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var sub, vId, body, _a, types, from, to, subscriptionList, from_date, to_date, where, typeFilter, events;
    var _b, _c, _d, _e, _f;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                sub = ((_h = (_g = event === null || event === void 0 ? void 0 : event.requestContext) === null || _g === void 0 ? void 0 : _g.authorizer) === null || _h === void 0 ? void 0 : _h.claims).sub;
                vId = event.pathParameters.vId;
                body = event.body;
                _a = JSON.parse(body), types = _a.types, from = _a.from, to = _a.to;
                subscriptionList = {};
                to_date = {};
                where = {
                    user_uuid: sub
                };
                if (vId && vId != 'all') {
                    where = __assign(__assign({}, where), { vendor_id: vId });
                }
                if (types.length) {
                    typeFilter = (_b = {},
                        _b[models_1.Op["in"]] = types,
                        _b);
                    where = __assign(__assign({}, where), { type: __assign({}, typeFilter) });
                }
                if (from && to) {
                    from_date = (_c = {},
                        _c[models_1.Op.and] = (_d = {},
                            _d[models_1.Op.gte] = from,
                            _d),
                        _c);
                    to_date = (_e = {},
                        _e[models_1.Op.and] = (_f = {},
                            _f[models_1.Op.lte] = to,
                            _f),
                        _e);
                }
                if (from_date && to_date) {
                    where = __assign(__assign({}, where), { from_date: from_date, to_date: to_date });
                }
                events = {};
                return [4 /*yield*/, models_1.FoodSubscription.findAll({
                        where: where
                    })
                        .then(function (subscriptionList) {
                        if (subscriptionList) {
                            subscriptionList.forEach(function (element) {
                                if (!(element.identifier in events)) {
                                    events[element.identifier] = [];
                                }
                                var time = element.type === 'BF' ? '09:00:00' : (element.type === 'LN' ? '12:00:00' : '20:00:00');
                                var endTime = element.type === 'BF' ? '09:30:00' : (element.type === 'LN' ? '12:30:00' : '20:30:00');
                                events[element.identifier].push({
                                    title: element.type,
                                    start: moment(element.from_date).format('YYYY-MM-DD ' + time),
                                    end: moment(element.to_date).format('YYYY-MM-DD ' + endTime),
                                    allDay: false
                                });
                            });
                        }
                    })];
            case 1:
                _j.sent();
                return [4 /*yield*/, (0, helper_1.response)(200, events)];
            case 2: return [2 /*return*/, _j.sent()];
        }
    });
}); };
exports.handler = handler;
