import { validarEmbarqueCompleto, DadosVoo } from "../src/aula01";

function assegurar(atual: string, esperado: string, nomeTeste: string) {
    if (atual === esperado) {
        console.log(`✅ [SUCESSO] - ${nomeTeste}`);
    } else {
        console.error(`❌ [FALHA] - ${nomeTeste}\n   Esperado: "${esperado}"\n   Recebido: "${atual}"`);
    }
}

async function rodarTestesAula01() {
    console.log("\n====================================================");
    console.log("TESTES UNITÁRIOS ASSÍNCRONOS - AULA 01");
    console.log("====================================================");

    const carlos: DadosVoo = { nomePassageiro: "Carlos", malasDespachadas: 2, pesoAtualDasMalas: 44, passagemComprada: true };

    const r1 = await validarEmbarqueCompleto(carlos, "LATAM999");
    assegurar(r1, "Passageiro Carlos autorizado para o embarque!", "Deve aprovar embarque regular");

    const r2 = await validarEmbarqueCompleto(carlos, "CANCELADO123");
    assegurar(r2, "Embarque Suspenso: O voo foi cancelado no terminal.", "Deve detectar voo cancelado no painel assíncrono");
}

rodarTestesAula01();
