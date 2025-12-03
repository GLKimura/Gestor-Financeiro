'use client'

import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import { Plus } from 'lucide-react'

export default function TransacaoForm() {
  const getCurrentDateTime = () => {
    const now = new Date()
    // Ajustar para o fuso horário local
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    tipo: 'SAIDA' as 'ENTRADA' | 'SAIDA',
    categoria: '',
    data: getCurrentDateTime(),
    observacoes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Atualizar data/hora quando o componente monta
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      data: getCurrentDateTime()
    }))
  }, [])

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
      // Converter valor string para number
      const valorNumerico = formData.valor === '' ? 0 : parseFloat(String(formData.valor)) || 0
      
      storage.adicionarTransacao({
        ...formData,
        valor: valorNumerico
      })
      setSuccess(true)
      setFormData({
        descricao: '',
        valor: '',
        tipo: 'SAIDA',
        categoria: '',
        data: getCurrentDateTime(),
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
    <div className="rounded-2xl border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-5">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 border-2 border-primary-600">
          <Plus className="w-4 h-4 text-white" />
        </span>
        Nova transação
      </h2>
      <p className="text-[11px] text-gray-600 dark:text-slate-400 mb-4">
        Registre entradas e saídas como se estivesse lançando no extrato do seu banco.
      </p>
      
      {success && (
        <div className="mb-4 bg-primary-100 dark:bg-primary-500/10 border-2 border-primary-500 text-primary-800 dark:text-primary-200 px-4 py-3 rounded-xl text-sm">
          Transação registrada com sucesso.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Descrição
            </label>
            <input
              type="text"
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800"
              placeholder="Ex: Compra no supermercado"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Valor (R$)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Tipo
            </label>
            <select
              required
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'ENTRADA' | 'SAIDA' })}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800"
            >
              <option value="SAIDA">Saída</option>
              <option value="ENTRADA">Entrada</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Categoria
            </label>
            <select
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800"
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
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              required
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-[0.16em]">
              Observações (opcional)
            </label>
            <input
              type="text"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800"
              placeholder="Notas adicionais"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Registrando...' : 'Adicionar transação'}
        </button>
      </form>
    </div>
  )
}

