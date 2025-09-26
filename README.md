
# SCX  

Sistema de Controle de Exames 


## Descrição do Projeto

O SCX visa atender a crescente necessidade de um sistema integrado entre laboratório, médicos e também incluindo pacientes por meio da fácil criação, gestão, vizualização e integração de exames.


##  Funcionalidades

- Cadastro e login de pacientes, médicos, laboratório e secretariados
- Consulta de exames liberados por parte do paciente, do laboratório e do médico
- Interface simples e responsiva




##  Instalação e Uso Local

```bash
# Clone o repositório
git clone https://github.com/Felipe-Gomes-Amorim/SAMMG.git

# Entre na pasta do projeto
cd ./Back-End

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
