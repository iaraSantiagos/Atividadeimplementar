export type DadosVoo = {
    nomePassageiro: string;
    malasDespachadas: number;
    pesoAtualDasMalas: number;
    passagemComprada: boolean;
};

export function checarPainelAeroporto(codigoVoo: string): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!codigoVoo || codigoVoo.trim() === "") {
                reject(new Error("Código de voo inválido."));
            } else if (codigoVoo === "CANCELADO123") {
                resolve("CANCELADO");
            } else {
                resolve("CONFIRMADO");
            }
        }, 300);
    });
}

export async function validarEmbarqueCompleto(dados: DadosVoo, codigoVoo: string): Promise<string> {
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
        } else {
            return "Embarque Negado: Verifique o peso das malas ou sua passagem.";
        }

    } catch (erro: any) {
        return `Erro no sistema: ${erro.message}`;
    }
}
