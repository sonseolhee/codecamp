

// return 오늘 날짜(string)
export function getCurrentDate(){

    const date = new Date()
    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()

    return `${yyyy}-${mm}-${dd}`
    
}