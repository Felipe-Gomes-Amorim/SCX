//necessario revisão para a implementação real (remodelagem)


export interface IExames {
    id: number;
    tipo: string;
    resultado?: string;
    nome_paciente: string;
    cpf_paciente: number; // chave estrangeira relacionando com paciente
    nome_medico: string;
    crm_med: number;
    status?: string;
   
    
}                       