$(document).ready(function () {
    $('#newTab').click(function () {
        chrome.tabs.create({ url: "home.html" });
    })
    $('#openGithub').click(function () {
        chrome.tabs.create({ url: "https://github.com/yuezhangW/asoul_extension" });
    })
    $('#openGitee').click(function () {
        chrome.tabs.create({ url: "https://github.com/yuezhangW/asoul_extension" });
    })
})