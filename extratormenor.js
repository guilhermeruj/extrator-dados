const fs = require('fs');

// Lê o arquivo JSON
fs.readFile('resultados.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Converte o JSON em um objeto JavaScript
  const jsonData = JSON.parse(data);

  // Extrai os contatos com as propriedades modificadas
  const contatos = jsonData.map((item, index) => {
    const { telefone, cpf } = item;
    const primeiroNome = cpf.split(' ')[0];
    const tel = "349" + telefone.substring(2);
    return { id: index + 1, telefone: tel, nome: primeiroNome };
  });

  // Converte os contatos em JSON
  const novoJSON = JSON.stringify(contatos, null, 2);

  // Salva o novo JSON em um arquivo
  fs.writeFile('novo_dados.json', novoJSON, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Novo arquivo JSON salvo com sucesso.');
  });
});
