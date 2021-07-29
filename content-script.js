function copyText(text, callback) {
    let tag = document.createElement('input');
    tag.setAttribute('id', 'cp_hgz_input');
    tag.value = text;
    document.getElementsByTagName('body')[0].appendChild(tag);
    document.getElementById('cp_hgz_input').select();
    document.execCommand('copy');
    document.getElementById('cp_hgz_input').remove();
    if (callback) {
        callback(text);
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const url = window.location.href
    const text = ($("head > title").text() || "").replace(" - 禅道", "")
    let branchType = "feature"
    let commitType = "feat"
    if (text.toLowerCase().indexOf("bug") > -1) {
        branchType = "hotfix"
        commitType = "fix"
    }
    let res = "";
    switch (request) {
        case "local_branch_name":
            res = `${branchType}/${text.split(" ").slice(0, 2).join("_")}`
            break;
        case "branch_name":
            res = `${text.split(" ").slice(0, 2).join("_")}`
            break;
        case "commit_msg":
            res = `${commitType}(xxx): xxx \n${text}`
            break;
        case "commit_msg_url":
            res = `${commitType}(xxx): xxx \n${text} \n${url}`
            break;
        default:
            console.log(request);
            break;
    }
    copyText(res)
    sendResponse(res)
});
