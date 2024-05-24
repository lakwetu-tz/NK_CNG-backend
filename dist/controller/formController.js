"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserImage = exports.uploadPicture = exports.deleteForm = exports.updateForm = exports.getFormById = exports.getForms = exports.createForm = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formModel_1 = __importDefault(require("../model/formModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const ImageModel_1 = __importDefault(require("../model/ImageModel"));
const createForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, firstName, lastName, phone, nationalId, address, region, zip, email, } = req.body;
        if (!firstName || !lastName || !phone || !address || !region || !zip || !email) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        // Validate user ID
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Check if user exists
        // const existingForm = await Form.findOne({ national_id: nationalId });
        // if (existingForm) {
        //     return res.status(400).json({ message: 'Form already exists' });
        // }
        // Create new form
        const newForm = new formModel_1.default({
            User: userId,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            national_id: nationalId,
            address: address,
            region: region,
            zip: zip,
            email: email,
        });
        const user = userModel_1.default.findByIdAndUpdate(userId, { is_form_submitted: true });
        if (!user) {
            console.log('User not updated!!');
        }
        const savedForm = yield newForm.save();
        res.status(201).json(savedForm);
    }
    catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createForm = createForm;
const getForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield formModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    }
    catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getForms = getForms;
const getFormById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const form = yield formModel_1.default.findById(id).populate('user').populate('passport');
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    }
    catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getFormById = getFormById;
const updateForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const updatedForm = yield formModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('passport');
        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(updatedForm);
    }
    catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateForm = updateForm;
const deleteForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const deletedForm = yield formModel_1.default.findByIdAndDelete(id);
        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteForm = deleteForm;
const uploadPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formId, imageType } = req.body;
        if (!formId || !imageType) {
            return res.status(400).send('User ID and image type are required.');
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(formId)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const newImage = new ImageModel_1.default({
            Form: formId,
            imageType,
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });
        yield newImage.save();
        res.status(201).send('Image uploaded successfully.');
    }
    catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.uploadPicture = uploadPicture;
const getUserImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const images = yield ImageModel_1.default.find({ User: userId });
        res.status(200).json(images);
    }
    catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserImage = getUserImage;