var i = 0;
$('#incrementa').click(function () {

    if (i < 100) {
        i++;
    } else if (i = i++) {
        i = 0;
    } document.getElementById("cart-qty").innerHTML = i;
})
