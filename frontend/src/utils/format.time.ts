const formatTime = (time: string): string => {
    const formattedTime: number = Number(time.slice(0,-4))
    const result: string = Math.floor(formattedTime / 60) + 'h ' + formattedTime % 60 + 'min'
    return result
}

export default formatTime