class Manutencao {
    constructor(data, tipo, custo, descricao = "") {
        this.data = data;
        this.tipo = tipo;
        this.custo = parseFloat(custo);
        this.descricao = descricao;
    }

    formataManutencao() {
        try {
            const dataFormatada = new Date(this.data).toLocaleDateString();
            return `${this.tipo} em <span class="math-inline">\{dataFormatada\} \- R</span><span class="math-inline">\{this\.custo\.toFixed\(2\)\}</span>{this.descricao ? `(${ this.descricao })` : ''}`;
        } catch (error) {
            console.error("Erro ao formatar data:", error);
            return "Erro ao exibir manutenção";
        }
    }

    validarDados() {
        if (!this.data || isNaN(new Date(this.data).getTime())) {
            alert("Data de manutenção inválida.");
            return false;
        }
        if (isNaN(this.custo) || this.custo < 0) {
            alert("Custo da manutenção inválido.");
            return false;
        }
        if (!this.tipo || this.tipo.trim() === "") {
            alert("O tipo de serviço é obrigatório.");
            return false;
        }
        return true;
    }
}

class Veiculo {
    constructor(tipo, modelo, status = "") {
        this.id = Date.now(); // Simples gerador de ID
        this.tipo = tipo;
        this.modelo = modelo;
        this.status = status;
        this.historicoManutencao = [];
    }

    adicionarManutencao(manutencao) {
        if (manutencao instanceof Manutencao && manutencao.validarDados()) {
            this.historicoManutencao.push(manutencao);
            this.salvarGaragem();
            return true;
        }
        return false;
    }

    getHistoricoManutencaoFormatado() {
        return this.historicoManutencao.map(m => m.formataManutencao());
    }
}

class Carro extends Veiculo {
    constructor(modelo, status) {
        super("Carro", modelo, status);
    }
}

class CarroEsportivo extends Veiculo {
    constructor(modelo, status) {
        super("CarroEsportivo", modelo, status);
    }
}

class Caminhao extends Veiculo {
    constructor(modelo, status) {
        super("Caminhao", modelo, status);
    }
}

class Garagem {
    constructor() {
        this.veiculos = this.carregarGaragem();
    }

    adicionarVeiculo(veiculo) {
        this.veiculos.push(veiculo);
        this.salvarGaragem();
    }

    removerVeiculo(id) {
        this.veiculos = this.veiculos.filter(veiculo => veiculo.id !== parseInt(id));
        this.salvarGaragem();
        closeModal();
    }

    buscarVeiculo(id) {
        return this.veiculos.find(veiculo => veiculo.id === parseInt(id));
    }

    salvarGaragem() {
        const garagemData = JSON.stringify(this.veiculos.map(veiculo => ({
            ...veiculo,
            historicoManutencao: veiculo.historicoManutencao.map(manutencao => ({ ...manutencao }))
        })));
        localStorage.setItem('garagem', garagemData);
        atualizarListaVeiculos();
        atualizarAgendamentosFuturos();
    }

    carregarGaragem() {
        const garagemData = localStorage.getItem('garagem');
        if (garagemData) {
            return JSON.parse(garagemData).map(veiculoData => {
                let veiculo;
                switch (veiculoData.tipo) {
                    case "Carro":
                        veiculo = new Carro(veiculoData.modelo, veiculoData.status);
                        break;
                    case "CarroEsportivo":
                        veiculo = new CarroEsportivo(veiculoData.modelo, veiculoData.status);
                        break;
                    case "Caminhao":
                        veiculo = new Caminhao(veiculoData.modelo, veiculoData.status);
                        break;
                    default:
                        veiculo = new Veiculo(veiculoData.tipo, veiculoData.modelo, veiculoData.status);
                }
                veiculo.id = veiculoData.id;
                veiculo.historicoManutencao = (veiculoData.historicoManutencao || []).map(manutencaoData => new Manutencao(manutencaoData.data, manutencaoData.tipo, manutencaoData.custo, manutencaoData.descricao));
                return veiculo;
            });
        }
        return [];
    }
}

