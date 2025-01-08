import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

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

    try {
        if (id) { // Se ja o ID existe, é porque o objeto existe e pode ser modificado
            await api.editarPensamento({ id, conteudo, autoria });
        } else {
            await api.salvarPensamento({ conteudo, autoria }); // ID não foi passado aqui, pois o JSON Server cria automaticamente
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