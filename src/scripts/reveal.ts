// Revelado de tarjetas al hacer scroll: cada tarjeta aparece cuando entra al viewport (~85 %),
// en cascada si entran varias a la vez, y solo una vez (sin revertir al subir).
// El estado oculto lo pone este script: si el JS falla, todo el contenido queda visible.
// Con prefers-reduced-motion se usa una versión suave: solo fundido de opacidad, sin desplazamiento,
// escala ni desenfoque (muchos equipos con Windows tienen "Efectos de animación" desactivados).
// Si el JS falla no se oculta nada.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './fit-mock';

gsap.registerPlugin(ScrollTrigger);

export interface RevealOptions {
	/** Desplazamiento/escala/desenfoque inicial (se pueden sobrescribir). */
	from?: gsap.TweenVars;
	start?: string;
	stagger?: number;
	duration?: number;
	/** Se llama por cada tarjeta cuando empieza a aparecer (delay = retardo en la cascada). */
	onReveal?: (el: HTMLElement, delay: number) => void;
}

export const REVEAL_FROM: gsap.TweenVars = { autoAlpha: 0, y: 34, scale: 0.96, filter: 'blur(8px)' };

export function revealCards(targets: ArrayLike<HTMLElement> | string, opts: RevealOptions = {}) {
	const els = gsap.utils.toArray<HTMLElement>(targets);
	if (!els.length) return;
	const reduce = prefersReducedMotion();
	const from = reduce ? { autoAlpha: 0 } : { ...REVEAL_FROM, ...opts.from };
	const stagger = opts.stagger ?? (reduce ? 0.12 : 0.15);
	gsap.set(els, from);
	els.forEach((el) => el.classList.add('is-reveal-pending'));
	ScrollTrigger.batch(els, {
		start: opts.start ?? 'top 85%',
		once: true,
		interval: 0.08,
		onEnter: (batch) => {
			const list = batch as HTMLElement[];
			list.forEach((el, i) => {
				el.classList.remove('is-reveal-pending');
				opts.onReveal?.(el, i * stagger);
			});
			gsap.to(list, {
				autoAlpha: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, filter: 'blur(0px)',
				duration: reduce ? 0.6 : (opts.duration ?? 0.8), stagger, ease: reduce ? 'power1.out' : 'power3.out', overwrite: 'auto',
				clearProps: 'transform,filter,visibility,opacity',
			});
		},
	});
}
