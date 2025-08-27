import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dices, Crown, Gift, Users, LogIn, User, LogOut } from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";
import { useAuthStore } from "@/store/useAuthStore";

export function Navbar() {
	const location = useLocation();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [isOpen, setIsOpen] = useState(false);
	const [isLive, setIsLive] = useState(false);
	const [viewerCount, setViewerCount] = useState<number | null>(null);
	const { user, logout } = useAuthStore();

	useEffect(() => {
		setIsOpen(false);
	}, [location, isMobile]);

	useEffect(() => {
		const fetchLiveStatus = async () => {
			try {
				const res = await fetch("https://kick.com/api/v2/channels/King");
				const data = await res.json();
				if (data.livestream) {
					setIsLive(true);
					setViewerCount(data.livestream.viewer_count);
				} else {
					setIsLive(false);
					setViewerCount(null);
				}
			} catch (err) {
				console.error("Error fetching live status", err);
			}
		};
		fetchLiveStatus();
		const interval = setInterval(fetchLiveStatus, 60000);
		return () => clearInterval(interval);
	}, []);

	const menuItems = [
		{ path: "/", name: "Home", icon: <Dices className='w-5 h-5' /> },
		{
			path: "/leaderboards",
			name: "Leaderboard",
			icon: <Crown className='w-5 h-5' />,
		},
		{
			path: "/slot-calls",
			name: "Slot Calls",
			icon: <Users className='w-5 h-5' />,
		},
		{
			path: "/giveaways",
			name: "Giveaways",
			icon: <Gift className='w-5 h-5' />,
		},
	];

	return (
		<>
			{/* Fixed Navbar */}
			<nav className='fixed top-0 w-full z-50 backdrop-blur-md bg-[#000101]/50 border-b border-[#ff0012]/40 shadow-xl h-20'>
				<div className='container relative flex items-center justify-between h-full px-6 py-4 mx-auto'>
					{/* Logo */}
					<Link to='/' className='flex items-center space-x-3 select-none'>
						<img
							src='https://i.ibb.co/KcLcdTJs/logo.png'
							alt='King Logo'
							className='w-12 h-12 rounded-full border-2 border-[#ff0012] shadow-[0_0_15px_rgba(255,0,18,0.7)] object-cover'
						/>
						<span className='text-3xl font-bold italic tracking-wider text-[#ff0012] [text-shadow:0_0_12px_rgba(255,0,18,0.7)]'>
							KI<span className='text-[#fefffe]'>NG</span>
						</span>
					</Link>

					{/* Desktop Menu */}
					{!isMobile && (
						<ul className='flex space-x-12 font-semibold text-[#fefffe] items-center'>
							{menuItems.map((item) => (
								<li key={item.path} className='relative group'>
									<Link
										to={item.path}
										className={`flex items-center space-x-2 px-2 py-1 transition-all duration-300 ${
											location.pathname === item.path
												? "text-[#ff0012]"
												: "hover:text-[#ffd01f]"
										}`}
									>
										{item.icon}
										<span>{item.name}</span>
										<span
											className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff0012] to-[#ffd01f] rounded transition-all duration-300 ${
												location.pathname === item.path
													? "scale-x-100"
													: "scale-x-0 group-hover:scale-x-100"
											}`}
										/>
									</Link>
								</li>
							))}
						</ul>
					)}

					{/* Right side controls */}
					<div className='flex items-center space-x-4'>
						{/* Live Status */}
						<div
							className={`px-4 py-1 rounded-full text-sm font-bold select-none flex items-center gap-1 ${
								isLive
									? "bg-[#ff0012]/90 text-[#fefffe] shadow-[0_0_15px_rgba(255,0,18,0.6)] animate-pulse"
									: "bg-[#ffd01f]/20 text-[#fefffe]/80"
							}`}
							title={isLive ? "Currently Live" : "Offline"}
						>
							{isLive ? (
								<>
									<span role='img' aria-label='Live'>
										🔴
									</span>
									LIVE {viewerCount !== null ? `(${viewerCount})` : ""}
								</>
							) : (
								"Offline"
							)}
						</div>

						{/* Desktop User controls */}
						{!isMobile && (
							<>
								{user ? (
									<div className='relative group'>
										<button className='flex items-center space-x-2 bg-[#ff0012]/80 hover:bg-[#b8000d] px-4 py-1.5 rounded-lg text-[#fefffe] font-semibold transition shadow-[0_0_8px_rgba(255,0,18,0.7)]'>
											<User className='w-5 h-5' />
											<span>{user.username}</span>
										</button>
										<div className='absolute right-0 mt-2 w-44 bg-[#000101]/90 backdrop-blur-md rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300'>
											<button
												onClick={logout}
												className='w-full text-left px-4 py-2 hover:bg-[#ff0012] hover:text-[#fefffe] transition flex items-center gap-2 rounded-md'
											>
												<LogOut className='w-5 h-5' /> Logout
											</button>
										</div>
									</div>
								) : (
									<>
										<Link
											to='/login'
											className='flex items-center space-x-2 border border-[#ff0012] text-[#ff0012] hover:bg-[#ff0012] hover:text-[#fefffe] px-4 py-1.5 rounded-lg font-semibold transition shadow-[0_0_8px_rgba(255,0,18,0.6)]'
										>
											<LogIn className='w-5 h-5' /> Login
										</Link>
										<Link
											to='/signup'
											className='text-[#fefffe] font-semibold hover:text-[#ffd01f] transition'
										>
											Sign Up
										</Link>
									</>
								)}
							</>
						)}

						{/* Mobile Hamburger */}
						{isMobile && (
							<button
								onClick={() => setIsOpen(!isOpen)}
								className='relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5'
							>
								<span
									className={`block w-8 h-1 bg-[#fefffe] rounded transition-transform duration-300 ${
										isOpen ? "rotate-45 translate-y-2" : ""
									}`}
								/>
								<span
									className={`block w-8 h-1 bg-[#fefffe] rounded transition-opacity duration-300 ${
										isOpen ? "opacity-0" : "opacity-100"
									}`}
								/>
								<span
									className={`block w-8 h-1 bg-[#fefffe] rounded transition-transform duration-300 ${
										isOpen ? "-rotate-45 -translate-y-2" : ""
									}`}
								/>
							</button>
						)}
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			{isMobile && (
				<div
					className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-start pt-24 space-y-8 text-lg font-semibold text-[#fefffe] transform transition-transform duration-300 ${
						isOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					{menuItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center space-x-3 ${
								location.pathname === item.path
									? "text-[#ff0012]"
									: "hover:text-[#ffd01f]"
							}`}
						>
							{item.icon}
							<span>{item.name}</span>
						</Link>
					))}

					{/* User controls on mobile */}
					{user ? (
						<button
							onClick={logout}
							className='flex items-center space-x-2 bg-[#ff0012] px-4 py-2 rounded-lg text-white'
						>
							<LogOut className='w-5 h-5' /> <span>Logout</span>
						</button>
					) : (
						<>
							<Link
								to='/login'
								className='flex items-center space-x-2 border border-[#ff0012] text-[#ff0012] hover:bg-[#ff0012] hover:text-white px-4 py-2 rounded-lg'
							>
								<LogIn className='w-5 h-5' /> Login
							</Link>
							<Link to='/signup' className='text-white hover:text-[#ffd01f]'>
								Sign Up
							</Link>
						</>
					)}
				</div>
			)}

			{/* Spacer */}
			<div className='h-20'></div>
		</>
	);
}
