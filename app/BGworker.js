require("globals");
const appSettings = require("tns-core-modules/application-settings");
const application = require("tns-core-modules/application");
const LocalNotifications = require("nativescript-local-notifications").LocalNotifications;
var SocketIO = require('nativescript-socketio').SocketIO;
var socketWorker;
//Copy of notify function for Worker
function notification(param1, param2) {
    LocalNotifications.schedule([{
        id: 1,
        title: param1,
        body: param2,
        ticker: 'The ticker',
        badge: 1,
        channel: 'My Channel',
        sound: "customsound-ios.wav"
  }])

}
//Copy of alert check for Worker
function alertCheck(alertType, datastr, name) {

    var data = JSON.parse(datastr);
    if (typeof (data.alis) == "string") {
        data.alis = parseFloat(data.alis);
        data.satis = parseFloat(data.satis);
    }
    // alert(data.alis >= 7.0)
    if (appSettings.hasKey(alertType)) {
        var alertOBJ = JSON.parse(appSettings.getString(alertType));
        var compareVal = alertOBJ.cValue;
        if (alertOBJ.buySell == 0) {
            if (alertOBJ.opType == 0) {
                if (data.alis >= compareVal) {
                    notification(name + " " + data.alis + " seviyesinde.", data.alis + " " + compareVal);
                    appSettings.remove(alertType);
                }
            }
            if (alertOBJ.opType == 1) {
                if (data.alis <= compareVal) {
                    notification(name + " " + data.alis + " seviyesinde.", data.alis + " " + compareVal);
                    appSettings.remove(alertType);
                }
            }
        } else if (alertOBJ.buySell == 1) {
            if (alertOBJ.opType == 0) {
                if (data.satis >= compareVal) {
                    notification(name + " " + data.satis + " seviyesinde.", data.alis + " " + compareVal);
                    appSettings.remove(alertType);
                }
            }
            if (alertOBJ.opType == 1) {
                if (data.satis <= compareVal) {
                    notification(name + " " + data.satis + " seviyesinde.", data.alis + " " + compareVal);
                    appSettings.remove(alertType);
                }
            }
        }

    }
}

onmessage = function (msg) {

    if (msg.data == "BG") {
        console.log("Going BG")
        /*
        console.log("Starting WORKER THREAD...")
        socketWorker = new SocketIO('https://www.haremaltin.com:2087');
        socketWorker.connect()
        socketWorker.on('price_changed', function (rec_data) {
            console.log("Worker thread price changed!!")
            var updatedArray = [];
            var data = rec_data.data;


            if (data["USDTRY"]) {
                var strdata = JSON.stringify(data["USDTRY"])
                alertCheck("dolaralert", strdata, "Dolar");
            }


            if (data["EURTRY"]) {
                var strdata2 = JSON.stringify(data["EURTRY"])
                alertCheck("euroalert", strdata2, "Euro");
            }


            if (data["ALTIN"]) {

                var strdata3 = JSON.stringify(data["ALTIN"])
                alertCheck("hasaltınalert", strdata3, "24 Ayar Altın");
            }


            if (data["AYAR22"]) {

                var strdata4 = JSON.stringify(data["AYAR22"])
                alertCheck("22ayaralert", strdata4, "22 Ayar Altın");

            }

            if (data["CEYREK_YENI"]) {

                var strdata5 = JSON.stringify(data["CEYREK_YENI"])
                alertCheck("ceyrekalert", strdata5, "Çeyrek Altın");

            }

            if (data["TEK_YENI"]) {

                var strdata6 = JSON.stringify(data["TEK_YENI"])
                alertCheck("tekalert", strdata6, "Cumhuriyet Altını");


            }
        })*/
    }else if(msg.data == "termSock"){
       // socketWorker.disconnect();
       // console.log("Worker socket disconnected.")
    } else if(msg.data == "LowMem"){
       notification("Low Memory App Exit", "TEST") 
    }else if(msg.data == "onFinish"){
      // notification("App finishing", "TEST") 
    }else if(msg.data == "onRestart"){
       //notification("App restarting", "TEST") 
    }else if(msg.data == "onError"){
       notification("App ERROR", "TEST") 
    }
    
    else{
console.log("Message received from main thread: " + msg.data);
    setTimeout(function () {
        notification("TEST", "TEST")

    }, 5000)

        
    }


   
}
onerror = function (e) {
    console.log("Oh no! Worker thread error: " + e);
    return true;
}
