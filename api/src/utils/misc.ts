import { webcrypto } from 'crypto'

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export const uuidv4 = (includeDashes: boolean = true) => {
  // @ts-expect-error
  const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) => {
    const randomByte =
      // @ts-expect-error
      webcrypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))
    return (c ^ randomByte).toString(16)
  })

  return includeDashes ? uuid : uuid.replaceAll('-', '')
}

export const JSON_stringify = (
  input: any,
  replacer?: ((this: any, key: string, value: any) => any) | undefined,
  space?: string | number | undefined,
): string | null => {
  try {
    return JSON.stringify(input, replacer, space)
  } catch (_) {
    return null
  }
}

export const JSON_parse = (input: string): any | null => {
  try {
    return JSON.parse(input)
  } catch (_) {
    return null
  }
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
  })
}

export const formatDateToLocal = (dateStr: string, locale: string = 'en-US') => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = []
  const highestRecord = Math.max(...revenue.map(month => month.revenue))
  const topLabel = Math.ceil(highestRecord / 1000) * 1000

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`)
  }

  return { yAxisLabels, topLabel }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}
