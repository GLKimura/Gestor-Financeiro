'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Balanco } from '@/lib/calculos'

interface GraficoBalancoProps {
  balanco: Balanco
}

export default function GraficoBalanco({ balanco }: GraficoBalancoProps) {
  const data = [
    {
      name: 'Balanço',
      Entradas: Number(balanco.totalEntradas.toFixed(2)),
      Saídas: Number(balanco.totalSaidas.toFixed(2)),
      Saldo: Number(balanco.saldo.toFixed(2)),
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(value) =>
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              notation: 'compact',
            }).format(value)
          }
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value)
          }
        />
        <Legend />
        <Bar dataKey="Entradas" fill="#10b981" />
        <Bar dataKey="Saídas" fill="#ef4444" />
        <Bar dataKey="Saldo" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

