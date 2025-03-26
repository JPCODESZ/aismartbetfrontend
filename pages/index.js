import { useEffect, useState } from 'react';

export default function Home() {
  const [odds, setOdds] = useState([]);

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const getOdds = async () => {
      try {
        const res = await fetch(`${backendURL}/odds/basketball_nba`);
        const data = await res.json();
        setOdds(data);
      } catch (err) {
        console.error("Failed to fetch odds:", err);
      }
    };

    getOdds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">🏀 NBA Betting Odds</h1>

        {odds.length === 0 ? (
          <div className="text-center text-gray-500">Loading odds...</div>
        ) : (
          odds.map((game) => (
            <div key={game.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold">
                {game.away_team} @ {game.home_team}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(game.commence_time).toLocaleString()}
              </p>

              {game.bookmakers.map((bookmaker) => (
                <div key={bookmaker.key} className="mt-3">
                  <h3 className="font-semibold">{bookmaker.title}</h3>
                  {bookmaker.markets.map((market) => (
                    <div key={market.key} className="mt-1">
                      {market.outcomes.map((outcome) => (
                        <p key={outcome.name} className="text-sm">
                          {outcome.name}: <span className="font-bold">{outcome.price}</span>
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
