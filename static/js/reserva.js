function reservarPousada() {
    const cpf_cnpj = document.getElementById('cpf_cnpj').value;
    const pousada_id = document.getElementById('pousada_id').value;
    const data_fim = document.getElementById('data_fim').value;

    fetch('/reservar_pousada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'cpf_cnpj': cpf_cnpj,
            'pousada_id': pousada_id,
            'data_fim': data_fim
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        document.getElementById('resultado').style.color = data.message === 'Reserva feita com sucesso!' ? 'green' : 'red';
        listarReservas(); // Atualiza a lista de reservas
    })
    .catch(error => console.error('Erro:', error));
}

function listarReservas() {
    const lista = document.getElementById('lista_reservas');
    const botao = document.getElementById('botaoListarReservas');

    if (lista.style.display === 'none' || lista.style.display === '') {
        lista.style.display = 'block';
        botao.textContent = 'Ocultar Reservas';

        fetch('/listar_reservas')
            .then(response => response.json())
            .then(data => {
                lista.innerHTML = ''; // Limpa a lista antes de adicionar as reservas

                data.forEach(reserva => {
                    const li = document.createElement('li');
                    li.textContent = `Cliente: ${reserva.cpf_cnpj} - Pousada ID: ${reserva.pousada_id} - Data Fim: ${reserva.data_fim}`;

                    const btnEditar = document.createElement('button');
                    btnEditar.textContent = 'Editar';
                    btnEditar.onclick = () => exibirFormularioEdicaoReserva(reserva);

                    const btnRemover = document.createElement('button');
                    btnRemover.textContent = 'Remover';
                    btnRemover.onclick = () => confirmarRemoverReserva(reserva);

                    li.appendChild(btnEditar);
                    li.appendChild(btnRemover);
                    lista.appendChild(li);
                });
            })
            .catch(error => console.error('Erro:', error));
    } else {
        lista.style.display = 'none';
        botao.textContent = 'Listar Todas as Reservas';
    }
}

function exibirFormularioEdicaoReserva(reserva) {
    document.getElementById('form_editar_reserva').style.display = 'block';
    document.getElementById('editar_cpf_cnpj').value = reserva.cpf_cnpj;
    document.getElementById('editar_pousada_id').value = reserva.pousada_id;
    document.getElementById('editar_data_fim').value = reserva.data_fim;
}

function salvarEdicaoReserva() {
    const cpf_cnpj = document.getElementById('editar_cpf_cnpj').value;
    const pousada_id = document.getElementById('editar_pousada_id').value;
    const data_fim = document.getElementById('editar_data_fim').value;

    fetch('/editar_reserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'cpf_cnpj': cpf_cnpj,
            'pousada_id': pousada_id,
            'data_fim': data_fim
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        document.getElementById('resultado').style.color = data.message === 'Reserva atualizada com sucesso!' ? 'green' : 'red';
        document.getElementById('form_editar_reserva').style.display = 'none';
        listarReservas(); // Atualiza a lista de reservas
    })
    .catch(error => console.error('Erro:', error));
}

function confirmarRemoverReserva(reserva) {
    if (confirm(`Tem certeza que deseja excluir a reserva para o cliente ${reserva.cpf_cnpj}?`)) {
        removerReserva(reserva.cpf_cnpj, reserva.pousada_id);
    }
}

function removerReserva(cpf_cnpj, pousada_id) {
    fetch('/remover_reserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'cpf_cnpj': cpf_cnpj,
            'pousada_id': pousada_id
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
        document.getElementById('resultado').style.color = data.message === 'Reserva removida com sucesso!' ? 'green' : 'red';
        listarReservas(); // Atualiza a lista de reservas
    })
    .catch(error => console.error('Erro:', error));
}
