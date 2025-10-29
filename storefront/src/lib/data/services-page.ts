import { getProductPageData } from './product-page'

/**
 * Fetch Services page data from CMS
 * Uses the shared product page data fetcher
 */
export const getServicesPageData = () => getProductPageData('services-page')

