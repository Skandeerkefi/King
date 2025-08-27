import React, { useEffect } from "react";
import { useRoobetStore } from "../store/RoobetStore";
import GraphicalBackground from "@/components/GraphicalBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const RoobetPage: React.FC = () => {
	const { leaderboard, loading, error, fetchLeaderboard } = useRoobetStore();

	useEffect(() => {
		fetchLeaderboard();
	}, [fetchLeaderboard]);

	return (
		<div className='relative flex flex-col min-h-screen'>
			<GraphicalBackground />
			<Navbar />

			<main className='relative z-10 flex-grow w-full max-w-6xl px-6 py-10 mx-auto'>
				<h1 className='mb-8 text-4xl font-extrabold text-center text-[#fefefe] drop-shadow-lg'>
					🎰 Roobet Leaderboard
				</h1>

				{loading && (
					<p className='text-center text-[#fefefe]'>Loading leaderboard...</p>
				)}
				{error && <p className='text-center text-[#e10600]'>{error}</p>}

				{leaderboard && (
					<>
						<p className='mb-6 text-sm italic text-[#fefefe] text-center'>
							{leaderboard.disclosure}
						</p>

						{/* Prize Pool Section */}
						<section className='mb-12'>
							<h2 className='mb-6 text-2xl font-bold text-center text-[#e10600]'>
								Leaderboard Prizes ($250 Total)
							</h2>
							<div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5'>
								<PrizeCard
									position='1st'
									prize='$125'
									color='from-yellow-500 to-orange-600'
								/>
								<PrizeCard
									position='2nd'
									prize='$75'
									color='from-gray-400 to-gray-600'
								/>
								<PrizeCard
									position='3rd'
									prize='$25'
									color='from-amber-700 to-yellow-800'
								/>
								<PrizeCard
									position='4th'
									prize='$12.5'
									color='from-[#444] to-[#666]'
								/>
								<PrizeCard
									position='5th'
									prize='$12.5'
									color='from-[#333] to-[#555]'
								/>
							</div>
						</section>

						{/* Top 3 Players as Cards */}
						<div className='grid grid-cols-1 gap-6 mb-10 md:grid-cols-3'>
							{leaderboard.data.slice(0, 3).map((player) => (
								<div
									key={player.uid}
									className='relative p-6 rounded-3xl shadow-2xl border-4 border-[#e10600] flex flex-col items-center justify-center
                              bg-gradient-to-br from-[#e10600] to-[#030303] hover:scale-105 transform transition-all duration-300'
								>
									{/* Rank Badge */}
									<div className='absolute -top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#fefefe] text-[#e10600] font-bold text-lg shadow-lg'>
										#{player.rankLevel}
									</div>

									{/* Username */}
									<p className='text-2xl md:text-3xl font-extrabold text-[#fefefe] mb-2 drop-shadow-lg'>
										{player.username}
									</p>

									{/* Stats */}
									<div className='flex flex-col items-center gap-1 mt-2'>
										<p className='text-md md:text-lg font-semibold text-[#fefefe]'>
											🎲 Wagered:{" "}
											<span className='text-[#e10600]'>
												{player.wagered.toLocaleString()}
											</span>
										</p>
										<p className='text-md md:text-lg font-semibold text-[#fefefe]'>
											⚡ Weighted:{" "}
											<span className='text-[#e10600]'>
												{player.weightedWagered.toLocaleString()}
											</span>
										</p>
									</div>

									{/* Favorite Game */}
									<p className='mt-3 text-sm md:text-base font-medium text-[#fefefe] italic'>
										Favorite: {player.favoriteGameTitle}
									</p>

									{/* Reward */}
									<p className='mt-4 text-lg font-bold text-[#e10600]'>
										{player.rankLevel === 1 && "$125 Prize"}
										{player.rankLevel === 2 && "$75 Prize"}
										{player.rankLevel === 3 && "$25 Prize"}
									</p>
								</div>
							))}
						</div>

						{/* Remaining Players in Table */}
						{leaderboard.data.length > 3 && (
							<div className='overflow-x-auto p-6 shadow-lg bg-[#030303]/80 backdrop-blur-md rounded-2xl'>
								<table className='w-full text-left border-collapse'>
									<thead className='text-sm tracking-wide text-[#fefefe] uppercase bg-[#e10600]'>
										<tr>
											<th className='p-3'>Rank</th>
											<th className='p-3'>Username</th>
											<th className='p-3'>Wagered</th>
											<th className='p-3'>Weighted Wagered</th>
											<th className='p-3'>Favorite Game</th>
											<th className='p-3'>Prize</th>
										</tr>
									</thead>
									<tbody>
										{leaderboard.data.slice(3).map((player) => (
											<tr
												key={player.uid}
												className='transition hover:bg-[#e10600]/80 bg-[#030303]/50 text-[#fefefe]'
											>
												<td className='p-3 font-bold'>{player.rankLevel}</td>
												<td className='p-3 font-semibold'>{player.username}</td>
												<td className='p-3'>
													{player.wagered.toLocaleString()}
												</td>
												<td className='p-3'>
													{player.weightedWagered.toLocaleString()}
												</td>
												<td className='p-3'>{player.favoriteGameTitle}</td>
												<td className='p-3'>
													{player.rankLevel === 4 && "$12.5"}
													{player.rankLevel === 5 && "$12.5"}
													{player.rankLevel > 5 && "-"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</>
				)}
			</main>

			<Footer />
		</div>
	);
};

// Simple Prize Card
interface PrizeCardProps {
	position: string;
	prize: string;
	color: string;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ position, prize, color }) => (
	<div
		className={`p-6 rounded-xl shadow-lg text-center font-bold text-[#fefefe] bg-gradient-to-br ${color}`}
	>
		<h3 className='mb-2 text-xl'>{position} Place</h3>
		<p className='text-lg'>{prize}</p>
	</div>
);

export default RoobetPage;
