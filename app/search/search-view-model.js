const observableModule = require("tns-core-modules/data/observable");
const appSettings = require("tns-core-modules/application-settings");
//const page = require("tns-core-modules/ui/page").Page;




function SearchViewModel() {

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        notifyList: [],
        onListViewLoaded: function (param) {
            this.notifyList = [];
            var page = param.object.page;

            const listView = page.getViewById("listView");
            var allkeys = appSettings.getAllKeys();
            var list = this.notifyList;
            var currenciesarr = ["Dolar","Euro","24 Ayar Altın","22 Ayar Altın","Çeyrek Altın","Cumhuriyet Altını"];
    var buysellarr = ["Alış","Satış"];
   var operationsarr = ["> =","< ="];
            allkeys.forEach(function (el) {

                if (el.includes("alert")) {
                    var alertArray = JSON.parse(appSettings.getString(el));
                    var alertName = currenciesarr[alertArray.cType];
                    var alertOp = operationsarr[alertArray.opType];
                    var alertBuySell = buysellarr[alertArray.buySell];
                    var alertVal = alertArray.cValue;
                    list.push({
                        name:alertName,optype:alertOp,val:alertVal,buysell:alertBuySell
                    });
                }
            })
            listView.refresh();
        }
    });

    return viewModel;
}

module.exports = SearchViewModel;
