function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
            if (response) {
                chrome.notifications.create(null, {
                    type: 'image',
                    iconUrl: 'icon.png',
                    title: 'copy success: ',
                    eventTime: 100,
                    message: response,
                    imageUrl: 'icon.png'
                });
            }
        });
    });
}

$(function () {
    $('#copyLocalBranchNameBtn').click(() => {
        sendMessageToContentScript("local_branch_name", (response) => {
        });
    });
    $('#copyBranchNameBtn').click(() => {
        sendMessageToContentScript("branch_name", (response) => {
        });
    });
    $('#copyCommitMsgBtn').click(() => {
        sendMessageToContentScript("commit_msg", (response) => {
        });
    });
    $('#copyCommitMsgWithUrlBtn').click(() => {
        sendMessageToContentScript("commit_msg_url", (response) => {
        });
    });
})