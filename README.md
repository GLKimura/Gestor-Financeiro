# 💰 Gerenciador de Gastos - site Web

Sistema completo de gerenciamento financeiro pessoal, desenvolvido como **site web standalone**.

## 🎯 Funcionalidades

- ✅ **Controle de Entradas e Saídas**: Registre todas as suas transações financeiras
- 📊 **Gráficos Interativos**: Visualize seus gastos por categoria e acompanhe seu balanço
- 🤖 **Assistente IA**: Receba dicas personalizadas de economia baseadas no seu perfil financeiro
- 💼 **Sugestões de Investimentos**: Explore opções de investimentos seguros e atuais
- 📈 **Dashboard Completo**: Acompanhe seu saldo, entradas, saídas e insights financeiros
- 💾 **Armazenamento Local**: Seus dados ficam salvos no navegador (localStorage)

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos interativos
- **localStorage** - Armazenamento de dados no navegador



## 📁 Estrutura do Projeto

```
finan/
├── app/              # Páginas Next.js
├── components/       # Componentes React
├── lib/              # Utilitários e lógica
│   ├── storage.ts    # Gerenciamento localStorage
│   ├── calculos.ts   # Cálculos financeiros
│   ├── investimentos.ts # Dados de investimentos
│   └── ia.ts         # Lógica do assistente IA
└── package.json
```

## 💡 Características

- **100% Frontend**: Não precisa de backend
- **Armazenamento Local**: Dados salvos no navegador
- **Responsivo**: Funciona em desktop e mobile
- **PWA Ready**: Pode ser instalado como app
- **Deploy Simples**: Um único comando para publicar

## 📝 Uso

1. **Adicione Transações**: Registre entradas e saídas
2. **Visualize Dashboard**: Veja gráficos e insights
3. **Consulte Investimentos**: Explore opções de investimento
4. **Fale com IA**: Receba dicas personalizadas

## 🔒 Privacidade

- Todos os dados ficam armazenados **localmente no seu navegador**
- **Nenhum dado é enviado para servidores externos**
- Seu controle financeiro é 100% privado

## 🆘 Solução de Problemas

### Dados não aparecem

- Verifique se o localStorage está habilitado no navegador
- Limpe o cache se necessário

### Erro no build

```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.
Desenvolved by Gabriel Kimura

---

**Desenvolvido para ajudar pessoas a controlarem melhor suas finanças pessoais! 💰**
