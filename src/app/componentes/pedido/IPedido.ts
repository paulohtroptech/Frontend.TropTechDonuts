export interface IPedido {
    id: number,
    cliente?: {
        cpf: string,
        nome: string,
        dataNascimento: Date,
        pontosFidelidade: number
    },
    produto: {
        id: number,
        descricao: string,
        preco: number,
        quantidadeEstoque: number,
        dataValidade: Date,
        ativo: true
    },
    dataPedido: Date,
    quantidade: number,
    valorTotal: number,
    status: number
}