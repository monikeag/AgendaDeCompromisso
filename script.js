//Elemntos do formulário
const form = document.getElementById('form-compromisso');
const inputCompromisso = document.getElementById('compromisso');
const inputData = document.getElementById('data');
const inputHora = document.getElementById('hora');
const listaCompromissos = document.getElementById('lista-compromissos');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o atualizar a página ao enviar o formulário

    const compromisso = inputCompromisso.value;
    const data = formatarData(inputData.value);
    const hora = inputHora.value;


    const compromissoTitulo = { // Gera um ID único baseado na hora atual
        id: Date.now(),
        compromisso,
        data,
        hora
    }

    salvarCompromisso(compromissoTitulo); // Salva o compromisso no localStorage
    exibirCompromissos(); // Atualiza a lista de compromissos
    form.reset(); // Limpa os campos do formulário

});

function formatarData(data) {
    const partes = data.split('-'); // Divide a data no formato YYYY-MM-DD
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna a data no formato DD/MM/YYYY
}

function salvarCompromisso(compromisso) {
    let compromissos = JSON.parse(localStorage.getItem('compromissos')) || []; // Recupera os compromissos do localStorage ou cria um array vazio
    compromissos.push(compromisso); // Adiciona o novo compromisso ao array
    localStorage.setItem('compromissos', JSON.stringify(compromissos)); // Salva o array atualizado no localStorage
}

function exibirCompromissos() {
    let compromissos = JSON.parse(localStorage.getItem('compromissos')) || [];
    listaCompromissos.innerHTML = ''; //limpa a lista antes de renderizar

    compromissos.forEach(comp => {
        const div = document.createElement('div'); // Cria um elemento div para cada compromisso
        div.classList.add('compromisso'); // Adiciona uma classe CSS para estilização
        div.innerHTML = `<strong>${comp.compromisso}</strong><br>
        ${comp.data} às ${comp.hora} <br>
        <button class="btn-excluir" data-id="${comp.id}"><i class="fas fa-trash-alt"></i></button>`;

        const botao = div.querySelector('.btn-excluir'); // Seleciona o botão de excluir dentro da div
        botao.addEventListener('click', function () {
            const id = Number(this.getAttribute('data-id')); // Obtém o ID do compromisso a ser excluído
            excluirCompromisso(id); // Chama a função para excluir o compromisso
        });

        // Adiciona o conteúdo do compromisso à div
        listaCompromissos.appendChild(div); // Adiciona a div à lista de compromissos'

    });





}

function excluirCompromisso(id) {
    let compromissos = JSON.parse(localStorage.getItem('compromissos')) || []; // Recupera os compromissos do localStorage
    const novaLista = compromissos.filter(comp => comp.id !== id); // Filtra os compromissos, removendo o que tem o ID correspondente
    localStorage.setItem('compromissos', JSON.stringify(novaLista)); // Atualiza o localStorage com a nova lista de compromissos

    exibirCompromissos(); // Chama a função para exibir os compromissos
}

exibirCompromissos(); // Chama a função para exibir os compromissos

const btnDarkMode = document.getElementById('toggle-dark-mode');

btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Salva preferência no localStorage
    const modoEscuroAtivado = document.body.classList.contains('dark-mode');
    localStorage.setItem('modo-escuro', modoEscuroAtivado);
});

// Ao carregar a página, verifica se o modo escuro estava ativado
window.addEventListener('DOMContentLoaded', () => {
    const modoEscuroAtivado = localStorage.getItem('modo-escuro') === 'true';
    if (modoEscuroAtivado) {
        document.body.classList.add('dark-mode');
    }
});


