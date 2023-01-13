
// --> CALCULO DE TOTALES
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

/**
 * Valor Impuesto
 * @param { [{price: number; qty: number;}] } productsInCart 
 */
const getTotalProducts = (productsInCart) => {
    const value = productsInCart.reduce(
        (acumulador, product) =>  acumulador + product.qty
    );
    return value;
}

/**
 * Valor comision
 * @param { totalSinImpuesto: number } totalSinImpuesto 
 */
const getComision = (totalSinImpuesto) => {
    const comision = 0.05;
    return totalSinImpuesto * comision;
}

/**
 * Sumatoria de todos los items
 * @param {number} totalSinImpuesto 
 * @param {number} Impuesto 
 * @param {number} Comision 
 * @returns 
 */
const getTotal = (totalSinImpuesto, Impuesto, Comision) => {
    const comision = 0.05;
    return totalSinImpuesto * comision;
}


// --> EVENTOS
//Variable que almacena los productos anadidos al carro
let productsInCart = [];

$(document).ready(function(){

    // acciones de los botones anadir al carro 
    $('.product-block .add-button').click( function() {
        console.log('boton anadir', this);
        console.log('boton anadir', $(this));
        console.log('info', $(this).attr('info'));
        console.log('info parsed', JSON.parse($(this).attr('info').replace(/\'/g, '\"')));

        const product = JSON.parse($(this).attr('info').replace(/\'/g, '\"'));
        console.log('product', product);

        // Obtener la cantidad de productos
        // TIP: utilizar .parent() y .child() para seleccionar la cantidad de productos.
        const cantidad = $(this).parent().parent().children(".box-cantidad").children(".input-cantidad").val();
        console.log('cantidad', cantidad);
        product.cantidad = cantidad;
        console.log('product con catidad', product);

        // Cambiar el estado de boton anadido, usar if
        // TIP: crer 2 botones. utilizar .hide() .show() o .toggle() para cambiar la visibilidad de uno u otro.
        // TIP alt: utilizar .css()
        // esconde boton actual
        const addButton = $(this);
       const addedButton = $(this).siblings(".added-button");
       addButton.toggle();
       addedButton.toggle();

       setTimeout(
        function(){
            addButton.toggle();
            addedButton.toggle();
        },
        1000
       )



       

        
        
        // add product 
        // TIP: utilizar array.push() para actualizar la variable 'productsInCart'

        productsInCart.push(product);

        console.log('productsInCart', productsInCart);








        // reconstruir html con el listado de productos
        // TIP: .html() para reemplazar el $(#totalizador).html(codigohtml)
    });
    

    // acciones del boton del carro 
    $('#cart-button').click( function() {
        console.log('boton carro', $(this));
        // deplegar/esconder el totalizador
         $("#totalizador").toggle()

    });

    // Eliminar del carro
    $('#totalizador .cart-remove').click( function() {
        console.log('uuid elemento', $(this).attr('uuid'));
        const uuid = $(this).attr('uuid'); // obtiene el id del producto a eliminar
        const index = productsInCart.findIndex((product) => { product.id === uuid }); // obtiene el indice en el arreglo de productos en el carro del objeto a eliminar
        productsInCart.splice(index, 1); // elimina el producto con la funcion splice
    });
});







// CONSTRUCCION DEL CATALOGO
const productBlocks = catalog.map( (product) => {
    return `<div class="col-md-3 my-3">
    <div id="${product.codigo}" class="product-block">
        <img class="d-block w-100 foto" src="${product.imagen}" alt="Product">
        <h3>${product.nombre}</h3>
        <p>Codigo ${product.codigo}</p>
        <p>${product.descripcion}</p>
        <p>${product.precio}</p>
        <div class="row">
            <div class="box-cantidad col-md-6">
                <input class="input-cantidad" type="number" placeholder="cantidad" value="0"/>
            </div>
            <div class="col-md-6">
                <button info="${JSON.stringify(product).replace(/\"/g, '\'')}" class="add-button btn btn-outline-success btn-sm" type="button">Añadir</button>
                <button class="added-button btn btn-outline-success btn-sm" type="button" style="display:none;">Añadido</button>
            </div>
        </div>
    </div>
</div>`
});

let productsHTML = '';

for (let i=0; i < productBlocks.length ; i++) {
    productsHTML = productsHTML + productBlocks[i];
}


document.getElementById("products").innerHTML = productsHTML;

