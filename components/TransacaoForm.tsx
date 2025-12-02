'use client'

import { useState } from 'react'
import { storage } from '@/lib/storage'
import { Plus } from 'lucide-react'

export default function TransacaoForm() {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: 0,
    tipo: 'SAIDA' as 'ENTRADA' | 'SAIDA',
    categoria: '',
    data: new Date().toISOString().slice(0, 16),
    observacoes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const categorias = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Roupas',
    'Contas',
    'Salário',
    'Freelance',
    'Investimentos',
    'Outros',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      storage.adicionarTransacao(formData)
      setSuccess(true)
      setFormData({
        descricao: '',
        valor: 0,
        tipo: 'SAIDA',
        categoria: '',
        data: new Date().toISOString().slice(0, 16),
        observacoes: '',
      })
      setTimeout(() => {
        setSuccess(false)
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Erro ao criar transação:', error)
      alert('Erro ao criar transação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-900/40 p-5">
      <h2 className="text-sm font-semibold text-slate-100 mb-1 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/40">
          <Plus className="w-4 h-4 text-emerald-300" />
        </span>
        Nova transação
      </h2>
      <p className="text-[11px] text-slate-400 mb-4">
        Registre entradas e saídas como se estivesse lançando no extrato do seu banco.
      </p>
      
      {success && (
        <div className="mb-4 bg-emerald-500/10 border border-emerald-400/40 text-emerald-200 px-4 py-3 rounded-xl text-sm">
          Transação registrada com sucesso.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Descrição
            </label>
            <input
              type="text"
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
              placeholder="Ex: Compra no supermercado"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Valor (R$)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Tipo
            </label>
            <select
              required
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'ENTRADA' | 'SAIDA' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
            >
              <option value="SAIDA">Saída</option>
              <option value="ENTRADA">Entrada</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Categoria
            </label>
            <select
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              required
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Observações (opcional)
            </label>
            <input
              type="text"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
              placeholder="Notas adicionais"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold py-2.5 px-4 rounded-xl hover:from-emerald-300 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Registrando...' : 'Adicionar transação'}
        </button>
      </form>
    </div>
  )
}

