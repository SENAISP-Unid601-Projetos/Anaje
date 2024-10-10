document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);

    fetch('/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Exibe mensagem de erro
        } else {
            window.location.href = '/index'; // Redireciona para a página principal
        }
    })
    .catch(error => console.error('Erro:', error));
});
