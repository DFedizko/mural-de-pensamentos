const URL_BASE = 'http://localhost:3000';

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return response.data // Retorna o array de objetos com os dados em JSON
        } catch (error) {
            alert('Erro ao buscar pensamentos!');
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            await axios.post(`${URL_BASE}/pensamentos`, pensamento);
        } catch (error) {
            alert('Erro ao salvar pensamento!');
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return response.data; // Retorna o objeto que corresponde ao ID passado
        } catch (error) {
            alert('Erro ao buscar pensamento pelo id!');
            throw error;
        }
    },

    async editarPensamento(pensamento) { // Recebe o pensamento com as modificações
        try {
            await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
        } catch (error) {
            alert('Erro ao editar pensamento!');
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            await axios.delete(`${URL_BASE}/pensamentos/${id}`, id);   
        } catch (error) {
            alert('Erro ao excluir um pensamento!');
            throw error;
        }
    },

    async buscarPensamentosPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos(); // Recebe array de objetos que representam pensamentos
            const termoEmMinusculas = termo.toLowerCase();
            
            const pensamentoFiltrados = pensamentos.filter(pensamento => { // Aplica o método filter nesse array

                // Retorna para a variável pensamentoFiltrados um array com os objetos que incluem o parâmetro termo convertido em minúsculas nos valores conteudo ou autoria
                return pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) || pensamento.autoria.toLowerCase().includes(termoEmMinusculas);
            });
            return pensamentoFiltrados; // Envia a variável pra quem chamou
        } catch (error) {
            alert('Erro ao filtrar pensamentos!');
            throw error;
        }
    },

    async atualizarFavorito(id, favorito) {
        try {
            await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito });
        } catch (error) {
            alert('Erro ao atualizar favorito!');
            throw error;
        }
    }
}	

export default api;