(function () {
    function getProfiles () {
        var profilesStr = localStorage["OpenMTEditorScreen"];
        var json;

        if (profilesStr) {
            json = JSON.parse(profilesStr);
            return {
                profiles: json
            };
        }

        return {};
    }

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        var profileData = getProfiles();
        var url = tab.url;

        profileData.profiles.forEach(function (profile) {
            var domain = profile.domain.replace(/https?:\/\/([^\/]+)/, "$1");

            if (url.indexOf(domain) > -1) {
                chrome.pageAction.show(tabId);
            }
        });
    });

    chrome.pageAction.onClicked.addListener(function (tab) {
        console.log(tab.url);
        $.ajax({
            url: "http://mt6.localhost/mt/mt.cgi",
            method: "get",
            data: {
                __mode: "get_file_info",
                url: encodeURI("/2016/05/mt-archived-entries-plugin.html")
            }
        }).done(function (response, status, xhr) {
            var ct = xhr.getResponseHeader("content-type") || "";

            if (ct.indexOf("html") > -1) {
                console.log("login require");
            }
            if (ct.indexOf("json") > -1) {
                console.log(response);
            }
        });
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