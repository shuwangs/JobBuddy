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
const extractIndeedJobDetails = () => {};
const extractGlassdoorJobDetails = () => {};