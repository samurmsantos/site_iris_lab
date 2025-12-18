// ====================================
// IRIDOLOGIA NATURAL - JavaScript
// ====================================

// ====================================
// CONFIGURAÇÕES DE SEGURANÇA
// ====================================
const SECURITY_CONFIG = {
  maxSubmitAttempts: 3, // Máximo de tentativas em 10 minutos
  submitCooldown: 600000, // 10 minutos em ms
  maxFieldLength: {
    nome: 100,
    email: 100,
    telefone: 15,
    mensagem: 1000
  }
};

// Armazenar tentativas de envio
let submitAttempts = [];

// ====================================
// FUNÇÕES DE SEGURANÇA
// ====================================

// Sanitizar entrada do usuário para prevenir XSS
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Validar comprimento máximo
function validateLength(input, maxLength) {
  return input.length <= maxLength;
}

// Verificar rate limiting
function checkRateLimit() {
  const now = Date.now();
  // Remover tentativas antigas (mais de 10 minutos)
  submitAttempts = submitAttempts.filter(time => now - time < SECURITY_CONFIG.submitCooldown);
  
  if (submitAttempts.length >= SECURITY_CONFIG.maxSubmitAttempts) {
    return false;
  }
  
  submitAttempts.push(now);
  return true;
}

// Detectar padrões suspeitos
function detectSuspiciousPatterns(text) {
  // Padrões comuns de spam/ataque
  const suspiciousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onerror, etc
    /<embed[\s\S]*?>/gi,
    /<object[\s\S]*?>/gi
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(text));
}

// Verificar campo honeypot (proteção contra bots)
function checkHoneypot() {
  const honeypot = document.querySelector('input[name="_honey"]');
  return honeypot && honeypot.value === '';
}

// Executar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initFormValidation();
  initFooterYear();
  initBackToTop();
  initScrollProgress();
  initHeaderBehavior();
  initCopyEmail();
  initParallaxOptimized();
  initSecurityMonitoring();
});

// ====================================
// 1. MENU MOBILE
// ====================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !nav) return;

  // Toggle do menu ao clicar no botão hambúrguer
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    menuToggle.classList.toggle('active');
    
    // Atualizar ícone do botão
    if (nav.classList.contains('nav-open')) {
      menuToggle.textContent = '✕';
      menuToggle.setAttribute('aria-label', 'Fechar menu');
      // Prevenir scroll do body quando menu estiver aberto
      document.body.style.overflow = 'hidden';
    } else {
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    }
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      menuToggle.classList.remove('active');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove('nav-open');
      menuToggle.classList.remove('active');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    }
  });
}

// ====================================
// 2. SMOOTH SCROLL
// ====================================
function initSmoothScroll() {
  // Selecionar todos os links que começam com #
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorar links vazios
      if (href === '#' || href === '#!') return;

      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        // Calcular a posição considerando o header fixo
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ====================================
// 3. ANIMAÇÕES DE SCROLL
// ====================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Opcional: Animar apenas uma vez
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos os elementos animáveis
  const animatedElements = document.querySelectorAll(
    '.scroll-animate, .scroll-animate-left, .scroll-animate-right, ' +
    '.service-card, .product-card, .remedy-card, .contact-info-card'
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ====================================
// 4. VALIDAÇÃO DO FORMULÁRIO
// ====================================
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;

  // Adicionar validação em tempo real
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Validar ao sair do campo
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Remover erro ao digitar
    input.addEventListener('input', () => {
      removeFieldError(input);
    });
  });

  // Máscara para telefone
  const telefoneInput = form.querySelector('#telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  // Validar formulário ao enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // VERIFICAÇÕES DE SEGURANÇA
    
    // 1. Verificar honeypot (anti-bot)
    if (!checkHoneypot()) {
      console.warn('Submissão bloqueada: honeypot detectado');
      return;
    }
    
    // 2. Verificar rate limiting
    if (!checkRateLimit()) {
      showFieldError(inputs[0], 'Muitas tentativas. Aguarde 10 minutos.');
      return;
    }
    
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Sanitizar dados antes de enviar
      inputs.forEach(input => {
        if (input.value) {
          input.value = sanitizeInput(input.value.trim());
        }
      });
      
      // Permitir envio do formulário
      form.submit();
    } else {
      // Scroll até o primeiro erro
      const firstError = form.querySelector('.form-group.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

// Validar campo individual
function validateField(input) {
  const formGroup = input.closest('.form-group');
  const value = input.value.trim();

  // Remover erro anterior
  removeFieldError(input);

  // Validações de segurança
  
  // 1. Verificar comprimento máximo
  const fieldName = input.name;
  const maxLength = SECURITY_CONFIG.maxFieldLength[fieldName];
  if (maxLength && !validateLength(value, maxLength)) {
    showFieldError(input, `Máximo de ${maxLength} caracteres`);
    return false;
  }
  
  // 2. Detectar padrões suspeitos
  if (detectSuspiciousPatterns(value)) {
    showFieldError(input, 'Caracteres inválidos detectados');
    return false;
  }

  // Validações padrão
  if (input.hasAttribute('required') && !value) {
    showFieldError(input, 'Este campo é obrigatório');
    return false;
  }

  if (input.type === 'email' && value) {
    // Email mais rigoroso
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
      showFieldError(input, 'Email inválido');
      return false;
    }
  }

  if (input.type === 'tel' && value) {
    const phoneDigits = value.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      showFieldError(input, 'Telefone inválido');
      return false;
    }
  }

  return true;
}

