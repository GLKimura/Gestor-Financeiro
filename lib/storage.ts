// Gerenciamento de armazenamento local (localStorage)

export interface Transacao {
  id: string
  descricao: string
  valor: number
  tipo: 'ENTRADA' | 'SAIDA'
  categoria: string
  data: string
  observacoes?: string
}

const STORAGE_KEY = 'gerenciador_gastos_transacoes'

export const storage = {
  // Salvar transações
  salvarTransacoes: (transacoes: Transacao[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes))
    }
  },

  // Carregar transações
  carregarTransacoes: (): Transacao[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        try {
          return JSON.parse(data)
        } catch {
          return []
        }
      }
    }
    return []
  },

  // Adicionar transação
  adicionarTransacao: (transacao: Omit<Transacao, 'id'>): Transacao => {
    const transacoes = storage.carregarTransacoes()
    const novaTransacao: Transacao = {
      ...transacao,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }
    transacoes.push(novaTransacao)
    storage.salvarTransacoes(transacoes)
    return novaTransacao
  },

  // Remover transação
  removerTransacao: (id: string) => {
    const transacoes = storage.carregarTransacoes()
    const filtradas = transacoes.filter((t) => t.id !== id)
    storage.salvarTransacoes(filtradas)
  },

  // Atualizar transação
  atualizarTransacao: (id: string, transacao: Partial<Transacao>) => {
    const transacoes = storage.carregarTransacoes()
    const index = transacoes.findIndex((t) => t.id === id)
    if (index !== -1) {
      transacoes[index] = { ...transacoes[index], ...transacao }
      storage.salvarTransacoes(transacoes)
      return transacoes[index]
    }
    return null
  },
}

