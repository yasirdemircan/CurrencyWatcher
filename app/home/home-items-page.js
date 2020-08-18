const HomeItemsViewModel = require("./home-items-view-model");
var utils = require("tns-core-modules/utils/utils");
var jobScheduler = require("./notifications/job-scheduler");
const app = require("tns-core-modules/application");
var SocketIO = require('nativescript-socketio').SocketIO;
const appSettings = require("tns-core-modules/application-settings");

function onNavigatingTo(args) {
    const component = args.object;
    startCheck();
    component.bindingContext = new HomeItemsViewModel();
    
     app.android.registerBroadcastReceiver("customservice",

       (androidContext, intent) => {
            console.log("________________________________________________Data Received");
            that.data = intent.getIntExtra("message",-1/*default value*/);
            console.log("Data + " + that.data);
    });
    
     jobScheduler.scheduleJob(utils.ad.getApplicationContext());
    console.log("JOB SCHEDULED");
    
}

function onItemTap(args) {
    const view = args.view;
    const page = view.page;
    const tappedItem = view.bindingContext;

    page.frame.navigate({
        moduleName: "home/home-item-detail/home-item-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
