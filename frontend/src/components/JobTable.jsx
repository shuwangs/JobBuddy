import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './JobTable.css';

const JobTable = ({ jobs, onEdit, onDelete}) => {

    const getStatusClass = (status) => {
        switch (status) {
            case "Interview": return "status-interview";
            case "Offer": return "status-offer";
            case "Rejected": return "status-rejected";
            default: return "status-applied";
        }
    };


    return (
        <div className="table-container">
            <h2 className="section-title">Recent Applications</h2>

            <table className="job-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>URL</th>
                        <th>Location</th>
                        <th>Status</th>
                        {/* <th>Req Number</th> */}
                        <th>Salary</th>
                        <th>Updated At</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={job.id}>
                            {/* 1. ID */}
                            <td>#{index + 1}</td>
                            
                            {/* 2. Title  */}
                            <td style={{ fontWeight: 600 }}>{job.title}</td>
                            
                            {/* 3. Company */}
                            <td className="company-name">{job.company}</td>
                            
                            {/* 4. URL */}
                            <td>
                                {job.url ? 
                                    <a href={job.url} target="_blank" rel="noopener noreferrer" style={{color: 'blue'}}>Link</a> 
                                    : <span style={{color: '#ccc'}}>-</span>
                                }
                            </td>

                            {/* 5. Location */}
                            <td>{job.location || "-"}</td>

                            {/* 6. Status */}
                            <td>
                                <span className={`status-badge ${getStatusClass(job.status)}`}>
                                    {job.status}
                                </span>
                            </td>

                            {/* 7. Requisition Number
                            <td>{job.requisitionNumber || "-"}</td> */}

                            {/* 8. Salary */}
                            <td>{job.salaryRange || "-"}</td>

                            {/* 9. Updated At */}
                            <td className="date-text">{job.date}</td>

                            {/* 10. Note */}
                            <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {job.note || "-"}
                            </td>

                            {/* 11. (Edit 按钮) */}
                            <td className="action-cell">
                                <button 
                                    className="icon-btn edit-btn" 
                                    onClick={() => onEdit(job)}
                                    title="Edit"
                                >
                                    <FiEdit2 />
                                </button>
                                <button 
                                    className="icon-btn delete-btn" 
                                    onClick={() =>{
                                        console.log("Deleting Job ID:", job.id);
                                        onDelete(job.id)
                                    }}
                                    title="Delete"
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}; 

export default JobTable;