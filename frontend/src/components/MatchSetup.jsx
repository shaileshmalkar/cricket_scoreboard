import { useState } from "react";
import { api } from "../services/api";
import "./MatchSetup.css";

export default function MatchSetup({ onMatchCreated }) {
  const [teamA, setTeamA] = useState("India");
  const [teamB, setTeamB] = useState("Australia");
  const [overs, setOvers] = useState(20);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const startMatch = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await api.post("/match/create", {
        team_a: teamA,
        team_b: teamB,
        overs: overs
      });
      
      // Redirect to player entry after successful match creation
      if (onMatchCreated) {
        onMatchCreated({
          matchId: response.data.id,
          teamA: teamA,
          teamB: teamB,
          overs: overs
        });
      } else {
        setMessage(`Match Created Successfully! Match ID: ${response.data.id}`);
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      let errorMsg = "Error starting match. Please try again.";
      if (error.response) {
        // Server responded with error status
        errorMsg = error.response.data?.detail || error.response.data?.message || errorMsg;
        if (typeof errorMsg === 'object') {
          errorMsg = JSON.stringify(errorMsg);
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMsg = "Cannot connect to server. Make sure the backend is running on http://localhost:8000";
      } else {
        // Something else happened
        errorMsg = error.message || errorMsg;
      }
      setMessage(errorMsg);
      console.error("Full error:", error);
      setTimeout(() => setMessage(""), 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-setup">
      <h2 className="match-setup-title">START NEW MATCH</h2>
      <div className="match-form">
        <div className="form-group">
          <label>Team A</label>
          <input
            type="text"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            placeholder="Enter team name"
            className="match-input"
          />
        </div>
        <div className="form-group">
          <label>Team B</label>
          <input
            type="text"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            placeholder="Enter team name"
            className="match-input"
          />
        </div>
        <div className="form-group">
          <label>Overs</label>
          <input
            type="number"
            value={overs}
            onChange={(e) => setOvers(parseInt(e.target.value) || 20)}
            min="1"
            max="50"
            className="match-input"
          />
        </div>
        <button
          onClick={startMatch}
          disabled={loading || !teamA || !teamB}
          className="start-match-btn"
        >
          {loading ? "STARTING..." : "START MATCH"}
        </button>
        {message && (
          <div className={`match-message ${message.includes("Error") ? "error" : "success"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
