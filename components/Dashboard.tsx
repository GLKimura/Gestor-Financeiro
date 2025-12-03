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
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-500 border-t-transparent" />
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
        <div className="rounded-2xl border-2 border-primary-500 bg-primary-50 dark:bg-slate-900 p-5 shadow-lg shadow-primary-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                Entradas
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary-600 dark:text-primary-400">{entradasFormatadas}</p>
              <p className="mt-1 text-[11px] text-gray-600 dark:text-slate-400">Recebimentos no período</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-primary-500 flex items-center justify-center border-2 border-primary-600">
              <ArrowUpCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-red-500 bg-red-50 dark:bg-slate-900 p-5 shadow-lg shadow-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-red-700 dark:text-red-300">
                Saídas
              </p>
              <p className="mt-2 text-2xl font-semibold text-red-600 dark:text-red-400">{saidasFormatadas}</p>
              <p className="mt-1 text-[11px] text-gray-600 dark:text-slate-400">Despesas totais</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-red-500 flex items-center justify-center border-2 border-red-600">
              <ArrowDownCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-5 border-2 bg-white dark:bg-slate-900 shadow-xl ${
            balanco.saldo >= 0
              ? 'border-primary-500 shadow-primary-500/20'
              : 'border-red-500 shadow-red-500/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-700 dark:text-slate-300">
                Saldo consolidado
              </p>
              <p
                className={`mt-2 text-3xl font-semibold ${
                  balanco.saldo >= 0 ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {saldoFormatado}
              </p>
              <p className="mt-1 text-[11px] text-gray-600 dark:text-slate-400">
                Entradas - saídas, calculado em tempo real no seu dispositivo
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div
                className={`h-11 w-11 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-800 ${
                  balanco.saldo >= 0
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-red-500 text-red-600 dark:text-red-400'
                }`}
              >
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-slate-800 px-2 py-1 text-[11px] text-gray-700 dark:text-slate-300 border border-gray-300 dark:border-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
                Protegido no seu navegador
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center border-2 border-primary-600">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            Gastos por categoria
          </h3>
          <GraficoGastos dados={balanco.gastosPorCategoria} />
        </div>

        <div className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-secondary-500 flex items-center justify-center border-2 border-secondary-600">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            Balanço geral
          </h3>
          <GraficoBalanco balanco={balanco} />
        </div>
      </div>

      <div className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-4">Insights rápidos</h3>
        <div className="space-y-2">
          {balanco.saldo < 0 && (
            <div className="bg-red-50 dark:bg-red-500/10 border-2 border-red-500 p-4 rounded-xl">
              <p className="text-sm text-red-800 dark:text-red-200">
                Seu saldo está negativo. Considere revisar seus gastos, priorizar dívidas com juros altos
                e congelar despesas não essenciais nas próximas semanas.
              </p>
            </div>
          )}
          {Object.keys(balanco.gastosPorCategoria).length > 0 && (
            <div className="bg-secondary-50 dark:bg-secondary-500/10 border-2 border-secondary-500 p-4 rounded-xl">
              <p className="text-sm text-secondary-800 dark:text-secondary-200">
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
            <div className="bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-500 p-4 rounded-xl">
              <p className="text-sm text-primary-800 dark:text-primary-200">
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

