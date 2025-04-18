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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.authController = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { user, token } = yield auth_service_1.authService.authenticate(email, password);
                return res.status(200).json({
                    success: true,
                    message: 'Autenticação realizada com sucesso.',
                    data: { user, token },
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message,
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor.',
                });
            }
        });
    }
};
