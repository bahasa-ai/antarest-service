"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var AntarestService = /** @class */ (function () {
    function AntarestService(config) {
        this._baseUrl = config.baseUrl;
        this._url = config.url ? config.url : '';
        this._isSQL = config.isSQL;
        this._server = axios_1.default.create({
            baseURL: this._baseUrl,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        });
    }
    AntarestService.prototype.create = function (objectType) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = this._server.post(this._url, objectType);
                        return [4 /*yield*/, this.ResultHelper(promise, false)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AntarestService.prototype.get = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options) {
                            promise = this._server.post(this._url + '/search', options);
                        }
                        else {
                            promise = this._server.get(this._url);
                        }
                        return [4 /*yield*/, this.ResultHelper(promise, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AntarestService.prototype.update = function (conditions, patch) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                promise = this._server.patch(this._url, { conditions: conditions, patch: patch });
                return [2 /*return*/, this.ResultHelper(promise, true)];
            });
        });
    };
    AntarestService.prototype.delete = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = this._server.patch(this._url, { conditions: conditions, patch: { deletedAt: Date.now() } });
                        return [4 /*yield*/, this.ResultHelper(promise, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Manipulate by Id
    AntarestService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(this.getOptionsId(id))];
                    case 1:
                        promise = _a.sent();
                        return [2 /*return*/, {
                                status: promise.status,
                                message: promise.message,
                                payload: promise.payload ? promise.payload[0] : undefined
                            }];
                }
            });
        });
    };
    AntarestService.prototype.updateById = function (id, patch) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.update(this.getOptionsId(id), patch)];
                    case 1:
                        promise = _a.sent();
                        return [2 /*return*/, {
                                status: promise.status,
                                message: promise.message,
                                payload: promise.payload ? promise.payload[0] : undefined
                            }];
                }
            });
        });
    };
    AntarestService.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delete(this.getOptionsId(id))];
                    case 1:
                        promise = _a.sent();
                        return [2 /*return*/, {
                                status: promise.status,
                                message: promise.message,
                                payload: promise.payload ? promise.payload[0] : undefined
                            }];
                }
            });
        });
    };
    // Specific SQL function
    AntarestService.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isSQL) {
                            return [2 /*return*/, {
                                    status: 403,
                                    message: 'Forbidden operation for SQL database',
                                    payload: undefined
                                }];
                        }
                        promise = this._server.post(this._url, query);
                        return [4 /*yield*/, this.ResultHelper(promise, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Specific noSQL function
    AntarestService.prototype.aggregate = function (aggregator) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isSQL) {
                            return [2 /*return*/, {
                                    status: 403,
                                    message: 'Forbidden operation for noSQL database',
                                    payload: undefined
                                }];
                        }
                        promise = this._server.post(this._url, aggregator);
                        return [4 /*yield*/, this.ResultHelper(promise, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Helper
    AntarestService.prototype.getOptionsId = function (id) {
        var options;
        if (this._isSQL) { // SQL
            options = { 'id': { '$eq': id } };
        }
        else { // mongoose
            options = { '_id': { '$eq': id } };
        }
        return options;
    };
    AntarestService.prototype.ResultHelper = function (promise, isList) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promise];
                    case 1:
                        p = _a.sent();
                        if (p.status === 200) {
                            return [2 /*return*/, {
                                    status: p.data.status,
                                    message: p.data.msg,
                                    payload: isList ? p.data.payload : p.data.payload[0]
                                }];
                        }
                        return [2 /*return*/, {
                                status: p.status,
                                message: p.statusText,
                                payload: undefined
                            }];
                }
            });
        });
    };
    return AntarestService;
}());
exports.default = AntarestService;
