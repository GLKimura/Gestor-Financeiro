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

## 📤 Como Colocar no GitHub

Veja o guia completo em: **`COMO_COLOCAR_NO_GITHUB.md`**

**Resumo rápido:**
1. Instale Git: https://git-scm.com/download/win
2. Crie repositório no GitHub
3. Execute: `git init`, `git add .`, `git commit -m "Initial commit"`
4. Conecte: `git remote add origin https://github.com/SEU_USUARIO/nome-repo.git`
5. Envie: `git push -u origin main`

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

### Build para Produção

```bash
npm run build
npm start
```

## 🌐 Deploy como Site Web

### Netlify (Recomendado - Grátis)

1. **Preparar código:**
   ```bash
   git add .
   git commit -m "Preparar deploy"
   git push origin main
   ```

2. **Conectar ao Netlify:**
   - Acesse: **https://app.netlify.com**
   - Clique em **"Add new site"** → **"Import an existing project"**
   - Escolha **GitHub** e autorize
   - Selecione seu repositório

3. **Deploy automático:**
   - Netlify detecta Next.js automaticamente ✅
   - Clique em **"Deploy site"**
   - Aguarde 2-5 minutos
   - **Pronto!** 🎉

📖 **Guia completo:** Veja `DEPLOY_NETLIFY.md` para instruções detalhadas

### Vercel (Alternativa)

1. Acesse: **https://vercel.com**
2. Conecte seu repositório GitHub
3. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: **./** (raiz do projeto)
4. Clique em **Deploy**
5. **Pronto!** Seu site está no ar 🎉

### Outros

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Railway
- Render
- AWS Amplify
- Google Cloud Run
- Azure Static Web Apps

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

---

**Desenvolvido para ajudar pessoas a controlarem melhor suas finanças pessoais! 💰**
