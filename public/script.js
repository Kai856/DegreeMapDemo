function updateTime() {
    const currentTimeElement = document.getElementById("current-time");
    const currentDateElement = document.getElementById("current-date");
    const currentDayElement = document.getElementById("current-day");
    const currentDateTextElement = document.getElementById("current-date-text");

    // Get current date and time in UTC
    const now = new Date();

    // Convert UTC time to Eastern Standard Time (EST)
    const estOffset = -4; // EST is UTC-5 (change to UTC-4 for daylight savings)
    const estNow = new Date(now.getTime() + estOffset * 60 * 60 * 1000);

    // Format time
    const hours = estNow.getUTCHours().toString().padStart(2, '0');
    const minutes = estNow.getUTCMinutes().toString().padStart(2, '0');
    const seconds = estNow.getUTCSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Adjust to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Update time display
    currentTimeElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    // Format date
    const day = estNow.getUTCDate();
    const month = estNow.toLocaleString('default', { month: 'long' });
    const year = estNow.getUTCFullYear();

    // Update date display
    currentDateElement.textContent = `${month} ${day}, ${year}`;

    // Get the day of the week
    const dayOfWeek = estNow.toLocaleString('default', { weekday: 'long' });

    // Update day of the week and date
    currentDayElement.textContent = dayOfWeek;
    currentDateTextElement.textContent = `${month} ${day}, ${year}`;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initially set the time and date
updateTime();