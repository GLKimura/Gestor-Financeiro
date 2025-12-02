'use client'

import { useState, useEffect } from 'react'
import { storage, Transacao } from '@/lib/storage'
import { calcularBalanco, Balanco } from '@/lib/calculos'
import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp } from 'lucide-react'
import GraficoGastos from './GraficoGastos'
import GraficoBalanco from './GraficoBalanco'

export default function Dashboard() {
  const [balanco, setBalanco] = useState<Balanco | null>(null)
  const [transacoes, setTransacoes] = useState<Transacao[]>([])

  useEffect(() => {
    carregarDados()
    // Atualizar quando houver mudanças no storage
    const interval = setInterval(carregarDados, 1000)
    return () => clearInterval(interval)
  }, [])

  const carregarDados = () => {
    const transacoesData = storage.carregarTransacoes()
    setTransacoes(transacoesData)
    setBalanco(calcularBalanco(transacoesData))
  }

  if (!balanco) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-400 border-t-transparent" />
      </div>
    )
  }

  const saldoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balanco.saldo)

  const entradasFormatadas = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balanco.totalEntradas)

  const saidasFormatadas = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balanco.totalSaidas)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-5 shadow-lg shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300/70">
                Entradas
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">{entradasFormatadas}</p>
              <p className="mt-1 text-[11px] text-slate-400">Recebimentos no período</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-400/40">
              <ArrowUpCircle className="w-6 h-6 text-emerald-300" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-500/15 bg-slate-900 p-5 shadow-lg shadow-rose-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-rose-300/70">
                Saídas
              </p>
              <p className="mt-2 text-2xl font-semibold text-rose-300">{saidasFormatadas}</p>
              <p className="mt-1 text-[11px] text-slate-400">Despesas totais</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-400/40">
              <ArrowDownCircle className="w-6 h-6 text-rose-300" />
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-5 border bg-slate-900 shadow-xl ${
            balanco.saldo >= 0
              ? 'border-emerald-500/40 shadow-emerald-500/15'
              : 'border-rose-500/40 shadow-rose-500/15'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300/80">
                Saldo consolidado
              </p>
              <p
                className={`mt-2 text-3xl font-semibold ${
                  balanco.saldo >= 0 ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {saldoFormatado}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Entradas - saídas, calculado em tempo real no seu dispositivo
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div
                className={`h-11 w-11 rounded-full flex items-center justify-center border bg-slate-900/60 ${
                  balanco.saldo >= 0
                    ? 'border-emerald-400/50 text-emerald-300'
                    : 'border-rose-400/50 text-rose-300'
                }`}
              >
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 text-[11px] text-slate-300 border border-slate-700/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Protegido no seu navegador
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-900/40">
          <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-400/40">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            </div>
            Gastos por categoria
          </h3>
          <GraficoGastos dados={balanco.gastosPorCategoria} />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-900/40">
          <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-400/40">
              <TrendingUp className="w-4 h-4 text-cyan-300" />
            </div>
            Balanço geral
          </h3>
          <GraficoBalanco balanco={balanco} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-900/40">
        <h3 className="text-sm font-semibold text-slate-100 mb-4">Insights rápidos</h3>
        <div className="space-y-2">
          {balanco.saldo < 0 && (
            <div className="bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/40 p-4 rounded-xl">
              <p className="text-sm text-rose-100">
                Seu saldo está negativo. Considere revisar seus gastos, priorizar dívidas com juros altos
                e congelar despesas não essenciais nas próximas semanas.
              </p>
            </div>
          )}
          {Object.keys(balanco.gastosPorCategoria).length > 0 && (
            <div className="bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-500/40 p-4 rounded-xl">
              <p className="text-sm text-sky-100">
                Sua maior categoria de gastos é:{' '}
                <strong className="font-semibold">
                  {Object.entries(balanco.gastosPorCategoria)
                    .sort(([, a], [, b]) => b - a)[0]?.[0]}
                </strong>
                . Avalie se há espaço para renegociar contratos ou reduzir esse tipo de despesa.
              </p>
            </div>
          )}
          {balanco.saldo > 0 && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/40 p-4 rounded-xl">
              <p className="text-sm text-emerald-100">
                Você está com saldo positivo. Defina uma porcentagem fixa para investimento todo mês e
                construa sua reserva de segurança com disciplina.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

