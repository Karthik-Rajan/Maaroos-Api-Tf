"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var DbConnection_1 = require("../utils/DbConnection");
var User_1 = require("./User");
var Vendor_1 = require("./Vendor");
var FoodSubscription = DbConnection_1.sequelize.define("food_subscription", {
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
    },
    identifier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    from_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    to_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at"
});
// FoodSubscription.belongsTo(User, { foreignKey: "user_uuid" });
// FoodSubscription.belongsTo(Vendor, { foreignKey: "vendor_id" });
exports["default"] = FoodSubscription;
