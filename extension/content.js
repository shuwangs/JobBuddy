const getJobDetails = () => {
  console.log("JobBuddy: Starting extraction...");
  const url = window.location.href;
  console.log("JobBuddy: URL -", url);

  if(url.includes("linkedin.com/jobs/view/")) {
    return extractLinkedInJobDetails();
  } else if(url.includes("indeed.com/viewjob?")) {
    return extractIndeedJobDetails();
  } else if(url.includes("glassdoor.com/job-listing/")) { 
    return extractGlassdoorJobDetails();
  } else {
    console.log("JobBuddy: Unsupported job board.");
    return null;
  }

}

const extractLinkedInJobDetails = () => {};
const extractIndeedJobDetails = (url) => {
    let title = document.querySelector('h1')?.innerText 
           || document.querySelector('.jobsearch-JobInfoHeader-title')?.innerText
           || "Unknown Title";

    let company = document.querySelector('[data-company-name="true"]')?.innerText
             || document.querySelector('.jobsearch-CompanyInfoContainer a')?.innerText
             || "Unknown Company";

    let location = document.querySelector('[data-testid="inlineHeader-companyLocation"]')?.innerText
              || document.querySelector('.jobsearch-JobInfoHeader-subtitle div:last-child')?.innerText
              || "";
    let salary = document.querySelector('#salaryInfoAndJobType')?.innerText
            || document.querySelector('.jobsearch-JobMetadataHeader-item')?.innerText
            || "";

    const jobPayload = {
    title: title,
    company: company,
    location: location,
    salaryRange: salaryRaw,  
    url: url,
    status: "WAITLISTED",    
    description: description.substring(0, 500)
  };

  return jobPayload;
};
const extractGlassdoorJobDetails = () => {};