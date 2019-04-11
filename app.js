(function () {
    const infoCart = document.getElementById('cart-info');
    const carrinho = document.getElementById('cart');

    infoCart.addEventListener('click', function () {
        carrinho.classList.toggle('show-cart');
    });
})();

// Add Itens para o carrinho
(function () {

    const cartButton = document.querySelectorAll('.btn-comprar');
    cartButton.forEach(btn => btn.addEventListener('click', function (event) {

        let caminho = event.target.parentElement.parentElement.children[0].children[0].src;
        let posicao = caminho.indexOf('img') + 3;
        let partPath = caminho.slice(posicao);



        const produtos = {};
        produtos.img = `img-cart${partPath}`;

        let nome = event.target.parentElement.parentElement.children[0].children[1].textContent;
        produtos.nome = nome;


        let preco = event.target.parentElement.parentElement.children[0].children[2].textContent;
        let precoFinal = preco.slice(3).trim();
        produtos.preco = precoFinal;

        console.log(preco)

        // Remover Itens
        const removerItens = document.querySelectorAll('.cart-item-remove')
        for (let i = 0; i < removerItens.length; i++) {
            let button = removerItens[i]
            button.addEventListener('click', removerCarrinho)
        }

        function removerCarrinho(event) {
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            mostrarTotal()
        }

        // Buttons carrinho
        const fecharCart = document.getElementById('close-cart');
        fecharCart.addEventListener('click', function () {
            carrinho.classList.remove('show-cart');
        })

        const finalizar = document.getElementById('finalizar');
        finalizar.addEventListener('click', function () {
            alert("Obrigado pela compra!")
        })

        //Div itens carrinho
        const itensCarrinho = document.createElement('div');
        itensCarrinho.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');

        itensCarrinho.innerHTML = `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
        <img src="${produtos.img}"
            class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="item-text">
  
            <p id="cart-item-title" class="cart-item-title">${produtos.nome}</p>
            <span>R$</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${produtos.preco}</span>
        </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove">
            <i class="fas fa-trash"></i>
        </a>
    </div>
    `;

        // select cart
        const carrinho = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');

        carrinho.insertBefore(itensCarrinho, total);
        alert("Produto adicionado ao carrinho");
        mostrarTotal();
    }));

    // Mostrar total produto
    function mostrarTotal() {
        const total = [];
        const itens = document.querySelectorAll('.cart-item-price');

        itens.forEach(item => total.push(parseFloat(item.textContent)))


        const valorTotal = total.reduce((total, item) => total += item, 0);
        const valorFinal = valorTotal.toFixed(2);

        document.getElementById('cart-total').textContent = valorFinal;
        document.querySelector('.item-total').textContent = valorFinal;
        document.getElementById('item-count').textContent = total.length;
    }
})();