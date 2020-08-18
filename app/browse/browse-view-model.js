const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("tns-core-modules/application-settings");
const view = require("tns-core-modules/ui/core/view");

function BrowseViewModel() {
    var cType = 0;
    var buySell = 0;
    var opType = 0;
    var cValue;
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        
        alertObj:{},
        onTap :function (args){
var currencyAlertList = ["dolar","euro","hasaltın","22ayar","ceyrek","tek"]
var textBoxVal = args.object.page.getViewById("cValue").text
 this.alertObj.cType = cType;
 this.alertObj.buySell = buySell;
 this.alertObj.opType = opType;
 this.alertObj.cValue = parseFloat(textBoxVal);
appSettings.setString(currencyAlertList[cType]+"alert",JSON.stringify(this.alertObj));
 alert("Uyarı başarıyla eklendi");

        },
        onCurrencyListLoaded:function(args){
       var listPicker1 = args.object;
    listPicker1.on("selectedIndexChange", (lpargs) => {
       var picker = lpargs.object;
        cType = picker.selectedIndex;
        //console.log(`ListPicker selected value: ${picker.selectedValue} ListPicker selected index: ${picker.selectedIndex}`);
    });
    }
        ,
        onOperatorListLoaded:function(args){
           var listPicker2 = args.object;
    listPicker2.on("selectedIndexChange", (lpargs) => {
        
        var picker = lpargs.object;
        opType = picker.selectedIndex;
        //console.log(`ListPicker selected value: ${picker.selectedValue} ListPicker selected index: ${picker.selectedIndex}`);
    });
        },
             onBuySellListLoaded:function(args){
           var listPicker3 = args.object;
    listPicker3.on("selectedIndexChange", (lpargs) => {
        var picker = lpargs.object;
        buySell = picker.selectedIndex;
        //console.log(`ListPicker selected value: ${picker.selectedValue} ListPicker selected index: ${picker.selectedIndex}`);
    });
        },
    currencies :["Dolar","Euro","24 Ayar Altın","22 Ayar Altın","Çeyrek Altın","Cumhuriyet Altını"],
    buysell:["Alış","Satış"],
    operations :["Büyük Eşit","Küçük Eşit"]
    });

    return viewModel;
}

module.exports = BrowseViewModel;
