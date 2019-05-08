console.log("Shield Started");
const url = "http://35.197.136.181/api/predict";

function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
        // console.log(url, data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        }
    })
}
function detection() {
	let data = {
		link: location.href
	}
	postRequest(url, data).then(response => {
		// console.log(url, response);
        if (response === "1") {
            try {
                let blockedUrl = browser.extension.getURL('blocked.html') + "?site=" + data.link;
                location.href = blockedUrl
                // browser.tabs.update(sender.tab.id, {url: blockedUrl})
            } catch (e) {
                console.log("Can't redirect block ", url)
            }
        }
    })
}

detection();