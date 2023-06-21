const fs = require('fs');

// Lê o arquivo de texto
fs.readFile('clinicasUberlandia.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Divide o texto em linhas
  const lines = data.split('\n');

  // Cria um array para armazenar os objetos formatados
  const formattedData = [];

  // Itera sobre cada linha
  lines.forEach(line => {
    // Divide a linha em campos separados por vírgula
    const fields = line.split(',');

    // Cria um objeto com os campos formatados
    const obj = {
      nome: fields[0],
      telefone: fields[1],
      cpf: fields[2],
      cnpj: fields[3],
      valor: parseInt(fields[4]),
      matriz: fields[5],
      tipoEmpresa: fields[6],
      atividade: fields[7],
      situacao: fields[8],
      dataAbertura: fields[9],
      motivo: fields[10],
      endereco: {
        logradouro: fields[11],
        numero: fields[12],
        complemento: fields[13],
        bairro: fields[14],
        cidade: fields[15],
        estado: fields[16],
        cep: fields[17]
      },
      tipoProprietario: fields[18],
      cnaesPrincipais: fields[19] ? fields[19].split(';') : [],
      cnaesSecundarios: fields[20] ? fields[20].split(';') : [],
      socios: fields[21] ? fields[21].split(';').map(socio => {
        const [nome, cpf] = socio.split('*');
        return { nome, cpf };
      }) : []
    };

    // Adiciona o objeto formatado ao array
    formattedData.push(obj);
  });

  // Salva os dados formatados em um arquivo JSON
  fs.writeFile('resultados.json', JSON.stringify(formattedData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Arquivo JSON salvo com sucesso!');
  });
});
