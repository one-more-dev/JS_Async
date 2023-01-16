
console.log("Script iniciado");
campoCep = document.getElementById("cep");


function testeThen(){
    consultaCEP = fetch ('https://viacep.com.br/ws/02736110/json/')
    .then(respostaDoFetch => respostaDoFetch.json())
    .then(respondaDenovo => {
        if(respondaDenovo.erro){    throw Error("O cep é válido, porém não existe.")    }
        else{    console.log(respondaDenovo)   }
    })
    .catch(erro => console.log(`Òcorreu o seguinte erro: ${erro}. O CATCH o pegou.`))
    .finally(console.log("Está feito!"));
}


/*
async function testeAwait(){
    consultaCEP = await fetch ('https://viacep.com.br/ws/02736110/json/');
    converte = await consultaCEP.json();
    console.log(converte); }*/
    
    
async function testeAwait(enderecos,autocomplete=true){
    try{
        consultaCEP = await fetch (`https://viacep.com.br/ws/${enderecos}/json/`);
        converte = await consultaCEP.json();
        if(converte.erro){
            throw Error("O cep é, sim, válido, só não existe!")
        }else{
            console.log(converte);
            if(autocomplete==true){
                preenche(converte);
            }
        }
    }catch(erro){
        console.log(`Esse é o erro: ${erro}`);
        window.alert(`CEP inválido ou inexistente. Por favor, tente novamente`);
        campoCep.value = "";
    }
}


campoCep.addEventListener("focusout", () => testeAwait(campoCep.value));



function preenche(cepEmQuestao){
    document.getElementById("endereco").value = cepEmQuestao.logradouro;
    document.getElementById("bairro").value = cepEmQuestao.bairro;
    document.getElementById("cidade").value = cepEmQuestao.localidade;
    document.getElementById("estado").value = cepEmQuestao.uf;
}


/*
listaDeCeps = ['02933080','00000111','02736110','0000A00B'];
cepsEmConsulta = listaDeCeps.map(cep => testeAwait(cep));
console.log('Esses são os ceps',cepsEmConsulta);
Promise.all(cepsEmConsulta).then(respostasDaPromise => console.log(respostasDaPromise));*/
