import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {useSearchParams, useNavigate } from 'react-router-dom';
import CHEER_MESG from "../utils/cheerMessages";
import JobTable from '../components/JobTable';
import Stats from '../components/Stats';
import "./Dashboard.css";

const Dashboard = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    console.log("Current Backend URL:", BASE_URL);

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const tokenFromUrl = searchParams.get('token');

        if (tokenFromUrl) {
          localStorage.setItem('token', tokenFromUrl);
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl)
        }

        fetchJobs();

        }, [searchParams]);

    const fetchJobs = async ()=>{

        const token = localStorage.getItem('token');
        if(!token) {
          navigate('/login');
          return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/jobs`, 
              {
              headers:{
                'Authorization': `Bearer ${token}`
              }
            });
            console.log("Jobs fetched:", response.data);
            setJobs(response.data);

        } catch(e) {
            console.error("Fetch error:", e);
            if (e.response && (e.response.status === 403 || e.response.status === 401)){
                localStorage.removeItem('token');
                navigate('/login');
            } else {
              setError("Failed to load jobs. Is the backend running?");
            } 
        }finally {
            setLoading(false);
        }
    }


    // Daily Cheer logic 
    const getDailyCheerMessage = () => {
        if (!CHEER_MESG || CHEER_MESG.length === 0) return "Keep going!";
        const today = new Date().toISOString().slice(0, 10);
        const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return CHEER_MESG[hash % CHEER_MESG.length];
    };
    const cheer = getDailyCheerMessage();

    // Handle the delelte, edit of the job
    const handleDeleteJob = async(jobId) => {
        if(!window.confirm("Are you sure you want to delete this job?")) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            await axios.delete(`${BASE_URL}/api/jobs/${jobId}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
            });

            setJobs(jobs.filter(job => String(job.id)!== String(jobId)));
            alert('Job deleted successfully!');
        } catch (e) {
            console.error("Delete error:", e);
            alert("Failed to delete the job. Please try again.");
        }
      
    };

    const handleUpdateJob = async (jobId, fieldsToUpdate) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            // call @PutMapping at the backend for partial updates
            const response = await axios.put(
                `${BASE_URL}/api/jobs/${jobId}`,{
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                }
              )

              // Update the UI
              setJobs(prevJobs => 
                  prevJobs.map(job => (String(job.id) === String(jobId) ? response.data : job))
              );

            console.log("Job updated successfully!");

        } catch (e) {
            console.error("Update error:", e);
            alert("Failed to update job details.");
        }
    }

    const onEditJob = (job) => {
        const newNote = window.prompt("Edit Note:", job.note || "");
        const newDate = window.prompt("Edit Date:", job.date || "");
        const newStatus = window.prompt("Edit Status:", job.status || "Waitlisted");

        if (newNote !== null || newDate !== null) {
            const fieldsToUpdate = { 
                ...job, // 
                note: newNote !== null ? newNote : job.note, 
                date: newDate !== null ? newDate : job.date,
                status: newStatus !== null ? newStatus.toUpperCase() : job.status
            };
            handleUpdateJob(job.id, fieldsToUpdate);
        }
    }

    return (
      <div className="dashboard-container">
        <div className="quote-area">
          <p className="text-sm text-gray-600 mb-4">{cheer}</p>
        </div>

        {/* Display error info */}
        {loading && <p>Loading your applications...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}

        <Stats jobs={jobs} />
        <JobTable jobs={jobs}
            onDelete = {handleDeleteJob}
            onEdit = {onEditJob}
        />
      </div>
    );

}      
export default Dashboard;