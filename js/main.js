import ui from './ui.js';
import api from './api.js';

const pensamentosSet = new Set();

async function adicionarChaveAoPensamento() {
    try {
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento => {
            const chavePensamento = 
            `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`;
            pensamentosSet.add(chavePensamento);
        });
    } catch (error) {
        alert('Erro ao adicionar chave ao pensamento!');
        throw error;
    }
}

const regExConteudo = /^[A-Za-zÀ-ÿ\s]{10,}$/;
function validarConteudo(conteudo) {
    return regExConteudo.test(conteudo);
}

const regExAutoria = /^[A-Za-zÀ-ÿ]{3,15}$/
function validarAutoria(autoria) {
    return regExAutoria.test(autoria);
}

function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '');
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();
    adicionarChaveAoPensamento();

    const campoConteudo = document.getElementById('pensamento-conteudo');
    campoConteudo.value = '';
    campoConteudo.focus();

    const formularioPensamento = document.getElementById('pensamento-form');
    formularioPensamento.addEventListener('submit', manipularSubmissaoFormulario);
    
    const inputBusca = document.getElementById('campo-busca');
    inputBusca.addEventListener('input', manipularBusca);

    const btnCancelar = document.getElementById('botao-cancelar');
    btnCancelar.addEventListener('click', ui.limparFormulario);
});

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);

    if (!validarConteudo(conteudoSemEspacos)) {
        return alert('No campo de pensamento é permitido a inclusão apenas de letras e espaços com no mínimo 10 caracteres!');
    } else if (!validarAutoria(autoriaSemEspacos)) {
        return alert('No campo de autoria é permitido apenas a inclução de letras com no mínimo 3 caracteres e no máximo 15!');
    } else if (!validarData(data)) {
        return alert('Não é permitido o cadastro de datas futuras. Selecione outra data!');
    }

    const chaveNovoPensamento = 
    `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`;
    
    if (pensamentosSet.has(chaveNovoPensamento)) {
        return alert('Esse pensamento já existe!');
    }
    
    try {
        if (id) { // Se ja o ID existe, é porque o objeto existe e pode ser modificado
            await api.editarPensamento({ id, conteudo, autoria, data });
        } else {
            await api.salvarPensamento({ conteudo, autoria, data }); // ID não foi passado aqui, pois o JSON Server cria automaticamente
        }
    } catch (error) {
        alert('Erro ao salvar pensamento!');
        throw error;
    }
}

async function manipularBusca() {
    const termoBusca = document.getElementById('campo-busca').value;
    try {
        const pensamentoFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentoFiltrados);
    } catch (error) {
        alert('Erro ao realizar busca!');
        throw error;
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}