var ProxyToggle = function () {
    Components.utils.import("resource://gre/modules/Services.jsm");
    return {
        init : function () {
            // Update the button to match the proxy state at startup
            ProxyToggle.updateButtonState();
            // Get notified every time the proxy state changes
            Services.prefs.addObserver("network.proxy.type", ProxyToggle.updateButtonState, false);
        },

        updateButtonState : function() {
            var button = document.getElementById('proxy-toggle-toolbar-button');
            if (button) {
                if (Services.prefs.getIntPref("network.proxy.type") == 0) {
                    button.checked = false;
                } else {
                    button.checked = true;
                }
            }
        },
            
        toggle : function () {
            if (Services.prefs.getIntPref("network.proxy.type") == 0) {
                Services.prefs.setIntPref("network.proxy.type", 2);
            } else {
                Services.prefs.setIntPref("network.proxy.type", 0);
            }
            ProxyToggle.updateButtonState();
         }
    };
}();

window.addEventListener("load", ProxyToggle.init, false);
