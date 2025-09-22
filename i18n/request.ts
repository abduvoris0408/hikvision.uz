import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
	const requested: string | undefined = await requestLocale;

	const locale: string = hasLocale(routing.locales, requested) ? (requested as string) : routing.defaultLocale;

	console.log(requested, 'locale');

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
