export interface Investimento {
  tipo: string
  nome: string
  descricao: string
  rentabilidadeAnual: number
  risco: string
  recomendacao: string
}

export const investimentos: Investimento[] = [
  {
    tipo: 'Tesouro Direto',
    nome: 'Tesouro IPCA+ 2029',
    descricao: 'Título público indexado à inflação, ideal para proteção do poder de compra',
    rentabilidadeAnual: 6.5,
    risco: 'BAIXO',
    recomendacao: 'Recomendado para reserva de emergência e objetivos de longo prazo',
  },
  {
    tipo: 'CDB',
    nome: 'CDB Banco Inter 110% CDI',
    descricao: 'Certificado de Depósito Bancário com boa rentabilidade e liquidez diária',
    rentabilidadeAnual: 13.2,
    risco: 'BAIXO',
    recomendacao: 'Ideal para quem busca rentabilidade superior à poupança com segurança',
  },
  {
    tipo: 'LCI/LCA',
    nome: 'LCI Itaú 90% CDI',
    descricao: 'Letra de Crédito Imobiliário, isenta de IR para pessoa física',
    rentabilidadeAnual: 11.8,
    risco: 'BAIXO',
    recomendacao: 'Excelente para quem busca isenção de imposto de renda',
  },
  {
    tipo: 'Fundo de Renda Fixa',
    nome: 'Fundo XP Renda Fixa Simples',
    descricao: 'Fundo diversificado em títulos de renda fixa com gestão profissional',
    rentabilidadeAnual: 12.5,
    risco: 'BAIXO-MÉDIO',
    recomendacao: 'Boa opção para quem quer diversificação sem precisar escolher títulos individuais',
  },
  {
    tipo: 'Ações',
    nome: 'Carteira de Dividendos',
    descricao: 'Seleção de ações de empresas sólidas com histórico de pagamento de dividendos',
    rentabilidadeAnual: 8.0,
    risco: 'MÉDIO',
    recomendacao: 'Recomendado para investidores com perfil moderado e horizonte de longo prazo',
  },
  {
    tipo: 'FII',
    nome: 'Fundos Imobiliários Diversificados',
    descricao: 'Fundos que investem em imóveis comerciais e recebem aluguéis',
    rentabilidadeAnual: 10.5,
    risco: 'MÉDIO',
    recomendacao: 'Boa alternativa para diversificação e recebimento de renda passiva',
  },
  {
    tipo: 'Tesouro Direto',
    nome: 'Tesouro Selic 2027',
    descricao: 'Título pós-fixado atrelado à Selic, ideal para reserva de emergência',
    rentabilidadeAnual: 12.0,
    risco: 'BAIXO',
    recomendacao: 'Boa opção para quem quer liquidez diária e segurança máxima',
  },
  {
    tipo: 'CDB',
    nome: 'CDB Banco Médio 125% CDI',
    descricao: 'CDB de banco médio com maior retorno em troca de prazo de resgate maior',
    rentabilidadeAnual: 15.4,
    risco: 'MÉDIO',
    recomendacao: 'Indicado para quem pode deixar o dinheiro aplicado por mais tempo',
  },
  {
    tipo: 'Previdência Privada',
    nome: 'Plano Previdenciário Conservador',
    descricao: 'Fundo de previdência focado em renda fixa com benefícios fiscais no longo prazo',
    rentabilidadeAnual: 9.2,
    risco: 'BAIXO-MÉDIO',
    recomendacao: 'Interessante para planejamento de aposentadoria com disciplina de aportes',
  },
  {
    tipo: 'ETF',
    nome: 'ETF Ibovespa',
    descricao: 'Fundo de índice que replica o desempenho das principais ações da bolsa brasileira',
    rentabilidadeAnual: 7.5,
    risco: 'MÉDIO',
    recomendacao: 'Bom para diversificar em renda variável com um só produto',
  },
  {
    tipo: 'Renda Fixa Global',
    nome: 'Fundo Renda Fixa Internacional',
    descricao: 'Fundo que investe em títulos de renda fixa no exterior para diversificação cambial',
    rentabilidadeAnual: 6.8,
    risco: 'MÉDIO',
    recomendacao: 'Indicado para quem quer ter parte do patrimônio atrelado a moedas fortes',
  },
]

export const obterInvestimentosPorRisco = (risco: string): Investimento[] => {
  if (!risco) return investimentos
  return investimentos.filter(
    (inv) => inv.risco === risco || (risco === 'BAIXO' && inv.risco === 'BAIXO-MÉDIO')
  )
}

