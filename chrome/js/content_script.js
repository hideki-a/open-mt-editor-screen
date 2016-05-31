chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.method == "getText") {
            sendResponse({ data: document.all[0].innerHTML, method: "getText" }); //same as innerText
        }
    }
);