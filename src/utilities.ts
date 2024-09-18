export function titleCase(str: string): string {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)    
    }
    return splitStr.join(' ')
}

export function unslug(slug: string) {
    return titleCase(slug.replaceAll('-', ' '))
}

export function dateAsLocale(date: Date) {
    return date.toLocaleDateString(process.env.DATE_LOCALE)
}

export function todaysDateString() {
    return dateAsLocale(new Date())
}

export function debounce(fn: any, delay: number) {
    let timeoutId: NodeJS.Timeout
    return (...args: any) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delay)
    }
}