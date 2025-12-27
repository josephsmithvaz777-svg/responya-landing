/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'primary': '#d946ef',
				'secondary': '#06b6d4',
				'accent-pink': '#ec4899',
				'accent-cyan': '#22d3ee',
				'background-dark': '#050511',
				'surface-dark': '#0f0f1a',
				'surface-card': '#0a0a16',
				'border-dark': '#1e1e2e',
			},
			fontFamily: {
				'display': ['Inter', 'sans-serif']
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'tech-grid': "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
			},
			boxShadow: {
				'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.3)',
				'neon-purple': '0 0 20px rgba(217, 70, 239, 0.3)',
				'card-glow': '0 0 40px -10px rgba(124, 58, 237, 0.15)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'blob': 'blob 7s infinite',
				'spin-slow': 'spin 12s linear infinite',
				'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
				'card-float': 'card-float 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				blob: {
					'0%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' },
				},
				'card-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.1)' },
				},
			}
		},
	},
	plugins: [],
}
