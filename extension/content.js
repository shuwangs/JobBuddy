const getJobDetails = () => {
  console.log("JobBuddy: Starting extraction...");
  const url = window.location.href;
  console.log("JobBuddy: URL -", url);

  if(url.includes("linkedin.com/jobs/view/")) {
    return extractLinkedInJobDetails(url);
  } else if(url.includes("indeed.com/viewjob?")) {
    return extractIndeedJobDetails(url);
  } else if(url.includes("glassdoor.com/job-listing/")) { 
    return extractGlassdoorJobDetails(url);
  } else {
    console.log("JobBuddy: Unsupported job board.");
    return null;
  }

}


const extractLinkedInJobDetails = (url) => {
    console.log("JobBuddy: Parsing LinkedIn...");

    let title = document.querySelector('.job-details-jobs-unified-top-card__job-title h1')?.innerText
             || document.querySelector('.top-card-layout__title')?.innerText
             || document.querySelector('h1')?.innerText 
             || "Unknown Title";

    let company = document.querySelector('.job-details-jobs-unified-top-card__company-name a')?.innerText
             || document.querySelector('.topcard__org-name-link')?.innerText
             || document.querySelector('.job-details-jobs-unified-top-card__company-name')?.innerText
             || "Unknown Company";

    let locationContainer = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description-container span:first-child')?.innerText
              || document.querySelector('.topcard__flavor--bullet')?.innerText 
              || document.querySelector('.job-details-jobs-unified-top-card__workplace-type')?.innerText
              || "";
    let location = locationContainer.split(' · ')[0].trim();

    const detailsContainer = document.querySelector('.job-details-fit-level-preferences');
    let salaryRange = null;
    let workplaceType = null;
    let jobType = null;
    if (detailsContainer) {
        const buttons = detailsContainer.querySelectorAll('button');

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
    let title = document.querySelector('h1')?.innerText 
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