const garagem = new Garagem();
const veiculosLista = document.getElementById('veiculos-lista');
const formAdicionarVeiculo = document.getElementById('form-adicionar-veiculo');
const modalManutencao = document.getElementById('modal-manutencao');
const closeButton = document.querySelector('.close-button');
const historicoManutencaoLista = document.getElementById('historico-manutencao-lista');
const formAgendarManutencao = document.getElementById('form-agendar-manutencao');
const veiculoIdManutencaoInput = document.getElementById('veiculo-id-manutencao');
const dataAgendamentoInput = document.getElementById('data-agendamento');
const tipoServicoInput = document.getElementById('tipo-servico');
const custoServicoInput = document.getElementById('custo-servico');
const descricaoServicoInput = document.getElementById('descricao-servico');
const veiculoDetalhesDiv = document.getElementById('veiculo-detalhes');
const agendamentosLista = document.getElementById('agendamentos-lista');
const mensagemAgendamentoDiv = document.getElementById('mensagem-agendamento');
const modalTituloManutencao = document.getElementById('modal-titulo-manutencao');

flatpickr(dataAgendamentoInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: new Date().fp.formatDate(new Date(), "Y-m-d H:i"), // Define a data mínima como a data e hora atuais
});

function atualizarListaVeiculos() {
    veiculosLista.innerHTML = '';
    garagem.veiculos.forEach(veiculo => {
        const listItem = document.createElement('li');
        listItem.classList.add('veiculo-item');
        listItem.innerHTML = `
            <span>${veiculo.tipo} - <span class="math-inline">\{veiculo\.modelo\} \(</span>{veiculo.status || 'Sem status'})</span>
            <div class="veiculo-acoes">
                <button class="btn-detalhes" data-id="<span class="math-inline">\{veiculo\.id\}"\>Detalhes/Agendar</button\>
<button class\="btn\-remover" data\-id\="</span>{veiculo.id}">Remover</button>
            </div>
        `;
        veiculosLista.appendChild(listItem);

        const detalhesButton = listItem.querySelector('.btn-detalhes');
        detalhesButton.addEventListener('click', () => exibirModalManutencao(veiculo.id));

        const removerButton = listItem.querySelector('.btn-remover');
        removerButton.addEventListener('click', () => removerVeiculoDaGaragem(veiculo.id));
    });
}

function removerVeiculoDaGaragem(id) {
    if (confirm("Tem certeza que deseja remover este veículo?")) {
        garagem.removerVeiculo(id);
    }
}

function exibirModalManutencao(id) {
    const veiculo = garagem.buscarVeiculo(id);
    if (veiculo) {
        modalTituloManutencao.textContent = `Manutenção e Agendamento: ${veiculo.tipo} - ${veiculo.modelo}`;
        veiculoDetalhesDiv.innerHTML = `<p><strong>Tipo:</strong> ${veiculo.tipo}</p><p><strong>Modelo:</strong> ${veiculo.modelo}</p><p><strong>Status:</strong> ${veiculo.status || 'Sem status'}</p>`;
        veiculoIdManutencaoInput.value = id;
        exibirHistoricoManutencao(id);
        modalManutencao.style.display = "block";
    }
}

function exibirHistoricoManutencao(veiculoId) {
    historicoManutencaoLista.innerHTML = '';
    const veiculo = garagem.buscarVeiculo(veiculoId);
    if (veiculo) {
        veiculo.historicoManutencao.forEach(manutencao => {
            const listItem = document.createElement('li');
            listItem.textContent = manutencao.formataManutencao();
            historicoManutencaoLista.appendChild(listItem);
        });
    }
}

function closeModal() {
    modalManutencao.style.display = "none";
    mensagemAgendamentoDiv.textContent = '';
    mensagemAgendamentoDiv.className = 'mensagem';
    formAgendarManutencao.reset();
}

closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modalManutencao) {
        closeModal();
    }
});

formAdicionarVeiculo.addEventListener('submit', (event) => {
    event.preventDefault();

    const tipo = document.getElementById('tipo-veiculo').value;
    const modelo = document.getElementById('modelo-veiculo').value;
    const status = document.getElementById('status-veiculo').value;

    let novoVeiculo;
    switch (tipo) {
        case "Carro":
            novoVeiculo = new Carro(modelo, status);
            break;
        case "CarroEsportivo":
            novoVeiculo = new CarroEsportivo(modelo, status);
            break;
        case "Caminhao": // Adicionando o caso para Caminhao
            novoVeiculo = new Caminhao(modelo, status);
            break;
        default:
            console.error("Tipo de veículo inválido:", tipo);
            return; // Encerra a função se o tipo for inválido
    }

    garagem.adicionarVeiculo(novoVeiculo);
    formAdicionarVeiculo.reset();
});
