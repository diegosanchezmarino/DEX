

export function validateInput(value) {
    var res = value.split(".");
    let result = false

    if (res.length === 1 && value > 0) {
        return true
    }
    else if (res.length === 2 && res[1].length < 19 && value > 0) {
        return true
    }

    return result
}