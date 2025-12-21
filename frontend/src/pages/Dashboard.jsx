import React,{useState, useEffect} from 'react';
import axios from 'axios';
import CHEER_MESG from "../utils/cheerMessages";
import JobTable from '../components/JobTable';
import Stats from '../components/Stats';
import "./Dashboard.css";

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
            fetchJobs();
        }, []);

    const fetchJobs = async ()=>{
        try {
            const response = await axios.get('http://localhost:8081/api/jobs');
            console.log(response);
            setJobs(response.data);
            } catch(error) {
                console.error(error.message)}
        }


    // Daily Cheer logic 
    const getDailyCheerMessage = () => {
        if (!CHEER_MESG || CHEER_MESG.length === 0) return "Keep going!";
        const today = new Date().toISOString().slice(0, 10);
        const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return CHEER_MESG[hash % CHEER_MESG.length];
    };
    const cheer = getDailyCheerMessage();

    return (
      <div className="dashboard-container">
        <div className="quote-area">
          <p className="text-sm text-gray-600 mb-4">{cheer}</p>
        </div>
 
        <Stats jobs={jobs} />
        <JobTable jobs={jobs} />
      </div>
    );

}      
export default Dashboard;