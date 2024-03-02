"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var DbConnection_1 = require("../utils/DbConnection");
var Vendor = DbConnection_1.sequelize.define("vendors", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    postcode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tags: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT(10, 6),
        allowNull: false
    },
    lng: {
        type: sequelize_1.DataTypes.FLOAT(10, 6),
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: [
            "PENDING",
            "ACTIVE",
            "INACTIVE",
            "DECLINED",
            "IN-PROGRESS",
            "ONHOLD",
        ],
        defaultValue: "PENDING"
    },
    is_veg: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["YES", "NO"],
        defaultValue: "NO"
    },
    is_promoted: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["YES", "NO"],
        defaultValue: "NO"
    },
    logo_url: {
        type: sequelize_1.DataTypes.STRING
    },
    rating_count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    rating_avg: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0.0
    }
}, {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at"
});
// Vendor.hasMany(Review);
exports["default"] = Vendor;
