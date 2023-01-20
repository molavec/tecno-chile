
// --> CALCULO DE TOTALES
/**
 * Total sin impuestos
 * @param { [{precio: number; cantidad: number;}] } productsInCart 
 */
const getTotalWithoutTax = (productsInCart) => {
    const value = productsInCart.reduce(
        (acumulador, product) => {
            console.log('acumulador', acumulador)
            console.log('product.precio', product.precio);
            console.log('product.cantidad', product.cantidad);
            const aux = parseInt(acumulador) + parseInt(product.precio) * parseInt(product.cantidad)
            console.log('aux', aux);
            return aux
        }, 0
    );
    console.log('value', value)
    return value;
}


/**
 * Total con impuestos
 * @param { [{precio: number; qty: number;}] } productsInCart 
 */
const getTotalWithTax = (productsInCart) => {
    const TAX = 1.19;
    const value = productsInCart.reduce(
        (acumulador, product) => (acumulador + parseInt(product.precio) * parseInt(product.cantidad)),
        0
    );
    return value * TAX;
}

/**
 * Valor Impuesto
 * @param { [{precio: number; qty: number;}] } productsInCart 
 */
const getTax = (productsInCart) => {
    const TAX = 0.19;
    const value = productsInCart.reduce(
        (acumulador, product) => (acumulador + parseInt(product.precio) * parseInt(product.cantidad)),
        0
    );
    return value * TAX;
}

/**
 * Valor Impuesto
 * @param { [{precio: number; qty: number;}] } productsInCart 
 */
const getTotalProducts = (productsInCart) => {
    const value = productsInCart.reduce(
        (acumulador, product) => (acumulador + parseInt(product.cantidad)),
        0
    );
    return value;
}

/**
 * Valor comision
 * @param { totalSinImpuesto: number } totalSinImpuesto 
 */
