export function isJson(value :string|null) {
    if (typeof value == 'string') {
        try {
            const obj = JSON.parse(value)
            if (typeof obj == 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
}


export function isExternal(path :string) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
