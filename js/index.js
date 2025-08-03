const classicosContainer = document.getElementById("clássicos-container")
const geladosContainer = document.getElementById("gelados-container")

async function carregarProdutos() {
  try {
    const produtos = await buscarProdutos()

    produtos.forEach(produto => {
      const container = produto.categoria === "clássicos" ? classicosContainer : geladosContainer
      const precoOriginal = produto.preco_de ? `R$ ${(produto.preco_de / 100).toFixed(2).replace('.', ',')}` : ""
      const precoAtual = `R$ ${(produto.preco_por / 100).toFixed(2).replace('.', ',')}`
      const tagIcone = produto.vegano ? "./image/Plant.png" : "./image/Cow.png"
      const tagTexto = produto.vegano ? "Vegano" : "Contém lactose"

      const produtoHTML = `
        <a href="./product.html?p=${produto.id}" class="products__list--item">
          <img src="${produto.imagem}" alt="${produto.nome}">
          <h3 class="products__list--price">${precoAtual} <span>${precoOriginal}</span></h3>
          <h4 class="products__list--name">${produto.nome}</h4>
          <div class="product__tag">
            <img src="${tagIcone}" alt="${tagTexto}">
            <span>${tagTexto}</span>
          </div>
        </a>
      `
      container.insertAdjacentHTML("beforeend", produtoHTML)
    })
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro)
  }
}

document.addEventListener("DOMContentLoaded", carregarProdutos)

