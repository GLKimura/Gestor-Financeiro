import { Transacao } from './storage'

export interface Balanco {
  totalEntradas: number
  totalSaidas: number
  saldo: number
  gastosPorCategoria: Record<string, number>
  receitasPorCategoria: Record<string, number>
}

export const calcularBalanco = (transacoes: Transacao[]): Balanco => {
  const totalEntradas = transacoes
    .filter((t) => t.tipo === 'ENTRADA')
    .reduce((sum, t) => sum + t.valor, 0)

  const totalSaidas = transacoes
    .filter((t) => t.tipo === 'SAIDA')
    .reduce((sum, t) => sum + t.valor, 0)

  const saldo = totalEntradas - totalSaidas

  const gastosPorCategoria: Record<string, number> = {}
  const receitasPorCategoria: Record<string, number> = {}

  transacoes.forEach((t) => {
    if (t.tipo === 'SAIDA') {
      gastosPorCategoria[t.categoria] = (gastosPorCategoria[t.categoria] || 0) + t.valor
    } else {
      receitasPorCategoria[t.categoria] = (receitasPorCategoria[t.categoria] || 0) + t.valor
    }
  })

  return {
    totalEntradas,
    totalSaidas,
    saldo,
    gastosPorCategoria,
    receitasPorCategoria,
  }
}

