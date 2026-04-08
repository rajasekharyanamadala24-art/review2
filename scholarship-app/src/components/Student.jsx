import { useEffect, useState } from "react";

export default function Student({ user }) {
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  useEffect(() => {
    setScholarships(JSON.parse(localStorage.getItem("scholarships")) || []);
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
  }, []);

  const apply = (name) => setSelected(name);

  const submit = () => {
    if (!form.name || !form.email || !form.phone || !form.qualification) {
      alert("Fill all fields");
      return;
    }

    const newApp = {
      ...form,
      user,
      scholarship: selected,
      status: "Pending",
    };

    const updated = [...applications, newApp];
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));

    setSelected("");
    setForm({ name: "", email: "", phone: "", qualification: "" });
  };

  return (
    <div className="container">
      <h3>Available Scholarships</h3>

      {scholarships.map((s, i) => (
        <div key={i} className="card">
          <h4>{s.name}</h4>
          <button onClick={() => apply(s.name)}>Apply</button>
        </div>
      ))}

      {selected && (
        <div className="modal">
          <div className="modal-box">
            <h3>Apply</h3>

            <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="Qualification" onChange={(e) => setForm({ ...form, qualification: e.target.value })} />

            <button onClick={submit}>Submit</button>
            <button onClick={() => setSelected("")}>Cancel</button>
          </div>
        </div>
      )}

      <h3>Your Applications</h3>

      {applications
        .filter((a) => a.user === user)
        .map((a, i) => (
          <div key={i} className="card">
            <h4>{a.scholarship}</h4>
            <p><b>Name:</b> {a.name}</p>
            <p><b>Qualification:</b> {a.qualification}</p>
            <span className={`badge ${a.status.toLowerCase()}`}>
              {a.status}
            </span>
          </div>
        ))}
    </div>
  );
}