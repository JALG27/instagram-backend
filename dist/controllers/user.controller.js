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
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400 //24 horas o 1 dia
    });
}
//controlador de registro
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: 'Please, send your username and password' });
    }
    const user = yield user_1.default.findOne({ username: req.body.username });
    console.log(req.body);
    if (user) {
        return res.status(400).json({ msg: 'The user already exist' });
    }
    //guardar usuario
    const Newuser = new user_1.default(req.body);
    yield Newuser.save();
    return res.status(201).json({ Newuser, msg: 'User registered succesfully', token: createToken(Newuser) });
});
exports.signUp = signUp;
//controlador de login
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: 'Please, send your username and password' });
    }
    const user = yield user_1.default.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: 'The user dont exist' });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user), user });
    }
    return res.status(400).json({
        msg: 'The user or password are incorrect'
    });
});
exports.signIn = signIn;
