/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var app = {
    // Application Constructor
    inicio: function () {
        dificultad =0;
        DiametroBola = 60;
        velocidadX=0;
        velocidadY=0;
        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;
        app.vigilaSensores();
        app.iniciaJuego();
        puntuacion =0;
   //     bol= true;

//        function onError(){
//            console.log('error');
//        }
//        navigator.accelerometer.watchAcceleration(this.onSuccess,onError,{frecuency:800});
    },

    iniciaJuego: function () {
      
      
        function preload() {
         game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = '#f27d0f';
            game.load.image('bola', 'assets/grafico.png');
            game.load.image('objetivo', 'assets/objetivo2.png');
 
        }
        
        function create() {
            scoreText = game.add.text(16,16,puntuacion,{fontSize:'100px',fill:'#757676'});
            
            objetivo= game.add.sprite(app.inicioX(),app.inicioY(),'objetivo');
            bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');
            
            game.physics.arcade.enable(bola);
            game.physics.arcade.enable(objetivo);
            
            bola.body.collideWorldBounds= true;
            
            bola.body.onWorldBounds = new Phaser.Signal();
            
            bola.body.onWorldBounds.add(app.decrementapuntuacion,this);
           
            
        console.log(bola.body.onWorldBounds);
            
        
        }
        
          function update(){
              var factorDificultad =(300+ dificultad*100);
              
            bola.body.velocity.y =(velocidadY * factorDificultad);
            bola.body.velocity.x =(velocidadX * (-1 * factorDificultad));
                        game.physics.arcade.overlap(bola,objetivo,app.incrementap,null,this);
                     
          }
        var estados = { preload: preload, create:create, update:update} ;
        var  game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
    },
decrementapuntuacion: function (){
    
  // if(bol){         
    puntuacion = puntuacion-1;
    scoreText.text = puntuacion;
   // }
 //   bol= false;
},
incrementap: function (){
    puntuacion ++;
    scoreText.text= puntuacion;
    
    objetivo.body.x = app.inicioX();
    objetivo.body.y= app.inicioY();
    
    if(puntuacion>0){
        dificultad ++;
        
    }
},
    inicioX: function () {
        return app.numeroAletorioHasta(ancho - DiametroBola);
    },
    inicioY: function () {
        return app.numeroAletorioHasta(alto - DiametroBola);
    },

    numeroAletorioHasta: function (limite) {
        return Math.floor(Math.random() * limite);
    },

    vigilaSensores: function () {
        function onError() {
            console.log('error');
        }
        function onSucces(datosAcelera) {
            app.detectarAgitacion(datosAcelera);
            app.registraDireccion(datosAcelera);
        }
        navigator.accelerometer.watchAcceleration(onSucces, onError,{frequency: 10});
    },

//    onSuccess: function (datosAceleration) {
//
//        app.representa(datosAceleration.x, '#valorx');
//        app.representa(datosAceleration.y, '#valory');
//        app.representa(datosAceleration.z, '#valorz');
//        app.detectarAgitacion(datosAceleration);
//    },

    detectarAgitacion: function (datos) {
        var agitarx = datos.x > 10;
        var agitary = datos.Y > 10;

        if (agitarx || agitary) {
            setTimeout(app.recomienza, 1000);
        } 
    },
    
    recomienza: function (){
      document.location.reload(true);  
    },
    
    registraDireccion: function (datos){
        velocidadX =datos.x;
        velocidadY= datos.y;
    },
    
//    representa: function (data, elememtoHTML) {
//        redondeo = Math.round(data * 100) / 100;
//        document.querySelector(elememtoHTML).innerHTML = redondeo;
//    }
};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function () {
        app.inicio();
    }, false);
}