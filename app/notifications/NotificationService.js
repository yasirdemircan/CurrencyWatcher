const ad = require("tns-core-modules/utils/utils").ad;
const context = ad.getApplicationContext();
const appSettings = require("tns-core-modules/application-settings");
const LocalNotifications = require("nativescript-local-notifications").LocalNotifications;
var SocketIO = require('nativescript-socketio').SocketIO;
var socketService;
const Color = require("tns-core-modules/color").Color;
//Copy of notification func for service
function notification(param1, param2) {
    LocalNotifications.schedule([{
        id: 1,
        title: param1,
        body: param2,
        color:new Color("#001eff"),
        ticker: 'The ticker',
        badge: 1,
        priority:1,
        channel: 'My Channel',
        sound: "customsound-ios.wav"
  }])

}
//Copy of alert check for Service
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

function checkServer() {
    console.log("Starting Service Work...")
    socketService = new SocketIO('https://www.haremaltin.com:2087');
    socketService.connect()
    socketService.on('price_changed', function (rec_data) {
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
    })
}

function readDolar() {
    console.log("Starting Service Work...")
    socketService = new SocketIO('https://www.haremaltin.com:2087');
    socketService.connect()
    socketService.on('price_changed', function (rec_data) {
        console.log("Worker thread price changed!!")
        var updatedArray = [];
        var data = rec_data.data;
        if (data["USDTRY"]) {
            notification("Dolar Alış", data["USDTRY"].alis)
        }

    })
}

android.app.job.JobService.extend("com.tns.notifications.NotificationService", {
    onStartJob: function (params) {
        console.log("Starting job...");
        checkServer();
     
        return false;
    },

    onStopJob: function () {
        console.log("Stopping job ...");
    }
});
