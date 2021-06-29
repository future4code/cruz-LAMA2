# Labenu Music Awards

### created by:
:technologist: Matheus Borges
:technologist: Gabriel Mina

### 🟠 Acessando o Projeto

1. Após baixar, instale as bibliotecas →  npm  i ;

### Endpoints:

#### :green_circle: Cadastro
  - O nosso sistema deve permitir o registro os usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro.

#### :green_circle: Login
  - Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário.
  
#### :green_circle: Endpoint de registrar banda
  - O nosso sistema deve deixar registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome

#### :green_circle: Endpoint de visualização de detalhes sobre a banda 
  - Esse endpoint deve receber o id ou o nome da banda e retornar as todas as informações salvas sobre ela.

#### :green_circle: Endpoint de adicionar um show a um dia
  - Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h).

#### :green_circle: Endpoint de pegar todos os shows de uma data
  - Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.


