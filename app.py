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

# Executa o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)
