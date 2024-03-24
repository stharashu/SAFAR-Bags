const addToCartButtons = document.querySelectorAll('.container4but8, .container4but1');
const cartToggle = document.getElementById('cartToggle');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const card = event.target.closest('.container4card1, .container4card2, .container4card3, .container4card4');
    const itemName = card.querySelector('h2').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

    let cartItems = localStorage.getItem('cartItems');
    let total = localStorage.getItem('total');

    if (!cartItems || !total) {
        cartItems = [];
        total = 0;
    } else {
        cartItems = JSON.parse(cartItems);
        total = parseFloat(total);
    }

    const item = {
        name: itemName,
        price: itemPrice
    };

    cartItems.push(item);
    total += itemPrice;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('total', total);

    updateCartUI();
}

function removeFromCart(index) {
    let cartItems = localStorage.getItem('cartItems');
    let total = localStorage.getItem('total');

    if (!cartItems || !total) {
        cartItems = [];
        total = 0;
    } else {
        cartItems = JSON.parse(cartItems);
        total = parseFloat(total);
    }

    const removedItem = cartItems.splice(index, 1)[0];
    total -= removedItem.price;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('total', total);

    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.querySelector('.cart-container');
    const itemList = document.querySelector('.item-list');
    const totalElement = document.getElementById('cartTotal');

    let cartItems = localStorage.getItem('cartItems');
    let total = localStorage.getItem('total');

    if (!cartItems || !total) {
        cartItems = [];
        total = 0;
    } else {
        cartItems = JSON.parse(cartItems);
        total = parseFloat(total);
    }

    itemList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(index));

        listItem.appendChild(removeButton);
        itemList.appendChild(listItem);
    });

    totalElement.textContent = `$${total.toFixed(2)}`;

    if (cartItems.length === 0) {
        cartContainer.style.display = 'none';
    } else {
        cartContainer.style.display = 'block';
    }
}

cartToggle.addEventListener('click', () => {
    window.location.href = 'cart.html';
});
