import { useEffect, useState } from 'react';

export default function Home() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('basketball_nba');
  const [odds, setOdds] = useState([]);
  const [error, setError] = useState(null);

  const backendURL = 'https://aismartbetbackend.onrender.com';

  // Fetch list of sports
  useEffect(() => {
    fetch(`${backendURL}/sports`)
      .then((res) => res.json())
      .then((data) => setSports(data))
      .catch((err) => setError('Failed to load sports: ' + err.message));
  }, []);

  // Fetch odds for selected sport
  useEffect(() => {
    setOdds([]);
    setError(null);

    fetch(`${backendURL}/odds/${selectedSport}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('API did not return array');
        setOdds(data);
      })
      .catch((err) => setError('Failed to fetch odds: ' + err.message));
  }, [selectedSport]);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">📊 Smart Sports Betting Odds</h1>

        {/* Sport Selector */}
        <div className="mb-6 text-center">
          <label htmlFor="sport" className="mr-2 font-medium">Select a Sport:</label>
          <select
            id="sport"
            className="p-2 rounded border"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            {sports.map((sport) => (
              <option key={sport.key} value={sport.key}>
                {sport.title}
              </option>
            ))}
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Odds Display */}
        {odds.length === 0 && !error ? (
          <div className="text-center text-gray-500">Loading odds...</div>
        ) : (
          odds.map((game) => (
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
          ))
        )}
      </div>
    </div>
  );
}
