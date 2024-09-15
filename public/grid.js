const totalCreditsRequired = 120;
let completedCredits = 0;
let currentSemesterIndex = 0;

// List of semesters
const semesters = [
    "Semester 1, 2024",
    "Semester 2, 2024",
    "Semester 1, 2025",
    "Semester 2, 2025"
];

// Function to update the displayed semester
function updateSemesterDisplay() {
    const currentSemesterElement = document.getElementById('current-date');
    currentSemesterElement.innerText = semesters[currentSemesterIndex];
}

// Function to handle semester navigation
document.getElementById('prev-date').addEventListener('click', () => {
    if (currentSemesterIndex > 0) {
        currentSemesterIndex--;
        updateSemesterDisplay();
    }
});

document.getElementById('next-date').addEventListener('click', () => {
    if (currentSemesterIndex < semesters.length - 1) {
        currentSemesterIndex++;
        updateSemesterDisplay();
    }
});

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const completedCreditsDisplay = document.getElementById('completed-credits');
    const totalCreditsInput = document.getElementById('total-credits');
    
    const progressPercent = (completedCredits / totalCreditsRequired) * 100;
    progressBar.style.width = progressPercent + "%";
    completedCreditsDisplay.innerText = completedCredits;
    totalCreditsInput.value = completedCredits;
}

// Calculate total credits entered
function calculateTotalCredits() {
    let totalCredits = 0;
    document.querySelectorAll('#course-table-body input[type="number"]').forEach(input => {
        totalCredits += parseInt(input.value) || 0;
    });
    completedCredits = totalCredits;
    updateProgressBar();
}

// Event listener for credit input change
const tableBody = document.querySelector('#course-table-body');
tableBody.addEventListener('input', (event) => {
    if (event.target.type === 'number') {
        calculateTotalCredits();
    }
});

// Add new row on button click
const addRowButton = document.getElementById('add-row-button');
addRowButton.addEventListener('click', () => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Enter course title"></td>
        <td>
            <select>
                <option>Enrolled</option>
                <option>Waitlisted</option>
                <option>Completed</option>
            </select>
        </td>
        <td>
            <select>
                <option>Graded</option>
                <option>Pass/Fail</option>
                <option>Audit</option>
            </select>
        </td>
        <td><input type="number" placeholder="Credit hours" min="0" class="credit-input"></td>
    `;
    tableBody.appendChild(newRow);
});

// Function to update time every second
function updateTime() {
    const currentTimeElement = document.getElementById('current-time');

    const now = new Date();

    // Format time as HH:MM:SS AM/PM
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    const formattedTime = `${displayHours}:${minutes}:${seconds} ${ampm}`;
    currentTimeElement.innerText = formattedTime;
}

// Call updateTime every second
setInterval(updateTime, 1000);

// Initial call to display time and the initial semester
updateTime();
updateSemesterDisplay();
