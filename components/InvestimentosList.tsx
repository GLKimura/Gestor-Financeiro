'use client'

import { useState } from 'react'
import { investimentos, obterInvestimentosPorRisco, Investimento } from '@/lib/investimentos'
import { TrendingUp, Shield, AlertCircle } from 'lucide-react'

export default function InvestimentosList() {
  const [filtroRisco, setFiltroRisco] = useState<string>('')
  const [investimentosList, setInvestimentosList] = useState<Investimento[]>(investimentos)

  const handleFiltroChange = (risco: string) => {
    setFiltroRisco(risco)
    if (risco) {
      setInvestimentosList(obterInvestimentosPorRisco(risco))
    } else {
      setInvestimentosList(investimentos)
    }
  }

  const getRiscoColor = (risco: string) => {
    switch (risco.toUpperCase()) {
      case 'BAIXO':
        return 'bg-green-100 text-green-800'
      case 'BAIXO-MÉDIO':
        return 'bg-yellow-100 text-yellow-800'
      case 'MÉDIO':
        return 'bg-orange-100 text-orange-800'
      case 'ALTO':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiscoIcon = (risco: string) => {
    if (risco.toUpperCase().includes('BAIXO')) {
      return <Shield className="w-5 h-5" />
    }
    return <AlertCircle className="w-5 h-5" />
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-900/40 p-5">
        <h2 className="text-sm font-semibold text-slate-100 mb-1 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/40">
            <TrendingUp className="w-4 h-4 text-cyan-300" />
          </span>
          Portfólio sugerido
        </h2>
        <p className="text-[11px] text-slate-400 mb-4">
          Veja classes de ativos semelhantes às oferecidas por bancos e corretoras.
        </p>
        
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.16em]">
            Perfil de risco
          </label>
          <select
            value={filtroRisco}
            onChange={(e) => handleFiltroChange(e.target.value)}
            className="px-3 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/60 text-slate-100 bg-slate-950"
          >
            <option value="">Todos</option>
            <option value="BAIXO">Baixo</option>
            <option value="BAIXO-MÉDIO">Baixo-Médio</option>
            <option value="MÉDIO">Médio</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {investimentosList.map((investimento, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/15 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">{investimento.nome}</h3>
                <p className="text-[11px] text-slate-400 mt-1">{investimento.tipo}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRiscoColor(investimento.risco)}`}>
                {getRiscoIcon(investimento.risco)}
                {investimento.risco}
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">{investimento.descricao}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-400">Rentabilidade anual estimada</span>
                <span className="text-lg font-semibold text-emerald-300">
                  {investimento.rentabilidadeAnual.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-700 rounded-xl p-3 mt-1">
              <p className="text-xs text-slate-200">
                <strong className="text-emerald-300">Recomendação:</strong> {investimento.recomendacao}
              </p>
            </div>
          </div>
        ))}
      </div>

      {investimentosList.length === 0 && (
        <div className="text-center text-slate-400 py-12 text-sm">
          Nenhum investimento encontrado com o filtro selecionado.
        </div>
      )}
    </div>
  )
}

