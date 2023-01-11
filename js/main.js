$(document).ready(function(){
            
    
});


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
                <input class="input-cantidad" type="text" placeholder="cantidad" value="1" />
            </div>
            <div class="col-md-6">
                <button class="btn btn-outline-success btn-sm" type="button" id="boton5" data-id="5"
                    onclick="add(this)">Añadir</button>
            </div>
        </div>
    </div>
</div>`
});

let productsHTML = '';

for (let i=0; i < productBlocks.length ; i++) {
    productsHTML = productsHTML + productBlocks[i];
}

//console.log(i);

console.log('productBlocks', productBlocks);
console.log('productsHTML', productsHTML);

document.getElementById("products").innerHTML = productsHTML;

