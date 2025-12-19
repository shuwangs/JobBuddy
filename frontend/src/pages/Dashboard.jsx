import React,{useState} from 'react';
import CHEER_MESG from "../utils/cheerMessages";
import JobTable from '../components/JobTable';

const Dashboard = () => {
const [jobs, setJobs] = useState([
        { id: 1, company: "Google", title: "Backend Engineer", status: "Applied", date: "2023-12-15", location: "MTV", salary: "180k" },
        { id: 2, company: "Amazon", title: "SDE II", status: "Interview", date: "2023-12-14", location: "Seattle", salary: "160k" },
        { id: 3, company: "Microsoft", title: "Software Engineer", status: "Rejected", date: "2023-12-12", location: "Redmond", salary: "150k" },
        { id: 4, company: "Netflix", title: "Full Stack Engineer", status: "Offer", date: "2023-12-10", location: "Los Gatos", salary: "200k" },
        { id: 5, company: "Meta", title: "Data Engineer", status: "Applied", date: "2023-12-08", location: "Menlo Park", salary: "170k" },
    ]);

    // 2. 动态计算统计数据 (这样数据就永远是对的！)
    const stats = [
        { 
            label: "Total Applications", 
            value: jobs.length, // 自动计算总数
            color: "blue" 
        },
        { 
            label: "Waiting Response", 
            value: jobs.filter(j => j.status === "Applied").length, // 自动计算 Applied
            color: "yellow" 
        },
        { 
            label: "Interviews", 
            value: jobs.filter(j => j.status === "Interview").length, // 自动计算 Interview
            color: "green" 
        }
    ];

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

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-value text-${stat.color}`}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <JobTable jobs={jobs} />
      </div>
    );

}      
export default Dashboard;