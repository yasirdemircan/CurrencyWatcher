const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("tns-core-modules/application-settings");
const LocalNotifications = require("nativescript-local-notifications").LocalNotifications;
var SocketIO = require('nativescript-socketio').SocketIO;
const Color = require("tns-core-modules/color").Color;

global.startCheck = function(){
    var socket = new SocketIO('https://www.haremaltin.com:2087');
    socket.connect()
    socket.on('price_changed', function (rec_data) {
        var updatedArray = [];
        var data = rec_data.data;
       
        
        if (data["USDTRY"]) {
            var strdata = JSON.stringify(data["USDTRY"])
            alertCheck("dolaralert",strdata,"Dolar");
            
            appSettings.setString("oldDolar", JSON.stringify({
                name: "Dolar",
                color: "#1A652A",
                buy: data["USDTRY"].alis,
                sell: data["USDTRY"].satis,
                lastUpdate: data["USDTRY"].tarih.split(" ")[1]
            }));
            updatedArray.push({
                name: "Dolar",
                color: "#1A652A",
                buy: data["USDTRY"].alis,
                sell: data["USDTRY"].satis,
                lastUpdate: data["USDTRY"].tarih.split(" ")[1]
            })
        } else {
            updatedArray.push(JSON.parse(appSettings.getString("oldDolar")))
        }
        
        
        if (data["EURTRY"]) {
               var strdata2 = JSON.stringify(data["EURTRY"])
            alertCheck("euroalert",strdata2,"Euro");
            
            appSettings.setString("oldEuro", JSON.stringify({
                name: "Euro",
                color: "#C36CB1",
                buy: data["EURTRY"].alis,
                sell: data["EURTRY"].satis,
                lastUpdate: data["EURTRY"].tarih.split(" ")[1]
            }));
            updatedArray.push({
                name: "Euro",
                color: "#C36CB1",
                buy: data["EURTRY"].alis,
                sell: data["EURTRY"].satis,
                lastUpdate: data["EURTRY"].tarih.split(" ")[1]
            })
        } else {
            updatedArray.push(JSON.parse(appSettings.getString("oldEuro")))
        }
        
        
        if (data["ALTIN"]) {
            
                var strdata3 = JSON.stringify(data["ALTIN"])
            alertCheck("hasaltınalert",strdata3,"24 Ayar Altın");
            
            appSettings.setString("oldHasAltın", JSON.stringify({
                name: "Has Altın",
                color: "#FFDF00",
                buy: data["ALTIN"].alis,
                sell: data["ALTIN"].satis,
                lastUpdate: data["ALTIN"].tarih.split(" ")[1]
            }));
            updatedArray.push({
                name: "Has Altın",
                color: "#FFDF00",
                buy: data["ALTIN"].alis,
                sell: data["ALTIN"].satis,
                lastUpdate: data["ALTIN"].tarih.split(" ")[1]
            });
        } else {
            updatedArray.push(JSON.parse(appSettings.getString("oldHasAltın")))
        }
        
        
          if (data["AYAR22"]) {
              
                var strdata4 = JSON.stringify(data["AYAR22"])
            alertCheck("22ayaralert",strdata4,"22 Ayar Altın");
              
            appSettings.setString("old22Ayar", JSON.stringify({
                name: "22 Ayar Altın",
                color: "#d4b902",
                buy: data["AYAR22"].alis,
                sell: data["AYAR22"].satis,
                lastUpdate: data["AYAR22"].tarih.split(" ")[1]
            }));
            updatedArray.push({
                name: "22 Ayar Altın",
                color: "#d4b902",
                buy: data["AYAR22"].alis,
                sell: data["AYAR22"].satis,
                lastUpdate: data["AYAR22"].tarih.split(" ")[1]
            })
        } else {
            updatedArray.push(JSON.parse(appSettings.getString("old22Ayar")))
        }
        
        if (data["CEYREK_YENI"]) {
            
                var strdata5 = JSON.stringify(data["CEYREK_YENI"])
            alertCheck("ceyrekalert",strdata5,"Çeyrek Altın");
            
            appSettings.setString("oldCeyrekYeni", JSON.stringify({
                name: "Çeyrek Altın (Yeni)",
                color: "#d4b902",
                buy: data["CEYREK_YENI"].alis,
                sell: data["CEYREK_YENI"].satis,
                lastUpdate: data["CEYREK_YENI"].tarih.split(" ")[1]
            }));
            updatedArray.push({
                name: "Çeyrek Altın (Yeni)",
                color: "#d4b902",
                buy: data["CEYREK_YENI"].alis,
                sell: data["CEYREK_YENI"].satis,
                lastUpdate: data["CEYREK_YENI"].tarih.split(" ")[1]
            })
        } else {
            updatedArray.push(JSON.parse(appSettings.getString("oldCeyrekYeni")))
        }
        
               
        if (data["TEK_YENI"]) {
            
               
                var strdata6 = JSON.stringify(data["TEK_YENI"])
            alertCheck("tekalert",strdata6,"Cumhuriyet Altını");
            
            appSettings.setString("oldTekYeni", JSON.stringify({
                name: "Tam Altın (Yeni)",
                color: "#d4b902",
                buy: data["TEK_YENI"].alis,
                sell: data["TEK_YENI"].satis,
                lastUpdate: data["TEK_YENI"].tarih.split(" ")[1]
            }));
            updatedArray.push({
                name: "Tam Altın (Yeni)",
                color: "#d4b902",
                buy: data["TEK_YENI"].alis,
                sell: data["TEK_YENI"].satis,
                lastUpdate: data["TEK_YENI"].tarih.split(" ")[1]
            })
        } else {
            updatedArray.push(JSON.parse(appSettings.getString("oldTekYeni")))
        }
        
        
        

        console.log(updatedArray);
        homeViewModel.set("items", updatedArray);

    });
}

