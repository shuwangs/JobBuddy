// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SEND_PAYLOAD_TO_BACKEND") {
    console.log("JobBuddy Background: Received payload, sending to server...");

    // 你的后端地址 (如果是本地测试请改成 http://localhost:8080/api/jobs)
    const API_URL = "https://jobbuddy-u6n3.onrender.com/api/jobs";

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.payload),
    })
      .then((response) => {
        if (response.ok) {
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: "Server returned " + response.status });
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // ⚠️ 必须加这句，表示我们会“异步”发送回复
  }
});