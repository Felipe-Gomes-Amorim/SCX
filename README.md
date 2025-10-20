<img width="3192" height="1239" alt="bannereditado2" src="https://github.com/user-attachments/assets/96ebc79a-be40-42ba-808d-02ee80efa913" />


# SCX - Sistema de Controle de Exame


## Descrição do Projeto

O Objetivo do Projeto SCX é ser uma ferramenta que unifica as requisições e devoluções de exames, tornando o processo prático, simples e transparente. Por meio de um só sistema integrado os pacientes tem acesso à exames cadastrados em seu nome, que são requisitados pelos profissionais da saúde e devolvidos pelos laboratórios. A meta é ajudar não somente o paciente, mas ser um sistema usado também em clínicas pelos próprios profissionais, assim unificando e facilitando os processos que envolvem os exames.


##  Funcionalidades

Controle de Clínicas por meio de um *Administrador* com as seguintes funcionalidades
- Cadastrar um novo Laboratório relacionado com a Clínica ou ativar uma Laboratório em uma Clínica
- Cadastrar um Médico na Clínica ou ativar a conta Médico em relação à Clínica

- Ver Lista de Médicos ativas na Clínica
- Ver Lista de Laboratórios ativos na Clínica



##  Instalação e Uso Local

```bash
# Clone o repositório
git clone https://github.com/Felipe-Gomes-Amorim/SAMMG.git

# Entre na pasta do projeto
cd ./Exodus

# Instale as dependências
yarn add vite
yarn add axios

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
