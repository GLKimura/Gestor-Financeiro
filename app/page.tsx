'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import TransacoesList from '@/components/TransacoesList'
import TransacaoForm from '@/components/TransacaoForm'
import InvestimentosList from '@/components/InvestimentosList'
import { Wallet, TrendingUp, Plus } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Wallet className="text-slate-900" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-50 tracking-tight">
                FinanOne
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Seu painel financeiro com visão de banco digital
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-400 flex flex-col sm:items-end gap-1">
            <span className="uppercase tracking-[0.2em] text-slate-500">
              Saldo consolidado
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 border border-emerald-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Em tempo real no seu navegador
            </span>
          </div>
        </div>
      </header>

      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 overflow-x-auto whitespace-nowrap scrollbar-hide py-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2.5 sm:py-3 px-3 rounded-full border text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/30'
                  : 'border-transparent text-slate-300 hover:text-emerald-200 hover:border-emerald-400/40 hover:bg-slate-800/80'
              } w-full sm:w-auto text-center flex items-center justify-center gap-2`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>
            <button
              onClick={() => setActiveTab('transacoes')}
              className={`py-2.5 sm:py-3 px-3 rounded-full border text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'transacoes'
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/30'
                  : 'border-transparent text-slate-300 hover:text-emerald-200 hover:border-emerald-400/40 hover:bg-slate-800/80'
              } w-full sm:w-auto text-center flex items-center justify-center gap-2`}
            >
              <Plus className="w-4 h-4" />
              <span>Transações</span>
            </button>
            <button
              onClick={() => setActiveTab('investimentos')}
              className={`py-2.5 sm:py-3 px-3 rounded-full border text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'investimentos'
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/30'
                  : 'border-transparent text-slate-300 hover:text-emerald-200 hover:border-emerald-400/40 hover:bg-slate-800/80'
              } w-full sm:w-auto text-center flex items-center justify-center gap-2`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Investimentos</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'transacoes' && (
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6 items-start">
            <TransacaoForm />
            <TransacoesList />
          </div>
        )}
        {activeTab === 'investimentos' && <InvestimentosList />}
      </main>
    </div>
  )
}

