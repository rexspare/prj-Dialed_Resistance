function getCurrentUnixTime() {
    // Create a new Date object for the current date and time
    const currentDate = new Date();

    // Convert the Date object to Unix time (in seconds)
    const unixTimeInSeconds = Math.floor(currentDate.getTime() / 1000);

    return unixTimeInSeconds;
}

export {
    getCurrentUnixTime
}
