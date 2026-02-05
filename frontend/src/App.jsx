import { useState } from "react";
import MatchSetup from "./components/MatchSetup";
import PlayerEntry from "./components/PlayerEntry";
import MatchScoreboard from "./components/MatchScoreboard";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("HOME");
  const [currentView, setCurrentView] = useState("setup"); // setup, players, scoreboard
  const [matchData, setMatchData] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  return (
    <div className="game-container">
      {/* Background with blur effect */}
      <div className="background-blur"></div>
      
      {/* Header */}
      <header className="game-header">
        <div className="header-left">
          <h1 className="game-title">CRICKET_SCORER</h1>
          <nav className="game-nav">
            <button 
              className={`nav-tab ${activeTab === "HOME" ? "active" : ""}`}
              onClick={() => setActiveTab("HOME")}
            >
              HOME
            </button>
            <button 
              className={`nav-tab ${activeTab === "PLAY" ? "active" : ""}`}
              onClick={() => setActiveTab("PLAY")}
            >
              PLAY
            </button>
            <button 
              className={`nav-tab ${activeTab === "MY TEAM" ? "active" : ""}`}
              onClick={() => setActiveTab("MY TEAM")}
            >
              MY TEAM
            </button>
            <button 
              className={`nav-tab ${activeTab === "CUSTOMISE" ? "active" : ""}`}
              onClick={() => setActiveTab("CUSTOMISE")}
            >
              CUSTOMISE
            </button>
          </nav>
        </div>
        <div className="user-profile">
          <div className="profile-info">
            <span className="profile-name">SHAILESH</span>
            <span className="profile-xp">5000 XP</span>
          </div>
          <div className="profile-picture">
            <div className="profile-avatar">S</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="game-main">
        {activeTab === "HOME" && (
          <div className="game-modes">
            <div className="game-card play-now">
              <div className="card-overlay"></div>
              <div className="card-content">
                <h2 className="card-title">PLAY NOW</h2>
                <p className="card-description">
                  Quick match with international or league teams. The latest squads, forms and stories require a connection to EA servers.
                </p>
              </div>
            </div>

            <div className="game-card practice">
              <div className="card-overlay"></div>
              <div className="card-content">
                <h2 className="card-title">PRACTICE</h2>
                <p className="card-description">
                  Learn to play shots all over the ground and bowl all kind of deliveries to compete against the best teams.
                </p>
              </div>
            </div>

            <div className="game-card be-a-pro">
              <div className="card-overlay"></div>
              <div className="card-content">
                <h2 className="card-title">BE A PRO PLAYER</h2>
                <p className="card-description">
                  Start your career as an academy kid rise as a match genius.
                </p>
              </div>
            </div>

            <div className="game-card tournament">
              <div className="card-overlay"></div>
              <div className="card-content">
                <h2 className="card-title">TOURNAMENT</h2>
                <p className="card-description">
                  Play against the big teams in world tournaments.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "PLAY" && (
          <div className="play-content">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step ${currentView === "setup" ? "active" : currentView === "players" || currentView === "scoreboard" ? "completed" : ""}`}>
                <span className="step-number">1</span>
                <span className="step-label">Match Setup</span>
              </div>
              <div className={`step ${currentView === "players" ? "active" : currentView === "scoreboard" ? "completed" : ""}`}>
                <span className="step-number">2</span>
                <span className="step-label">Enter Players</span>
              </div>
              <div className={`step ${currentView === "scoreboard" ? "active" : ""}`}>
                <span className="step-number">3</span>
                <span className="step-label">Start Match</span>
              </div>
            </div>

            {currentView === "setup" && (
              <MatchSetup 
                onMatchCreated={(data) => {
                  setMatchData(data);
                  setCurrentView("players");
                }}
              />
            )}
            {currentView === "players" && matchData && (
              <div>
                <button 
                  onClick={() => {
                    setCurrentView("setup");
                    setMatchData(null);
                  }}
                  className="back-btn"
                >
                  ← Back to Setup
                </button>
                <PlayerEntry
                  matchId={matchData.matchId}
                  teamA={matchData.teamA}
                  teamB={matchData.teamB}
                  onComplete={(data) => {
                    setPlayersData(data);
                    setCurrentView("scoreboard");
                  }}
                />
              </div>
            )}
            {currentView === "scoreboard" && matchData && playersData && (
              <div>
                <button 
                  onClick={() => setCurrentView("players")}
                  className="back-btn"
                >
                  ← Back to Players
                </button>
                <MatchScoreboard
                  matchId={matchData.matchId}
                  teamA={matchData.teamA}
                  teamB={matchData.teamB}
                  teamAPlayers={playersData.teamAPlayers}
                  teamBPlayers={playersData.teamBPlayers}
                  playersPerTeam={playersData.playersPerTeam}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "MY TEAM" && (
          <div className="tab-content">
            <h2>MY TEAM</h2>
            <p>Team management coming soon...</p>
          </div>
        )}

        {activeTab === "CUSTOMISE" && (
          <div className="tab-content">
            <h2>CUSTOMISE</h2>
            <p>Customization options coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
