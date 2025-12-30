// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("JobBuddy Extension Installed!");
});
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "SEND_PAYLOAD_TO_BACKEND") {
//     console.log("JobBuddy Background: Received payload, sending to server...");

//     const API_URL = "https://jobbuddy-u6n3.onrender.com/api/jobs";

//     chrome.storage.local.get(['token'], (result) => {
//         const token = result.token;
//         if (!token) {
//             console.error("JobBuddy: No token found. User must login first.");
//             sendResponse({ success: false, error: "Unauthorized: Please login first." });
//             return;
//         }

//         fetch(API_URL, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           },
//           body: JSON.stringify(request.payload),
//         })
//           .then(async (response) => {
//             if (response.ok) {
//               const data = await response.json();
//               sendResponse({ success: true, data: data});
//             } else {
//               const errText = await response.text();
//               sendResponse({ success: false, error: `Server Error (${response.status}): ${errText}` });            }
//           })
//           .catch((error) => {
//             console.error("Fetch Error:", error);
//             sendResponse({ success: false, error: error.message });
//           });

//         return true;
//   }


// });