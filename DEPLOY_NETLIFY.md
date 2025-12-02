# 🚀 Deploy no Netlify - Guia Rápido

## ⚡ Deploy em 3 Passos

### 1️⃣ Preparar Código

Certifique-se de que seu código está no GitHub:

```bash
git add .
git commit -m "Preparar para deploy Netlify"
git push origin main
```

### 2️⃣ Conectar ao Netlify

1. Acesse: **https://app.netlify.com**
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha **GitHub** e autorize o acesso
4. Selecione seu repositório

### 3️⃣ Configurar e Deploy

O Netlify detectará automaticamente Next.js! Configure:

- **Build command:** `npm run build` (já configurado)
- **Publish directory:** `.next` (já configurado)
- **Framework preset:** Next.js (detecta automaticamente)

Clique em **"Deploy site"** e aguarde 2-5 minutos.

## ✅ Pronto!

Seu site estará no ar em: `https://seu-projeto.netlify.app`

## 🔄 Deploy Automático

A partir de agora, sempre que você fizer `git push`, o Netlify fará deploy automático!

## 📝 Variáveis de Ambiente (Opcional)

Se precisar de variáveis de ambiente:

1. Vá em **Site settings** → **Environment variables**
2. Adicione suas variáveis
3. Faça um novo deploy

## 🆘 Problemas Comuns

### Build falha
- Verifique se `package.json` tem o script `build`
- Confirme que Node.js 18+ está configurado

### Site não carrega
- Verifique os logs de build no Netlify
- Confirme que `netlify.toml` está na raiz do projeto

---

**Pronto para publicar! 🌐**

