const observableModule = require("tns-core-modules/data/observable");
const utilsModule = require("tns-core-modules/utils/utils");
function AboutViewModel() {
    const viewModel = observableModule.fromObject({
       mailTo : function(){
           utilsModule.openUrl("mailto:yasirdemircan@gmail.com")
       }
        
    });
    
    return viewModel;
}

module.exports = AboutViewModel;