function notification(param1,param2){
       LocalNotifications.schedule([{
    id: 1, // generated id if not set
    title: param1,
    body: param2,
    ticker: 'The ticker',
    color:new Color("red"),
    badge: 1,
    //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
   // groupSummary:"Summary of the grouped messages above", //android only
    //ongoing: true, // makes the notification ongoing (Android only)
    //icon: 'res://heart',
    //image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
    //thumbnail: true,
   // interval: 'minute',
    channel: 'My Channel', // default: 'Channel'
    sound: "customsound-ios.wav" // falls back to the default sound on Android
    // 10 seconds from now
  }]).then(
      function(scheduledIds) {
        console.log("Notification id(s) scheduled: " + JSON.stringify(scheduledIds));
      },
      function(error) {
        console.log("scheduling error: " + error);
      }
  )
    
}

function alertCheck(alertType,datastr,name){

    var data = JSON.parse(datastr);
    if(typeof(data.alis) == "string"){
        data.alis = parseFloat(data.alis);
        data.satis = parseFloat(data.satis);
    }
   // alert(data.alis >= 7.0)
     if(appSettings.hasKey(alertType)){
                var alertOBJ = JSON.parse(appSettings.getString(alertType));
                var compareVal = alertOBJ.cValue;
                if(alertOBJ.buySell == 0){
                    if(alertOBJ.opType == 0){
                     if(data.alis >= compareVal){
                         notification(name+" "+data.alis+" seviyesinde.",data.alis+" "+compareVal);
                          appSettings.remove(alertType);
                     }
                    }
                     if(alertOBJ.opType == 1){
                     if(data.alis <= compareVal){
                         notification(name +" "+data.alis+" seviyesinde.",data.alis+" "+compareVal);
                          appSettings.remove(alertType);
                     }
                    }
                }else if(alertOBJ.buySell == 1){
                      if(alertOBJ.opType == 0){
                     if(data.satis >= compareVal){
                         notification(name+" "+data.satis+" seviyesinde.",data.alis+" "+compareVal);
                          appSettings.remove(alertType);
                     }
                    }
                     if(alertOBJ.opType == 1){
                     if(data.satis <= compareVal){
                         notification(name +" "+data.satis+" seviyesinde.",data.alis+" "+compareVal);
                          appSettings.remove(alertType);
                     }
                    }
                }
               
            }
}

function HomeItemsViewModel() {
    
 global.homeViewModel = observableModule.fromObject({
        items: [
            {
                name: "Yükleniyor",
                color: "#e07b39"

            }

        ]
    });

    return homeViewModel;
}

module.exports = HomeItemsViewModel;
