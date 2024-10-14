// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Verificar tema salvo no localStorage
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Alternar tema ao clicar no botão
    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        // Salvar o tema no localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark-theme');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light-theme');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Feedback do Formulário (se usando Formspree)
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');

    if (success === '1') {
        alert('Mensagem enviada com sucesso!');
    } else if (success === '-1') {
        alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    }
});
