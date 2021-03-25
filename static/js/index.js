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
	client.send(message);
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
          if(message.payloadString==='Encendido'){
                   document.getElementById("imagen").src="https://www.jing.fm/clipimg/full/114-1141391_homer-simpson-fighting-clipart-homer-simpson-bart-simpson.png";
	  } else if (message.payloadString==='Apagado'){
                document.getElementById("imagen").src="https://i.pinimg.com/736x/db/e0/3b/dbe03b8735e70b6461278393c5769258.jpg ";
	  }
	  if(message.payloadString==='Encendido'){
                  document.getElementById("btn").innerHTML="Apagar";
	  }else if (message.payloadString==='Apagado'){
                  document.getElementById("btn").innerHTML="Encender";
	  }
	    
