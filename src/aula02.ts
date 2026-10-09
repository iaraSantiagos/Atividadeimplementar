export type Pessoa = {
    nome: string;
    idade: number;
    cor: string;
    peso: number;
    altura: number;
};

export function consultarRestricoesClinicas(nome: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!nome || nome.trim() === "") {
                reject(new Error("Nome do paciente inválido."));
            } else if (nome === "Bloqueado") {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 300);
    });
}

export async function emitirLaudoSaude(humano: Pessoa): Promise<string> {
    try {
        const imc = humano.peso / (humano.altura * humano.altura);
        const ehMaiorDeIdade = humano.idade >= 18;
        const temPesoSaudavel = imc >= 18.5 && imc <= 24.9;
        const possuiRestricao = await consultarRestricoesClinicas(humano.nome);
        if (possuiRestricao) {
            return `Laudo Retido: Constam restrições médicas para ${humano.nome}.`;
        }
        const laudoAprovado = ehMaiorDeIdade && temPesoSaudavel;

        if (laudoAprovado) {
            return `Laudo Emitido: ${humano.nome} está saudável com IMC ${imc.toFixed(2)}.`;
        } else {
            return `Laudo Pendente: ${humano.nome} fora dos critérios recomendados.`;
        }
    } catch (erro: any) {
        return `Falha no Prontuário: ${erro.message}`;
    }
}
