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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-900/40">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 tracking-tight">Histórico de transações</h2>
          <p className="text-[11px] text-slate-400 mt-1">
            Acompanhe entradas e saídas com visão de extrato bancário
          </p>
        </div>
        <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {transacoes.length} lançamento{transacoes.length === 1 ? '' : 's'}
        </span>
      </div>

      {transacoes.length === 0 ? (
        <div className="p-6 text-center text-slate-400 text-sm">
          Nenhuma transação cadastrada ainda. Comece registrando suas movimentações na seção ao lado.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/90">
              <tr>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-400 uppercase tracking-[0.18em]">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-400 uppercase tracking-[0.18em]">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-400 uppercase tracking-[0.18em]">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-400 uppercase tracking-[0.18em]">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-400 uppercase tracking-[0.18em]">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-slate-400 uppercase tracking-[0.18em]">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-950/40 divide-y divide-slate-800">
              {transacoes.map((transacao) => (
                <tr key={transacao.id} className="hover:bg-slate-900/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transacao.tipo === 'ENTRADA' ? (
                      <ArrowUpCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-100">{transacao.descricao}</div>
                    {transacao.observacoes && (
                      <div className="text-xs text-slate-400">{transacao.observacoes}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-[11px] leading-5 font-medium rounded-full bg-slate-800 text-slate-100 border border-slate-600">
                      {transacao.categoria}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transacao.tipo === 'ENTRADA' ? 'text-emerald-300' : 'text-rose-300'
                  }`}>
                    {transacao.tipo === 'ENTRADA' ? '+' : '-'} {formatarValor(transacao.valor)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                    {formatarData(transacao.data)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                    <button
                      onClick={() => handleEditValor(transacao.id)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800 hover:border-slate-400 transition-colors"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Editar valor
                    </button>
                    <button
                      onClick={() => handleDelete(transacao.id)}
                      className="inline-flex items-center justify-center rounded-full border border-rose-500/40 px-3 py-1 text-xs text-rose-200 hover:bg-rose-500/10 hover:border-rose-400 transition-colors"
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

