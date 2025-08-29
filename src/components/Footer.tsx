import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { FaKickstarterK } from "react-icons/fa"; // Kick icon approximation
import { FaInstagram, FaDiscord, FaXTwitter } from "react-icons/fa6"; // Socials

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-[#010102] border-t border-[#1a1a1d] text-[#fffcf5]'>
			<div className='container px-6 py-12 mx-auto'>
				<div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
					{/* About */}
					<div>
						<h3 className='mb-3 text-lg font-bold text-[#fffcf5]'>King</h3>
						<p className='text-sm text-[#fffcf5]/70'>
							Join King&apos;s community for exciting gambling streams,
							giveaways, and more. Use affiliate code{" "}
							<span className='font-semibold text-[#c63427]'>DonkeyG</span> on
							Roobet.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='mb-3 text-lg font-bold text-[#fffcf5]'>Links</h3>
						<div className='grid grid-cols-2 gap-2'>
							{[
								{ to: "/", label: "Home" },
								{ to: "/leaderboards", label: "Leaderboard" },
								{ to: "/terms", label: "Terms & Conditions" },
								{ to: "/privacy", label: "Privacy Policy" },
							].map(({ to, label }) => (
								<Link
									key={label}
									to={to}
									className='text-sm text-[#fffcf5]/70 hover:text-[#2474a9] transition-colors'
								>
									{label}
								</Link>
							))}
						</div>
					</div>

					{/* Social */}
					<div>
						<h3 className='mb-3 text-lg font-bold text-[#fffcf5]'>Connect</h3>
						<div className='flex gap-3'>
							{[
								{
									href: "https://kick.com/King",
									icon: <FaKickstarterK className='w-5 h-5' />,
								},
								{
									href: "https://x.com/Mister7ee",
									icon: <FaXTwitter className='w-5 h-5' />,
								},
								{
									href: "https://discord.gg/kingonkick",
									icon: <FaDiscord className='w-5 h-5' />,
								},
								{
									href: "https://www.instagram.com/kingonkick",
									icon: <FaInstagram className='w-5 h-5' />,
								},
							].map(({ href, icon }, i) => (
								<a
									key={i}
									href={href}
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-center w-9 h-9 rounded-full bg-[#111] text-[#fffcf5] transition-all hover:bg-[#c63427] hover:scale-110'
								>
									{icon}
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='pt-6 mt-12 border-t border-[#1a1a1d] text-center text-sm text-[#fffcf5]/60'>
					<p className='flex flex-wrap items-center justify-center gap-1'>
						© {currentYear} King. Made with
						<Heart className='w-3 h-3 mx-1 text-[#c63427]' />
						for the community by{" "}
						<a
							href='https://www.linkedin.com/in/skander-kefi/'
							target='_blank'
							rel='noreferrer'
							className='font-medium text-[#fffcf5] hover:text-[#2474a9] transition-colors'
						>
							Skander
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
