from flask import Blueprint, request, jsonify
from tinydb import TinyDB, Query

# Configuração do Blueprint
pousada_bp = Blueprint('pousada', __name__)

# Configuração do banco de dados
db_pousadas = TinyDB('pousada.json')
Pousada = Query()

# Rota para cadastrar pousada
@pousada_bp.route('/cadastrar_pousada', methods=['POST'])
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
@pousada_bp.route('/listar_pousadas', methods=['GET'])
def listar_pousadas():
    return jsonify(db_pousadas.all()), 200

# Rota para buscar pousada por ID
@pousada_bp.route('/listar_pousada/<id_pousada>', methods=['GET'])
def listar_pousada(id_pousada):
    pousada = db_pousadas.get(Pousada.id == id_pousada)
    if pousada:
        return jsonify(pousada), 200
    return jsonify({'message': 'Pousada não encontrada!'}), 404

# Rota para remover uma pousada
@pousada_bp.route('/remover_pousada', methods=['POST'])
def remover_pousada():
    data = request.get_json()
    id_pousada = data.get('id_pousada')

    if db_pousadas.remove(Pousada.id == id_pousada):
        return jsonify({'message': 'Pousada removida com sucesso!'}), 200
    return jsonify({'message': 'Pousada não encontrada!'}), 404




