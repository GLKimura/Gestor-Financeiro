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
        return 'bg-green-500 text-white dark:bg-green-600 dark:text-white'
      case 'BAIXO-MÉDIO':
        return 'bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white'
      case 'MÉDIO':
        return 'bg-orange-500 text-white dark:bg-orange-600 dark:text-white'
      case 'ALTO':
        return 'bg-red-500 text-white dark:bg-red-600 dark:text-white'
      default:
        return 'bg-gray-500 text-white dark:bg-gray-600 dark:text-white'
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
      <div className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary-500 border-2 border-secondary-600">
            <TrendingUp className="w-4 h-4 text-white" />
          </span>
          Portfólio sugerido
        </h2>
        <p className="text-[11px] text-gray-600 dark:text-slate-400 mb-4">
          Veja classes de ativos semelhantes às oferecidas por bancos e corretoras.
        </p>
        
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-[0.16em]">
            Perfil de risco
          </label>
          <select
            value={filtroRisco}
            onChange={(e) => handleFiltroChange(e.target.value)}
            className="px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800"
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
            className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-50">{investimento.nome}</h3>
                <p className="text-[11px] text-gray-600 dark:text-slate-400 mt-1">{investimento.tipo}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRiscoColor(investimento.risco)}`}>
                {getRiscoIcon(investimento.risco)}
                {investimento.risco}
              </div>
            </div>

            <p className="text-xs text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{investimento.descricao}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Rentabilidade anual estimada</span>
                <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  {investimento.rentabilidadeAnual.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-950 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-3 mt-1">
              <p className="text-xs text-gray-800 dark:text-slate-200">
                <strong className="text-primary-600 dark:text-primary-400">Recomendação:</strong> {investimento.recomendacao}
              </p>
            </div>
          </div>
        ))}
      </div>

      {investimentosList.length === 0 && (
        <div className="text-center text-gray-600 dark:text-slate-400 py-12 text-sm">
          Nenhum investimento encontrado com o filtro selecionado.
        </div>
      )}
    </div>
  )
}

