const Stats = ({jobs}) => {
const statList = [
    { 
      label: "Total Applications", 
      value: jobs.length, 
      color: "blue" 
    },
    { 
      label: "Waiting Response", 
      value: jobs.filter(j => j.status === "Applied").length, 
      color: "yellow" 
    },
    { 
      label: "Interviews", 
      value: jobs.filter(j => j.status === "Interview").length, 
      color: "green" 
    },
    {
      label: "Offers",
      value: jobs.filter(j => j.status === "Offer").length,
      color: "green" 
    }
  ];
  
  return (
    <div className="stats-grid">
      {statList.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className={`stat-value text-${stat.color}`}>{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;