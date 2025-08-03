const params = new URLSearchParams(window.location.search)
const idProduto = params.get("p")

async function carregarProduto(id) {
  try {
    const produto = await buscarProdutoPorId(id)

    document.querySelector(".product__image").src = produto.imagem
    document.querySelector(".product__title").textContent = produto.nome
    document.querySelector(".product__price").textContent = `R$ ${(produto.preco_por / 100).toFixed(2).replace('.', ',')}`
    document.querySelector(".product__description").textContent = produto.descricao

    const tagIcone = produto.vegano ? "./image/Plant.png" : "./image/Cow.png"
    const tagTexto = produto.vegano ? "Vegano" : "Contém lactose"
    document.querySelector(".product__tag img").src = tagIcone
    document.querySelector(".product__tag span").textContent = tagTexto

    const botaoComprar = document.querySelector(".product__button")
    botaoComprar.addEventListener("click", (e) => {
      e.preventDefault()
    })

  } catch (erro) {
    console.error("Erro ao carregar produto:", erro)
  }
}

if (idProduto) {
  carregarProduto(idProduto)
}
