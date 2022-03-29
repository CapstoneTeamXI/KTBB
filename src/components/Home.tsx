import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [players, setPlayers] = useState<Array<IPlayer>>([]);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = () => {
    fetch('/api/players')
      .then((res) => res.json())
      .then((scores) => setPlayers(scores));
  };
  // console.log(highScores);
  return (
    <div className="App">
      {players.length ? (
        <div>
          <h2>LEADERBOARD</h2>
          <table className="highScores">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
              {players.map((player, index) => (
                <tr key={index}>
                  <td key={index + player.name}>{player.name}</td>
                  <td key={index + player.score}>{player.score}</td>
                  <td key={index + player.completedTime}>
                    {player.completedTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <Link to="/game">
            <button className="more">New Game</button>
          </Link>
        </div>
      ) : (
        // Render a helpful message otherwise
        <div>
          <h1>No scores yet!</h1>
          <br></br>
          <Link to="/game">
            <button className="more">New Game</button>
          </Link>
        </div>
      )}
    </div>
  );
}
