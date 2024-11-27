from flask import Flask, Blueprint, request, jsonify
from tinydb import TinyDB, Query

# Configuração do Blueprint para reservas
reserva_bp = Blueprint('reserva', __name__)

# Configuração do banco de dados
db_pousadas = TinyDB('pousada.json')
db_reservas = TinyDB('reservas.json')
Pousada = Query()
Reserva = Query()

# Rota para cadastrar pousada
@reserva_bp.route('/cadastrar_pousada', methods=['POST'])
def cadastrar_pousada():
    data = request.get_json()
    id_pousada, nome, valor = data.get('id_pousada'), data.get('nome'), data.get('valor')

    if id_pousada and nome and valor:
        if db_pousadas.contains(Pousada.id == id_pousada):
            return jsonify({'message': 'ID já cadastrado!'}), 400
        db_pousadas.insert({'id': id_pousada, 'nome': nome, 'valor': valor})
        return jsonify({'message': 'Pousada cadastrada com sucesso!'}), 200
    return jsonify({'message': 'Campos vazios não são permitidos!'}), 400

# Rota para listar todas as pousadas
@reserva_bp.route('/listar_pousadas', methods=['GET'])
def listar_pousadas():
    return jsonify(db_pousadas.all()), 200

# Rota para buscar pousada por ID
@reserva_bp.route('/buscar_pousada_preco', methods=['GET'])
def buscar_pousada_preco():
    pousada_id = request.args.get('pousada_id')
    pousada = db_pousadas.get(Pousada.id == pousada_id)
    
    if pousada:
        return jsonify(success=True, nome=pousada['nome'], valor=pousada['valor'])
    else:
        return jsonify(success=False, message='Pousada não encontrada'), 404

# Rota para incluir reserva
@reserva_bp.route('/reservar_pousada', methods=['POST'])
def reservar_pousada():
    data = request.get_json()
    nomeCompleto = data.get('nomeCompleto')
    cpf = data.get('cpf')
    pousadaId = data.get('pousadaId')
    diaCheckin = data.get('diaCheckin')
    diaCheckout = data.get('diaCheckout')
    quantidade = data.get('quantidade')
    valor = data.get('valor')
    metodoPagamento = data.get('metodoPagamento')

    if nomeCompleto and cpf and pousadaId and diaCheckin and diaCheckout and quantidade and valor and metodoPagamento:
        db_reservas.insert(data)
        return jsonify({'success': True, 'message': 'Reserva incluída com sucesso!'}), 200
    return jsonify({'success': False, 'message': 'Todos os campos são obrigatórios!'}), 400

# Rota para listar todas as reservas
@reserva_bp.route('/listar_reservas', methods=['GET'])
def listar_reservas():
    return jsonify(db_reservas.all()), 200

# Rota para editar uma reserva
@reserva_bp.route('/editar_reserva', methods=['POST'])
def editar_reserva():
    data = request.get_json()
    print(data)  # Adicione esta linha para depurar os dados recebidos
    cpf = data.get('cpf')
    pousadaId = data.get('pousadaId')
    nomeCompleto = data.get('nomeCompleto')
    diaCheckin = data.get('diaCheckin')
    diaCheckout = data.get('diaCheckout')
    quantidade = data.get('quantidade')
    valor = data.get('valor')
    metodoPagamento = data.get('metodoPagamento')

    if cpf and pousadaId and nomeCompleto and diaCheckin and diaCheckout and quantidade and valor and metodoPagamento:
        db_reservas.update({'pousadaId': pousadaId, 'nomeCompleto': nomeCompleto, 'diaCheckin': diaCheckin, 'diaCheckout': diaCheckout, 'quantidade': quantidade, 'valor': valor, 'metodoPagamento': metodoPagamento}, Reserva.cpf == cpf)
        return jsonify({'success': True, 'message': 'Reserva editada com sucesso!'}), 200
    return jsonify({'success': False, 'message': 'Todos os campos são obrigatórios!'}), 400


# Rota para remover uma reserva
@reserva_bp.route('/remover_reserva', methods=['POST'])
def remover_reserva():
    data = request.get_json()
    pousada_id = data.get('pousada_id')

    if db_reservas.remove(Reserva.pousadaId == pousada_id):
        return jsonify({'success': True, 'message': 'Reserva removida com sucesso!'}), 200
    return jsonify({'success': False, 'message': 'Reserva não encontrada!'}), 404

# Inicialização do aplicativo Flask
app = Flask(__name__)
app.register_blueprint(reserva_bp, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)







