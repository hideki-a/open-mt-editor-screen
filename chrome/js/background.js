(function () {
    chrome.tabs.onUpdated.addListener(function (tabId) {
        chrome.pageAction.show(tabId);
    });

    chrome.pageAction.onClicked.addListener(function (tab) {
        chrome.tabs.sendRequest(tab.id, { method: "getText" }, function (response) {
            var text;
            var dataStr;
            var data;
            var newURL;

            if (response.method=="getText") {
                text = response.data;
                dataStr = text.replace(/(.|\n)*<\!\-\- class\: (.*?), bid\: (\d+), eid\: (\d+) \-\->(.|\n)*/,"$2,$3,$4");
                data = dataStr.split(",");
                newURL = "http://mt6.localhost/mt/mt.cgi?__mode=view&blog_id=" + data[1] + "&id=" + data[2] + "&_type=" + data[0];
                chrome.tabs.create({ url: newURL });
            }
        });
    });
}());