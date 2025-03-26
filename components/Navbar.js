import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">🏀 AI Betting</span>
        </Link>

        <div className="flex space-x-4">
          <Link href="/">
            <span className="hover:text-gray-300 cursor-pointer">NBA Odds</span>
          </Link>
          <Link href="/sports">
            <span className="hover:text-gray-300 cursor-pointer">All Sports</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
