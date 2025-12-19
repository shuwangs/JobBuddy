import React,{useState} from 'react';
import CHEER_MESG from "../utils/cheerMessages";
import JobTable from '../components/JobTable';
import Stats from '../components/Stats';
import "./Dashboard.css";

const Dashboard = () => {
const [jobs, setJobs] = useState([
        { id: 1, company: "Google", title: "Backend Engineer", status: "Applied", date: "2023-12-15", location: "MTV", salary: "180k" },
        { id: 2, company: "Amazon", title: "SDE II", status: "Interview", date: "2023-12-14", location: "Seattle", salary: "160k" },
        { id: 3, company: "Microsoft", title: "Software Engineer", status: "Rejected", date: "2023-12-12", location: "Redmond", salary: "150k" },
        { id: 4, company: "Netflix", title: "Full Stack Engineer", status: "Offer", date: "2023-12-10", location: "Los Gatos", salary: "200k" },
        { id: 5, company: "Meta", title: "Data Engineer", status: "Applied", date: "2023-12-08", location: "Menlo Park", salary: "170k" },
    ]);


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