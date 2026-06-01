import React from "react";

const ContextController = ({
  users,
  patients,
  selectedUser,
  selectedPatient,
  onUserChange,
  onPatientChange
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-2 font-medium">
          User
        </label>

        <select
          value={selectedUser}
          onChange={(e) =>
            onUserChange(e.target.value)
          }
          className="w-full border rounded p-2"
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Patient
        </label>

        <select
          value={selectedPatient}
          onChange={(e) =>
            onPatientChange(e.target.value)
          }
          className="w-full border rounded p-2"
        >
          {patients.map((patient) => (
            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ContextController;