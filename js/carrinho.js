const abrirCarrinho = document.getElementById("abrirCarrinho")
const fecharCarrinho = document.getElementById("fecharCarrinho")
const itensCarrinho = document.getElementById("itensCarrinho")
const badgeQuantidade = document.getElementById("quantidadeCarrinho")
const subtotalCarrinho = document.getElementById("subtotalCarrinho")
const totalCarrinho = document.getElementById("totalCarrinho")
const carrinhoContainer = document.getElementById("carrinho")

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho))
}

function atualizarEventosQuantidade() {
  const botoesMais = document.querySelectorAll(".product__quantity--mais")
  const botoesMenos = document.querySelectorAll(".product__quantity--menos")

  botoesMais.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      const index = event.target.closest("button").getAttribute("data-index")
      carrinho[index].quantidade++
      salvarCarrinho()
      atualizarCarrinho()
    })
  })

  botoesMenos.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      const index = event.target.closest("button").getAttribute("data-index")
      if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--
      } else {
        carrinho.splice(index, 1)
      }
      salvarCarrinho()
      atualizarCarrinho()
    })
  })
}

function atualizarCarrinho() {
  itensCarrinho.innerHTML = ""
  let subtotal = 0
  let totalItens = 0

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>"
    badgeQuantidade.textContent = 0
    subtotalCarrinho.textContent = "R$ 0,00"
    totalCarrinho.textContent = "R$ 0,00"
    document.getElementById("itensTotal").textContent = "0"
    return
  }

  carrinho.forEach((item, index) => {
    subtotal += item.preco * item.quantidade
    totalItens += item.quantidade

    const itemDiv = document.createElement("div")
    itemDiv.classList.add("carrinho__item")

    itemDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="carrinho__item--imagem">
      <div class="carrinho__item--info">
        <h4>${item.nome}</h4>
        <div class="product__tag--carrinho">
          <img src="./image/${item.vegano ? "Plant-30" : "Cow-29"}.png" alt="${item.vegano ? "Vegano" : "Contém Lactose"}">
          <span>${item.vegano ? "Vegano" : "Contém Lactose"}</span>
        </div>
        <div class="product__quantity--carrinho">
          <h2>R$ ${item.preco.toFixed(2)}</h2>
          <div class="product__quantity--container">
            <button class="product__quantity--menos" data-index="${index}">
              <img src="./image/Minus.svg" alt="Diminuir">
            </button>
            <input type="text" class="carrinho__quantity--input" value=${item.quantidade} readonly>
            <button class="product__quantity--mais" data-index="${index}">
              <img src="./image/Plus.svg" alt="Aumentar">
            </button>
          </div>
        </div>
      </div>
      <button class="remover-item" data-index="${index}">
        <img src="./image/trash.svg" alt="Remover item" class="remover-item__imagem">
      </button>
    `
  
    itensCarrinho.appendChild(itemDiv)

    const removerButton = itemDiv.querySelector(".remover-item")
    removerButton.addEventListener("click", function () {
      carrinho.splice(index, 1)
      salvarCarrinho()
      atualizarCarrinho()
    })
  })

  document.getElementById("itensTotal").textContent = totalItens
  badgeQuantidade.textContent = totalItens
  subtotalCarrinho.textContent = `R$ ${subtotal.toFixed(2)}`
  totalCarrinho.textContent = `R$ ${subtotal.toFixed(2)}`

  atualizarEventosQuantidade()
}

function adicionarAoCarrinho(produto) {
  const itemExistente = carrinho.find((item) => item.id === produto.id)

  if (itemExistente) {
    itemExistente.quantidade += produto.quantidade
  } else {
    carrinho.push({
      ...produto,
      vegano: produto.vegano,
    })
  }

  salvarCarrinho()
  atualizarCarrinho()
}

abrirCarrinho.addEventListener("click", () => {
  carrinhoContainer.style.display = "block"
  atualizarCarrinho()
})

fecharCarrinho.addEventListener("click", () => {
  carrinhoContainer.style.display = "none"
})

const botaoFinalizarCompra = document.getElementById("finalizarCompra")

function exibirPopupCompra() {
  alert("Compra realizada com sucesso!")
  carrinho = []
  salvarCarrinho()
  atualizarCarrinho()
}

botaoFinalizarCompra.addEventListener("click", exibirPopupCompra)

atualizarCarrinho();

const limparCarrinhoButton = document.getElementById("limparCarrinho")

limparCarrinhoButton.addEventListener("click", () => {
  carrinho = []
  salvarCarrinho()
  atualizarCarrinho()
})
