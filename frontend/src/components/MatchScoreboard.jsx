import { useState } from "react";
import { api } from "../services/api";
import "./MatchScoreboard.css";

export default function MatchScoreboard({ matchId, teamA, teamB, teamAPlayers, teamBPlayers, playersPerTeam }) {
  const [matchStarted, setMatchStarted] = useState(false);
  const [inningsOver, setInningsOver] = useState(false);
  const [needNewBowler, setNeedNewBowler] = useState(false);
  const [needNextBatter, setNeedNextBatter] = useState(false);

  const [currentBattingTeam, setCurrentBattingTeam] = useState(teamA);
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState(teamAPlayers);
  const [currentBowlers, setCurrentBowlers] = useState(teamBPlayers);
  // Track which batters are already out
  const [outBatters, setOutBatters] = useState([]);

  // Match state
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0, balls: 0 });
  const [batsmenStats, setBatsmenStats] = useState({});
  const [bowlerStats, setBowlerStats] = useState({});
  const [currentOver, setCurrentOver] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);

  const maxWickets = (playersPerTeam || currentPlayers.length) - 1;

  const handleStartMatch = () => {
    setMatchStarted(true);
    setInningsOver(false);
    setNeedNewBowler(false);
    setNeedNextBatter(false);
    setOutBatters([]);

    // Initialize stats
    setBatsmenStats({
      [striker]: { runs: 0, balls: 0, fours: 0, sixes: 0 },
      [nonStriker]: { runs: 0, balls: 0, fours: 0, sixes: 0 }
    });
    setBowlerStats({
      [bowler]: { runs: 0, balls: 0, wickets: 0 }
    });
  };

  const scoreBall = async (runs, isWicket = false, isWide = false, isNoBall = false) => {
    if (!matchStarted || inningsOver || needNewBowler || needNextBatter) {
      return;
    }

    // Prevent more wickets than players
    if (isWicket && score.wickets >= maxWickets) {
      setInningsOver(true);
      return;
    }

    let ballRuns = runs;
    let ballCountsAsDelivery = true;

    if (isWide || isNoBall) {
      ballRuns = runs + 1; // Extra run
      ballCountsAsDelivery = false; // Doesn't count as a ball
    }

    // Update score
    const newScore = {
      runs: score.runs + ballRuns,
      wickets: isWicket && !isWide && !isNoBall ? score.wickets + 1 : score.wickets,
      overs: score.overs,
      balls: ballCountsAsDelivery ? score.balls + 1 : score.balls
    };

    // Update overs
    let completedOver = false;
    if (ballCountsAsDelivery && newScore.balls === 6) {
      newScore.overs += 1;
      newScore.balls = 0;
      completedOver = true;
    }

    setScore(newScore);

    // Update batsman stats (legal balls only)
    const newBatsmenStats = { ...batsmenStats };
    if (!isWide && !isNoBall) {
      if (!newBatsmenStats[striker]) {
        newBatsmenStats[striker] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
      }
      newBatsmenStats[striker] = {
        ...newBatsmenStats[striker],
        runs: newBatsmenStats[striker].runs + runs,
        balls: newBatsmenStats[striker].balls + 1,
        fours: runs === 4 ? newBatsmenStats[striker].fours + 1 : newBatsmenStats[striker].fours,
        sixes: runs === 6 ? newBatsmenStats[striker].sixes + 1 : newBatsmenStats[striker].sixes
      };
    }

    // Handle wicket: mark striker as out and wait for next batter
    let newStriker = striker;
    let newNonStriker = nonStriker;
    if (isWicket && !isWide && !isNoBall) {
      if (score.wickets + 1 >= maxWickets) {
        // This wicket ends the innings
        setInningsOver(true);
      } else {
        // Current striker is out; wait for user to pick next batter
        setOutBatters([...outBatters, striker]);
        setNeedNextBatter(true);
      }
    } else if (!isWide && !isNoBall && runs % 2 === 1) {
      // Switch strike on odd runs
      const temp = newStriker;
      newStriker = newNonStriker;
      newNonStriker = temp;
    }

    setStriker(newStriker);
    setNonStriker(newNonStriker);
    setBatsmenStats(newBatsmenStats);

    // Update bowler stats
    const newBowlerStats = { ...bowlerStats };
    if (!newBowlerStats[bowler]) {
      newBowlerStats[bowler] = { runs: 0, balls: 0, wickets: 0 };
    }
    newBowlerStats[bowler] = {
      ...newBowlerStats[bowler],
      runs: newBowlerStats[bowler].runs + ballRuns,
      balls: ballCountsAsDelivery ? newBowlerStats[bowler].balls + 1 : newBowlerStats[bowler].balls,
      wickets: isWicket && !isWide && !isNoBall ? newBowlerStats[bowler].wickets + 1 : newBowlerStats[bowler].wickets
    };
    setBowlerStats(newBowlerStats);

    // Add to current over
    const ballNotation = isWicket ? "W" : isWide ? "WD" : isNoBall ? "NB" : runs.toString();
    const newOver = [...currentOver, ballNotation];
    setCurrentOver(newOver);

    // If over complete, reset balls and require new bowler
    if (completedOver) {
      setCurrentOver([]);
      // Switch strike at end of over
      const temp = newStriker;
      setStriker(newNonStriker);
      setNonStriker(temp);
      setNeedNewBowler(true);
    }

    // End innings if all wickets
    if (newScore.wickets >= maxWickets) {
      setInningsOver(true);
    }

    // Add to history
    setMatchHistory(
      [...matchHistory, {
        over: `${score.overs}.${score.balls}`,
        ball: ballNotation,
        batsman: striker,
        bowler: bowler
      }].slice(-20)
    ); // Keep last 20 balls

    // Send to backend (best-effort)
    try {
      await api.post("/score/ball", {
        match_id: matchId,
        runs: ballRuns,
        is_wicket: isWicket,
        is_wide: isWide,
        is_no_ball: isNoBall,
        striker: striker,
        bowler: bowler
      });
    } catch (error) {
      console.error("Error saving ball:", error);
    }
  };

  if (!matchStarted) {
    return (
      <div className="match-scoreboard">
        <h2 className="scoreboard-title">MATCH SCOREBOARD</h2>
        
        <div className="match-info">
          <div className="match-teams">
            <span className="team-name-large">{teamA}</span>
            <span className="vs">VS</span>
            <span className="team-name-large">{teamB}</span>
          </div>
        </div>

        <div className="scoreboard-content">
          {/* Current Batting Team Selection */}
          <div className="batting-team-selector">
            <label>Current Batting Team:</label>
            <select
              value={currentBattingTeam}
              onChange={(e) => {
                setCurrentBattingTeam(e.target.value);
                setCurrentPlayers(e.target.value === teamA ? teamAPlayers : teamBPlayers);
                setCurrentBowlers(e.target.value === teamA ? teamBPlayers : teamAPlayers);
                setStriker("");
                setNonStriker("");
                setBowler("");
              }}
              className="team-select"
            >
              <option value={teamA}>{teamA}</option>
              <option value={teamB}>{teamB}</option>
            </select>
          </div>

          {/* Batsmen Selection */}
          <div className="players-selection">
            <div className="selection-group">
              <h3>BATSMEN</h3>
              <div className="player-select-group">
                <div className="select-field">
                  <label>Striker</label>
                  <select
                    value={striker}
                    onChange={(e) => setStriker(e.target.value)}
                    className="player-select"
                  >
                    <option value="">Select Striker</option>
                    {currentPlayers.map((player, index) => (
                      <option key={index} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-field">
                  <label>Non-Striker</label>
                  <select
                    value={nonStriker}
                    onChange={(e) => setNonStriker(e.target.value)}
                    className="player-select"
                  >
                    <option value="">Select Non-Striker</option>
                    {currentPlayers
                      .filter(p => p !== striker)
                      .map((player, index) => (
                        <option key={index} value={player}>
                          {player}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="selection-group">
              <h3>BOWLER</h3>
              <div className="select-field">
                <label>Current Bowler</label>
                <select
                  value={bowler}
                  onChange={(e) => setBowler(e.target.value)}
                  className="player-select"
                >
                  <option value="">Select Bowler</option>
                  {currentBowlers.map((player, index) => (
                    <option key={index} value={player}>
                      {player}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Start Match Button */}
          {striker && nonStriker && bowler && (
            <button onClick={handleStartMatch} className="start-match-btn">
              START MATCH
            </button>
          )}
        </div>
      </div>
    );
  }

  // Live Scoreboard View
  const runRate = score.overs > 0 || score.balls > 0 
    ? (score.runs / (score.overs + score.balls / 6)).toFixed(2)
    : "0.00";

  const currentBowlerStats = bowlerStats[bowler] || { runs: 0, balls: 0, wickets: 0 };
  const bowlerOversInt = Math.floor(currentBowlerStats.balls / 6);
  const bowlerBallsInOver = currentBowlerStats.balls % 6;
  const bowlerOversText = `${bowlerOversInt}.${bowlerBallsInOver}`;
  const bowlerOversForEcon = bowlerOversInt + bowlerBallsInOver / 6;
  const bowlerEconomy =
    currentBowlerStats.runs > 0 && bowlerOversForEcon > 0
      ? (currentBowlerStats.runs / bowlerOversForEcon).toFixed(2)
      : "0.00";

  return (
    <div className="match-scoreboard">
      <h2 className="scoreboard-title">LIVE SCOREBOARD</h2>
      
      {/* Main Score Display */}
      <div className="main-score">
        <div className="score-display">
          <div className="team-score">
            <span className="team-name-score">{currentBattingTeam}</span>
            <span className="score-large">{score.runs}/{score.wickets}</span>
          </div>
          <div className="overs-display">
            <span className="overs-text">Overs: {score.overs}.{score.balls}</span>
            <span className="run-rate">RR: {runRate}</span>
          </div>
        </div>
      </div>

      {/* Current Over */}
      <div className="current-over">
        <h3>Current Over</h3>
        <div className="over-balls">
          {currentOver.map((ball, index) => (
            <span key={index} className={`ball ${ball === 'W' ? 'wicket' : ball === 'WD' ? 'wide' : ball === 'NB' ? 'noball' : ''}`}>
              {ball}
            </span>
          ))}
          {currentOver.length === 0 && <span className="over-empty">No balls yet</span>}
        </div>
      </div>

      {/* Batsmen Stats */}
      <div className="stats-section">
        <div className="batsmen-stats">
          <h3>BATSMEN</h3>
          <div className="batsman-card striker-card">
            <div className="batsman-name">
              {striker} <span className="striker-badge">*</span>
            </div>
            <div className="batsman-score">
              {batsmenStats[striker]?.runs || 0} ({batsmenStats[striker]?.balls || 0})
            </div>
            <div className="batsman-boundaries">
              4s: {batsmenStats[striker]?.fours || 0} | 6s: {batsmenStats[striker]?.sixes || 0}
            </div>
          </div>
          <div className="batsman-card">
            <div className="batsman-name">{nonStriker}</div>
            <div className="batsman-score">
              {batsmenStats[nonStriker]?.runs || 0} ({batsmenStats[nonStriker]?.balls || 0})
            </div>
            <div className="batsman-boundaries">
              4s: {batsmenStats[nonStriker]?.fours || 0} | 6s: {batsmenStats[nonStriker]?.sixes || 0}
            </div>
          </div>

          {needNextBatter && !inningsOver && (
            <div className="new-batsman-selector">
              <span className="new-batsman-label">Select next batter after wicket:</span>
              <select
                className="player-select"
                value=""
                onChange={(e) => {
                  const next = e.target.value;
                  if (!next) return;

                  const newBatsmenStats = { ...batsmenStats };
                  if (!newBatsmenStats[next]) {
                    newBatsmenStats[next] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
                  }
                  setBatsmenStats(newBatsmenStats);
                  setStriker(next);
                  setNeedNextBatter(false);
                }}
              >
                <option value="">Choose batter</option>
                {currentPlayers
                  .filter(
                    (p) =>
                      p !== striker &&
                      p !== nonStriker &&
                      !outBatters.includes(p)
                  )
                  .map((player, index) => (
                    <option key={index} value={player}>
                      {player}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Bowler Stats */}
        <div className="bowler-stats">
          <h3>BOWLER</h3>
          <div className="bowler-card">
            <div className="bowler-name">{bowler}</div>
            <div className="bowler-figures">
              {bowlerOversText} - {currentBowlerStats.runs} - {currentBowlerStats.wickets}
            </div>
            <div className="bowler-economy">
              Econ: {bowlerEconomy}
            </div>
          </div>

          {needNewBowler && (
            <div className="new-bowler-selector">
              <span className="new-bowler-label">Select next bowler to start new over:</span>
              <select
                className="player-select"
                value={bowler}
                onChange={(e) => {
                  const next = e.target.value;
                  setBowler(next);
                  if (!bowlerStats[next]) {
                    setBowlerStats({
                      ...bowlerStats,
                      [next]: { runs: 0, balls: 0, wickets: 0 }
                    });
                  }
                  setNeedNewBowler(false);
                }}
              >
                <option value="">Choose bowler</option>
                {currentBowlers
                  .filter((p) => p !== bowler)
                  .map((player, index) => (
                    <option key={index} value={player}>
                      {player}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Scoring Buttons */}
      <div className="scoring-section">
        <h3>SCORE BALL</h3>
        <div className="scoring-buttons">
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(0)} className="score-btn runs-0">0</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(1)} className="score-btn runs-1">1</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(2)} className="score-btn runs-2">2</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(3)} className="score-btn runs-3">3</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(4)} className="score-btn runs-4">4</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(6)} className="score-btn runs-6">6</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(0, true)} className="score-btn wicket">W</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(0, false, true)} className="score-btn wide">WD</button>
          <button disabled={inningsOver || needNewBowler || needNextBatter} onClick={() => scoreBall(0, false, false, true)} className="score-btn noball">NB</button>
        </div>

        {inningsOver && (
          <div className="innings-over-message">
            Innings over: all wickets fallen or limit reached.
          </div>
        )}
      </div>

      {/* Recent History */}
      {matchHistory.length > 0 && (
        <div className="recent-history">
          <h3>Recent Balls</h3>
          <div className="history-list">
            {matchHistory.slice().reverse().map((item, index) => (
              <div key={index} className="history-item">
                <span className="history-over">{item.over}</span>
                <span className="history-ball">{item.ball}</span>
                <span className="history-batsman">{item.batsman}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
