import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddJob.css';

const AddJob = () => {

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

  const handleAddJobToDb = () => {
    console.log("Saving to DB:", parsedJob);

    // TODO: Call API to save

    clearInputArea();
  }
  const [formData, setFormData] = useState({
    company: '', title: '', status: 'Applied', date: new Date().toISOString().split('T')[0],
    location: '', salary: '', url: '', note: ''
  });

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Manual Form Data:", formData);
    // navigate('/dashboard');
  };

  const clearInputArea = () => {
    setParseUrl('');
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
        <div style={{padding:'20px', textAlign:'center', color:'#ccc'}}>
          (Manual Form inputs go here...)
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