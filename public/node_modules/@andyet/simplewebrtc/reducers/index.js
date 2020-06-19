"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_1 = require("redux");
const API_1 = tslib_1.__importDefault(require("./API"));
const Calls_1 = tslib_1.__importDefault(require("./Calls"));
const Chats_1 = tslib_1.__importDefault(require("./Chats"));
const Connections_1 = tslib_1.__importDefault(require("./Connections"));
const Devices_1 = tslib_1.__importDefault(require("./Devices"));
const Media_1 = tslib_1.__importDefault(require("./Media"));
const Peers_1 = tslib_1.__importDefault(require("./Peers"));
const Rooms_1 = tslib_1.__importDefault(require("./Rooms"));
const User_1 = tslib_1.__importDefault(require("./User"));
const reducer = redux_1.combineReducers({
    api: API_1.default,
    calls: Calls_1.default,
    chats: Chats_1.default,
    connections: Connections_1.default,
    devices: Devices_1.default,
    media: Media_1.default,
    peers: Peers_1.default,
    rooms: Rooms_1.default,
    user: User_1.default
});
exports.default = reducer;
