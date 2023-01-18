import React, { useEffect } from 'react';

export const ChatwootWidget = React.memo(() => {
  useEffect(() => {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: 'en', // Language to be set
      type: 'standard', // [standard, expanded_bubble]
    };
  }, []);

  useEffect(() => {
    document.getElementsByClassName('woot--bubble-holder')?.[0]?.remove();
    document.getElementsByClassName('woot--widget-holder')?.[0]?.remove();
    (function(d, t) {
      var BASE_URL = 'https://support.deepbluework.com';
      var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + '/packs/js/sdk.js';
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = function() {
        window.chatwootSDK.run({
          websiteToken: 'pfeyDP6nfLxDV4YtSdmhVvK2',
          baseUrl: BASE_URL,
        });
      };
    })(document, 'script');
    return () => {
      document.getElementsByClassName('woot--bubble-holder')?.[0]?.remove();
      document.getElementsByClassName('woot--widget-holder')?.[0]?.remove();
    };
  }, []);

  return null;
});
