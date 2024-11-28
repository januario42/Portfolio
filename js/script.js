document.addEventListener('DOMContentLoaded', () => {
    // Função para aplicar o tema atual
    const applyTheme = (theme) => {
        document.body.classList.add(theme);
        const themeToggleButton = document.getElementById('theme-toggle');

        if (theme === 'dark-theme') {
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Função para alternar o tema
    const toggleTheme = () => {
        const theme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        document.body.classList.toggle('dark-theme');
        
        // Salvar a preferência de tema no localStorage
        localStorage.setItem('theme', theme);

        // Atualizar o ícone do botão de alternância de tema
        document.getElementById('theme-toggle').innerHTML = theme === 'dark-theme' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    };

    // Verificar tema salvo no localStorage e aplicar
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        applyTheme(currentTheme);
    }

    // Adicionar evento de alternância de tema ao botão
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', toggleTheme);

    // Feedback do Formulário (se usando Formspree)
    const showFormFeedback = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');

        if (success === '1') {
            document.querySelector('#contato').innerHTML += '<div class="alert alert-success mt-3">Mensagem enviada com sucesso!</div>';
        } else if (success === '-1') {
            document.querySelector('#contato').innerHTML += '<div class="alert alert-danger mt-3">Erro ao enviar mensagem. Tente novamente.</div>';
        }
    };

    showFormFeedback();
});
