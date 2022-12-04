export interface IProduto {
    id: number,
    descricao: string,
    preco: number,
    quantidadeEstoque: number,
    dataValidade: Date,
    ativo: boolean
}