"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    // auth staff
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        default: "InActive",
    },
    is_form_submitted: {
        type: Boolean,
        default: false
    },
    send_sms_notifications: {
        type: Boolean,
        default: true
    },
    account_verified: {
        type: Boolean,
        default: false,
    },
    deleted_account: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('User', UserSchema);