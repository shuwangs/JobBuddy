// --------------- Get job Details Logic --------------------
const getJobDetails = () => {
  console.log("JobBuddy: Starting extraction...");
  const url = window.location.href;
  console.log("JobBuddy: URL -", url);

  if(url.includes("linkedin.com/jobs/view/") || 
    url.includes("linkedin.com/jobs/collections/") || 
    url.includes("linkedin.com/jobs/search/")) {
    return extractLinkedInJobDetails(url);
  } else if(url.includes("indeed.com/viewjob") || 
    url.includes("indeed.com/job") || 
    url.includes("indeed.com/?from=gnav")) {
    return extractIndeedJobDetails(url);
  } else if(url.includes("glassdoor.com/job-listing/")) { 
    return extractGlassdoorJobDetails(url);
  } else {
    console.log("JobBuddy: Unsupported job board.");
    return null;
  }

}

// --------------- Helpers to get job details--------------------
const extractLinkedInJobDetails = (url) => {
    console.log("JobBuddy: Parsing LinkedIn...");
    const detailsContainer = document.querySelector('.jobs-details__main-content') 
                              || document.querySelector('.scaffold-layout__detail') 
                              || document;

    let title = detailsContainer.querySelector('.job-details-jobs-unified-top-card__job-title h1')?.innerText
             || detailsContainer.querySelector('.top-card-layout__title')?.innerText
             || detailsContainer.querySelector('h1')?.innerText 
             || "Unknown Title";

    let company = detailsContainer.querySelector('.job-details-jobs-unified-top-card__company-name a')?.innerText
             || detailsContainer.querySelector('.topcard__org-name-link')?.innerText
             || detailsContainer.querySelector('.job-details-jobs-unified-top-card__company-name')?.innerText
             || "Unknown Company";

    let location = ""; 
    const primaryDesc = detailsContainer.querySelector('.job-details-jobs-unified-top-card__primary-description-container');
    if (primaryDesc) {
        const parts = primaryDesc.innerText.split(/·|•/); 
        location = parts.find(p => {
            const t = p.trim();
            return t.length > 2 && !t.includes("Reposted") && !t.includes("ago") && !t.includes(company.trim());
        })?.trim();
    }
    if (!location) {
         let locContainer = detailsContainer.querySelector('.job-details-jobs-unified-top-card__tertiary-description-container span:first-child')?.innerText
              || detailsContainer.querySelector('.topcard__flavor--bullet')?.innerText 
              || "";
         location = locContainer.split('·')[0].trim();
    }
    const detailsPreferences = detailsContainer.querySelector('.job-details-fit-level-preferences');
    let salaryRange = null;
    let workplaceType = null;
    let jobType = null;
    if (detailsPreferences) {
        const buttons = detailsPreferences.querySelectorAll('button');

        buttons.forEach(button => {
            // Find the strong tag which holds the actual text
            const textElement = button.querySelector('strong');
            if (textElement) {
                const text = textElement.textContent.trim();

                if (text.includes('$') || text.match(/\d/)) {
                    salaryRange = text;
                } else if (['On-site', 'Remote', 'Hybrid'].some(type => text.includes(type))) {
                    workplaceType = text;
                } else if(['Intership', "Full-time", 'Contract', 'Part-time'].some(type => text.includes(type) )) {
                    jobType = text;
                }
            }
        });

        console.log("Salary:", salaryRange);         
        console.log("Workplace:", workplaceType)
    }
    const jobPayload = {
        title: title,
        company: company,
        location: location,
        salaryRange: salaryRange,  
        url: url,
        status: "WAITLISTED",    
        jobType: jobType,
        // workplaceType: workplaceType,
        note: null}

  return jobPayload;
};

const extractIndeedJobDetails = (url) => {
    let title = document.querySelector('[data-testid="jobsearch-JobInfoHeader-title"]')?.innerText 
           || document.querySelector('.jobsearch-JobInfoHeader-title')?.innerText
           || "Unknown Title";

    let company = document.querySelector('[data-company-name="true"]')?.innerText
             || document.querySelector('.jobsearch- a')?.innerText
             || "Unknown Company";

    let location = document.querySelector('[data-testid="inlineHeader-companyLocation"]')?.innerText
              || document.querySelector('.jobsearch-JobInfoHeader-subtitle div:last-child')?.innerText
              || "";
    let rawText = document.querySelector('#salaryInfoAndJobType')?.innerText
            || document.querySelector('.jobsearch-JobMetadataHeader-item')?.innerText
            || "";
    
    let parts = rawText.split(' - ');
    let jobType = parts.pop(); 
    let salaryRange = parts.join(' - ');

    const jobPayload = {
    title: title,
    company: company,
    location: location,
    salaryRange: salaryRange,  
    url: url,
    status: "WAITLISTED",    
    jobType: jobType,
    // workplaceType: workplaceType,

    note: null
  };

  return jobPayload;
};

const extractGlassdoorJobDetails = (url) => {
      let title = document.querySelector('header h1')?.innerText 
          || document.querySelector('[data-test="job-title"]')?.innerText
          || document.querySelector('[class*="heading_Level1"]')?.innerText
          || "Unknown Title";

    let company = document.querySelector('[class*="EmployerProfile_employerNameHeading"]')?.innerText
             || document.querySelector('[data-test="employer-name"]')?.innerText
             || "Unknown Company"

    let location = document.querySelector('[data-test="location"]')?.innerText
              || document.querySelector('[class*="JobDetails_location"]')?.innerText
              || "";
    let salaryRange = document.querySelector('[data-test="detailSalary"]')?.innerText
            || document.querySelector('.salary-estimate-section')?.innerText
            || "";

    const lowerTitle = title.toLowerCase();
    const lowerSalary = salaryRange.toLowerCase();
    let jobType;
    if (lowerTitle.includes("intern") || lowerTitle.includes("internship")) {
        jobType = "Internship";
    } else if (lowerTitle.includes("contract") || lowerTitle.includes("contractor")) {
        jobType = "Contract";
    } else if (lowerTitle.includes("part-time") || lowerTitle.includes("part time")) {
        jobType = "Part-time";
    } else if (lowerSalary.includes("hour")) {
        jobType = "Contract/Hourly"; 
    }
    const jobPayload = {
      title: title,
      company: company,
      location: location,
      salaryRange: salaryRange,  
      url: url,
      status: "WAITLISTED",    
      jobType: jobType,
      // workplaceType: workplaceType,

      note: null
    };

  return jobPayload;
};


// --------------- Send Data to the backend --------------------
const saveJobToBackend = async() =>{
    console.log("JobBuddy is extracting the data...");
    const payload = getJobDetails();

    if(!payload) {
      console.error("Jobbuddy didnot extract the job details successfully");
      return;
    }

    console.log("JobBuddy: Payload ready. Handing off to Background Script...", payload);

    chrome.runtime.sendMessage(
        { 
          action: "SEND_PAYLOAD_TO_BACKEND", 
          payload: payload 
        }, 
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Connection Error:", chrome.runtime.lastError.message);
            alert("Extension Error: Please reload the extension.");
          } else if (response && response.success) {
            console.log("JobBuddy:  Saved Successfully!");
            alert("Job saved to JobBuddy!");
          } else {
            console.error("JobBuddy: Save Failed:", response?.error);
            alert("Save failed: " + (response?.error || "Unknown error"));
          }
        }
    );
}


// --------------- Add Event Listener ------------------
console.log("JobBuddy: Content Script Loaded and Ready!");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SAVE_JOB") {
    saveJobToBackend();
    sendResponse({status: "Processing"});
  }
  return true;
});