export interface ICliente {
    cpf: string;
    nome: string;
    dataNascimento: Date;
    pontosFidelidade?: number;
}