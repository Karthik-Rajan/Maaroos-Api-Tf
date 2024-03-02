"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var DbConnection_1 = require("../utils/DbConnection");
var User = DbConnection_1.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Noname"
    },
    second_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Noname"
    },
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    profile_img: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        defaultValue: "ACTIVE",
        values: ["PENDING", "ACTIVE", "INACTIVE", "DECLINED"]
    },
    wallet_balance: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0.0
    }
}, {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at"
});
exports["default"] = User;
