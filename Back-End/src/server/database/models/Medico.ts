export interface IMedico{
    id: number;
    crm: number;
    nome: string;
    email: string;
    senha: string;
    uf_crm: string;
    espec: string;
    role?: string;
}