<img width="3192" height="1239" alt="bannereditado2" src="https://github.com/user-attachments/assets/96ebc79a-be40-42ba-808d-02ee80efa913" />


# SCX  ##Sistema de Controle de Exames 


## Descrição do Projeto

O Objetivo do Projeto SCX é ser uma ferramenta que unifica as requisições e devoluções de exames, tornando o processo prático, simples e transparente. Por meio de um só sistema integrado os pacientes tem acesso à exames cadastrados em seu nome, que são requisitados pelos profissionais da saúde e devolvidos pelos laboratórios. A meta é ajudar não somente o paciente, mas ser um sistema usado também em clínicas pelos próprios profissionais, assim unificando e facilitando os processos que envolvem os exames.


##  Funcionalidades

- Cadastro e login de pacientes, médicos, laboratório e secretariados
- Consulta de exames liberados por parte do paciente, do laboratório e do médico
- Interface simples e responsiva




##  Instalação e Uso Local

```bash
# Clone o repositório
git clone https://github.com/Felipe-Gomes-Amorim/SAMMG.git

# Entre na pasta do projeto
cd ./Exodus

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
````

## Integração com Banco de Dados SQLite no Node.js

Este guia descreve como realizar a integração de um banco de dados **SQLite** em um projeto Node.js com Yarn.  
O SQLite é um banco de dados relacional leve, baseado em arquivos, que não requer servidor, sendo ideal para aplicações locais, protótipos e sistemas de pequeno a médio porte.

---
Instalação:

```bash
---
yarn add sqlite3
---
