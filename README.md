### PROYECTO NODEJS
En el siguiente proyecto se aplican los conocimientos adquiridos en el cursio de Nodejs juntos a React de Coding Bootcamp Espol

#####!!!!!AGREGAR CARPETA "UPLOADS" Vacia en el ROOT!!!!!!####

**"Nota"(IMPORTANTE):
Hola profesores se que mi proyecto lo he estado actualizando pues estaba incompleto, el ultimo mes he estado un poco distraido por cuestiones familiares y de trabajo y estudios, he bajado mi rendimiento tanto en la Universidad como en el trabajo debido a estos problemas que he tenido, y de hecho tambien he bajado rendimiento en el Bootcamp pues no di las lecciones 2 y 3 de este modulo; he hecho el proyecto y tengo la esperanza que me lo puedan revisar, yo se que profesionalmente falle pues no le tuve completo a tiempo a pesar de que dieron dias extras, no hay excusa alguna al haber fallado con la fecha de entrega, pero aun asi lo estoy subiendo por si me pueden revisar el proyecto.
Muchas Gracias.
---Jorge Zapata







1) Organización de imágenes:
    a) En la interfaz principal de la aplicación, se encontrará una matriz (grid) vacía donde se
    podrá organizar las imágenes.
    b) Para comenzar, se debe seleccionar las fotos que se desea cargar en el álbum
    arrastrándolas desde tu ordenador y soltándolas en la matriz.
    c) Ya con las imágenes en la matriz, se debe poder arrastrar y soltar las imágenes en la
    posición deseada dentro de la matriz. Este será el orden en el que aparecerán en el
    álbum.
    d) En alguna sección de la interfaz se mostrará el botón “Continuar” que permitirá avanzar
    al siguiente paso del proceso de compra.
2) Datos de facturación y dirección de entrega:
    a) Una vez organizadas las imágenes, se continuará con este formulario que tendrá datos de facturación y envío en dos secciones. Existirá una opción para utilizar los mismos datos para dirección entrega y datos de facturación.
    b) Al final del formulario estará el botón “Resumen del pedido” que me llevará al último paso.
3) Resumen del pedido:
    a) Esta pantalla mostrará una vista previa del álbum y la información de facturación y envío
    ingresada.
    b) Al presionar en el botón “Finalizar pedido” guardará los datos en el estado y se mostrará el mensaje “Gracias por tu compra”.

Funcionalidades
Sitio del cliente:
    ● Deberá contar con un landing sencillo pero atractivo que muestre lo que se puede hacer con Album Maker.
    ● Deberá tener una opción para registrarse como usuario donde pedirá: ○ Nombre
        ○ Correo
        ○ Password
    ● Deberá tener una opción para hacer login al sitio.
    ● Deberá ser posible solicitar un álbum a través del proceso descrito anteriormente. Toda la
    información debe ser almacenada en Mongo y además las imágenes deben ser subidas al
    servidor.
    ● Un cliente puede revisar sus órdenes de álbumes solicitados y el estado actual. Las órdenes
    pueden tener los siguientes estados: ○ Enviada
        ○ En Despacho
        ○ Entregada
        ○ Devuelta por Courier ○ Cancelada
    ● Si la orden se encuentra en estado de Enviada. El cliente puede hacer modificaciones a la Orden.
    Sitio Admin:
    ● Ingreso como Operario:
        ○ Un Operario puede visualizar todas las órdenes realizadas por los clientes y se encargará
        de realizar el despacho. El despacho consiste en asignar un Courier que pueden ser: 
            ■ Ecuador Express
            ■ ServiRapido
    El cliente deberá poder ver qué compañía le va a hacer el despacho. 
    ● Ingreso como Administrador:
        ○ Un administrador puede hacer lo mismo que el Operario.
        ○ Un administrador puede cancelar la orden y para la cual tendrá que colocar un motivo
        para que el cliente lo pueda ver.
        ○ Un administrador podrá borrar una orden para situaciones de información erróneas.
 
API de órdenes:
    ● La última parte de su sistema debe contener un API para que las empresas “Ecuador Express” y “ServiRapido” puedan informar que ya entregaron los pedidos. Para esto deberá proveer un Endpoint que debe contar con un método de autenticación (Basic Auth) y permite especificar la orden y el estado: “Entregada” o “Devuelta por Courier”.
    ● Para probar el correcto funcionamiento del API, usted deberá tener una colección de postman que permita hacer cambios de estado de las órdenes. NO hay que implementar ningún sistema adicional para los couriers, solo deberá realizar el API.
