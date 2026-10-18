// Escala un mockup diseñado a tamaño fijo (baseW × baseH) al ancho de su contenedor.
export function fitMock(wrap: HTMLElement, inner: HTMLElement, baseW: number, baseH: number, onFit?: () => void) {
	const fit = () => {
		const s = wrap.clientWidth / baseW;
		inner.style.transform = `scale(${s})`;
		wrap.style.height = `${baseH * s}px`;
		onFit?.();
	};
	fit();
	if ('ResizeObserver' in window) new ResizeObserver(fit).observe(wrap);
	else window.addEventListener('resize', fit);
	document.fonts?.ready.then(fit);
	return fit;
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
