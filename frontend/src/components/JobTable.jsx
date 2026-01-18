import React , { useState, useMemo } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BsSortDown, BsSortUp, BsArrowDownUp} from 'react-icons/bs';
import dayjs from 'dayjs'
import './JobTable.css';

const JobTable = ({ jobs, onStatusChange, onDelete, onNotesChange}) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortDiretction, setSortDirection] = useState('asc');

    const getSortIcon = (key) => {
        if (sortKey != key) return <BsArrowDownUp />;
        return sortDiretction === "asc" ? <BsSortUp /> : <BsSortDown />
    }

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDirection( prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    }

    const sortedJobs = useMemo(() => {
        const arr = [...jobs];
        if(!sortKey) return arr;

        arr.sort((a, b) =>{
            let valueA = a[sortKey];
            let valueB = b[sortKey];

            if (valueA == null) return 1;
            if (valueB == null) return -1;

            if (sortKey === "updatedAt") {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            if (typeof valueA === 'string') valueA = valueA.toLowerCase();
            if (typeof valueB === 'string') valueB = valueB.toLowerCase();

            if (valueA < valueB) {
                return sortDiretction === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDiretction === "asc" ? 1 : -1;
            }
            return 0;
        })

        return arr;
    },[sortKey, jobs, sortDiretction]);

    const getStatusClass = (status) => {

        switch (status) {
            case "INTERVIEWED": return "status-interview";
            case "OFFERED": return "status-offer";
            case "REJECTED": return "status-rejected";
            case "WAITLISTED": return "status-applied";
            case "APPLIED": return "status-applied";
            default: return "status-applied";
        }
    };


    return (
        <div className="table-container">
            <h2 className="section-title">Recent Applications</h2>

            <table className="job-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')} >ID <span className="sort-icon"> {getSortIcon('id')}</span> </th>
                        <th onClick={() => handleSort('title')} >Title <span className="sort-icon">{getSortIcon('title')}</span> </th>
                        <th onClick={() => handleSort('company')} >Company <span className="sort-icon">{getSortIcon('company')}</span></th>
                        <th onClick={() => handleSort('url')} >URL</th>
                        <th onClick={() => handleSort('location')} >Location <span className="sort-icon">{getSortIcon('location')}</span></th>
                        <th onClick={() => handleSort('status')} >Status <span className="sort-icon">{getSortIcon('status')} </span></th>
                        {/* <th>Req Number</th> */}
                        <th>Salary</th>
                        <th onClick={() => handleSort('updatedAt')}>Updated At <span className="sort-icon">{getSortIcon('updatedAt')}</span></th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedJobs.map((job, index) => (
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
                                <select  className={`status-badge ${getStatusClass(job.status)}`}
                                    value = {job.status}
                                    onChange = {
                                        (event)=> onStatusChange(
                                            job.id, event.target.value)}>
                                    <option default value="WAITLISTED">Waitlisted</option>
                                    <option value="APPLIED">Applied</option>
                                    <option value="INTERVIEWED">Interview</option>
                                    <option value="OFFERED">Offer</option>
                                    <option value="REJECTED">Rejected</option>

                                </select>
                            </td>

                            {/* 7. Requisition Number
                            <td>{job.requisitionNumber || "-"}</td> */}

                            {/* 8. Salary */}
                            <td>{job.salaryRange || "-"}</td>

                            {/* 9. Updated At */}
                            <td className="date-text">{dayjs(job.updatedAt).format('YYYY/MM/DD') }</td>

                            {/* 10. Note */}
                            <td>
                                <textarea 
                                    className='note-edit-area'
                                    defaultValue={job.notes || ""}
                                    placeholder="Add note..."
                        
                                    onBlur={(event) => onNotesChange(job.id, event.target.value)}

                                />
                            </td>

                            {/* 11. Edit */}
                            <td className="action-cell">
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