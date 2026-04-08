import { useEffect, useState } from "react";

export default function Admin() {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setScholarships(JSON.parse(localStorage.getItem("scholarships")) || []);
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
  }, []);

  const addScholarship = () => {
    const name = prompt("Enter scholarship name");
    if (!name) return;

    const updated = [...scholarships, { name }];
    setScholarships(updated);
    localStorage.setItem("scholarships", JSON.stringify(updated));
  };

  const updateStatus = (i, status) => {
    const updated = [...applications];
    updated[i].status = status;
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <button onClick={addScholarship}>Add Scholarship</button>

      <h3>Applications</h3>

      {applications.map((a, i) => (
        <div key={i} className="card">
          <h4>{a.name} ({a.user})</h4>
          <p><b>Scholarship:</b> {a.scholarship}</p>
          <p><b>Email:</b> {a.email}</p>
          <p><b>Phone:</b> {a.phone}</p>
          <p><b>Qualification:</b> {a.qualification}</p>

          <span className={`badge ${a.status.toLowerCase()}`}>
            {a.status}
          </span>

          <br />

          <button onClick={() => updateStatus(i, "Approved")}>Approve</button>
          <button onClick={() => updateStatus(i, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}