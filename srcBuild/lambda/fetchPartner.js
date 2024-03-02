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
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, rating_avg, distance, is_veg, lat, lng, limit, haversine, having, order, where, vendors;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = event.body;
                _a = JSON.parse(body), rating_avg = _a.rating_avg, distance = _a.distance, is_veg = _a.is_veg, lat = _a.lat, lng = _a.lng, limit = _a.limit;
                limit = limit ? limit : 10;
                haversine = "";
                having = null;
                order = null;
                where = {
                    status: "ACTIVE"
                };
                if (rating_avg >= 0) {
                    where.rating_avg = (_b = {},
                        _b[models_1.Op.gte] = rating_avg,
                        _b);
                }
                if (lat && lng && distance > 0) {
                    haversine = "(\n      6371 * acos(\n        cos(radians(".concat(lat, "))\n          * cos(radians(lat))\n          * cos(radians(lng) - radians(").concat(lng, "))\n          + sin(radians(").concat(lat, ")) * sin(radians(lat))\n      )\n  )");
                }
                if (is_veg && is_veg == "YES") {
                    where.is_veg = "YES";
                }
                order = distance ? models_1.sequelize.col("distance") : undefined;
                having = distance ? models_1.sequelize.literal("distance <= ".concat(distance)) : undefined;
                return [4 /*yield*/, models_1.Vendor.findAll({
                        attributes: [
                            "id",
                            "name",
                            "postcode",
                            "address",
                            "rating_avg",
                            "rating_count",
                            "is_veg",
                            "is_promoted",
                            "logo_url",
                            [models_1.sequelize.literal(haversine), "distance"],
                        ],
                        where: where,
                        order: order,
                        having: having,
                        limit: limit
                    })
                        .then(function (records) {
                        return records;
                    })["catch"](function (err) {
                        return [];
                    })];
            case 1:
                vendors = _c.sent();
                return [2 /*return*/, (0, helper_1.response)(200, vendors, body)];
        }
    });
}); };
exports.handler = handler;
