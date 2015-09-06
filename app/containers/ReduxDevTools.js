import React from 'react';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export function loadDevTools(store){
  // open redux devtools in a new window
  var win = window.open(null, "redux-devtools", "menubar=no,location=no,resizable=yes,scrollbars=no,status=no");
  win.location.reload();
  setTimeout(function() {
    React.render(
      <DebugPanel top right bottom left>
        <DevTools select={state => state } store={store} monitor={LogMonitor} />
    </DebugPanel>, win.document.body);
  }, 10);
}
  

