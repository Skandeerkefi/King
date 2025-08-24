import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
// import { LeaderboardTable } from "@/components/LeaderboardTable";
import { Link } from "react-router-dom";
import { Dices, Crown, Gift, Users, ArrowRight } from "lucide-react";
// import { useLeaderboardStore } from "@/store/useLeaderboardStore";
// import { useSlotCallStore } from "@/store/useSlotCallStore";
// import { useGiveawayStore } from "@/store/useGiveawayStore";
import GraphicalBackground from "@/components/GraphicalBackground";
import { useRoobetStore } from "@/store/RoobetStore";
function HomePage() {
	// const { slotCalls } = useSlotCallStore();
	// const { giveaways } = useGiveawayStore();
	// const { monthlyLeaderboard, fetchLeaderboard } = useLeaderboardStore();

	// const topLeaderboard = Array.isArray(monthlyLeaderboard)
	// 	? monthlyLeaderboard.slice(0, 5)
	// 	: [];

	// const now = new Date();
	// const monthEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	// monthEndDate.setHours(23, 59, 59, 999);
	// const monthEndISO = monthEndDate.toISOString();

	// useEffect(() => {
	// 	if (monthlyLeaderboard.length === 0) fetchLeaderboard();
	// }, []);

	// const [timeLeft, setTimeLeft] = useState("");

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		const now = new Date();
	// 		const end = new Date(monthEndISO);
	// 		const diff = end.getTime() - now.getTime();

	// 		if (diff <= 0) {
	// 			setTimeLeft("00d : 00h : 00m : 00s");
	// 			clearInterval(interval);
	// 			return;
	// 		}

	// 		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	// 		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	// 		const minutes = Math.floor((diff / (1000 * 60)) % 60);
	// 		const seconds = Math.floor((diff / 1000) % 60);

	// 		setTimeLeft(
	// 			`${days.toString().padStart(2, "0")}d : ${hours
	// 				.toString()
	// 				.padStart(2, "0")}h : ${minutes
	// 				.toString()
	// 				.padStart(2, "0")}m : ${seconds.toString().padStart(2, "0")}s`
	// 		);
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, [monthEndISO]);
	const { leaderboard, loading, fetchLeaderboard } = useRoobetStore();

	useEffect(() => {
		if (!leaderboard) {
			fetchLeaderboard();
		}
	}, [leaderboard, fetchLeaderboard]);

	const top3 = leaderboard?.data.slice(0, 3) || [];

	return (
		<div className='relative flex flex-col min-h-screen text-[#fefffe] '>
			<GraphicalBackground />

			<Navbar />

			<main className='relative z-10 flex-grow'>
				{/* Hero Section */}
				<section className='flex flex-col-reverse items-center justify-center max-w-6xl gap-16 px-6 mx-auto py-28 sm:flex-row sm:items-center'>
					<div className='max-w-xl text-center sm:text-left'>
						<h1 className='text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#ff0012] via-[#ffd01f] to-[#ff0012] bg-clip-text text-transparent drop-shadow-lg'>
							King&apos;s <br /> Official Stream
						</h1>

						<div className='w-24 h-1 mt-6 rounded-full bg-[#ff0012] animate-pulse' />

						<p className='mt-6 text-lg font-medium tracking-wide text-[#fefffe]/80'>
							Watch King live on Kick — thrilling gambling streams, giveaways,
							and more.
						</p>
					</div>

					<div className='w-full max-w-xl aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-[#ffd01f]'>
						<iframe
							src='https://player.kick.com/King'
							frameBorder='0'
							allowFullScreen
							title='King Live Stream'
							className='w-full h-full'
						></iframe>
					</div>
				</section>
				{/* Roobet Card */}
				<div className='flex items-center justify-center py-20'>
					{/* ⬆ replaced min-h-screen with py-20 for controlled spacing */}
					<div className='bg-black/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-[#E10600] hover:scale-[1.03] transition-transform flex flex-col max-w-md w-full'>
						<div className='flex items-center justify-center mb-4'>
							<img
								src='https://i.ibb.co/4w1vNNHT/65c0f428cc0de4676934f8d5-logob.png'
								alt='Roobet'
								className='object-contain h-20'
							/>
						</div>
						<h3 className='text-2xl font-semibold text-center text-[#E10600] mb-6'>
							🦘 Roobet Rewards with KING
						</h3>
						<ul className='mb-6 space-y-3 text-base text-gray-300'>
							<li>🎁 Welcome Bonus on your first play</li>
							<li>⚡ Exclusive KING promotions & boosts</li>
							<li>🎟️ Access to community giveaways</li>
							<li>🔒 More rewards rolling out soon</li>
						</ul>
						<p className='mt-auto mb-6 italic text-center text-gray-200'>
							🚀 Hop into the action — play smarter with MisterTee on Roobet.
						</p>
						<a
							href='https://roobet.com/?code=KING'
							target='_blank'
							rel='noreferrer'
							className='w-full text-center py-3 px-4 bg-[#E10600] text-white font-semibold rounded-xl shadow-lg hover:bg-[#b00500] transition'
						>
							Join Roobet
						</a>
					</div>
				</div>

				{/* Top 3 Wagered Players */}
				<div className='max-w-3xl mx-auto mt-8 bg-black/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-[#ffd01f]'>
					<h3 className='text-2xl font-bold text-center text-[#ffd01f] mb-6'>
						🏆 Top 3 Wagered Players
					</h3>

					{loading ? (
						<p className='text-center text-gray-400'>Loading leaderboard...</p>
					) : (
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
							{top3.map((player, idx) => (
								<div
									key={player.uid}
									className='flex flex-col items-center bg-[#000101]/70 rounded-2xl p-6 shadow-md border border-[#ff0012]'
								>
									<span className='text-3xl font-bold text-[#ffd01f]'>
										#{idx + 1}
									</span>
									<p className='mt-2 text-lg font-semibold text-[#fefffe]'>
										{player.username}
									</p>
									<p className='mt-1 text-sm text-gray-300'>
										💰 {player.wagered.toLocaleString()} wagered
									</p>
									<p className='mt-1 text-xs italic text-gray-400'>
										Fav: {player.favoriteGameTitle || "—"}
									</p>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Countdown Section */}
				{/* <section className='max-w-4xl mx-auto px-6 py-10 rounded-3xl bg-[#000101]/70 border border-[#ffd01f] shadow-lg'>
					<h2 className='text-center text-3xl font-semibold mb-8 text-[#ff0012] tracking-wide'>
						⏳ Monthly Leaderboard Ends In
					</h2>

					<div className='flex flex-col justify-center gap-6 text-center select-none sm:flex-row'>
						{["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => {
							const timeParts = timeLeft.split(" : ");
							const value =
								timeParts.length === 4 ? timeParts[idx].slice(0, -1) : "--";

							return (
								<div
									key={label}
									className='flex flex-col items-center justify-center bg-[#ffd01f]/10 rounded-xl py-6 px-8 min-w-[80px] sm:min-w-[100px] shadow-sm'
								>
									<span className='text-5xl font-extrabold tracking-tight text-[#fefffe]'>
										{value}
									</span>
									<span className='mt-2 text-sm font-medium text-[#ff0012]'>
										{label}
									</span>
								</div>
							);
						})}
					</div>
				</section> */}

				{/* Leaderboard Section */}
				{/* <section className='container py-16'>
					<div className='flex items-center justify-between mb-8'>
						<div className='flex items-center gap-2'>
							<Crown className='w-6 h-6 text-[#ff0012]' />
							<h2 className='text-2xl font-bold'>Monthly Leaderboard</h2>
						</div>
						<Button
							variant='outline'
							size='sm'
							className='border-[#ffd01f] text-[#ffd01f] hover:bg-[#ffd01f] hover:text-[#fefffe] bg-[#000101]'
							asChild
						>
							<Link to='/leaderboard' className='flex items-center gap-1'>
								View Full Leaderboard <ArrowRight className='w-4 h-4' />
							</Link>
						</Button>
					</div>
					<LeaderboardTable period='monthly' data={topLeaderboard} />
				</section> */}

				{/* Features Section */}
				<section className='max-w-6xl px-6 py-16 mx-auto'>
					<h2 className='mb-12 text-4xl font-bold text-center text-[#fefffe]'>
						What We Offer
					</h2>
					<div className='grid grid-cols-1 gap-10 sm:grid-cols-3'>
						{[
							{
								icon: (
									<Dices className='w-12 h-12 text-[#ff0012] animate-pulse' />
								),
								title: "Exciting Gambling Streams",
								description:
									"Thrilling slots, casino games, and big wins live with King.",
							},
							{
								icon: (
									<Users className='w-12 h-12 text-[#ffd01f] animate-pulse' />
								),
								title: "Slot Call System",
								description:
									"Suggest slots for King to play and see your choices live.",
							},
							{
								icon: (
									<Gift className='w-12 h-12 text-[#ff0012] animate-pulse' />
								),
								title: "Regular Giveaways",
								description:
									"Win cash, gaming gear, and more through frequent giveaways.",
							},
						].map(({ icon, title, description }) => (
							<div
								key={title}
								className='flex flex-col items-center bg-[#000101]/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-[#ffd01f] hover:scale-[1.05] transition-transform cursor-default'
							>
								<div className='flex items-center justify-center w-20 h-20 rounded-full bg-[#000101]/50 border-2 border-[#ff0012] mb-6'>
									{icon}
								</div>
								<h3 className='text-xl font-semibold mb-3 relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-14 after:h-[2px] after:bg-gradient-to-r after:from-[#ff0012] after:to-[#ffd01f]'>
									{title}
								</h3>
								<p className='text-center text-[#fefffe]/80'>{description}</p>
							</div>
						))}
					</div>
				</section>

				{/* Schedule Section */}
				<section className='max-w-5xl px-6 py-16 mx-auto'>
					<h2 className='mb-8 text-4xl font-bold text-center text-[#fefffe]'>
						📅 Stream Schedule
					</h2>
					<p className='max-w-xl mx-auto mb-10 text-center text-[#fefffe]/70'>
						King goes live <strong>every day</strong> — join anytime!
					</p>

					{/* Timeline */}
					<div className='relative items-center justify-between hidden max-w-full gap-8 px-4 mx-auto select-none sm:flex'>
						<div className='absolute top-1/2 left-8 right-8 h-1 bg-[#ffd01f]/30 rounded-full -z-10'></div>
						{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
							<div
								key={day}
								className='flex flex-col items-center cursor-default group'
							>
								<div className='w-14 h-14 rounded-full border-4 border-[#ff0012] bg-[#000101] shadow-[0_0_12px_#ff0012] group-hover:scale-110 transition-transform flex items-center justify-center text-[#fefffe] font-semibold text-lg select-text'>
									{day}
								</div>
								<p className='mt-3 text-sm text-[#fefffe]/70 select-text'>
									6:00pm EST
								</p>
							</div>
						))}
					</div>

					<div className='flex flex-col gap-4 sm:hidden'>
						{[
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
							"Sunday",
						].map((day) => (
							<div
								key={day}
								className='bg-[#000101]/60 rounded-xl border border-[#ffd01f] p-4 shadow-md flex justify-between items-center'
							>
								<span className='font-semibold text-[#ff0012]'>{day}</span>
								<span className='text-[#fefffe]/80'>7:30pm EST</span>
							</div>
						))}
					</div>

					<div className='flex justify-center mt-12'>
						<Button
							size='lg'
							className='bg-[#ff0012] hover:bg-[#a8000f] text-[#fefffe] shadow-lg transition'
							asChild
						>
							<a href='https://kick.com/King' target='_blank' rel='noreferrer'>
								Watch Live on Kick
							</a>
						</Button>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

export default HomePage;
