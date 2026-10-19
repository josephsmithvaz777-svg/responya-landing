// Animaciones en bucle de las mini interfaces de Servicios (ServiceMiniUI.astro).
// Empiezan cuando el tile entra en pantalla, se pausan fuera de ella y también corren con
// "reducir movimiento" (allí: fundidos y texto escrito, sin desplazamientos ni rebotes).
import { gsap } from 'gsap';
import { prefersReducedMotion } from './fit-mock';

const BH = 210;

// Ancho base del diseño: 360 px, o 320 px en tiles angostos (móvil) para que el texto no quede tan chico.
// Se deja una franja arriba para la etiqueta "Ejemplo".
function fit(mu: HTMLElement, stage: HTMLElement) {
	const apply = () => {
		const bw = mu.clientWidth < 400 ? 320 : 360;
		stage.style.width = `${bw}px`;
		stage.style.marginLeft = `${-bw / 2}px`;
		const s = Math.min((mu.clientWidth - 12) / bw, (mu.clientHeight - 26) / BH);
		stage.style.transform = `translateY(10px) scale(${s})`;
		stage.dataset.s = String(s);
	};
	apply();
	new ResizeObserver(apply).observe(mu);
}

// Posición (en px del diseño 360×210) del centro de un elemento dentro del escenario.
function at(stage: HTMLElement, el: Element, fx = 0.5, fy = 0.5) {
	const s = Number(stage.dataset.s || 1);
	const sr = stage.getBoundingClientRect();
	const r = el.getBoundingClientRect();
	return { x: (r.left - sr.left + r.width * fx) / s, y: (r.top - sr.top + r.height * fy) / s };
}

function typeInto(el: HTMLElement, cps: number) {
	const text = el.dataset.text || '';
	const o = { n: 0 };
	return gsap.to(o, { n: text.length, duration: text.length / cps, ease: 'none', onStart: () => (el.textContent = ''), onUpdate: () => (el.textContent = text.slice(0, Math.round(o.n))) });
}

