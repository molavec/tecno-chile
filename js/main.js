$(document).ready(function(){
            
    $(".carousel-caption h5").addClass('animated slideInLeft');
    
    $(".carousel-caption p").addClass('animated slideInRight');
    
});


//var codeBlock = '<h1>Holaaa</h1>';
//document.getElementById("products").innerHTML= codeBlock



const productsBlocks = [];

 const productBlocks = catalog.map( (product) => {
    return `<div class="col-md-3">
    <div class="product-block">
        <img class="d-block w-100 foto" src="${product.imagen}" alt="Product">
        <h3>${product.nombre}</h3>
        <p>Codigo ${product.codigo}</p>
        <p>${product.descripcion}</p>
        <p>${product.precio}</p>
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-outline-success btn-sm" type="button" id="boton5" data-id="5"
                    onclick="add(this)">Añadir</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-outline-danger btn-sm" type="button" id="btn_det5" data-id="5">Detalles</button>
            </div>
        </div>
    </div>
</div>`
});

const productsHTML = '';

for (let i=0; i < productBlocks.length ; i++) {
    productsHTML = productsHTML + productBlocks[i];
}

console.log('productsBlocks', productsBlocks);
console.log('productsHTML', productsHTML);

document.getElementById("products").innerHTML = productsHTML;

