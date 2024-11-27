from flask import Blueprint, request, jsonify
from app.db_config import db_clientes, Cliente
from tinydb import Query

cliente_bp = Blueprint('cliente', __name__)

@cliente_bp.route('/cadastrar_cliente', methods=['POST'])
def cadastrar_cliente():
    nome = request.form.get('nome')
    cpf_cnpj = request.form.get('cpf_cnpj')
    telefone = request.form.get('telefone')
    email = request.form.get('email')

    if nome and cpf_cnpj and telefone and email:
        db_clientes.insert({
            'nome': nome,
            'cpf_cnpj': cpf_cnpj,
            'telefone': telefone,
            'email': email
        })
        return jsonify({'message': 'Cliente cadastrado com sucesso!'}), 200
    return jsonify({'message': 'Falha ao cadastrar cliente! Campos vazios.'}), 400

@cliente_bp.route('/listar_clientes', methods=['GET'])
def listar_clientes():
    clientes = db_clientes.search(Cliente.cpf_cnpj.exists())
    return jsonify(clientes), 200

@cliente_bp.route('/editar_cliente', methods=['POST'])
def editar_cliente():
    cpf_cnpj = request.form.get('cpf_cnpj')
    nome = request.form.get('nome')
    telefone = request.form.get('telefone')
    email = request.form.get('email')

    if cpf_cnpj:
        db_clientes.update({
            'nome': nome,
            'telefone': telefone,
            'email': email
        }, Cliente.cpf_cnpj == cpf_cnpj)
        return jsonify({'message': 'Cliente atualizado com sucesso!'}), 200
    return jsonify({'message': 'Cliente não encontrado!'}), 404

@cliente_bp.route('/remover_cliente', methods=['POST'])
def remover_cliente():
    cpf_cnpj = request.form.get('cpf_cnpj')

    if cpf_cnpj:
        db_clientes.remove(Cliente.cpf_cnpj == cpf_cnpj)
        return jsonify({'message': 'Cliente removido com sucesso!'}), 200
    return jsonify({'message': 'Falha ao remover cliente! Campos vazios.'}), 400