function build(kind: string, stage: HTMLElement, R: boolean): gsap.core.Timeline {
	const $ = <T extends HTMLElement = HTMLElement>(s: string) => stage.querySelector<T>(s)!;
	const $$ = (s: string) => Array.from(stage.querySelectorAll<HTMLElement>(s));
	const mv = (v: number) => (R ? 0 : v); // desplazamientos: 0 con movimiento reducido
	const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, paused: true });

	if (kind === 'crm') {
		const m1 = $('[data-c-m1]'), ai = $('[data-c-ai]'), m2 = $('[data-c-m2]'), typed = $('[data-c-type]'), ticks = $('[data-c-ticks]'), typing = $('[data-c-typing]'), m3 = $('[data-c-m3]'), stageTag = $('[data-c-stage]');
		tl.set([m1, ai, m2, typing, m3, stageTag], { autoAlpha: 0, y: 0, scale: 1 })
			.call(() => { typed.textContent = ''; ticks.classList.remove('read'); })
			.fromTo(m1, { autoAlpha: 0, y: mv(10) }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.3)
			.fromTo(ai, { autoAlpha: 0, scale: R ? 1 : 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: R ? 'power1.out' : 'back.out(2)' }, '+=0.7')
			.fromTo(m2, { autoAlpha: 0, y: mv(8) }, { autoAlpha: 1, y: 0, duration: 0.35 }, '+=0.6')
			.add(typeInto(typed, 34))
			.call(() => ticks.classList.add('read'), [], '+=0.6')
			.to(ai, { autoAlpha: 0, duration: 0.3 }, '<')
			.fromTo(typing, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, '+=0.3')
			.to(typing, { autoAlpha: 0, duration: 0.2 }, '+=1.1')
			.fromTo(m3, { autoAlpha: 0, y: mv(8) }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<')
			.fromTo(stageTag, { autoAlpha: 0, scale: R ? 1 : 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: R ? 'power1.out' : 'back.out(2.4)' }, '+=0.4')
			.to([m1, m2, m3, stageTag], { autoAlpha: 0, duration: 0.5 }, '+=2.6');
	}

	if (kind === 'erp') {
		const counts = $$('[data-e-count]');
		const line = $<SVGPathElement & HTMLElement>('[data-e-line]' as string);
		const area = $('[data-e-area]');
		const rows = $$('[data-e-row]');
		const badge = $('[data-e-badge]');
		const toast = $('[data-e-toast]');
		const len = (line as unknown as SVGPathElement).getTotalLength();
		const fmt = (el: HTMLElement, v: number) => (el.textContent = el.dataset.eFmt === 'money' ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)));
		tl.set(line, { strokeDasharray: len, strokeDashoffset: len })
			.set([area, toast], { autoAlpha: 0 })
			.set(rows, { autoAlpha: 0, x: 0 })
			.call(() => { counts.forEach((c) => fmt(c, 0)); badge.textContent = 'Enviando…'; badge.classList.remove('ok'); });
		counts.forEach((c) => { const o = { v: 0 }; tl.to(o, { v: Number(c.dataset.eCount), duration: 1.4, ease: 'power2.out', onUpdate: () => fmt(c, o.v) }, 0.2); });
		tl.to(line, { strokeDashoffset: 0, duration: 1.6, ease: 'power1.inOut' }, 0.3)
			.to(area, { autoAlpha: 1, duration: 0.8 }, 1.2)
			.fromTo(rows, { autoAlpha: 0, x: mv(-14) }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.25, ease: 'power2.out' }, 1.4)
			.call(() => { badge.textContent = 'Aceptada SUNAT'; badge.classList.add('ok'); }, [], '+=1.1')
			.fromTo(badge, { scale: R ? 1 : 1.25 }, { scale: 1, duration: 0.35, ease: R ? 'none' : 'back.out(3)' }, '<')
			.fromTo(toast, { autoAlpha: 0, y: mv(10) }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.7')
			.to(toast, { autoAlpha: 0, duration: 0.4 }, '+=2.4')
			.to(rows, { autoAlpha: 0, duration: 0.4 }, '<');
	}

	if (kind === 'dm') {
		const parts = $$('[data-d-part]').slice(1), btn = $('[data-d-btn]'), sel = $('[data-d-sel]'), cur = $('[data-d-cursor]');
		const home = { x: 300, y: 170 };
		tl.set(parts, { autoAlpha: 0.25, scale: 1 }).set([btn, sel], { autoAlpha: 0, x: 0, y: 0 }).set(cur, { x: home.x, y: home.y, autoAlpha: 1 });
		parts.forEach((p, i) => {
			const t = () => at(stage, p, 0.3, 0.5);
			if (R) tl.to(cur, { autoAlpha: 1, duration: 0.01 });
			else tl.to(cur, { x: () => t().x, y: () => t().y, duration: 0.6, ease: 'power2.inOut' });
			tl.fromTo(p, { autoAlpha: 0.25, scale: R ? 1 : 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: R ? 'power1.out' : 'back.out(1.8)' }, R ? `+=${i ? 0.6 : 0.3}` : '-=0.05');
		});
		const tb = () => at(stage, btn, 0.5, 0.5);
		if (!R) tl.to(cur, { x: () => tb().x - 20, y: () => tb().y - 30, duration: 0.5, ease: 'power2.inOut' });
		// el botón se "arrastra" a su lugar (en reducido: aparece con fundido)
		tl.fromTo(btn, { autoAlpha: 0, x: mv(-30), y: mv(-26) }, { autoAlpha: 1, x: 0, y: 0, duration: R ? 0.4 : 0.55, ease: 'power2.out' }, R ? '+=0.6' : '<')
			.to(cur, { x: () => (R ? home.x : tb().x + 4), y: () => (R ? home.y : tb().y + 2), duration: R ? 0.01 : 0.55, ease: 'power2.out' }, '<')
			.fromTo(sel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, '+=0.1')
			.to(cur, { x: home.x, y: home.y, duration: R ? 0.01 : 0.7, ease: 'power2.inOut' }, '+=1.2')
			.to([btn, sel], { autoAlpha: 0, duration: 0.45 }, '+=1.4')
			.to(parts, { autoAlpha: 0.25, duration: 0.45 }, '<');
	}

	if (kind === 'web') {
		const cur = $('[data-w-cursor]'), add = $('[data-w-add]'), badge = $('[data-w-badge]'), pay = $('[data-w-pay]'), wait = $('[data-w-pay-wait]'), ok = $('[data-w-pay-ok]');
		const home = { x: 70, y: 175 };
		const ta = () => at(stage, add, 0.45, 0.55);
		tl.set(cur, { x: home.x, y: home.y, autoAlpha: R ? 0 : 1 })
			.set([pay, ok], { autoAlpha: 0 }).set(wait, { autoAlpha: 1 })
			.call(() => { badge.textContent = '0'; add.classList.remove('is-on'); add.textContent = 'Agregar'; });
		if (!R) tl.to(cur, { x: () => ta().x, y: () => ta().y, duration: 0.9, ease: 'power2.inOut' }, 0.4).to(cur, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 });
		else tl.to({}, { duration: 1 });
		tl.call(() => { add.classList.add('is-on'); add.textContent = 'Agregado ✓'; badge.textContent = '1'; })
			.fromTo(badge, { scale: R ? 1 : 1.6, autoAlpha: R ? 0.3 : 1 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: R ? 'power1.out' : 'back.out(3)' })
			.fromTo(pay, { autoAlpha: 0, y: mv(16) }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.7')
			.to(cur, { x: home.x + 210, y: home.y - 8, duration: R ? 0.01 : 0.7, ease: 'power2.inOut' }, '<')
			.to(wait, { autoAlpha: 0, duration: 0.25 }, '+=1.3')
			.fromTo(ok, { autoAlpha: 0, scale: R ? 1 : 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: R ? 'power1.out' : 'back.out(2)' }, '<')
			.to([pay, cur], { autoAlpha: 0, duration: 0.45 }, '+=2.2');
	}
	return tl;
}

export function initMiniUIs(root: HTMLElement) {
	const R = prefersReducedMotion();
	root.querySelectorAll<HTMLElement>('[data-mu]').forEach((mu) => {
		const stage = mu.querySelector<HTMLElement>('[data-mu-stage]')!;
		fit(mu, stage);
		let tl: gsap.core.Timeline | null = null;
		new IntersectionObserver(
			(entries) => {
				const vis = entries[0].isIntersecting && !document.hidden;
				if (vis && !tl) { tl = build(mu.dataset.mu!, stage, R); if (R) tl.timeScale(0.85); }
				if (tl) vis ? tl.play() : tl.pause();
			},
			{ threshold: 0.35 },
		).observe(mu);
	});
}
