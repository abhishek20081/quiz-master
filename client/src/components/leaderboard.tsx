import React from "react";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  timestamp: Date;
}

interface LeaderboardProps {
  entries?: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries = [] }) => {
  const [leaderboardEntries, setLeaderboardEntries] =
    React.useState<LeaderboardEntry[]>(entries);
  const [loading, setLoading] = React.useState(false);

  // Fetch leaderboard for "A" set (global leaderboard)
  React.useEffect(() => {
    setLoading(true);
    fetch("/api/leaderboard/A")
      .then((res) => res.json())
      .then((data: any[]) => {
        const formattedData = data.map((entry) => ({
          id: entry.name + entry.timestamp,
          name: entry.name,
          score: entry.score,
          timestamp: new Date(entry.timestamp),
        }));
        setLeaderboardEntries(formattedData);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard:", err);
        setLeaderboardEntries(entries);
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedEntries = [...leaderboardEntries].sort(
    (a, b) => b.score - a.score,
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>
      {sortedEntries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No leaderboard entries yet. Take a quiz to get started!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-blue-600 w-8">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {entry.score}
                </p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
