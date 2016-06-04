(function () {
    chrome.webNavigation.onCompleted.addListener(function (details) {
        var getProfiles = function () {
            var profilesStr = localStorage.OpenMTEditorScreen;
            var json;

            if (profilesStr) {
                json = JSON.parse(profilesStr);
                return {
                    profiles: json
                };
            }

            return {};
        };
        var profileData = getProfiles();
        var url = details.url;

        profileData.profiles.forEach(function (profile) {
            var domain = profile.domain.replace(/https?:\/\/([^\/]+)/, "$1");

            if (url.indexOf(domain) > -1 && url.indexOf(profile.adminPath) === -1) {
                localStorage.OpenMTEditorScreenCurrent = JSON.stringify(profile);
                chrome.pageAction.show(details.tabId);
            }
        });
    });

    chrome.pageAction.onClicked.addListener(function (tab) {
        var url = tab.url;
        var filePath = url.replace(/https?:\/\/[^\/]+(.*)/, "$1");
        var adminURL;
        var profileStr = localStorage.OpenMTEditorScreenCurrent;
        var matchProfile = JSON.parse(profileStr);

        if (matchProfile.adminDomain) {
            adminURL = matchProfile.adminDomain + matchProfile.adminPath;
        } else {
            adminURL = matchProfile.domain + matchProfile.adminPath;
        }

        if (/.*\/$/.test(filePath)) {
            if (matchProfile.dirIndex) {
                filePath = filePath + matchProfile.dirIndex;
            } else {
                filePath = filePath + "index.html";
            }
        }

        $.ajax({
            url: adminURL,
            method: "get",
            data: {
                __mode: "get_file_info",
                url: encodeURI(filePath)
            }
        }).done(function (response, status, xhr) {
            var contentType = xhr.getResponseHeader("content-type") || "";
            var data = response.result;
            var openURL;

            if (contentType.indexOf("html") > -1) {
                alert("Movable Type管理画面にログインしてください。");
            }

            if (contentType.indexOf("json") > -1) {
                if (!response.error) {
                    openURL = adminURL + "?__mode=view&blog_id=" +
                                data.blog_id + "&id=" + data.id +
                                "&_type=" + data.class;
                    chrome.tabs.create({ url: openURL });
                } else {
                    alert("該当する記事・ウェブページが見つかりませんでした。");
                }
            }
        });
    });
}());
