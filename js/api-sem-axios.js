const URL_BASE = 'http://localhost:3000';

const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`);
            return await response.json(); // Retorna o array de objetos com os dados em JSON
        }
        catch (error) {
            alert('Erro ao buscar pensamentos!');
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            await fetch(`${URL_BASE}/pensamentos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pensamento), // Adiciona um dado para a API (faz um POST), que nesse caso é o JSON Server
            });
        } catch (error) {
            alert('Erro ao salvar pensamento!');
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
            return await response.json(); // Retorna o objeto que corresponde ao ID passado
        } catch (error) {
            alert('Erro ao buscar pensamento pelo id!');
            throw error;
        }
    },

    async editarPensamento(pensamento) { // Recebe o pensamento com as modificações
        try {
            await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pensamento), // Salva o pensamento dentro do JSON com as modificações
            });
        } catch (error) {
            alert('Erro ao editar pensamento!');
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: 'DELETE' // Deleta o objeto especificado pelo id
            });
            
        } catch (error) {
            alert('Erro ao excluir um pensamento!');
            throw error;
        }
    }
}

export default api;