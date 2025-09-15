// ================= MENU HAMBÚRGUER =================
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const menuOverlay = document.querySelector('.menu-overlay');

if (menuToggle && sideMenu && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    menuOverlay.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });
}

// ================= BOTÃO VOLTAR AO TOPO =================
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== DADOS DOS PRODUTOS ====================
const produtos = [
    { id: 1, nome: "Pão Francês", preco: 1.50, categoria: "Pães" },
    { id: 2, nome: "Bolo de Cenoura", preco: 25.00, categoria: "Bolos" },
    { id: 3, nome: "Coxinha de Frango", preco: 8.00, categoria: "Salgados" },
    { id: 4, nome: "Pão Integral", preco: 5.50, categoria: "Pães" },
    { id: 5, nome: "Torta de Limão", preco: 35.00, categoria: "Doces" }
];

// Funções do carrinho usando localStorage para persistência
function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function setCarrinho(novoCarrinho) {
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
}

// ==================== FUNÇÕES DA PÁGINA DE PEDIDOS ====================
function renderizarProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    if (!listaProdutos) return;

    listaProdutos.innerHTML = '';
    produtos.forEach(produto => {
        const produtoElement = document.createElement('div');
        produtoElement.classList.add('produto-card');
        produtoElement.innerHTML = `
            <h4>${produto.nome}</h4>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
        `;
        listaProdutos.appendChild(produtoElement);
    });
}

function adicionarAoCarrinho(produtoId) {
    let carrinho = getCarrinho();
    const produtoExistente = carrinho.find(item => item.id === produtoId);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        const produto = produtos.find(p => p.id === produtoId);
        if (produto) {
            carrinho.push({ ...produto, quantidade: 1 });
        }
    }
    setCarrinho(carrinho);
    renderizarCarrinho();
}

function removerDoCarrinho(produtoId) {
    let carrinho = getCarrinho();
    const produtoIndex = carrinho.findIndex(item => item.id === produtoId);
    if (produtoIndex !== -1) {
        carrinho.splice(produtoIndex, 1);
    }
    setCarrinho(carrinho);
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    if (!carrinhoElement) return;

    let carrinho = getCarrinho();
    if (carrinho.length === 0) {
        carrinhoElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinhoElement.innerHTML = '';
        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrinho-item');
            itemElement.innerHTML = `
                <p>${item.nome} x ${item.quantidade}</p>
                <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                <button onclick="removerDoCarrinho(${item.id})">Remover</button>
            `;
            carrinhoElement.appendChild(itemElement);
        });
    }
    
    calcularTotal();
}

function calcularTotal() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const descontoElement = document.getElementById('valor-desconto');
    
    if (!subtotalElement || !totalElement || !descontoElement) return;

    let carrinho = getCarrinho();
    let subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    let desconto = 0;
    if (totalItens > 20) {
        desconto = subtotal * 0.10;
    }
    
    const total = subtotal - desconto;
    
    subtotalElement.textContent = subtotal.toFixed(2);
    descontoElement.textContent = desconto.toFixed(2);
    totalElement.textContent = total.toFixed(2);
}

function converterMoeda(moeda) {
    const totalElement = document.getElementById('total');
    const moedaConvertidaElement = document.getElementById('moeda-convertida');
    
    if (!totalElement || !moedaConvertidaElement) return;
    
    const totalBRL = parseFloat(totalElement.textContent) || 0;
    let valorConvertido = totalBRL;
    let simbolo = "R$";
    
    const cotacoes = {
        'USD': 5.0, 
        'EUR': 6.0, 
        'BRL': 1.0
    };
    
    if (cotacoes[moeda]) {
        valorConvertido = totalBRL / cotacoes[moeda];
        simbolo = moeda === 'USD' ? '$' : '€';
    }
    
    moedaConvertidaElement.textContent = `Total em ${moeda}: ${simbolo} ${valorConvertido.toFixed(2)}`;
}

// ==================== FUNÇÕES DO SISTEMA DE DELIVERY ====================
function exibirBoasVindas() {
    alert("Bem-vindo(a) ao sistema de delivery da Padaria Doce Pão!");
}

function calcularSubtotal(carrinho) {
    return carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
}

function calcularDesconto(valor, percentual) {
    return valor * (percentual / 100);
}

// Arrow function para calcular taxa de entrega
const calcularTaxaEntrega = (distanciaKm) => {
    const taxaBase = 5.00;
    const taxaPorKm = 1.50;
    return taxaBase + (distanciaKm * taxaPorKm);
};

// ==================== FUNÇÕES COM RETORNO (ARROW FUNCTIONS) ====================
// Arrow function para calcular o imposto (8%)
const calcularImposto = (subtotal) => subtotal * 0.08;

