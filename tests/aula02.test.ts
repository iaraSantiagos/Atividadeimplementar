import { emitirLaudoSaude, Pessoa } from "../src/aula02";

function verificar(atual: string, esperado: string, nomeTeste: string) {
    if (atual === esperado) {
        console.log(`✅ [SUCESSO] - ${nomeTeste}`);
    } else {
        console.error(`❌ [FALHA] - ${nomeTeste}\n   Esperado: "${esperado}"\n   Recebido: "${atual}"`);
    }
}

async function rodarTestesAula02() {
    console.log("\n====================================================");
    console.log("TESTES UNITÁRIOS ASSÍNCRONOS - AULA 02");
    console.log("====================================================");

    const joao: Pessoa = { nome: "João", idade: 30, cor: "branca", peso: 70, altura: 1.75 };

    const r1 = await emitirLaudoSaude(joao);
    verificar(r1, "Laudo Emitido: João está saudável com IMC 22.86.", "Deve aprovar e emitir laudo para o João");
}

rodarTestesAula02();

