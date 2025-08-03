// const classicosContainer = document.getElementById("clássicos-container")
// const geladosContainer = document.getElementById("gelados-container")

// async function carregarProdutos() {
//   try {
//     const resposta = await fetch("http://localhost:3333/produtos")
//     const produtos = await resposta.json()

//     produtos.forEach(produto => {
//       const container = produto.categoria === "clássicos" ? classicosContainer : geladosContainer
//       const precoOriginal = produto.preco.de ? `R$ ${(produto.preco.de / 100).toFixed(2).replace('.', ',')}` : ""
//       const precoAtual = `R$ ${(produto.preco.por / 100).toFixed(2).replace('.', ',')}`
//       const tagIcone = produto.vegano ? "./image/Plant.png" : "./image/Cow.png"
//       const tagTexto = produto.vegano ? "Vegano" : "Contém lactose"

//       const produtoHTML = `
//         <a href="./product.html?p=${produto.id}" class="products__list--item">
//           <img src="${produto.imagem}" alt="${produto.nome}">
//           <h3 class="products__list--price">${precoAtual} <span>${precoOriginal}</span></h3>
//           <h4 class="products__list--name">${produto.nome}</h4>
//           <div class="product__tag">
//             <img src="${tagIcone}" alt="${tagTexto}">
//             <span>${tagTexto}</span>
//           </div>
//         </a>
//       `
//       container.insertAdjacentHTML("beforeend", produtoHTML)
//     })
//   } catch (erro) {
//     console.error("Erro ao carregar produtos:", erro)
//   }
// }

// async function carregarCarrinho() {
//     try {
//       const resposta = await fetch("http://localhost:3333/carrinho")
//       const itensCarrinho = await resposta.json()
  
//       const carrinhoContainer = document.getElementById("itensCarrinho")
//       carrinhoContainer.innerHTML = ""
  
//       itensCarrinho.forEach(item => {
//         const itemHTML = `
//           <div class="carrinho__item">
//             <span>Produto ID: ${item.idProduto}</span>
//             <span>Quantidade: ${item.quantidade}</span>
//             <span>Observações: ${item.observacoes}</span>
//           </div>
//         `
//         carrinhoContainer.insertAdjacentHTML("beforeend", itemHTML)
//       })
//     } catch (erro) {
//       console.error("Erro ao carregar carrinho:", erro)
//     }
//   }
  
//   carregarCarrinho()
  

// js/index.js
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

