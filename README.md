# Api-Node-Empresas
A simple node project

## Documentação
- A documentação do projeto encontra-se no arquivo Insomnia_routes.json. Para visualizar a documentação, basta baixar o cliente HTTP Insomnia e importar o arquivo.
- Na documentação encontra-se tanto os dados de teste local, como os dados para teste no servidor do HEROKU.

## Dados de Teste
- A API foi hospedada no heroku e pode ser acessada na URL: https://wellington-empresas.herokuapp.com/
- Foi criado um usuário de teste:
  - email: teste@fortbrasil.com
  - senha: 12345678
## Configuração de Ambiente e Execução do Projeto
 - Instalando Node:
    - No windows ou mac, baixe o instalador disponível em: https://nodejs.org/en/
 - Instalando postgres na versão 9.5
    - Recomendo este tutorial para instalar o postgres e pgAdmin: http://www.bosontreinamentos.com.br/postgresql-banco-dados/instalacao-do-postgresql-no-microsoft-windows/#:~:text=Baixar%20o%20instalador%20do%20software,versão%20desejada%20para%20seu%20sistema.
 - Após ter o node e postgres instalados e configurado, é preciso criar um novo banco de dados no postgres, de preferencia com o nome 'empresas'
 - É necessário mudar as credênciais no arquivo .env na raiz do projeto.
 - Em seguida, rode o comando **yarn** para baixar as dependencias do projeto.
 - Execute o comando **yarn sequelize db:migrate** para aplicar as migrações e criar as tabelas no banco.
 - Execute o comando **yarn dev** para rodar a aplicação.
