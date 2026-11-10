<img width="3192" height="1239" alt="bannereditado2" src="https://github.com/user-attachments/assets/96ebc79a-be40-42ba-808d-02ee80efa913" />


# **SCX — Sistema de Controle de Exames**

Um sistema web completo para gerenciamento de exames médicos, integrando **clínicas, laboratórios, médicos, secretárias e pacientes** em uma única plataforma simples, segura e eficiente.

O SCX foi desenvolvido como Projeto de Finalização de Curso (PFC) em Engenharia de Software, com foco em **segurança, escalabilidade, acessibilidade e fluxo clínico real**.

---

## 📌 **Objetivo do Projeto**

O SCX nasceu para resolver um problema comum no ambiente clínico:

> **Centralizar pedidos e devoluções de exames em um único sistema, garantindo transparência, rapidez e segurança para todos os envolvidos.**

Com o SCX, é possível:

* Solicitar exames durante consultas;
* Enviar resultados em PDF pelo laboratório;
* Centralizar prontuário, histórico e anamnese do paciente;
* Gerenciar usuários e permissões;
* Reduzir falhas de comunicação entre clínica, laboratório e paciente.

---

## ✨ **Principais Funcionalidades**

### 🔹 **Para Clínicas (Administrador da Clínica)**

* Cadastrar médicos, secretárias e laboratórios.
* Ativar/desativar usuários.
* Gerenciar histórico de atividades da clínica.

### 🔹 **Para Médicos**

* Iniciar consultas.
* Preencher diagnóstico.
* Solicitar exames.
* Visualizar prontuário completo do paciente.
* Acompanhar resultados retornados pelos laboratórios.

### 🔹 **Para Laboratórios**

* Receber solicitações de exame.
* Fazer upload de resultados em PDF.
* Enviar arquivos diretamente ao prontuário do paciente.

### 🔹 **Para Pacientes**

* Visualizar seus exames.
* Ver histórico clínico.
* Atualizar dados pessoais.
* Realizar anamnese.
* Solicitar anonimização/remoção da conta (LGPD).

### 🔹 **Outros Destaques**

* Notificações internas automáticas.
* Geração de PDF de requisição de exame.
* Busca inteligente com filtros.
* Interface responsiva (desktop-first).
* Integração com ViaCEP para preenchimento automático de endereços.

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**

* React.js
* Vite
* Axios
* CSS Modules
* Framer Motion

### **Backend**

* Java 17
* Spring Boot
* Spring Security (JWT)
* Spring Data JPA
* Docker

### **Banco de Dados**

* PostgreSQL

### **Ferramentas Auxiliares**

* Figma (design)
* Trello (gestão)
* GitHub (versionamento)
* ViaCEP API
* Docker Compose

---

## 🏗️ **Arquitetura do Sistema**

O SCX utiliza uma **arquitetura monolítica** dividida em:

* **Frontend (React)** — interface, formulários e interação do usuário.
* **Backend (Spring Boot)** — regras de negócio, segurança e APIs REST.
* **Banco de Dados (PostgreSQL)** — armazenamento seguro e relacional.

Comunicação via **HTTP (Axios → API REST)** com autenticação **JWT**.

---

## 📥 **Instalação e Uso Local**

### **1. Clone o repositório**

```bash
git clone https://github.com/Felipe-Gomes-Amorim/SCX.git
```

### **2. Entre na pasta do front-end**

```bash
cd ./Exodus
```

### **3. Instale as dependências**

```bash
yarn
```

### **4. Inicie o servidor**

```bash
yarn dev
```

> O frontend será iniciado em:
> **[http://localhost:5173](http://localhost:5173)**

### **5. Backend**

Este repositório contém apenas o frontend. Para o sistema funcionar, o backend (Java 17 + Spring Boot) precisa estar rodando localmente.

Banco configurado via PostgreSQL + Docker.

---

## 🧪 **Perfis de Usuário no Sistema**

O SCX possui diferentes papéis com permissões isoladas:

| Perfil                       | Permissões                                         |
| ---------------------------- | -------------------------------------------------- |
| **Administrador do Sistema** | Cadastra clínicas, ativa/desativa administradores  |
| **Administrador da Clínica** | Gerencia médicos, secretárias e laboratórios       |
| **Médico**                   | Consulta pacientes, solicita exames, vê resultados |
| **Secretária**               | Cadastra pacientes e abre consultas                |
| **Laboratório**              | Recebe solicitações e envia resultados             |
| **Paciente**                 | Visualiza histórico, exames e anamnese             |

---

## 🔐 **Segurança**

O sistema segue diretrizes de segurança com:

* Autenticação JWT
* Hash de senha com bcrypt + salt
* Controle de permissões por tipo de usuário
* Criptografia de dados sensíveis
* Conformidade com a **LGPD (Lei 13.709/2018)**

---

## 📄 **Documentação Completa**

A documentação completa do PFC (incluindo casos de uso, BPMN, diagramas e telas) encontra-se em:

📁 **Documentação PFC - SCX_v10.docx**
*(já incluída no repositório ou neste ambiente)*

---

## 👨‍⚕️ **Resumo para Médicos (Foco do Usuário-Alvo)**

O SCX foi pensado para ser simples para o médico, permitindo:

* Visualizar rapidamente seus pacientes;
* Acessar o prontuário completo em poucos cliques;
* Abrir consultas e gerar anamnese automaticamente;
* Solicitar exames com formulário inteligente;
* Acompanhar quando o laboratório devolveu o PDF do resultado;
* Evitar perda de exames e prontuários físicos;
* Ter histórico clínico completo e organizado.

---

## 🚀 **Roadmap Futuro**

* Autenticação em dois fatores (2FA)
* Dashboard com inteligência artificial
* Melhorias de acessibilidade (WCAG 2.1 AA)
* Otimização mobile-first
* Internacionalização (i18n)

---

## 👥 **Autores**

* **Felipe Gomes Amorim**
* **Eduardo Darwich da Rocha Moura**
* **Henry Prado Geraldes**

---

## 📜 **Licença**

Projeto acadêmico — uso livre para fins educacionais e demonstrações.

---



