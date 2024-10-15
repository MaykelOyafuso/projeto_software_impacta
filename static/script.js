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
  
    // Enviar dados para a aplicação
    fetch('/gravarLivro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
    .then(response => response.json())
    .then(data => {
        alert('Livro adicionado com sucesso!');
        document.getElementById('form-criar-livro').reset();
        loadBooks();  // Carrega a lista após adicionar
    })
    .catch(error => console.error('Erro:', error));
  });
  
// Listar livros cadastrados
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

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro:', error));
}

loadBooks();  // Carregar a lista de livros ao iniciar