// Arrow function para verificar frete grátis
const verificarFreteGratis = (subtotal) => subtotal >= 50 ? 'Sim' : 'Não';

function calcularTotalFinal(subtotal, desconto, imposto, taxaEntrega) {
    return (subtotal - desconto + imposto + taxaEntrega);
}

// ==================== FUNÇÕES DA PÁGINA DE CARRINHO (FINALIZAÇÃO) ====================
function renderizarResumoFinal() {
    const carrinhoElement = document.getElementById('carrinho-final');
    const subtotalFinalElement = document.getElementById('subtotal-final');
    const descontoFinalElement = document.getElementById('desconto-final');
    const impostoFinalElement = document.getElementById('imposto-final');
    const taxaEntregaElement = document.getElementById('taxa-entrega');
    const freteGratisElement = document.getElementById('frete-gratis');
    const totalFinalElement = document.getElementById('total-final');
    const pontosElement = document.getElementById('pontos');
    const moedaConvertidaElement = document.getElementById('moeda-convertida-final');

    if (!carrinhoElement || !subtotalFinalElement || !descontoFinalElement || !impostoFinalElement || !taxaEntregaElement || !freteGratisElement || !totalFinalElement || !pontosElement || !moedaConvertidaElement) return;

    let carrinho = getCarrinho();
    let subtotal = calcularSubtotal(carrinho);
    
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    let descontoValor = (totalItens > 20) ? calcularDesconto(subtotal, 10) : 0;
    
    let imposto = calcularImposto(subtotal);
    let distancia = parseFloat(document.getElementById('distancia').value) || 0;
    let taxaEntrega = verificarFreteGratis(subtotal) === 'Sim' ? 0 : calcularTaxaEntrega(distancia);
    
    const total = calcularTotalFinal(subtotal, descontoValor, imposto, taxaEntrega);

    carrinhoElement.innerHTML = '';
    if (carrinho.length === 0) {
        carrinhoElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrinho-item');
            itemElement.innerHTML = `
                <p>${item.nome} x ${item.quantidade}</p>
                <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
            `;
            carrinhoElement.appendChild(itemElement);
        });
    }

    subtotalFinalElement.textContent = subtotal.toFixed(2);
    descontoFinalElement.textContent = descontoValor.toFixed(2);
    impostoFinalElement.textContent = imposto.toFixed(2);
    taxaEntregaElement.textContent = taxaEntrega.toFixed(2);
    freteGratisElement.textContent = verificarFreteGratis(subtotal);
    totalFinalElement.textContent = total.toFixed(2);
    pontosElement.textContent = Math.floor(total);

    // Renderiza a conversão de moedas
    const totalBRL = total;
    const cotacoes = { 'USD': 5.0, 'EUR': 6.0 };
    moedaConvertidaElement.innerHTML = `
        <p>Dólar (USD): $ ${(totalBRL / cotacoes.USD).toFixed(2)}</p>
        <p>Euro (EUR): € ${(totalBRL / cotacoes.EUR).toFixed(2)}</p>
    `;
    
    calcularTroco();
}

function atualizarTotalComEntrega() {
    renderizarResumoFinal();
}

function calcularTroco() {
    const totalFinalElement = document.getElementById('total-final');
    const valorPagoInput = document.getElementById('valor-pago');
    const trocoElement = document.getElementById('troco');

    if (!totalFinalElement || !valorPagoInput || !trocoElement) return;

    const total = parseFloat(totalFinalElement.textContent) || 0;
    const valorPago = parseFloat(valorPagoInput.value) || 0;
    
    const troco = valorPago > total ? valorPago - total : 0;
    trocoElement.textContent = troco.toFixed(2);
}

function finalizarPagamento() {
    const totalFinal = parseFloat(document.getElementById('total-final').textContent);
    const valorPago = parseFloat(document.getElementById('valor-pago').value);
    const distancia = parseFloat(document.getElementById('distancia').value);

    if (distancia > 0 && (isNaN(valorPago) || valorPago < totalFinal)) {
        alert("O valor pago é insuficiente ou inválido. Por favor, insira um valor maior ou igual ao total.");
        return;
    }
    
    if (getCarrinho().length > 0) {
        alert("Pagamento confirmado! Obrigado por sua compra!");
        setCarrinho([]); // Limpa o carrinho
        window.location.href = 'index.html'; // Redireciona para a página inicial
    } else {
        alert("Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.");
    }
}

// Inicializa a página apropriada
window.onload = () => {
    if (document.body.classList.contains('carrinho-page')) {
        exibirBoasVindas();
        renderizarResumoFinal();
    } else if (document.body.classList.contains('pedidos-page')) {
        renderizarProdutos();
        renderizarCarrinho();
    }
};