import { ICliente } from "../cliente/ICliente"
import { IProduto } from "../produto/IProduto"

export interface IPedido {
    id: number,
    cliente?: ICliente
    produto: IProduto,
    dataPedido: Date,
    quantidade: number,
    valorTotal: number,
    status: number
}