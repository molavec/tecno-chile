//const tiempo = Date.now();
//const hoy = new Date(tiempo);
//document.getElementById("fecha").innerHTML = hoy.toLocaleDateString() + ' - ' + hoy.toTimeString();

document.getElementById("valor").setAttribute('style', 'color: orange');
        document.getElementById("valor").innerHTML = 'Insuficiente '+document.getElementById("evalua").value;
document.getElementById("evalua").addEventListener('change', () => {
    if (document.getElementById("evalua").value <= 3) {
        document.getElementById("valor").setAttribute('style', 'color: red');
        document.getElementById("valor").innerHTML = 'Muy Deficiente '+document.getElementById("evalua").value;    
    }
    if (parseInt(document.getElementById("evalua").value) == 4 || document.getElementById("evalua").value == 5) {
        document.getElementById("valor").setAttribute('style', 'color: orange');
        document.getElementById("valor").innerHTML = 'Insuficiente '+document.getElementById("evalua").value;  
    } 
    if (document.getElementById("evalua").value == 6) {
        document.getElementById("valor").setAttribute('style', 'color: #e5be01');
        document.getElementById("valor").innerHTML = 'Suficiente '+document.getElementById("evalua").value;;  
    }
    if (document.getElementById("evalua").value == 7) {
        document.getElementById("valor").setAttribute('style', 'color: blue');
        document.getElementById("valor").innerHTML = 'Bien '+document.getElementById("evalua").value;;  
    }
    if (document.getElementById("evalua").value == 8) {
        document.getElementById("valor").setAttribute('style', 'color: green');
        document.getElementById("valor").innerHTML = 'Notable '+document.getElementById("evalua").value;;  
    }
    if (document.getElementById("evalua").value > 8) {
        document.getElementById("valor").setAttribute('style', 'color: darkgreen');
        document.getElementById("valor").innerHTML = 'Sobresaliente '+document.getElementById("evalua").value;; 
    }
});

function mensaje() {
  document.getElementById("voto").innerHTML = "Muchas Gracias por su evaluación :)"  
}