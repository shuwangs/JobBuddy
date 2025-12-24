// Get the current active url
document.getElementById('parseBtn').addEventListener('click', 
    
    async ()=> {
        console.log("save button is cliked");
        const [tab] = await chrome.tabs.query({
            active: true, currentWindow: true
        })
        if(tab.id) {
            chrome.tabs.sendMessage(tab.id, { action: "SAVE_JOB" }, (response) => {
            if (chrome.runtime.lastError) {
                 console.error("Conection failed");

                // console.error("Conection failed:", chrome.runtime.lastError.message);
            } else {
                console.log("Message sent，Content Script responded:", response);
            }
            });
        }
    }
)