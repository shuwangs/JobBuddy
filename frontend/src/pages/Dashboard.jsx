import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {useSearchParams, useNavigate } from 'react-router-dom';
import CHEER_MESG from "../utils/cheerMessages";
import JobTable from '../components/JobTable';
import Stats from '../components/Stats';
import  {authHeader} from '../utils/dashboardHooks';

import "./Dashboard.css";

const Dashboard = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    console.log("Current Backend URL:", BASE_URL);

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const tokenFromUrl = searchParams.get('token');

    
    useEffect(() => {

        if (tokenFromUrl) {
          localStorage.setItem('token', tokenFromUrl);
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl)
        }

        fetchJobs();

        }, [tokenFromUrl]);

    const fetchJobs = async ()=>{
        try {
            const response = await axios.get(`${BASE_URL}/api/jobs`, 
              {
              headers:authHeader(),
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
        try {
            await axios.delete(`${BASE_URL}/api/jobs/${jobId}`, {
              headers: authHeader(),
            });

            setJobs(jobs.filter(job => String(job.id)!== String(jobId)));
            alert('Job deleted successfully!');
        } catch (e) {
            console.error("Delete error:", e);
            alert("Failed to delete the job. Please try again.");
        }
      
    };

    const handleStatusChange = async (jobId, status) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const existingJob = jobs.find(job => String(job.id) === String(jobId));
        if (!existingJob) {
          alert("Job not found in UI state.");
          return;
        }

        try {
            // call @patchMapping at the backend for partial updates
            const response = await axios.patch(
                `${BASE_URL}/api/jobs/${jobId}`, 
                  { status },
                  { headers: { ...authHeader(), "Content-Type": "application/json" } }  
                
            );

            const updatedJob = response.data;
            setJobs(prev =>
                prev.map(j => (String(j.id) === String(jobId) ? updatedJob : j))
            );
            
            console.log("Job updated successfully!", response.data);

        } catch (e) {
            console.error("Update error:", {
            message: e.message,
            status: e.response?.status,
            data: e.response?.data,
          });
          alert(`Failed to update. Status: ${e.response?.status ?? "unknown"}`);
        }
    }

    const handleNotesChange = async (jobId, notes) => {
        const existingJob = jobs.find(job => String(job.id) === String(jobId));
        if (!existingJob) {
          alert("Job not found in UI state.");
          return;
        }

         try {
            // call @patchMapping at the backend for partial updates
            const response = await axios.patch(
                `${BASE_URL}/api/jobs/${jobId}`, 
                  { notes: notes },
                  { headers: { ...authHeader(), "Content-Type": "application/json" } }  
                
            );

            const updatedJob = response.data;
            setJobs(prev =>
                prev.map(job => (String(job.id) === String(jobId) ? updatedJob : job))
            );
            
            console.log("Job noteupdated successfully!", response.data);

        } catch (e) {
            console.error("Update error:", {
            message: e.message,
            notes: e.response?.notes,
            data: e.response?.data,
          });
          alert(`Failed to update. Status: ${e.response?.status ?? "unknown"}`);
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
            onStatusChange = {handleStatusChange}
            onNotesChange = {handleNotesChange}
        />
      </div>
    );

}      
export default Dashboard;