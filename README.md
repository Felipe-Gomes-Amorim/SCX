
# SAMMG

um Sitema de Auxílio Médico de Minas Gerais


## Descrição do Projeto

O SAMMG visa atender a crescente necessidade de um sistema integrado entre diversos laboratórios médicos, também incluindo a comunicação entre profissionais e pacientes por meio da fácil criação, gestão, vizualização e integração de exames.


##  Funcionalidades

- Cadastro e login de pacientes, médicos, laboratórios e secretariados
- Consulta de exames liberados por parte do paciente e do laboratório
- Interface simples e responsiva


##  Rotas Principais

###  Autenticação

| Método | Rota           | Descrição               |
|--------|----------------|-------------------------|
| POST   | `/login`       | Login de usuário        |
| POST   | `/register`    | Cadastro de paciente    |

###  Exames

| Método | Rota                     | Descrição                          |
|--------|--------------------------|------------------------------------|
| GET    | `/exams`                 | Lista todos os exames do paciente |
| GET    | `/exams/:id`             | Detalhes de um exame específico   |
| POST   | `/exams/upload`          | Envia novo exame (secretaria)     |

### 👤 Paciente

| Método | Rota            | Descrição                        |
|--------|-----------------|----------------------------------|
| GET    | `/profile`      | Dados do perfil do paciente      |
| PUT    | `/profile/edit` | Atualização dos dados do paciente|

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** React.js / Next.js / TailwindCSS
- **Backend:** Node.js / Express / PostgreSQL
- **Autenticação:** JWT
- **Hospedagem:** Vercel / Render / Railway

---

##  Instalação e Uso Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Entre na pasta do projeto
cd seu-repo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
````

---

##Exemplos de Uso (JSON)

**Login**

```json
POST /login
{
  "email": "usuario@exemplo.com",
  "senha": "123456"
}
```

**Upload de exame**

```json
POST /exams/upload
{
  "pacienteId": "abc123",
  "arquivo": "exame_resultado.pdf",
  "tipo": "Hemograma Completo"
}
```

---

##Estrutura do Projeto (Sugestão)

```
raiz-do-projeto
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── index.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── .env
└── README.md
```

---

##Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

##Contato

Entre em contato para sugestões ou dúvidas:

* Nome: **Seu Nome**
* Email: [seuemail@exemplo.com](mailto:seuemail@exemplo.com)
* LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-usuario)

---
