document.getElementById('form-criar-livro').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Coletar dados do formulário
    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        editora: document.getElementById('editora').value,
        anopublicacao: document.getElementById('anopublicacao').value,
        disponibilidade: document.getElementById('disponibilidade').value
    };

    const livroId = document.getElementById('livro-id').value;
    const isEditing = livroId !== ""; // Verifica se é uma edição
  
    const url = isEditing ? `/atualizarLivro/${livroId}` : '/gravarLivro'; // Define a URL da requisição
    const method = isEditing ? 'PUT' : 'POST'; // Define o método da requisição
  
    // Enviar dados para a aplicação
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
    .then(response => response.json())
    .then(data => {
        alert(isEditing ? 'Livro atualizado com sucesso!' : 'Livro adicionado com sucesso!');
        document.getElementById('form-criar-livro').reset();
        document.getElementById('livro-id').value = ""; // Limpa o ID do livro em edição
        document.getElementById('submit-button').textContent = 'Adicionar Livro'; // Altera o botão para o modo "Adicionar"
        loadBooks();  // Carrega a lista após adicionar ou atualizar
    })
    .catch(error => console.error('Erro:', error));
});

// Função para carregar livros e incluir botão de edição
function loadBooks() {
    fetch('/listarLivros')
        .then(response => response.json())
        .then(livros => {
            const tbody = document.getElementById('livros');
            tbody.innerHTML = '';  // Limpar tabela atual

            livros.forEach(livro => {
                const tr = document.createElement('tr');
                
                // Criar e preencher as células (colunas) da tabela
                const tituloTd = document.createElement('td');
                tituloTd.textContent = livro.Titulo;
                tr.appendChild(tituloTd);

                const autorTd = document.createElement('td');
                autorTd.textContent = livro.Autor;
                tr.appendChild(autorTd);

                const editoraTd = document.createElement('td');
                editoraTd.textContent = livro.Editora;
                tr.appendChild(editoraTd);

                const anoTd = document.createElement('td');
                anoTd.textContent = livro.AnoPublicacao;
                tr.appendChild(anoTd);

                const disponibilidadeTd = document.createElement('td');
                disponibilidadeTd.textContent = Number(livro.Disponibilidade) === 1 ? 'Sim' : 'Não';
                tr.appendChild(disponibilidadeTd);

                // Botão de edição
                const actionsTd = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => fillFormForEdit(livro);
                actionsTd.appendChild(editButton);
                tr.appendChild(actionsTd);

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Função para preencher o formulário com os dados do livro selecionado para edição
function fillFormForEdit(livro) {
    document.getElementById('livro-id').value = livro.ID;
    document.getElementById('titulo').value = livro.Titulo;
    document.getElementById('autor').value = livro.Autor;
    document.getElementById('editora').value = livro.Editora;
    document.getElementById('anopublicacao').value = livro.AnoPublicacao;
    document.getElementById('disponibilidade').value = livro.Disponibilidade;
    document.getElementById('submit-button').textContent = 'Atualizar Livro'; // Altera o botão para o modo "Atualizar"
}

// Carregar a lista de livros ao iniciar
loadBooks();
