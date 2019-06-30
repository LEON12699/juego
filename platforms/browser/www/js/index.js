
var app = {
    // Application Constructor
    inicio: function() {
        function onError(){
            console.log('error');
        }
        navigator.accelerometer.watchAcceleration(this.onSuccess,onError,{frecuency:800});
    },
  onSuccess: function(datosAceleration) {
      
      app.representa(datosAceleration.x, '#valorx');
  app.representa(datosAceleration.y, '#valory');
  app.representa(datosAceleration.z, '#valorz');
  app.detectarAgitacion(datosAceleration);
  },  
  
  
  detectarAgitacion: function (datos){
      agitarx = datos.x >= 10;
      agitary = datos.Y >=10;
      
      if(agitarx || agitary){
          document.body.className ='agitado';
      }else{
                    document.body.className='';

      }
  },
  representa: function (data, elememtoHTML){
      redondeo =Math.round(data*100)/100;
      document.querySelector(elememtoHTML).innerHTML= redondeo;
  }
};

if('addEventListener' in document){
    document.addEventListener('deviceready',function (){
       app.inicio(); 
    },false);
}