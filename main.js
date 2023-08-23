/*
Trabalhando com o Fetch
- mostrar qual URL iremos utilizar
- A Fetch irá retornar dentro do código o que aparece 
na página da URL

Baixar o projeto "node-api-discover-main"
- Buscar no Temrinal
- Fazer o "npm i"
- Após, digitar "npm start"
- A API vai rodar na porta "5500"
- No navegador, o endereço é: "localhost:5500/api"
*/

//Imports
const { response } = require("express")

//criar uma constante pois irá utilizar a url várias vezes
const url="http://localhost:5500/api"

/*
Função para facilitar o desenvolvimento (daria pra 
colocar o Fetch direto)
- Fetch trabalha com promises, então já está buscando na url
- Retorna pelo ".then()", caso de certo
- Caso de erro, passa para o ".catch()" e mostra o 
erro no console do navegador (em vermelho)
- O erro é só no uso do Fetch!!
- Transformar a resposta em formato JSON
- Pode existir vários ".then()" (um pega a resposta do outro e segue)

Mostrando o "response.json()" na nossa Div "renderApiResult"
- data é o conteúdo recebido da "response.json()"
- Não pode colocar somente "= data", pois não consegue 
renderizar, entender 
*/

//Get
function getUsers(){
    fetch(url)
        .then(response => response.json())
        .then(data => renderAPIResult.textContent = JSON.stringify(data))
        .catch(error => console.error(error))
}
//Executando a função
getUsers()

/*
Chamando um único usuário (renderizando por partes)
- usar string para contetenar a url e chamar o id (1)
- da para filtrar o item do ID que gostariamos de ver
- Ex: = JSON.stringify(data.name)

Preenchendo o body (html) com os dados
- usar ".src" para imagem
*/

//Get
function getUser(id) {
    fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(data => {
        userName.textContent = data.name
        userCity.textContent = data.city
        userAvatar.src = data.avatar
    })
    .catch(error => console.error(error))
}
//Executando a função
getUser()


/*
Inclusão de dados na API
- inlcuindo um novo usuário
- usar avatar do LoremPixel (ele retorna imagens aleatórias)
- as chaves são as mesmas da api
- id gerado automaticamente

Poderes do Fetch
- passar objetos 
- passar dados para a api
- method pode receber: get, post
- body coloca o que for enviado para a url (em JSON)

Headers é o que passa em requisições API, http
- precisa passar o "Content-type: application/json" e o "charset=UTF-8"
(são coisas padrões, que NÃO precisa decorar!)

Um .then() para resposta json e outro para trabalhar com o conteúdo recebido
- criado uma "div" para substituir o conteúdo e mostrar que deu certo.
- mostra "saved user" na página

Após dar "addUser(newUser)", cada ctrl+s, ele passa dados para a API
criando vários usuários, alguns deles vazios.
- Talvez executar a função após finalizar o código, seria uma boa ideia,
porém, não saberíamos se ocorreu algum erro no processo \o/

Para saber se funcionou, alterar no getUser para o "id" desejado!!

Limpando a API
- parar no terminal com CTRL+C 
- rodar npm start novamente =)

O código sempre insere o novo usuário pq está sendo executado
- apenas comentar a execução, para de adicionar novo usuário!!
*/

//Post
function addUser(newUser){
    fetch(url, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => alertAPI.textContent = data)
        .catch(error => console.error(error))

}

/* 
Alterar dados de um usuário 
- passar na url o id que queremos editar
- mostrar que está passando um id
- essa api funciona dessa forma. =)
- a api não está esperando o id no body. 
- verificar como a api está funcionando e esperando receber dados.

API retorna um texto simples, então utilizar o "alertAPI" do index.html
- não há necessidade de transformar data em json!! (por isso só data)

O fetch sempre espera um segundo argumento sendo um objeto com várias coisas dentro
*/

//Put
function updateUser(updatedUser, id){
    fetch(`${url}/${id}`, {
        method: "PUT",
        //mantém a estrutura de objeto
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => alertAPI.textContent = data)
        .catch(error => console.error(error))
}


//criando novo usuário
const newUser = {
    name: "Aloha Honolulu",
    avatar: "http://picsum.photos/200/300",
    city: "Rio do Sul"
}
//Executando a função
//addUser(newUser)

//atualizando dados de um usuário existente (id 2)
const updatedUser = {
    name: "Honolulu Aloha",
    avatar: "http://picsum.photos/200/300",
    city: "Hawaii"
}
//Executando a função
//updateUser(updatedUser, 2) 

//Delete
function deleteUser(id){
    fetch(`${url}/${id}`, {
        method: "DELETE",
        headers:{
            "Content-type": "application/json: charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => alertAPI.textContent = data)
        .catch(error => console.error(error))
}
//Executando a função
//deleteUser(2)


