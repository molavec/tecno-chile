
// CALCULO DE TOTALES
/**
 * Total sin impuestos
 * @param { [{price: number; qty: number;}] } productsInCart 
 */
const getTotalWithoutTax = (productsInCart) => {
    const value = productsInCart.reduce(
        (acumulador, product) =>  acumulador + product.price * product.qty
    );
    return value;
}


/**
 * Total con impuestos
 * @param { [{price: number; qty: number;}] } productsInCart 
 */
const getTotalWithTax = (productsInCart) => {
    const TAX = 1.19;
    const value = productsInCart.reduce(
        (acumulador, product) =>  acumulador + product.price * product.qty
    );
    return value* TAX;
}

/**
 * Valor Impuesto
 * @param { [{price: number; qty: number;}] } productsInCart 
 */
const getTax = (productsInCart) => {
    const TAX = 0.19;
    const value = productsInCart.reduce(
        (acumulador, product) =>  acumulador + product.price * product.qty
    );
    return value*TAX;
}


// ACTIONS
let productsInCart = {};

$(document).ready(function(){

    // acciones al a
    $('.product-block .add-button').click( function() {
        // change state, usar if
        // add product in cart
        // update variables    
    });
    
});


// PRODUCTS FROM JS

const productBlocks = catalog.map( (product) => {
    return `<div class="col-md-3 my-3">
    <div id="${product.codigo}" class="product-block">
        <img class="d-block w-100 foto" src="${product.imagen}" alt="Product">
        <h3>${product.nombre}</h3>
        <p>Codigo ${product.codigo}</p>
        <p>${product.descripcion}</p>
        <p>${product.precio}</p>
        <div class="row">
            <div class="col-md-6">
                <button idMio="${product.codigo}" class="add-button btn btn-outline-success btn-sm" type="button">Añadir</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-outline-danger btn-sm" type="button">Detalles</button>
            </div>
        </div>
    </div>
</div>`
});

let productsHTML = '';

for (let i=0; i < productBlocks.length ; i++) {
    productsHTML = productsHTML + productBlocks[i];
}

// console.log('productBlocks', productBlocks);
// console.log('productsHTML', productsHTML);

document.getElementById("products").innerHTML = productsHTML;

