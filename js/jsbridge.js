//注册全局回调必须
 window.ZixieJSBridge = window.ZixieJSBridge || {};
	
 var framesPool = [];
	
 function createNewFrame() {
     var frame = document.createElement("iframe");
     framesPool.push(frame);
     frame.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;";
     frame.frameBorder = "0";
     document.body.appendChild(frame);
     return frame;
 }

 var _callWithScheme = callWithScheme = function (url) {
     console.log("JsBridge.callWithScheme: ", url); // @debug
     var frame;
     for (var i = 0; frame = framesPool[i]; i++) {
         if (!frame._busy) {
             break;
         }
     }
     if (!frame || frame._busy) {
         frame = createNewFrame();
     }
     frame._busy = true;
     frame.src = url;
     setTimeout(function () {
         frame._busy = false;
     }, 0);
 };
	
 var allowBatchCall = true;
	
 var seq = 1;
 var map = {};
 var pool = [];
 var timer = 0;
	
 function callSingle(name, args, callback, callbackChain) {
     var url = ["jsb:/", name, seq, "ZixieJSBridge.callback?"].join("/"), params = [];
     for (var key in args) {
         params.push(encodeURIComponent(key) + "=" + encodeURIComponent(args[key] + ""));
     }
     url += params.join("&");
     map[seq++] = {
         callback: callback,
         callbackChain: callbackChain
     };
     _callWithScheme(url);
 }
	
 function callBatch() {
     timer = 0;
     if (pool.length == 1) {
         var one = pool[0];
         callSingle(one.name, one.args, one.callback, one.callbackChain);
     } else {
         var params = [];
         for (var i = 0, one; one = pool[i]; i++) {
             if (one.args) {  
                 for (var p in one.args) {
                     if(one.args.hasOwnProperty(p)) {
                         if (one.args[p]) {
                             one.args[p] = encodeURIComponent(one.args[p]);
                         }
                     }
                 }
             }
             params.push({
                 method: one.name,
                 seqid: seq,
                 args: one.args,
                 callback: "ZixieJSBridge.callback"
             });
             map[seq++] = {
                 callback: one.callback
             };
         }
         var url = ["jsb://callBatch", seq++, "ZixieJSBridge.callback?param="].join("/");
         url += encodeURIComponent(JSON.stringify(params));
         _callWithScheme(url);
     }
     pool = [];
 }
	
 var call = _call = function (name, args, callback) {
     console.log("JsBridge._call: ", name, args); // @debug
     args = args || {};
     var callbackChain = [].slice.call(arguments, 3);
     if (allowBatchCall) {
         pool.push({
             name: name,
             args: args,
             callback: callback,
             callbackChain: callbackChain
         });
         !timer && (timer = setTimeout(callBatch, 0));
     } else {
         callSingle(name, args, callback, callbackChain);
     }
 };
	
 var callback = function (args) {
     console.log("ZixieJSBridge.callback: ", args); // @debug
     var one, res, callbackChain;
     if (map[args.seqid]) {
         one = map[args.seqid];
         callbackChain = one.callbackChain;
         res = one.callback && one.callback(args);
         delete map[args.seqid];
     }
     if (res && typeof res == "object") {
         call.apply(null, [res.name, res.args || {}].concat(callbackChain || []));
     }
 };
	
 ZixieJSBridge.callback = callback;