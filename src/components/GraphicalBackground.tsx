import { useEffect, useRef } from "react";

export function GraphicalBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Resize canvas
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Particles (glowing embers)
		interface Particle {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			color: string;
			alpha: number;
			pulse: number;
		}

		const particles: Particle[] = [];
		const particleCount = 60;
		const colors = ["#ff0012", "#ff4500", "#ffd01f"]; // red-orange-yellow

		for (let i = 0; i < particleCount; i++) {
			const color = colors[Math.floor(Math.random() * colors.length)];
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 3 + 1.5,
				speedX: (Math.random() - 0.5) * 0.3,
				speedY: (Math.random() - 0.5) * 0.3,
				color,
				alpha: Math.random() * 0.5 + 0.2,
				pulse: Math.random() * Math.PI * 2,
			});
		}

		// Floating T-shirts
		interface FloatingItem {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			rotation: number;
			rotationSpeed: number;
			layer: number;
			opacity: number;
		}

		const tshirtImage = new Image();
		tshirtImage.src =
			"https://i.ibb.co/275b59dD/Capture-d-cran-2025-08-20-191534-removebg-preview.png";

		const shirts: FloatingItem[] = [];
		const shirtCount = 20;

		for (let i = 0; i < shirtCount; i++) {
			const layer = Math.floor(Math.random() * 3);
			const baseSize = [60, 100, 140][layer];
			shirts.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: baseSize + Math.random() * 50,
				speedX: (Math.random() - 0.5) * (0.2 + layer * 0.1),
				speedY: (Math.random() - 0.5) * (0.2 + layer * 0.1),
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: (Math.random() - 0.5) * 0.005,
				layer,
				opacity: 0.3 + layer * 0.4,
			});
		}

		let time = 0;
		let animationFrameId: number;

		const render = () => {
			time += 0.02;

			// Dark background with subtle gradient
			const gradient = ctx.createRadialGradient(
				canvas.width / 2,
				canvas.height / 2,
				0,
				canvas.width / 2,
				canvas.height / 2,
				canvas.width
			);
			gradient.addColorStop(0, "#1a0000");
			gradient.addColorStop(1, "#000101");
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Light streaks
			for (let i = 0; i < 3; i++) {
				ctx.strokeStyle = `rgba(255,50,50,${0.02 + 0.03 * i})`;
				ctx.lineWidth = 1 + i;
				ctx.beginPath();
				ctx.moveTo((time * 30 + i * 300) % canvas.width, 0);
				ctx.lineTo((time * 30 + i * 300 + 300) % canvas.width, canvas.height);
				ctx.stroke();
			}

			// Glowing particles
			particles.forEach((p) => {
				p.pulse += 0.05;
				const glow = Math.sin(p.pulse) * 0.5 + 0.5;
				p.x += p.speedX;
				p.y += p.speedY;

				if (p.x > canvas.width) p.x = 0;
				if (p.x < 0) p.x = canvas.width;
				if (p.y > canvas.height) p.y = 0;
				if (p.y < 0) p.y = canvas.height;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size + glow, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.shadowBlur = 10 * glow;
				ctx.shadowColor = p.color;
				ctx.fill();
			});

			// Floating T-shirts with glow outline
			shirts.forEach((shirt, idx) => {
				shirt.x +=
					shirt.speedX + Math.sin(time + idx) * 0.2 * (shirt.layer + 1);
				shirt.y +=
					shirt.speedY + Math.cos(time + idx) * 0.2 * (shirt.layer + 1);
				shirt.rotation += shirt.rotationSpeed;

				if (shirt.x > canvas.width) shirt.x = -shirt.size;
				if (shirt.x < -shirt.size) shirt.x = canvas.width;
				if (shirt.y > canvas.height) shirt.y = -shirt.size;
				if (shirt.y < -shirt.size) shirt.y = canvas.height;

				ctx.save();
				ctx.globalAlpha = shirt.opacity;
				ctx.shadowColor = "#ff0012";
				ctx.shadowBlur = 10;
				ctx.translate(shirt.x + shirt.size / 2, shirt.y + shirt.size / 2);
				ctx.rotate(shirt.rotation);
				ctx.drawImage(
					tshirtImage,
					-shirt.size / 2,
					-shirt.size / 2,
					shirt.size,
					shirt.size
				);
				ctx.restore();
			});

			// Optional: soft vignette
			const vignette = ctx.createRadialGradient(
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 4,
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 1.2
			);
			vignette.addColorStop(0, "rgba(0,0,0,0)");
			vignette.addColorStop(1, "rgba(0,0,0,0.6)");
			ctx.fillStyle = vignette;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			animationFrameId = requestAnimationFrame(render);
		};

		tshirtImage.onload = () => {
			render();
		};

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className='fixed top-0 left-0 w-full h-full pointer-events-none -z-10'
		/>
	);
}

export default GraphicalBackground;
