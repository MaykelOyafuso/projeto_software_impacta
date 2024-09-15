document.getElementById('form-criar-livro').addEventListener('submit', function (e) {
  e.preventDefault();

  //Coletar dados do formulário
  const livro = {
      titulo: document.getElementById('titulo').value,
      autor: document.getElementById('autor').value,
      editora: document.getElementById('editora').value,
      anopublicacao: document.getElementById('anopublicacao').value,
      disponibilidade: document.getElementById('disponibilidade').value
  };

  //Enviar dados para a aplicação
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
      //loadBooks();
  })
  .catch(error => console.error('Erro:', error));
});