// Mostrar erro no campo
function showFieldError(input, message) {
  const formGroup = input.closest('.form-group');
  formGroup.classList.add('error');
  
  // Adicionar mensagem de erro se não existir
  let errorMsg = formGroup.querySelector('.error-message');
  if (!errorMsg) {
    errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    formGroup.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
  
  // Adicionar borda vermelha no input
  input.style.borderColor = '#ef4444';
}

// Remover erro do campo
function removeFieldError(input) {
  const formGroup = input.closest('.form-group');
  formGroup.classList.remove('error');
  
  const errorMsg = formGroup.querySelector('.error-message');
  if (errorMsg) {
    errorMsg.remove();
  }
  
  input.style.borderColor = '';
}

// Função de monitoramento de segurança
function initSecurityMonitoring() {
  // Detectar tentativas de manipulação do console
  const devtools = /./;
  devtools.toString = function() {
    console.warn('⚠️ Atenção: Esta é uma aplicação monitorada.');
  };
  
  // Monitorar tentativas de copiar código
  document.addEventListener('copy', () => {
    console.log('Conteúdo copiado');
  });
  
  // Prevenir abertura de contexto em produção (opcional)
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    document.addEventListener('contextmenu', (e) => {
      // Permitir menu de contexto, apenas logar
      console.log('Menu de contexto aberto');
    });
  }
  
  // Detectar alterações no DOM suspeitas
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'SCRIPT' || node.nodeName === 'IFRAME') {
            console.warn('⚠️ Script ou iframe não autorizado detectado');
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Proteção adicional: limpar localStorage suspeito
function cleanupStorage() {
  try {
    // Verificar se há dados suspeitos no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('script') || key.includes('eval'))) {
        console.warn('⚠️ Item suspeito removido do localStorage:', key);
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.log('LocalStorage não disponível');
  }
}

// Executar limpeza ao carregar
cleanupStorage();

// ====================================
// 5. ANO AUTOMÁTICO NO RODAPÉ
// ====================================
function initFooterYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ====================================
// 6. BOTÃO VOLTAR AO TOPO
// ====================================
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ====================================
// 7. BARRA DE PROGRESSO DE SCROLL
// ====================================
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ====================================
// 8. HEADER DINÂMICO
// ====================================
function initHeaderBehavior() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
      
      // Esconder header ao rolar para baixo, mostrar ao rolar para cima
      if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ====================================
// 9. COPIAR EMAIL AO CLICAR
// ====================================
function initCopyEmail() {
  document.querySelectorAll('.contact-info-text').forEach(element => {
    if (element.textContent.includes('@')) {
      element.style.cursor = 'pointer';
      element.title = 'Clique para copiar';
      
      element.addEventListener('click', () => {
        const email = element.textContent.trim();
        navigator.clipboard.writeText(email).then(() => {
          const originalText = element.textContent;
          element.textContent = '✓ Copiado!';
          element.style.color = 'var(--primary)';
          
          setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
          }, 2000);
        }).catch(() => {
          console.log('Erro ao copiar email');
        });
      });
    }
  });
}

// ====================================
// 10. EFEITO DE PARALLAX OTIMIZADO
// ====================================
function initParallaxOptimized() {
  let ticking = false;
  const hero = document.querySelector('.main-hero');

  if (!hero) return;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        if (scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
          hero.style.opacity = 1 - (scrolled / 600);
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ====================================
// 11. LAZY LOADING DE IMAGENS
// ====================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ====================================
// 12. ANIMAÇÃO NOS INPUTS DO FORMULÁRIO
// ====================================
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });
});
