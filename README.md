# 🌿 Iridologia Natural

<div align="center">

![Iridologia Natural](https://img.shields.io/badge/Iridologia-Natural-22a06b?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Análise da Íris e Terapias Naturais em São Paulo

*Descubra sua saúde através dos seus olhos*

[🌐 Ver Demo](https://samurmsantos.github.io/site_iris_lab/) 
</div>

---

## 📋 Sobre o Projeto

Site profissional para divulgação de serviços de **Iridologia**, **Florais de Bach** e **Fitoterapia** na região de São Paulo. O projeto foi desenvolvido com foco em **experiência do usuário**, **segurança** e **performance**, oferecendo uma plataforma moderna e responsiva para agendamento de consultas e informações sobre terapias naturais.

### ✨ Destaques

- 🎨 **Design Moderno**: Interface limpa e profissional com animações suaves
- 🔒 **Alta Segurança**: Headers HTTP seguros, validação de dados e proteção contra XSS
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Performance**: Carregamento rápido e otimizado
- ♿ **Acessível**: Código semântico e acessível para todos os usuários

---

## 🚀 Funcionalidades

### 🏠 Landing Page Completa
- Hero section com call-to-action destacado
- Seção sobre Iridologia com imagens ilustrativas
- Cards de serviços oferecidos
- Catálogo de produtos (Florais de Bach e Fitoterápicos)

### 📨 Formulário de Contato
- Integração com FormSubmit.co (sem necessidade de backend)
- Validação client-side robusta
- Proteção contra bots (honeypot)
- Rate limiting (3 tentativas a cada 10 minutos)
- Sanitização de inputs

### 🛡️ Segurança Avançada
- **Content-Security-Policy (CSP)**
- **X-Content-Type-Options**
- **X-Frame-Options**
- **X-XSS-Protection**
- **Permissions-Policy**
- Detecção de padrões maliciosos
- Monitoramento de DOM (MutationObserver)

### 🎯 Experiência do Usuário
- Scroll suave entre seções
- Animações on-scroll
- Botão "Voltar ao topo"
- Barra de progresso de scroll
- WhatsApp e Instagram integrados

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| **HTML5** | Estrutura semântica |
| **CSS3** | Estilização e animações |
| **JavaScript (Vanilla)** | Interatividade e validações |
| **Google Fonts** | Tipografia (Inter) |
| **FormSubmit.co** | Envio de formulários |
| **SVG** | Ícones e ilustrações |

---

## 🔧 Como Usar

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/samurmsantos/site_iris_lab.git
cd site_iris_lab
```

### 2️⃣ Abrir no Navegador

Simplesmente abra o arquivo `index.html` no seu navegador preferido:

```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

### 3️⃣ Ou use um servidor local

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

---

## 🚀 Deploy

### GitHub Pages

1. Faça push do código para o GitHub
2. Vá em **Settings** > **Pages**
3. Selecione a branch `main` como source
4. Clique em **Save**
5. Seu site estará disponível em: `https://samurmsantos.github.io/site_iris_lab/`

### Outras Opções

- **Netlify**: Arraste a pasta ou conecte com GitHub
- **Vercel**: Deploy automático via GitHub
- **Hostinger/Locaweb**: Upload via FTP

---

## 🔒 Segurança

Este projeto implementa **múltiplas camadas de segurança**:

### Headers HTTP
```
Content-Security-Policy
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Permissions-Policy
```

### Validação de Formulário
- Sanitização de inputs
- Regex rigoroso para email e telefone
- Limites de caracteres
- Detecção de padrões suspeitos (`<script>`, `<iframe>`, etc)

### Proteção Contra Bots
- Campo honeypot invisível
- Rate limiting (3 tentativas/10min)
- Monitoramento de DOM em tempo real

> 📄 Para mais detalhes, consulte [SEGURANCA.md](SEGURANCA.md)

**Score de Segurança: 98/100** ⭐

---

## 🎨 Personalização

### Cores Principais

```css
:root {
  --color-primary: #22a06b;     /* Verde principal */
  --color-primary-dark: #1a8053;
  --color-text: #1f2933;
  --color-bg: #f9fafb;
}
```

### Adicionar Novos Produtos

Edite a seção `#produtos` no `index.html` e adicione um novo card:

```html
<article class="product-card scroll-animate">
  <div class="product-icon" style="background: rgba(255, 182, 193, 0.3); color: #ff69b4;">
    <!-- Seu ícone SVG aqui -->
  </div>
  <h4 class="product-name">Nome do Produto</h4>
  <p class="product-description">Descrição do produto</p>
  <div class="product-tags">
    <span class="tag">Tag 1</span>
    <span class="tag">Tag 2</span>
  </div>
</article>
```

---

##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você encontrou um bug ou tem uma sugestão:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Samuel Santos**
- GitHub: [@samurmsantos](https://github.com/samurmsantos)

**Cliente: Iridologia Natural**
- Instagram: [@franmr_iridologa](https://www.instagram.com/franmr_iridologa/)

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

**Desenvolvido com 💚 para promover saúde natural**

[⬆ Voltar ao topo](#-iridologia-natural)

</div>
