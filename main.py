from flask import Flask, session, redirect, url_for, render_template, request, jsonify
from app.db_config import db_funcionarios, Funcionario, db_reservas
from werkzeug.security import generate_password_hash, check_password_hash
from app.cliente import cliente_bp
from app.pousada import pousada_bp
from app.reserva import reserva_bp
from tinydb import Query

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'

# Registra os Blueprints
app.register_blueprint(cliente_bp)
app.register_blueprint(pousada_bp)
app.register_blueprint(reserva_bp)

# Rota de login
@app.route('/')
def login():
    # Verifica se o usuário já está logado, e caso positivo, redireciona para o menu principal
    if 'user' in session:
        return redirect(url_for('index'))
    # Caso contrário, renderiza a página de login
    return render_template('login.html')

# Rota para processar o login
@app.route('/login', methods=['POST'])
def login_post():
    cpf_cnpj = request.form.get('cpf_cnpj')
    senha = request.form.get('senha')
    
    funcionario = db_funcionarios.search(Funcionario.cpf_cnpj == cpf_cnpj)
    if funcionario and check_password_hash(funcionario[0]['senha'], senha):
        session['user'] = funcionario[0]['cpf_cnpj']  # Armazena o login na sessão
        return redirect(url_for('index'))  # Redireciona para o menu principal
    else:
        return jsonify({'message': 'Falha no login! Verifique suas credenciais.'})

# Rota para o menu principal (index.html)
@app.route('/index')
def index():
    # Verifica se o usuário está na sessão, caso contrário, redireciona para login
    if 'user' not in session:
        return redirect(url_for('login'))
    # Renderiza o menu principal se o usuário está logado
    return render_template('index.html', user=session['user'])

# Rota para a página de gerenciamento de clientes
@app.route('/clientes')
def clientes():
    # Verifica se o usuário está na sessão, caso contrário, redireciona para login
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('clientes.html')

# Rota para a página de gerenciamento de pousadas
@app.route('/pousadas')
def pousadas():
    # Verifica se o usuário está na sessão, caso contrário, redireciona para login
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('pousadas.html')

# Rota para a página de reserva de pousada
@app.route('/reservas')
def reservas():
    # Verifica se o usuário está na sessão, caso contrário, redireciona para login
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('reservas.html')

@app.route('/chat')
def chat():
    # Verifica se o usuário está na sessão, caso contrário, redireciona para login
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('chat.html')

# Rota para listar todas as reservas
@app.route('/listar_reservas', methods=['GET'])
def listar_reservas():
    # Verifica se o usuário está na sessão, caso contrário, redireciona para login
    if 'user' not in session:
        return redirect(url_for('login'))
    
    Reserva = Query()
    reservas = db_reservas.search(Reserva.pousada_id.exists())
    return jsonify(reservas), 200

# Rota para logout
@app.route('/logout')
def logout():
    # Remove o usuário da sessão
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True, port=8080)

