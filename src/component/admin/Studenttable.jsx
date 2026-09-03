import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, CheckCircle } from "lucide-react";
import API from "../../services/api";

export default function Studenttable({ students = [], onDeleteSuccess }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const filteredStudents = students.filter(
    (student) =>
      (student.studentName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.certificateId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.domain || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (certId) => {
    if (window.confirm(`Are you sure you want to delete certificate record "${certId}"?`)) {
      setDeletingId(certId);
      try {
        await API.delete(`/admin/certificates/${certId}`);
        if (onDeleteSuccess) onDeleteSuccess(certId);
      } catch (err) {
        alert(err.response?.data?.msg || "Failed to delete certificate record");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="table-header">
        <h1>Student Records</h1>
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or domain..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Student Name</th>
              <th>Domain</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id || student.certificateId}>
                  <td className="font-mono">{student.certificateId}</td>
                  <td>
                    <div className="student-cell">
                      <div className="mini-avatar">{(student.studentName || "S").charAt(0)}</div>
                      {student.studentName}
                    </div>
                  </td>
                  <td>{student.domain}</td>
                  <td>
                    {student.startDate ? new Date(student.startDate).toLocaleDateString() : 'N/A'} - {student.endDate ? new Date(student.endDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <span className="badge success">
                      <CheckCircle size={12} style={{ marginRight: '4px' }} />
                      Verified
                    </span>
                  </td>
                  <td>{student.issueDate ? new Date(student.issueDate).toLocaleDateString() : 'Recent'}</td>
                  <td>
                    <button 
                      className="icon-btn danger" 
                      onClick={() => handleDelete(student.certificateId)}
                      disabled={deletingId === student.certificateId}
                      title="Delete Certificate"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  {searchTerm ? `No student records found matching "${searchTerm}".` : "No student certificate records found. Upload an Excel sheet to populate data."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
