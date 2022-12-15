const tiempo = Date.now();
const hoy = new Date(tiempo);
document.getElementById("fecha").innerHTML = hoy.toLocaleDateString()+' - '+hoy.toTimeString();