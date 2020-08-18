const application = require("tns-core-modules/application");
const MyWorker = require("nativescript-worker-loader!./BGworker.js");
var utils = require("utils/utils");
var BackgroundFetch = require("nativescript-background-fetch").BackgroundFetch;
var worker;
function initWorker(){
     worker = new MyWorker();
//worker.postMessage("Hello from main!");
worker.onmessage = function(msg) {
    console.log("Message received from worker thread: " + msg.data);
}
worker.onerror = function(err) {
        console.log(`An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`);
        console.log(err.message);
    }
}


application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
       console.log("Back Pressed");

   
    });



   application.on(application.suspendEvent, (args) => {
    if (args.android) {
        initWorker();
        worker.postMessage("BG");
 
    } else if (args.ios) {
        console.log("UIApplication: " + args.ios);
    }
});

application.android.on(application.AndroidApplication.activityResumedEvent, function (args) {
  
    if(worker){
        worker.postMessage("termSock");
      worker.terminate();
        console.log("Worker Terminated");
    }else{
        console.log("App Resumed");
    }
        
    });


application.on(application.lowMemoryEvent, (args) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
         worker.postMessage("LowMem");
        console.log("Activity: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
application.on(application.exitEvent, (args) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
        if (args.android.isFinishing()) {
            console.log("Activity: " + args.android + " is exiting");
             worker.postMessage("onFinish");
            
         
            
            
        } else {
            console.log("Activity: " + args.android + " is restarting");
             worker.postMessage("onRestart");
        }
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});
application.on(application.uncaughtErrorEvent, (args) => {
    console.log("Error: " + args.error);
    worker.postMessage("onError");
});





application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
