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

  const timeToString = (time: number) => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time - hour * 3600) / 60);
    const sec = time - hour * 3600 - min * 60;

    if (hour > 0) return `${hour} hr ${min} min ${sec} sec`;
    if (min > 0) return `${min} min ${sec} sec`;
    return `${sec} sec`;
  };
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
                    {timeToString(player.completedTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <Link to="/">
            <button className="more">&lt;Menu&gt;</button>
          </Link>
        </div>
      ) : (
        // Render a helpful message otherwise
        <div>
          <h1>No scores yet!</h1>
          <br></br>
          <Link to="/">
            <button className="more">Menu</button>
          </Link>
        </div>
      )}
    </div>
  );
}
