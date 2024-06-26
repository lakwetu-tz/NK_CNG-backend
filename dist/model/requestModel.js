"use strict";
// This model tracks all loan requested requested by the user and allow office to approve them
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
const RequestSchema = new mongoose_1.Schema({
    loan: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    status: {
        type: String,
        enum: ["Approved", "Rejected"]
    },
    is_loan_type: {
        type: Boolean,
        default: false
    },
    is_initial_paid: {
        type: Boolean,
        default: false,
    },
    initial_amount: {
        type: Number,
        default: 0,
    },
    is_approved: {
        type: Boolean,
        default: false,
    },
    approved_date: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('Request', RequestSchema);
