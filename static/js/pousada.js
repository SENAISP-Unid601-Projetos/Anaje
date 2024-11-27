function cadastrarPousada() {
    const id_pousada = document.getElementById('id_pousada').value;
    const nome = document.getElementById('nome_pousada').value;
    const valor = document.getElementById('valor_pousada').value;

    fetch('/cadastrar_pousada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'id_pousada': id_pousada,
            'nome': nome,
            'valor': valor
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        listarPousadas();
    })
    .catch(error => console.error('Erro:', error));
}

// Função para listar todas as pousadas com alternância de exibição
function listarPousadas() {
    const lista = document.getElementById('lista_pousadas');
    const botao = document.getElementById('botaoListarPousadas');

    if (lista.style.display === 'none' || lista.style.display === '') {
        lista.style.display = 'block';
        botao.textContent = 'Ocultar Pousadas';

        // Exibe todas as pousadas sem aplicar filtro ao listar
        fetch('/listar_pousadas')
            .then(response => response.json())
            .then(data => {
                lista.innerHTML = ''; // Limpa a lista antes de adicionar as pousadas

                data.forEach(pousada => {
                    const li = document.createElement('li');
                    li.textContent = `${pousada.nome} - ID: ${pousada.id} - Valor: R$${pousada.valor}`;

                    const btnEditar = document.createElement('button');
                    btnEditar.textContent = 'Editar';
                    btnEditar.onclick = () => exibirFormularioEdicaoPousada(pousada);

                    const btnRemover = document.createElement('button');
                    btnRemover.textContent = 'Remover';
                    btnRemover.onclick = () => confirmarRemoverPousada(pousada);

                    li.appendChild(btnEditar);
                    li.appendChild(btnRemover);
                    lista.appendChild(li);
                });
            })
            .catch(error => console.error('Erro:', error));
    } else {
        lista.style.display = 'none';
        botao.textContent = 'Listar Todas as Pousadas';
    }
}

function exibirFormularioEdicaoPousada(pousada) {
    document.getElementById('form_editar_pousada').style.display = 'block';
    document.getElementById('editar_id_pousada').value = pousada.id;
    document.getElementById('editar_nome_pousada').value = pousada.nome;
    document.getElementById('editar_valor_pousada').value = pousada.valor;
    document.getElementById('editar_status_pousada').value = pousada.status || 'livre';
}

function confirmarRemoverPousada(pousada) {
    if (confirm(`Tem certeza que deseja excluir a pousada ${pousada.nome}?`)) {
        removerPousada(pousada.id);
    }
}

function removerPousada(id_pousada) {
    fetch('/remover_pousada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ 'id_pousada': id_pousada })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        listarPousadas();
    })
    .catch(error => console.error('Erro:', error));
}

// Função para salvar edição da pousada
function salvarEdicaoPousada() {
    const id_pousada = document.getElementById('editar_id_pousada').value; // ID é imutável no backend
    const nome = document.getElementById('editar_nome_pousada').value;
    const valor = document.getElementById('editar_valor_pousada').value;
    const status = document.getElementById('editar_status_pousada').value;

    fetch('/editar_pousada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'id_pousada': id_pousada,
            'nome': nome,
            'valor': valor,
            'status': status
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        document.getElementById('form_editar_pousada').style.display = 'none';
        listarPousadas(); // Atualiza a lista após edição
    })
    .catch(error => console.error('Erro:', error));
}

// Função para aplicar filtro de pesquisa e status às pousadas
function aplicarFiltroPousadas() {
    const lista = document.getElementById('lista_pousadas');
    const filtroStatus = document.getElementById('filtro_pousada').value;
    const pesquisa = document.getElementById('pesquisa_pousada').value.toLowerCase();

    // Limpa a lista antes de aplicar o filtro
    lista.innerHTML = '';

    fetch('/listar_pousadas')
        .then(response => response.json())
        .then(pousadas => {
            pousadas.forEach(pousada => {
                // Aplica o filtro de status e pesquisa
                const mostrarPousada = 
                    (filtroStatus === 'todas' ||
                     (filtroStatus === 'livres' && pousada.status === 'livre') ||
                     (filtroStatus === 'reservadas' && pousada.status === 'reservada')) &&
                    pousada.nome.toLowerCase().includes(pesquisa);

                if (mostrarPousada) {
                    const li = document.createElement('li');
                    li.textContent = `${pousada.nome} - ID: ${pousada.id} - Valor: R$${pousada.valor}`;

                    const btnEditar = document.createElement('button');
                    btnEditar.textContent = 'Editar';
                    btnEditar.onclick = () => exibirFormularioEdicaoPousada(pousada);

                    const btnRemover = document.createElement('button');
                    btnRemover.textContent = 'Remover';
                    btnRemover.onclick = () => confirmarRemoverPousada(pousada);

                    li.appendChild(btnEditar);
                    li.appendChild(btnRemover);
                    lista.appendChild(li);
                }
            });

            // Exibe a lista após aplicar o filtro
            lista.style.display = 'block';
        })
        .catch(error => console.error('Erro:', error));
}
