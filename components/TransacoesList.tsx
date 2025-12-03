'use client'

import { useState, useEffect } from 'react'
import { storage, Transacao } from '@/lib/storage'
import { Trash2, ArrowUpCircle, ArrowDownCircle, Edit3 } from 'lucide-react'

export default function TransacoesList() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])

  useEffect(() => {
    carregarTransacoes()
    const interval = setInterval(carregarTransacoes, 1000)
    return () => clearInterval(interval)
  }, [])

  const carregarTransacoes = () => {
    const data = storage.carregarTransacoes()
    // Ordenar por data (mais recente primeiro)
    data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    setTransacoes(data)
  }

  const handleEditValor = (id: string) => {
    const transacao = transacoes.find((t) => t.id === id)
    if (!transacao) return

    const atual = transacao.valor.toString().replace('.', ',')
    const input = window.prompt('Novo valor para a transação (use ponto ou vírgula):', atual)
    if (!input) return

    const normalizado = input.replace(',', '.')
    const novoValor = Number(normalizado)

    if (Number.isNaN(novoValor) || novoValor < 0) {
      alert('Informe um valor numérico válido.')
      return
    }

    storage.atualizarTransacao(id, { valor: novoValor })
    carregarTransacoes()
  }

  const handleDelete = (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) {
      return
    }
    storage.removerTransacao(id)
    carregarTransacoes()
  }

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR')
  }

  return (
    <div className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
      <div className="p-5 border-b-2 border-gray-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100 tracking-tight">Histórico de transações</h2>
          <p className="text-[11px] text-gray-600 dark:text-slate-400 mt-1">
            Acompanhe entradas e saídas com visão de extrato bancário
          </p>
        </div>
        <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-2 border-gray-300 dark:border-slate-700">
          {transacoes.length} lançamento{transacoes.length === 1 ? '' : 's'}
        </span>
      </div>

      {transacoes.length === 0 ? (
        <div className="p-6 text-center text-gray-600 dark:text-slate-400 text-sm">
          Nenhuma transação cadastrada ainda. Comece registrando suas movimentações na seção ao lado.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 dark:text-slate-400 uppercase tracking-[0.18em]">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 dark:text-slate-400 uppercase tracking-[0.18em]">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 dark:text-slate-400 uppercase tracking-[0.18em]">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 dark:text-slate-400 uppercase tracking-[0.18em]">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 dark:text-slate-400 uppercase tracking-[0.18em]">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 dark:text-slate-400 uppercase tracking-[0.18em]">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-950 divide-y divide-gray-200 dark:divide-slate-800">
              {transacoes.map((transacao) => (
                <tr key={transacao.id} className="hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacao.tipo === 'ENTRADA' ? (
                      <ArrowUpCircle className="w-5 h-5 text-primary-500" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{transacao.descricao}</div>
                    {transacao.observacoes && (
                      <div className="text-xs text-gray-600 dark:text-slate-400">{transacao.observacoes}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-[11px] leading-5 font-medium rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-100 border-2 border-gray-300 dark:border-slate-600">
                      {transacao.categoria}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transacao.tipo === 'ENTRADA' ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transacao.tipo === 'ENTRADA' ? '+' : '-'} {formatarValor(transacao.valor)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 dark:text-slate-400">
                    {formatarData(transacao.data)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                    <button
                      onClick={() => handleEditValor(transacao.id)}
                      className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-600 px-3 py-1 text-xs text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-400 transition-colors"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Editar valor
                    </button>
                    <button
                      onClick={() => handleDelete(transacao.id)}
                      className="inline-flex items-center justify-center rounded-full border-2 border-red-500 px-3 py-1 text-xs text-red-700 dark:text-red-200 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

