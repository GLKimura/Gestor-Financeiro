# 📤 Como Colocar no GitHub - Guia Completo

## 🚀 Passo a Passo

### 1️⃣ Criar Repositório no GitHub

1. Acesse: **https://github.com**
2. Faça login na sua conta
3. Clique no botão **"+"** no canto superior direito → **"New repository"**
4. Preencha:
   - **Repository name:** `gerenciador-gastos` (ou outro nome)
   - **Description:** "Gerenciador de Gastos - Site Web"
   - **Public** ou **Private** (escolha)
   - **NÃO** marque "Add a README file" (já temos um)
5. Clique em **"Create repository"**

### 2️⃣ Preparar o Git Localmente

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Gerenciador de Gastos"
```

### 3️⃣ Conectar ao GitHub

No GitHub, você verá instruções. Use estas:

```bash
# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/gerenciador-gastos.git

# Renomear branch para main (se necessário)
git branch -M main

# Enviar código para o GitHub
git push -u origin main
```

**Exemplo:**
Se seu usuário é `joaosilva`, o comando seria:
```bash
git remote add origin https://github.com/joaosilva/gerenciador-gastos.git
```

### 4️⃣ Verificar

Acesse seu repositório no GitHub e confira se todos os arquivos apareceram!

## 🔄 Atualizações Futuras

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

## 🔐 Autenticação

Se pedir usuário/senha:
- **Usuário:** seu usuário do GitHub
- **Senha:** use um **Personal Access Token** (não sua senha normal)

### Como criar Personal Access Token:

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Clique em **"Generate new token"**
3. Dê um nome e selecione escopos: `repo`
4. Clique em **"Generate token"**
5. **Copie o token** (só aparece uma vez!)
6. Use esse token como senha

## 📝 Checklist

- [ ] Repositório criado no GitHub
- [ ] Git inicializado localmente (`git init`)
- [ ] Arquivos adicionados (`git add .`)
- [ ] Primeiro commit feito (`git commit`)
- [ ] Repositório remoto conectado (`git remote add`)
- [ ] Código enviado (`git push`)
- [ ] Arquivos aparecem no GitHub ✅

## 🆘 Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/gerenciador-gastos.git
```

### Erro: "failed to push"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Esqueceu o nome do repositório
```bash
git remote -v
```

---

**Pronto para compartilhar seu projeto! 🎉**

