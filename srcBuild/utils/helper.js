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
exports.__esModule = true;
exports.lambdaProps = exports.lambdaFuncProps = exports.restParams = exports.response = void 0;
var path = require("path");
var ts_md5_1 = require("ts-md5");
var response = function (code, result, hash) {
    if (hash === void 0) { hash = {}; }
    var headers = {};
    if (hash) {
        headers = { ETag: ts_md5_1.Md5.hashStr(JSON.stringify(hash)) };
    }
    return {
        statusCode: code,
        body: JSON.stringify(result ? result : { 'status': 'ok' }),
        headers: __assign({ "Access-Control-Allow-Origin": "*", "Content-Type": "application/json", "Cache-Control": "max-age=31536000, no-cache", Vary: "ETag, Content-Encoding" }, headers)
    };
};
exports.response = response;
exports.restParams = {
    proxy: false,
    deploy: true,
    deployOptions: {
        stageName: "prod"
    },
    //set up CORS
    defaultCorsPreflightOptions: {
        allowHeaders: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "Origin",
            "X-Requested-With",
            "Accept",
            "x-client-key",
            "x-client-token",
            "x-client-secret",
            "Authorization",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: [
            "http://localhost:3000",
            "http://web.maaroos.com",
            "https://web.maaroos.com",
            "https://d3bqu2570uacxq.cloudfront.net",
            "http://web.maaroos.com.s3.ap-south-1.amazonaws.com"
        ]
    }
};
var lambdaFuncProps = function (lambda, role) {
    return {
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset("lambda/build"),
        role: role
    };
};
exports.lambdaFuncProps = lambdaFuncProps;
var lambdaProps = function (fileName, role) {
    return {
        entry: path.join(__dirname + "/../lambda/", fileName),
        role: role
    };
};
exports.lambdaProps = lambdaProps;
