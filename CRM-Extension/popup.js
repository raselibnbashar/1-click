document.getElementById("data").addEventListener("click", async function() {
    try {
        const clipboardText = await navigator.clipboard.readText();
        this.value = clipboardText;
        const inputValue = (this.value);
        //const inputValue = JSON.stringify(document.getElementById('data').value);

        // Send a message to the content script with the input data
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "injectData", data: inputValue });
        });
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
});



// document.getElementById('data').addEventListener('keyup', function() {
//
//     const inputValue = document.getElementById('data').value;
//     //const inputValue = JSON.stringify(document.getElementById('data').value);
//
//     // Send a message to the content script with the input data
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "injectData", data: inputValue });
//     });
// });
