

export const clampString = (value: string, maxLenght: number) => {
    if (value.length > maxLenght) {
        return value.slice(0, maxLenght) + "..."
    }

    return value
}
