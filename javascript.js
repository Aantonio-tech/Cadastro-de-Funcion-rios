 // Classe que representa um Funcionário
class Funcionario {
    constructor(id, nome, cargo, salario) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.salario = salario;
        this.dataCadastro = new Date();
    }
}

// Classe que gerencia o Sistema de Cadastro
class SistemaCadastro {
    constructor() {
        this.funcionarios = [];
        this.proximoId = 1;
    }

    // C - Criar (Create)
    cadastrar(nome, cargo, salario) {
        const novoFuncionario = new Funcionario(this.proximoId, nome, cargo, salario);
        this.funcionarios.push(novoFuncionario);
        this.proximoId++;
        console.log(`✅ Funcionário "${nome}" cadastrado com sucesso! ID: ${novoFuncionario.id}`);
        return novoFuncionario;
    }

    // R - Ler Todos (Read All)
    listarTodos() {
        if (this.funcionarios.length === 0) {
            console.log("⚠️ Nenhum funcionário cadastrado.");
            return [];
        }
        console.log("\n--- Lista de Funcionários ---");
        this.funcionarios.forEach(f => {
            console.log(`ID: ${f.id} | Nome: ${f.nome} | Cargo: ${f.cargo} | Salário: R$ ${f.salario.toFixed(2)}`);
        });
        return this.funcionarios;
    }

    // R - Buscar por ID (Read by ID)
    buscarPorId(id) {
        const funcionario = this.funcionarios.find(f => f.id === id);
        if (!funcionario) {
            console.log(`❌ Funcionário com ID ${id} não encontrado.`);
            return null;
        }
        return funcionario;
    }

    // U - Atualizar (Update)
    atualizar(id, novosDados) {
        const funcionario = this.buscarPorId(id);
        if (!funcionario) return false;

        // Atualiza apenas os campos enviados no objeto novosDados
        if (novosDados.nome) funcionario.nome = novosDados.nome;
        if (novosDados.cargo) funcionario.cargo = novosDados.cargo;
        if (novosDados.salario) funcionario.salario = novosDados.salario;

        console.log(`🔄 Funcionário ID ${id} atualizado com sucesso!`);
        return true;
    }

    // D - Deletar (Delete)
    remover(id) {
        const indice = this.funcionarios.findIndex(f => f.id === id);
        if (indice === -1) {
            console.log(`❌ Não foi possível remover: ID ${id} não existe.`);
            return false;
        }
        const removido = this.funcionarios.splice(indice, 1);
        console.log(`🗑️ Funcionário "${removido[0].nome}" removido com sucesso.`);
        return true;
    }
}

// --- EXEMPLO DE USO ---

const sistema = new SistemaCadastro();

// 1. Cadastrando funcionários
sistema.cadastrar("Alice Silva", "Desenvolvedora Frontend", 5500);
sistema.cadastrar("Bruno Costa", "Gerente de Projetos", 8000);

// 2. Listando o cadastro inicial
sistema.listarTodos();

// 3. Atualizando o cargo e salário da Alice
sistema.atualizar(1, { cargo: "Desenvolvedora Fullstack", salario: 6800 });

// 4. Removendo o Bruno
sistema.remover(2);

// 5. Listando novamente para ver as alterações
sistema.listarTodos();
