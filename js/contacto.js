$(document).ready(function () {

  $.validator.setDefaults({
    submitHandler: function () {
        alert("submitted!");
    }
  });
  
  $().ready(function () {
   
    // validate signup form on keyup and submit
    $("#frmContacto").validate({
        rules: {
            nombre: "required",
            telefono: "required",
            
            correo: {
                required: true,
                email: true
            },
            mensaje: {
                required: true,
                minlength: 10
            }
            
        },
        messages: {
            nombre: "Por favor ingrese su nombre",
            telefono: "por favor ingrese su telefono",
            
            email: "por favor ingrese un correo valido",
            mensaje: "El mensaje debe tener al menos 10 caracteres"
        }
    });
  });

});
