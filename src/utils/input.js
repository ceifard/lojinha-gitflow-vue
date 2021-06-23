export function removeSpecial (val) {
    let parsed = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[`~!@#$%^&*()_|+\s-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    return parsed
}

export function capitalize (val) {
    return val.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}