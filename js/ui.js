import api from "./api.js";

const ui = {

    // Preenche o formulario com os valores do objeto localizado através do método buscarPensamentoPorId
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById('pensamento-id').value = pensamento.id; // Preenche um input invisível declarando o id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo;
        document.getElementById('pensamento-autoria').value = pensamento.autoria;
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        listaPensamentos.innerHTML = ''; // Esvazia a UL antes de carregar os pensamentos

        try {
            let pensamentosParaRenderizar;

            if (pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados;
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos();
            }

            pensamentosParaRenderizar.forEach(this.adicionarPensamentoNaLista);
        } catch {
            alert('Erro ao renderizar pensamentos!');
        }

        const mensagemVazia = document.getElementById('mensagem-vazia');
        listaPensamentos.innerHTML == '' ? mensagemVazia.style.display = 'block' : mensagemVazia.style.display = 'none'; 
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const li = document.createElement('li');
        li.setAttribute('data-id', pensamento.id);
        li.classList.add('li-pensamento');

        const iconeAspas = document.createElement('img');
        iconeAspas.src = './assets/imagens/aspas-azuis.png';
        iconeAspas.alt = 'Aspas azuis';
        iconeAspas.classList.add('icone-aspas');

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add('pensamento-conteudo');
        
        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add('pensamento-conteudo');

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('botao-editar');
        btnEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement('img');
        iconeEditar.src = './assets/imagens/icone-editar.png'; 
        iconeEditar.alt = 'Editar';
        btnEditar.appendChild(iconeEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('botao-excluir');
        btnExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
            } catch (error) {
                alert('Erro ao excluir pensamento!');
                throw error;
            }
        }

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = './assets/imagens/icone-excluir.png';
        iconeExcluir.alt = 'Excluir';
        btnExcluir.appendChild(iconeExcluir);

        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.append(btnEditar, btnExcluir);

        li.append(iconeAspas, pensamentoConteudo, pensamentoAutoria, icones);
        listaPensamentos.appendChild(li);
    },

    limparFormulario() {
        document.getElementById('pensamento-form').reset();
    }
}

export default ui;