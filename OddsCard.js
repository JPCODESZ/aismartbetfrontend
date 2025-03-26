export default function OddsCard({ game }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold">
        {game.away_team} @ {game.home_team}
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(game.commence_time).toLocaleString()}
      </p>

      {game.bookmakers.map((bookmaker) => (
        <div key={bookmaker.key} className="border-t pt-2 mt-2">
          <h3 className="font-semibold text-sm mb-1">
            {bookmaker.title}
          </h3>
          {bookmaker.markets.map((market) => (
            <div key={market.key}>
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
  );
}
