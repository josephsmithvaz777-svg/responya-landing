// Actualiza --mx/--my en las tarjetas .sc-spot para el brillo que sigue al cursor.
export function initSpotlight(root: ParentNode = document) {
	root.querySelectorAll<HTMLElement>('.sc-spot').forEach((el) => {
		el.addEventListener('pointermove', (e) => {
			const r = el.getBoundingClientRect();
			el.style.setProperty('--mx', `${e.clientX - r.left}px`);
			el.style.setProperty('--my', `${e.clientY - r.top}px`);
		});
	});
}
