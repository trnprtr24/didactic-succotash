module.exports.getDateNow = () => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date().toLocaleDateString('th-TH', dateOptions);
}

module.exports.otherFunction = () => {
    return 'otherFunction'
}
