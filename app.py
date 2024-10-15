from flask import Flask, request, render_template, jsonify
from db import conexao_banco_dados

app = Flask(__name__)

# Rota principal
@app.route('/')
def index():
    return render_template('index.html')

# Criar um novo livro
@app.route('/gravarLivro', methods=['POST'])
def gravar_livro():
    data = request.json
    conn = conexao_banco_dados()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Livros (Titulo, Autor, Editora, AnoPublicacao, Disponibilidade) VALUES (?, ?, ?, ?, ?)",
        (data['titulo'], data['autor'], data['editora'], data['anopublicacao'], data['disponibilidade'])
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Livro adicionado com sucesso!'}), 201

# Listar todos os livros em ordem decrescente de ID
@app.route('/listarLivros', methods=['GET'])
def listar_livros():
    conn = conexao_banco_dados()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Livros ORDER BY ID DESC")  # Ordenação decrescente
    livros = cursor.fetchall()
    cursor.close()
    conn.close()
    
    # Transformar em dicionário para JSON serializável
    livros_list = [
        {
            "Titulo": livro[1],
            "Autor": livro[2],
            "Editora": livro[3],
            "AnoPublicacao": livro[4],
            "Disponibilidade": livro[5]
        } for livro in livros
    ]
    
    return jsonify(livros_list)

# Executa o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)