document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-theme');
    const html = document.documentElement;
    // Carregar preferência do usuário
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
      toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    toggleBtn.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? '' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  
    // Animação das barras de skill ao entrar na tela
    function animateSkillBars() {
      const bars = document.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        const percent = bar.style.getPropertyValue('--percent') || '0%';
        bar.style.width = percent;
      });
    }
    // Dispara animação ao rolar para a seção de habilidades
    function onScrollSkills() {
      const skillsSection = document.getElementById('habilidades');
      if (!skillsSection) return;
      const rect = skillsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        animateSkillBars();
        window.removeEventListener('scroll', onScrollSkills);
      }
    }
    window.addEventListener('scroll', onScrollSkills);
    // Caso já esteja visível ao carregar
    onScrollSkills();
  
    // Feedback visual do formulário de contato
    const contatoForm = document.getElementById('contatoForm');
    const contatoFeedback = document.getElementById('contato-feedback');
    if (contatoForm && contatoFeedback) {
      contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        contatoFeedback.textContent = 'Enviando...';
        contatoFeedback.className = 'contato-feedback';
        setTimeout(() => {
          // Simulação de sucesso
          contatoFeedback.textContent = 'Mensagem enviada com sucesso!';
          contatoFeedback.className = 'contato-feedback success';
          contatoForm.reset();
        }, 1200);
      });
    }
  
    // Fundo dinâmico simples com partículas
    const bg = document.getElementById('bg-dynamic');
    if (bg) {
      for (let i = 0; i < 32; i++) {
        const dot = document.createElement('div');
        dot.className = 'bg-dot';
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.animationDuration = (6 + Math.random() * 6) + 's';
        bg.appendChild(dot);
      }
    }
    // Microanimação do menu flutuante
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });
  