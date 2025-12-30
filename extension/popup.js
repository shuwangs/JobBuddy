const BACKEND_URL = "https://jobbuddy-u6n3.onrender.com";
// Get the current active url
document.addEventListener('DOMContentLoaded', ()=>{
    const loginSection = document.getElementById('login-section');
    const mainSection = document.getElementById('main-section');
    const statusDiv = document.getElementById('status');

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const saveBtn = document.getElementById('save-btn');

    const jobTitleSpan = document.getElementById('job-title');
    const jobCompanySpan = document.getElementById('job-company');

    // Open dashbaord buttons
    const goToWebBtn = document.getElementById('go-to-web-btn');
    const WEB_DASHBOARD_URL = "https://job-buddy-job.vercel.app/dashboard";

    let currentJobData = null;

    // Check if local has valid token
    chrome.storage.local.get(['token'], (result) => {
        if (result.token) {
            showMainInterface(result.token);
        } else {
            loginSection.style.display="block";
            mainSection.classList.add('hidden');
        }
    })

    // login button
    loginBtn.addEventListener('click', async () => {

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showStatus("Please enter username and password", "error");
            return;
        }
        showStatus("Logging in...", "normal");

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            chrome.storage.local.set({'token' : data.token},() => {
                showStatus("");
                showMainInterface(data.token);
            });
        } catch (e) {
            showStatus(" Login failed: " + e.message, "error");
        }

    
    });
    
    logoutBtn.addEventListener('click', ()=> {
        chrome.storage.local.remove('token', () => {
            loginSection.style.display = 'block';
            mainSection.classList.add('hidden');
            currentJobData = null;
            showStatus('Logged out', "normal");
        });
    });

    // Show main interface
    // extension/popup.js

    function showMainInterface(token) {
        loginSection.style.display = 'none';
        mainSection.classList.remove('hidden');

        jobTitleSpan.textContent = "Ready to capture";
        jobCompanySpan.textContent = "Click 'Analyze' to start";
        saveBtn.disabled = true;

        const analyzeBtn = document.getElementById('analyze-btn');
        
        analyzeBtn.onclick = () => {
            showStatus("Analyzing page...", "normal");
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (!tabs[0]) return;
                chrome.tabs.sendMessage(tabs[0].id, { action: "GET_JOB_DETAILS" }, (response) => {
                    if (chrome.runtime.lastError || !response) {
                        currentJobData = {
                            title: tabs[0].title,
                            company: "Unknown",
                            url: tabs[0].url,
                            status: "APPLIED"
                        };
                        showStatus("Could not parse automatically.", "error");
                    } else {
                        currentJobData = response;
                        jobTitleSpan.textContent = response.title;
                        jobCompanySpan.textContent = response.company;
                        showStatus("Captured!", "success");
                    }
                    saveBtn.disabled = false; 
                });
            });
        };


        saveBtn.onclick = () => saveJobToBackend(token);

        goToWebBtn.onclick = () => {
            chrome.storage.local.get(['token'], (result) => {

                const finalToken = result.token || token;


                if (result && result.token) {
                    
                    const authUrl = `${WEB_DASHBOARD_URL}?token=${result.token}`;
                    console.log("SSO 跳转中:", authUrl);
                    chrome.tabs.create({ url: authUrl });
                } else {
                
                    chrome.tabs.create({ url: "https://job-buddy-job.vercel.app/login" });
                }
            });
        };
    }

    



    async function saveJobToBackend(token) {
        if (!currentJobData) return;

        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";


        try {
            const response = await fetch(`${BACKEND_URL}/api/jobs`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` //
                },
                body: JSON.stringify(currentJobData)
            });

            if (response.ok) {
                showStatus("Saved Successfully!", "success");
                saveBtn.textContent = "Saved";
                setTimeout(() => window.close(), 1500); 
            } else {
                throw new Error("Server Error");
            }
        } catch (e) {
            showStatus("Save Failed: " + e.message, "error");
            saveBtn.disabled = false;
            saveBtn.textContent = "Try Again";
        }
    }


    function showStatus(msg, type) {
        statusDiv.style.display = msg ? 'block' : 'none';
        statusDiv.textContent = msg;
        statusDiv.className = type; // class="error" or class="success"
    }

})
 

