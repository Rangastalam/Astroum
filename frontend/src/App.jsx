import React, { useEffect, useState } from "react";

import BudgetSlider from "./components/BudgetSlider";
import BudgetBar from "./components/BudgetBar";
import BlockPanel from "./components/BlockPanel";
import CompressionLog from "./components/CompressionLog";
import ContextViewer from "./components/ContextViewer";
import CompositionRationale from "./components/CompositionRationale";
import ContextController from "./components/ContexController";

import { composeContext } from "./services/composeApi";

const App = () => {
  const [budget, setBudget] = useState(4000);

  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);

  const [selectedUser, setSelectedUser] =
    useState("");

  const [selectedPatient, setSelectedPatient] =
    useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    const loadLookupData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/data"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch lookup data"
          );
        }

        const data =
          await response.json();

        setUsers(data.users);
        setPatients(data.patients);

        if (data.users.length > 0) {
          setSelectedUser(
            data.users[0].id
          );
        }

        if (
          data.patients.length > 0
        ) {
          setSelectedPatient(
            data.patients[0].id
          );
        }
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load users and patients."
        );
      }
    };

    loadLookupData();
  }, []);

  const handleCompose = async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await composeContext(
          selectedUser,
          selectedPatient,
          budget
        );

      setResult(data);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to compose context."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold">
          Brahmo Context Composition Agent
        </h1>

        <p className="text-gray-600 mt-2">
          Dynamic context assembly with
          budget-aware compression.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <ContextController
            users={users}
            patients={patients}
            selectedUser={
              selectedUser
            }
            selectedPatient={
              selectedPatient
            }
            onUserChange={
              setSelectedUser
            }
            onPatientChange={
              setSelectedPatient
            }
          />

          <BudgetSlider
            budget={budget}
            onChange={setBudget}
          />

          <button
            onClick={handleCompose}
            disabled={
              loading ||
              !selectedUser ||
              !selectedPatient
            }
            className="
              bg-black
              text-white
              rounded-lg
              px-4
              py-3
              font-medium
              disabled:opacity-50
            "
          >
            {loading
              ? "Composing..."
              : "Compose Context"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-700 rounded-xl p-4">
          {error}
        </div>
      )}

      {result && (
        <>
          {/* Budget + Rationale */}
          <div className="grid md:grid-cols-2 gap-6">
            <BudgetBar
              tokenSummary={
                result.actualTokenSummary
              }
            />

            <CompositionRationale
              tokenSummary={
                result.actualTokenSummary
              }
              compressionLog={
                result.compressionLog
              }
              requiresHumanOverride={
                result.requiresHumanOverride
              }
            />
          </div>

          {/* Human Override */}
          {result.requiresHumanOverride && (
            <div className="border border-red-300 bg-red-50 text-red-700 rounded-xl p-4">
              <h3 className="font-semibold">
                Human Override Required
              </h3>

              <p className="text-sm mt-1">
                Budget cannot be satisfied
                while preserving the minimum
                context representation.
              </p>
            </div>
          )}

          {/* Blocks */}
          <BlockPanel
            blocks={result.blocks}
          />

          {/* Compression + Context */}
          <div className="grid lg:grid-cols-2 gap-6">
            <CompressionLog
              logs={
                result.compressionLog
              }
            />

            <ContextViewer
              contextString={
                result.contextString
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;