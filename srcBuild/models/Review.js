"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var DbConnection_1 = require("../utils/DbConnection");
var User_1 = require("./User");
var Vendor_1 = require("./Vendor");
var Review = DbConnection_1.sequelize.define("reviews", {
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        defaultValue: "ACTIVE",
        values: ["PENDING", "ACTIVE", "INACTIVE", "DECLINED"]
    },
    user_uuid: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: User_1["default"],
            key: "uuid"
        },
        allowNull: false
    },
    vendor_id: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: Vendor_1["default"],
            key: "id"
        },
        allowNull: false
    }
}, {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at"
});
Review.belongsTo(User_1["default"], { foreignKey: "user_uuid" });
Review.belongsTo(Vendor_1["default"], { foreignKey: "vendor_id", constraints: false });
exports["default"] = Review;
