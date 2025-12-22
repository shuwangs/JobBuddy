import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddJob.css';
const AddJob = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    console.log(BASE_URL);
    const navigate = useNavigate();

    const [parseUrl, setParseUrl] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [parsedJob, setParsedJob] = useState(null);

    const handleParse = () =>{
        if(!parseUrl) {return};
    
        setIsParsing(true);
    
        setTimeout(()=> {
            let mockData = {
                company: "Unknown Corp",
                title: "Software Engineer",
                location: "Remote",
                salary: "Unknown",
                url: parseUrl,
                date: new Date().toISOString().split('T')[0],
                status: "Applied"
            }
            setParsedJob(mockData);
            setIsParsing(false);
        }, 2000)};

    const handleAddJobToDb = async () => {
        console.log("Saving to DB:", parsedJob);

    try {
        const jobToSave = parsedJob ? {
            title: parsedJob.title,
            company: parsedJob.company,
            location: parsedJob.location,
            salaryRange: parsedJob.salary,
            url: parsedJob.url,
            status: "WAITLISTED"} : null;

        if (!jobToSave) return;
        // TODO: Call API to save
        await axios.post(`${BASE_URL}/api/jobs`, jobToSave)
        console.log("saved successfully!");
        clearInputArea();
    } catch (error) {
        console.error("Failed to save job:", error);
        alert("Save failed, check console.");
    }
  }


  const [formData, setFormData] = useState({
    company: '', title: '', status: 'WAITLISTED', date: new Date().toISOString().split('T')[0],
    location: '', salary: '', url: '', note: ''
  });

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Manual Form Data:", formData);
    try {
        const jobToSave =  {
            title: formData.title,
            company: formData.company,
            location: formData.location,
            salaryRange: formData.salary,
            url: formData.url,
            note: formData.note,
            status: formData.status ? formData.status.toUpperCase() : "WAITLISTED"} ;

           // TODO: Call API to save
            await axios.post(`${BASE_URL}/api/jobs`, jobToSave)
            console.log("saved successfully!");
            clearInputArea();
        } catch (error) {
            console.error("Failed to save job:", error);
            alert("Save failed, check console.");
        }

        setFormData({ company: '', title: '', status: 'WAITLISTED',
       location: '', salary: '', url: '', note: ''  })

  };



  const clearInputArea = () => {
    setParseUrl('');
    setParsedJob(null);
  }

  return(
    <div className="add-job-container">

      {/* parsing area */}
      <div className='parser-section'>
        <h3 className="parser-title">✨ AI Auto-Parse (Beta)</h3>
        <p>
           Paste a job link from LinkedIn, Indeed, or Glassdoor
        </p>
      </div>

      <div className="parser-input-group">
          <input 
            type="text" 
            className="form-input" 
            placeholder="https://www.linkedin.com/jobs/..." 
            value={parseUrl}
            onChange={(e) => setParseUrl(e.target.value)}
          />
          <button 
            className="btn-parse" 
            onClick={handleParse}
            disabled={isParsing}>
            {isParsing ? "Parsing..." : "Parse Link"}
          </button>
      </div>

      {/* After parsing show preview */}
      {parsedJob && (
        <div className='preview-container' >
          <table className='preview-table'>
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>URL</th>
                <th>Salary Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{parsedJob.company}</td>
                <td>{parsedJob.title}</td>
                <td>{parsedJob.location}</td>
                <td>{parsedJob.url}</td>
                <td>{parsedJob.salary}</td>
              </tr>
            </tbody>
          </table>

          <div className="preview-actions">
               <button 
                 className="btn-cancel" 
                 onClick={clearInputArea} >
                 Cancel
               </button>
               <button 
                 className="btn-save" 
                 onClick={handleAddJobToDb}
                 style={{backgroundColor: 'var(--primary-green)'}}>
                 Save
               </button>
        </div>
      </div>
      )}

    {/* Manual add job */}
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">Or Add Manually</h2>
      </div>

      <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* first line */}
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text" name="company" required
                className="form-input"
                value={formData.company} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text" name="title" required
                className="form-input"
                value={formData.title} onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>Date Applied</label>
              <input
                type="date" name="date" className="form-input"
                value={formData.date} onChange={handleChange}
              />
            </div>

            {/* third line */}
            <div className="form-group">
              <label>Location</label>
              <input
                type="text" name="location" className="form-input"
                value={formData.location} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text" name="salary" className="form-input"
                value={formData.salary} onChange={handleChange}
              />
            </div>

            {/* url */}
            <div className="form-group full-width">
              <label>Job Posting URL</label>
              <input
                type="url" name="url" className="form-input"
                value={formData.url} onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                name="note" className="form-textarea"
                value={formData.note} onChange={handleChange}
              ></textarea>
            </div>

            </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="btn-save">Save Application</button>
          </div>

      </form>
 </div>
  </div>
  );
};

export default AddJob;