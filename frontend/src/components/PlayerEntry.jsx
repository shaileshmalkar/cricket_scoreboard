import { useState } from "react";
import { api } from "../services/api";
import "./PlayerEntry.css";

export default function PlayerEntry({ matchId, teamA, teamB, onComplete }) {
  const [playersPerTeam, setPlayersPerTeam] = useState(11);
  const [teamAPlayers, setTeamAPlayers] = useState(Array(11).fill(""));
  const [teamBPlayers, setTeamBPlayers] = useState(Array(11).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePlayersPerTeamChange = (value) => {
    const num = parseInt(value);
    setPlayersPerTeam(num);
    // Resize arrays
    setTeamAPlayers(Array(num).fill(""));
    setTeamBPlayers(Array(num).fill(""));
  };

  const updateTeamAPlayer = (index, value) => {
    const newPlayers = [...teamAPlayers];
    newPlayers[index] = value;
    setTeamAPlayers(newPlayers);
  };

  const updateTeamBPlayer = (index, value) => {
    const newPlayers = [...teamBPlayers];
    newPlayers[index] = value;
    setTeamBPlayers(newPlayers);
  };

  const handleSubmit = async () => {
    // Validate that all players are filled
    const teamAValid = teamAPlayers.slice(0, playersPerTeam).every(p => p.trim() !== "");
    const teamBValid = teamBPlayers.slice(0, playersPerTeam).every(p => p.trim() !== "");

    if (!teamAValid || !teamBValid) {
      setMessage("Please enter all player names for both teams");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Save players to backend (we'll create this endpoint)
      const teamAPlayersList = teamAPlayers.slice(0, playersPerTeam).filter(p => p.trim() !== "");
      const teamBPlayersList = teamBPlayers.slice(0, playersPerTeam).filter(p => p.trim() !== "");

      // For now, just proceed to scoreboard
      // In future, we can save players to backend
      onComplete({
        teamAPlayers: teamAPlayersList,
        teamBPlayers: teamBPlayersList,
        playersPerTeam
      });
    } catch (error) {
      setMessage("Error saving players. Please try again.");
      console.error(error);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="player-entry">
      <h2 className="player-entry-title">ENTER PLAYERS</h2>
      
      <div className="players-per-team-selector">
        <label>Players Per Team:</label>
        <select
          value={playersPerTeam}
          onChange={(e) => handlePlayersPerTeamChange(e.target.value)}
          className="players-select"
        >
          {[7, 8, 9, 10, 11].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="teams-players-container">
        {/* Team A Players */}
        <div className="team-players">
          <h3 className="team-name">{teamA}</h3>
          <div className="players-list">
            {teamAPlayers.slice(0, playersPerTeam).map((player, index) => (
              <div key={index} className="player-input-group">
                <label>Player {index + 1}</label>
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updateTeamAPlayer(index, e.target.value)}
                  placeholder={`${teamA} Player ${index + 1}`}
                  className="player-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Team B Players */}
        <div className="team-players">
          <h3 className="team-name">{teamB}</h3>
          <div className="players-list">
            {teamBPlayers.slice(0, playersPerTeam).map((player, index) => (
              <div key={index} className="player-input-group">
                <label>Player {index + 1}</label>
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updateTeamBPlayer(index, e.target.value)}
                  placeholder={`${teamB} Player ${index + 1}`}
                  className="player-input"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="start-match-btn"
      >
        {loading ? "SAVING..." : "START MATCH"}
      </button>

      {message && (
        <div className={`match-message ${message.includes("Error") ? "error" : "warning"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
