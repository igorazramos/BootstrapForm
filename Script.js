let filiais = [
    { codigo: '001', nome: 'Filial Centro', endereco: 'Rua Central, 123', responsavel: 'Carlos Silva' },
    { codigo: '002', nome: 'Filial Zona Sul', endereco: 'Avenida Sul, 456', responsavel: 'Maria Oliveira' },
    { codigo: '003', nome: 'Filial Norte', endereco: 'Rua Norte, 789', responsavel: 'João Souza' },
    { codigo: '004', nome: 'Filial Leste', endereco: 'Avenida Leste, 101', responsavel: 'Ana Costa' },
    { codigo: '005', nome: 'Filial Oeste', endereco: 'Rua Oeste, 202', responsavel: 'Pedro Almeida' },
    { codigo: '006', nome: 'Filial Industrial', endereco: 'Avenida das Indústrias, 303', responsavel: 'Roberta Lima' },
    { codigo: '007', nome: 'Filial Aeroporto', endereco: 'Rodovia Aeroporto, 404', responsavel: 'Fernando Martins' },
    { codigo: '008', nome: 'Filial Praia', endereco: 'Rua da Praia, 505', responsavel: 'Juliana Ferreira' },
    { codigo: '009', nome: 'Filial Montanha', endereco: 'Estrada da Montanha, 606', responsavel: 'Ricardo Mendes' },
    { codigo: '010', nome: 'Filial Parque', endereco: 'Avenida do Parque, 707', responsavel: 'Sônia Ramos' }
];

let responsaveis = [
  { nome: 'Ana Silva' },
  { nome: 'Carlos Sousa' },
  { nome: 'Mariana Oliveira' },
  { nome: 'Pedro Lima' },
  { nome: 'Roberta Alves' },
  { nome: 'João Carvalho' },
  { nome: 'Cláudia Monteiro' },
  { nome: 'Rafael Costa' },
  { nome: 'Beatriz Pereira' },
  { nome: 'Felipe Santos' }
];

// INICIA A TELA
window.onload = function() {
  atualizarFiliaisDestino();
  atualizarResponsaveis();
};

function cadastrarFilial(event) {
  event.preventDefault();
  
  const codigo = document.getElementById('codigoFilial').value;
  const nome = document.getElementById('nomeFilial').value;
  const endereco = document.getElementById('enderecoFilial').value;
  const responsavel = document.getElementById('responsavelFilial').value;

  if (filiais.find(f => f.codigo === codigo)) {
    alert('Código de filial já cadastrado!');
    return;
  }

  filiais.push({ codigo, nome, endereco, responsavel });
  alert('Filial cadastrada com sucesso!');

  limparCamposFilial();
  atualizarFiliaisDestino();
}

function cadastrarEntrega(event) {
  event.preventDefault();

  const prazo = document.getElementById('prazoEntrega').value;
  const dataAtual = new Date().toISOString().split('T')[0]; // OBTÉM A DATA ATUAL NO FORMATO YYYY-MM-DD

  if (prazo < dataAtual) {
    alert('O prazo da entrega não pode ser anterior à data atual.');
    return;
  }

  alert('Entrega registrada com sucesso!');
  limparCamposEntrega();
}

function limparCamposFilial() {
  document.getElementById('codigoFilial').value = '';
  document.getElementById('nomeFilial').value = '';
  document.getElementById('enderecoFilial').value = '';
  document.getElementById('responsavelFilial').value = '';
}

function limparCamposEntrega() {
  document.getElementById('cepOrigem').value = '';
  document.getElementById('ruaOrigem').value = '';
  document.getElementById('cidadeOrigem').value = '';
  document.getElementById('estadoOrigem').value = '';
  document.getElementById('filialDestino').value = '';
  document.getElementById('prazoEntrega').value = '';
  document.getElementById('descricaoMercadoria').value = '';
}

function atualizarFiliaisDestino() {
  const filialDestino = document.getElementById('filialDestino');
  filialDestino.innerHTML = '';

  filiais.forEach(filial => {
    const option = document.createElement('option');
    option.value = filial.codigo;
    option.textContent = `${filial.codigo} - ${filial.nome} - Responsável: ${filial.responsavel}`;
    filialDestino.appendChild(option);
  });

  $(filialDestino).select2({
    placeholder: "Buscar filial...",
    allowClear: true
});
}

function atualizarResponsaveis() {
  const responsavelSelect = document.getElementById('responsavelFilial');
  responsavelSelect.innerHTML = '<option value="">Selecione um responsável</option>';

  responsaveis.forEach(responsavel => {
      const option = document.createElement('option');
      option.value = responsavel.nome;
      option.textContent = responsavel.nome;
      responsavelSelect.appendChild(option);
  });

  $(responsavelSelect).select2({
      placeholder: "Buscar responsável...",
      allowClear: true
  });
}

function buscarCEP() {
  const cep = document.getElementById('cepOrigem').value;

  if (!cep) {
    alert('Por favor, insira um CEP.');
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert('CEP não encontrado!');
        return;
      }

      document.getElementById('ruaOrigem').value = data.logradouro;
      document.getElementById('cidadeOrigem').value = data.localidade;
      document.getElementById('estadoOrigem').value = data.uf;
    })
    .catch(error => {
      alert('Erro ao buscar CEP.');
      console.error(error);
    });
}

//POR ALGUM MOTIVO O CAMPO DO TIPO NUMBER ESTA ACEITANDO A LETRA "E", POR ISSO FIZ ESSA FUNÇÃO PARA RECUSAR A LETRA "E"
function evitarLetraE() {
  const codigoFilial = document.getElementById('codigoFilial');
  
  codigoFilial.value = codigoFilial.value.replace(/e/gi, '');
}