const getShippingCost = (total) => {
    const comision = 0.05;
    return (total < 100000) ? total * comision : 0;
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


function getProductsListCart(productList){
    const productHtmlArray = productList.map( (product) => {
        return `
            <li>
                <img src="${product.imagen}" class="cart-image" alt="Image ${product.nombre}">
                <p>${product.nombre}</p>
                <p>${product.cantidad} x ${product.precio}</p>
                <p>${product.codigo}</p>
                <button class="cart-remove" qty=${product.cantidad} uuid="${product.codigo}"> Eliminar </button>
            </li>
            <br>
    `
    });

    //console.log("productList", productList);
    //console.log("productHtmlArray", productHtmlArray);
    return productHtmlArray;

}


// --> EVENTOS
//Variable que almacena los productos anadidos al carro
let productsInCart = [];
let contadorProductos = 0;



$(document).ready(function () {

    // acciones de los botones anadir al carro 
    $('.product-block .add-button').click( function() {
        //console.log('boton anadir', this);
        //console.log('boton anadir', $(this));
        // console.log('info', $(this).attr('info'));
        // console.log('info parsed', JSON.parse($(this).attr('info').replace(/\'/g, '\"')));

        const product = JSON.parse($(this).attr('info').replace(/\'/g, '\"'));
        // console.log('product', product);

        // Obtener la cantidad de productos
        // TIP: utilizar .parent() y .child() para seleccionar la cantidad de productos.
        const cantidad = $(this).parent().parent().children(".box-cantidad").children(".input-cantidad").val();
        // console.log('cantidad', cantidad);
        product.cantidad = cantidad;
        // console.log('product con catidad', product);

        // Cambiar el estado de boton anadido, usar if
        // TIP: crer 2 botones. utilizar .hide() .show() o .toggle() para cambiar la visibilidad de uno u otro.
        // TIP alt: utilizar .css()
        // esconde boton actual
        const addButton = $(this);
        const addedButton = $(this).siblings(".added-button");
        addButton.toggle();
        addedButton.toggle();

        setTimeout(
            function () {
                addButton.toggle();
                addedButton.toggle();
            },
            1000
        );

        // add product 
        // TIP: utilizar array.push() para actualizar la variable 'productsInCart'

        productsInCart.push(product);
        //console.log('productsInCart', productsInCart);


        // reconstruir html con el listado de productos
        // TIP: .html() para reemplazar el $(#totalizador).html(codigohtml)

        // Actualizar totales
        const totalNeto = getTotalWithoutTax(productsInCart);
        const iva = getTax(productsInCart);
        const total = getTotalWithTax(productsInCart);

        console.log('totalNeto', totalNeto);
        console.log('iva', iva);
        console.log('total', total);

        $("#total-neto").html(totalNeto);
        $("#iva").html(iva);
        $("#total").html(total);
        $("#shipping").html(getShippingCost(total));
        $("#total-with-shipping").html(total + getShippingCost(total));
        
        const productsInCartHTML = getProductsListCart(productsInCart);
        //console.log('productsInCartHTML', productsInCartHTML.join('\n'));
        $("#totalizador .item-list").html(productsInCartHTML.join('\n'));

        //aumentar el contador de cantidad
        contadorProductos = contadorProductos + parseInt(cantidad);
        $("#cart-qty").html(contadorProductos);

        // Add event to remove button
        $('#totalizador .cart-remove').click( function() {

            //console.log('uuid elemento', $(this).attr('uuid'));

            const uuid = $(this).attr('uuid'); // obtiene el id del producto a eliminar

            // eliminado elemento del arreglo
            //console.log('productsInCart', productsInCart);
            const index = productsInCart.findIndex((product) => { product.id === uuid }); // obtiene el indice en el arreglo de productos en el carro del objeto a eliminar
            productsInCart.splice(index, 1); // elimina el producto con la funcion splice
            //console.log('productsInCart', productsInCart);

            // disminuir el contador de la notificacion
            contadorProductos = contadorProductos - $(this).attr('qty');
            $("#cart-qty").html(contadorProductos);

            // remover al padre
            $(this).parent().remove();
            
            // // Reconstruye el html del totalizador
            // const productsInCartHTML = getProductsListCart(productsInCart);
    
            // //console.log('productsInCartHTML', productsInCartHTML.join('\n'));
            // $("#totalizador .item-list").html(productsInCartHTML.join('\n'));

            // recalcular totales
            $("#total-neto").html(getTotalWithoutTax(productsInCart));
            $("#iva").html(getTax(productsInCart));
            $("#total").html(getTotalWithTax(productsInCart));
            
            $("#shipping").html(getShippingCost(getTotalWithTax(productsInCart)));
            $("#total-with-shipping").html(getTotalWithTax(productsInCart) + getShippingCost(total));


        });

    });

    // acciones del boton del carro 
    $('#cart-button').click(function () {
        //console.log('boton carro', $(this));
        // deplegar/esconder el totalizador
        $("#totalizador").toggle()

    });
    
});


// CONSTRUCCION DEL CATALOGO
const productBlocks = catalog.map((product) => {
    return `<div class="col-md-3 my-3">
    <div id="${product.codigo}" class="product-block">
        <img class="d-block w-100 foto" src="${product.imagen}" alt="Product">
        <h3>${product.nombre}</h3>
        <p>Codigo ${product.codigo}</p>
        <p>${product.descripcion}</p>
        <p>${product.precio}</p>
        <div class="row">
            <div class="box-cantidad col-md-6">
                <input class="input-cantidad" type="number" placeholder="cantidad" value="1"/>
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

for (let i = 0; i < productBlocks.length; i++) {
    productsHTML = productsHTML + productBlocks[i];
}
document.getElementById("products").innerHTML = productsHTML;

iva  = document.getElementById("iva");

iva = parseInt(document.querySelector('#iva').textContent)
neto = parseInt(document.querySelector('#total-neto').textContent);
shipping = parseInt(document.querySelector('#shipping').textContent);
totalwith = parseInt(document.querySelector('#total-with-shipping').textContent);


function pintapaga(){

}

 
console.log(document.querySelector('botonConfirmar'));