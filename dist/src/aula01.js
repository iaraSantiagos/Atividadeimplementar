"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checarPainelAeroporto = checarPainelAeroporto;
exports.validarEmbarqueCompleto = validarEmbarqueCompleto;
function checarPainelAeroporto(codigoVoo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!codigoVoo || codigoVoo.trim() === "") {
                reject(new Error("Código de voo inválido."));
            }
            else if (codigoVoo === "CANCELADO123") {
                resolve("CANCELADO");
            }
            else {
                resolve("CONFIRMADO");
            }
        }, 300);
    });
}
async function validarEmbarqueCompleto(dados, codigoVoo) {
    try {
        const pesoMaximoPermitido = 23 * dados.malasDespachadas;
        const pesoEstaLimite = dados.pesoAtualDasMalas <= pesoMaximoPermitido;
        const statusPainel = await checarPainelAeroporto(codigoVoo);
        if (statusPainel === "CANCELADO") {
            return "Embarque Suspenso: O voo foi cancelado no terminal.";
        }
        const podeEmbarcar = pesoEstaLimite && dados.passagemComprada;
        if (podeEmbarcar) {
            return `Passageiro ${dados.nomePassageiro} autorizado para o embarque!`;
        }
        else {
            return "Embarque Negado: Verifique o peso das malas ou sua passagem.";
        }
    }
    catch (erro) {
        return `Erro no sistema: ${erro.message}`;
    }
}
