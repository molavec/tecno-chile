
// --> CALCULO DE TOTALES
/**
 * Total sin impuestos
 * @param { [{precio: number; cantidad: number;}] } productsInCart 
 */
const getTotalWithoutTax = (productsInCart) => {
    const value = productsInCart.reduce(
        (acumulador, product) => {
            // console.log('acumulador', acumulador)
            // console.log('product.precio', product.precio);
            // console.log('product.cantidad', product.cantidad);
            const aux = parseInt(acumulador) + parseInt(product.precio) * parseInt(product.cantidad)
            // console.log('aux', aux);
            return aux;
        }, 0
    );
    // console.log('value', value)
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
                <p id="nombreP">${product.nombre}</p>
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
//variable que almacena los productos anadidos al carro
var productsInCart = [];
var contadorProductos = 0;



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
        

        // console.log('totalNeto', totalNeto);
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
        <h3 id=nombreP>${product.nombre}</h3>
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

var productsHTML = '';

for (var i = 0; i < productBlocks.length; i++) {
    productsHTML = productsHTML + productBlocks[i];
}
document.getElementById("products").innerHTML = productsHTML;


// iva = parseInt(document.querySelector('#iva').textContent)
// neto = parseInt(document.querySelector('#total-neto').textContent);
// shipping = parseInt(document.querySelector('#shipping').textContent);
// totalwith = parseInt(document.querySelector('#total-with-shipping').textContent);

// funcion para crear la boleta
const confirmCart = (event) => {
    event.preventDefault();
    console.log('form submit confirm Cart');
    
    // Valores requeridos por la boleta
    console.log('fullname', event.target.elements.fullname.value);
    console.log('email', event.target.elements.email.value);
    console.log('address', event.target.elements.address.value);
    console.log('comuna', event.target.elements.comuna.value);
    console.log('state', event.target.elements.state.value);

    console.log('productsInCart', productsInCart);

    console.log('total-neto', getTotalWithoutTax(productsInCart));
    console.log('iva', getTax(productsInCart));
    console.log('total', getTotalWithTax(productsInCart));
    console.log('shipping', getShippingCost(getTotalWithTax(productsInCart)));
    console.log('total-with-shipping', getTotalWithTax(productsInCart) + getShippingCost(total));

    //build invoice
    // customer info
    customerInfo = `
        <div>${event.target.elements.fullname.value}</div>
        <div>${event.target.elements.email.value} </div>
        <div>${event.target.elements.address.value} </div>
        <div>${event.target.elements.comuna.value} </div>
        <div>${event.target.elements.state.value} </div>
    `;
    $('#invoice-customer-info').html(customerInfo)

    // products
    const productTableRows = productsInCart.map((product) => {
        return `
            <tr>
                <td class="code">${product.codigo}</td>
                <td class="desc">${product.nombre}</td>
                <td class="unit">$${product.precio}</td>
                <td class="qty">${product.cantidad}</td>
                <td class="total">$${product.precio * product.cantidad}</td>
            </tr>
        `;
    }); 
    console.log('productTableRows', productTableRows)
    $('#invoice-products').append(productTableRows);

    // totals
    const totalSinImpuesto = `
            <tr>
            <td colspan="4">Total sin impuesto</td>
            <td class="total">${getTotalWithoutTax(productsInCart)}</td>
            </tr>
        `;
    $('#invoice-products').append(totalSinImpuesto);

    const iva = `
            <tr>
            <td colspan="4">IVA (19%)</td>
            <td class="total">${getTax(productsInCart)}</td>
            </tr>
        `;
    $('#invoice-products').append(iva);

    const totalWithTax = `
            <tr>
            <td colspan="4">Total</td>
            <td class="total">${getTotalWithTax(productsInCart)}</td>
            </tr>
        `;
    $('#invoice-products').append(totalWithTax);

    const despacho = `
            <tr>
            <td colspan="4">Despacho</td>
            <td class="total">${getShippingCost(getTotalWithTax(productsInCart))}</td>
            </tr>
        `;
    $('#invoice-products').append(despacho);

    const totalConDespacho = `
            <tr>
            <td colspan="4">Total con Despacho</td>
            <td class="total">${getTotalWithTax(productsInCart) + getShippingCost(total)}</td>
            </tr>
        `;
    $('#invoice-products').append(totalConDespacho);

    //hide header main#shopping footer
    $('header').hide();
    $('#shopping').hide();
    $('footer').hide();
    $('.modal-backdrop').hide();
    
    //show invoice
    $('#invoice').show();
    //modal issues
    $('body').css('overflow', 'auto');
    $('body').css('padding', '0px');


    //Envio  de Correos
    const boletaHTML = `
    <main id="invoice" class="container">
        <div class="invoice-header clearfix">
        <h1>Tecno Chile.CL</h1>
        <div id="company" class="clearfix">
            <div>Tecno Chile LTDA.</div>
            <div>Suecia 345<br /> Viña del Mar, US</div>
            <div>(32) 519-0450</div>
            <div><a href="mailto:contacto@Tecno Chile.cl">contacto@Tecno Chile.cl</a></div>
        </div>
        <div id="invoice-customer-info">
            <div>${event.target.elements.fullname.value}</div>
            <div>${event.target.elements.email.value} </div>
            <div>${event.target.elements.address.value} </div>
            <div>${event.target.elements.comuna.value} </div>
            <div>${event.target.elements.state.value} </div>
        </div>
        </div>
        <div class="invoice-body">
        <table>
            <thead>
            <tr>
                <th class="service">CÓDIGO</th>
                <th class="desc">PRODUCTO</th>
                <th>PRECIO</th>
                <th>CANTIDAD</th>
                <th>TOTAL</th>
            </tr>
            </thead>
            <tbody id="invoice-products">
            ${productsInCart.map((product) => {
                return `
                    <tr>
                        <td class="code">${product.codigo}</td>
                        <td class="desc">${product.nombre}</td>
                        <td class="unit">$${product.precio}</td>
                        <td class="qty">${product.cantidad}</td>
                        <td class="total">$${product.precio * product.cantidad}</td>
                    </tr>
                `;
            })}

                <tr>
                <td colspan="4">Total sin impuesto</td>
                <td class="total">${getTotalWithoutTax(productsInCart)}</td>
                </tr>

                <tr>
                <td colspan="4">IVA (19%)</td>
                <td class="total">${getTax(productsInCart)}</td>
                </tr>

                <tr>
                <td colspan="4">Total</td>
                <td class="total">${getTotalWithTax(productsInCart)}</td>
                </tr>
                
                <tr>
                <td colspan="4">Despacho</td>
                <td class="total">${getShippingCost(getTotalWithTax(productsInCart))}</td>
                </tr>

                <tr>
                <td colspan="4">Total con Despacho</td>
                <td class="total">${getTotalWithTax(productsInCart) + getShippingCost(total)}</td>
                </tr>

            </tbody>
        </table>
        </div>
    </main>
    `;

    // Send Email
    Email.send({
        Host : "*",
        Username : "username",
        Password : "password",
        To : event.target.elements.email.value,
        From : "ventas@cachurando.com",
        Subject : "Boleta Tecno Chile",
        Body : boletaHTML
    }).then(
      message => alert('Hemos enviado la boleta a tu correo. Revisa tu bandeja de entrada.')
    ).catch( error => alert('Hemos enviado la boleta a tu correo. Revisa tu bandeja de entrada.') );

};

