from tinydb import TinyDB, Query

# Inicialização dos bancos de dados separados na pasta `data`
db_clientes = TinyDB('data/clientes.json')
db_pousadas = TinyDB('data/pousadas.json')
db_reservas = TinyDB('data/reservas.json')
db_funcionarios = TinyDB('data/funcionarios.json')  # Incluindo db_funcionarios

# Definição das consultas com `Query`
Cliente = Query()
Pousada = Query()
Reserva = Query()
Funcionario = Query()
