import { useEffect, useState } from 'react';

export default function Home() {
  const [odds, setOdds] = useState([]);
  const [error, setError] = useState(null);

  const backendURL = 'https://aismartbetbackend.onrender.com'; // hardcoded backend

  useEffect(() => {
    const getOdds = async () => {
      try {
        const res = await fetch(`${backendURL}/odds/basketball_nba`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          setError('Unexpected response format');
        } else {
          setOdds(data);
        }
      } catch (err) {
        setError('Fetch failed: ' + err.message);
      }
    };

    getOdds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-4">🏀 NBA Betting Odds</h1>
        <p className="text-sm text-center text-gray-500 mb-4">
          Backend: <code>{backendURL}</code>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {odds.length === 0 && !error && (
          <div className="text-center text-gray-500">Loading odds...</div>
        )}

        {odds.map((game) => (
          <div key={game.id} className="bg-white shadow rounded p-4 mb-6">
            <h2 className="text-xl font-semibold">
              {game.away_team} @ {game.home_team}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {new Date(game.commence_time).toLocaleString()}
            </p>
            {game.bookmakers?.map((bookmaker) => (
              <div key={bookmaker.key} className="mt-3 border-t pt-2">
                <h3 className="font-semibold">{bookmaker.title}</h3>
                {bookmaker.markets?.map((market) => (
                  <div key={market.key}>
                    {market.outcomes?.map((outcome) => (
                      <p key={outcome.name} className="text-sm">
                        {outcome.name}: <strong>{outcome.price}</strong>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
