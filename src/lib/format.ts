/** Format an ISO date as a readable Dutch date, e.g. "14 juni 2026". */
export function formatDate(iso: string | undefined | null): string {
	if (!iso) return '';
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return '';
	return new Intl.DateTimeFormat('nl-NL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

/** Format a price in EUR, or "Gratis" when free/unset. */
export function formatPrice(price: number | undefined | null): string {
	if (price == null || price === 0) return 'Gratis';
	return new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}
