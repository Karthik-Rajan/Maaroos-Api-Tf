"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var DbConnection_1 = require("../utils/DbConnection");
var User_1 = require("./User");
var WalletRecharge = DbConnection_1.sequelize.define("wallet_recharges", {
    customer_uuid: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: User_1["default"],
            key: "uuid"
        },
        allowNull: false
    },
    customer_email: {
        type: sequelize_1.DataTypes.STRING
    },
    customer_mobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    medium_payment_id: {
        type: sequelize_1.DataTypes.STRING
    },
    medium_order_id: {
        type: sequelize_1.DataTypes.STRING
    },
    mode: {
        type: sequelize_1.DataTypes.ENUM,
        defaultValue: "CREDIT",
        values: ["CREDIT", "DEBIT"]
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        defaultValue: "INITIATED",
        values: ["INITIATED", "ACTIVE", "INACTIVE", "DECLINED", "ONHOLD", "IN-PROGRESS"]
    },
    medium: {
        type: sequelize_1.DataTypes.ENUM,
        defaultValue: "RAZOR",
        values: ["RAZOR"]
    }
}, {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at"
});
exports["default"] = WalletRecharge;
