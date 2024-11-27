function cadastrarCliente() {
    const nome = document.getElementById('nome_cliente').value;
    const cpf_cnpj = document.getElementById('cpf_cnpj').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    fetch('/cadastrar_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'nome': nome,
            'cpf_cnpj': cpf_cnpj,
            'telefone': telefone,
            'email': email
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        listarClientes();
    })
    .catch(error => console.error('Erro:', error));
}

// Função para listar clientes com alternância de exibição
function listarClientes() {
    const lista = document.getElementById('lista_clientes');
    const botao = document.getElementById('botaoListarClientes');

    // Alterna a visibilidade da lista e o texto do botão
    if (lista.style.display === 'none' || lista.style.display === '') {
        lista.style.display = 'block';
        botao.textContent = 'Ocultar Clientes';

        // Faz a requisição para buscar os clientes somente se a lista estiver visível
        fetch('/listar_clientes')
            .then(response => response.json())
            .then(data => {
                lista.innerHTML = ''; // Limpa a lista antes de adicionar os clientes

                data.forEach(cliente => {
                    const li = document.createElement('li');
                    li.textContent = `${cliente.nome} - CPF/CNPJ: ${cliente.cpf_cnpj}`;

                    const btnEditar = document.createElement('button');
                    btnEditar.textContent = 'Editar';
                    btnEditar.onclick = () => exibirFormularioEdicaoCliente(cliente);

                    const btnRemover = document.createElement('button');
                    btnRemover.textContent = 'Remover';
                    btnRemover.onclick = () => confirmarRemoverCliente(cliente);

                    li.appendChild(btnEditar);
                    li.appendChild(btnRemover);
                    lista.appendChild(li);
                });
            })
            .catch(error => console.error('Erro:', error));
    } else {
        lista.style.display = 'none';
        botao.textContent = 'Listar Todos os Clientes';
    }
}


function exibirFormularioEdicaoCliente(cliente) {
    document.getElementById('form_editar_cliente').style.display = 'block';
    document.getElementById('editar_nome_cliente').value = cliente.nome;
    document.getElementById('editar_cpf_cnpj_cliente').value = cliente.cpf_cnpj;
    document.getElementById('editar_telefone_cliente').value = cliente.telefone;
    document.getElementById('editar_email_cliente').value = cliente.email;
}

function confirmarRemoverCliente(cliente) {
    if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
        removerCliente(cliente.cpf_cnpj);
    }
}

function removerCliente(cpf_cnpj) {
    fetch('/remover_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ 'cpf_cnpj': cpf_cnpj })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        listarClientes();
    })
    .catch(error => console.error('Erro:', error));
}

// Função para salvar edição do cliente
function salvarEdicaoCliente() {
    const nome = document.getElementById('editar_nome_cliente').value;
    const cpf_cnpj = document.getElementById('editar_cpf_cnpj_cliente').value; // CPF/CNPJ é imutável no backend
    const telefone = document.getElementById('editar_telefone_cliente').value;
    const email = document.getElementById('editar_email_cliente').value;

    fetch('/editar_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'nome': nome,
            'cpf_cnpj': cpf_cnpj,
            'telefone': telefone,
            'email': email
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        document.getElementById('form_editar_cliente').style.display = 'none';
        listarClientes(); // Atualiza a lista após edição
    })
    .catch(error => console.error('Erro:', error));
}
