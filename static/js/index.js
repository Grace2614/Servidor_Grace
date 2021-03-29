//https://www.eclipse.org/paho/clients/js/

var btn=document.getElementById('btn'),contador=0;
function cambio()
{if (contador==0)
	{
	message = new Paho.MQTT.Message("ENCENDER");
 	message.destinationName = "grace.bonilla@unach.edu.ec/tema1";
 	client.send(message);
 	contador=1;
 	}
 else
 	{
 	message = new Paho.MQTT.Message("APAGAR");
	message.destinationName = "grace.bonilla@unach.edu.ec/tema1";
	client.send(message);
 	contador=0;
 	}
}


// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "grace.bonilla@unach.edu.ec",
    password: "Nataly16",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("grace.bonilla@unach.edu.ec/tema1");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "grace.bonilla@unach.edu.ec/tema1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("sensor").innerHTML=message.payloadString;
          if(message.payloadString==='ENCENDER'){
                   document.getElementById("imagen").src="/static/images/led_encendido.jpg" alt="user" width="400px";
	  } else if (message.payloadString==='APAGAR'){
                document.getElementById("imagen").src="/static/images/led_apagado.jpg" alt="user" width="400px";
	  }
	  if(message.payloadString==='ENCENDER'){
                  document.getElementById("btn").innerHTML="Apagar";
	  }else if (message.payloadString==='APAGAR'){
                  document.getElementById("btn").innerHTML="Encender";
	  }
	    
  }
