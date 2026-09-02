// Store active timezones
let activeTimezones = JSON.parse(localStorage.getItem('activeTimezones')) || [];

// DOM elements
const timezonesGrid = document.getElementById('timezonesGrid');
const emptyState = document.getElementById('emptyState');
const timezoneSearch = document.getElementById('timezoneSearch');
const addBtn = document.getElementById('addBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load saved timezones
    activeTimezones.forEach(tz => addTimezoneCard(tz));
    
    // Update empty state
    updateEmptyState();
    
    // Start clock updates
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
    
    // Add event listeners
    addBtn.addEventListener('click', handleAddTimezone);
    timezoneSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddTimezone();
    });
});

// Handle adding a timezone
function handleAddTimezone() {
    const searchTerm = timezoneSearch.value.trim();
    if (!searchTerm) {
        alert('Please enter a timezone name');
        return;
    }
    
    const results = getTimezoneByName(searchTerm);
    if (results.length === 0) {
        alert('Timezone not found. Try searching for a city or region.');
        return;
    }
    
    if (results.length === 1) {
        addTimezone(results[0].name);
    } else {
        // Let user choose from results
        const names = results.map(r => r.label).join(', ');
        alert(`Multiple matches found: ${names}\nPlease be more specific.`);
    }
    
    timezoneSearch.value = '';
}

// Add timezone to display
function addTimezone(timezoneName) {
    if (!isValidTimezone(timezoneName)) {
        alert('Invalid timezone');
        return;
    }
    
    if (activeTimezones.includes(timezoneName)) {
        alert('This timezone is already displayed');
        return;
    }
    
    activeTimezones.push(timezoneName);
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
    
    addTimezoneCard(timezoneName);
    updateEmptyState();
}

// Create and add a clock card
function addTimezoneCard(timezoneName) {
    const tzData = TIMEZONES.find(tz => tz.name === timezoneName);
    if (!tzData) return;
    
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${timezoneName}`;
    card.innerHTML = `
        <div class="timezone-name">${tzData.label}</div>
        <div class="timezone-region">${tzData.region}</div>
        
        <div class="analog-clock">
            <div class="clock-hand hour-hand" id="hour-${timezoneName}"></div>
            <div class="clock-hand minute-hand" id="minute-${timezoneName}"></div>
            <div class="clock-hand second-hand" id="second-${timezoneName}"></div>
            <div class="clock-center"></div>
        </div>
        
        <div class="digital-time" id="digital-${timezoneName}">00:00:00</div>
        <div class="ampm" id="ampm-${timezoneName}">AM</div>
        
        <div class="time-info">
            <div class="info-item">
                <div class="info-label">12-Hour</div>
                <div class="info-value" id="12hour-${timezoneName}">00:00:00</div>
            </div>
            <div class="info-item">
                <div class="info-label">Offset</div>
                <div class="info-value" id="offset-${timezoneName}">${tzData.offset}</div>
            </div>
        </div>
        
        <div class="date-display" id="date-${timezoneName}">Jan 01, 2024</div>
        
        <button class="remove-btn" onclick="removeTimezone('${timezoneName}')">Remove</button>
    `;
    
    timezonesGrid.appendChild(card);
}

// Remove timezone
function removeTimezone(timezoneName) {
    activeTimezones = activeTimezones.filter(tz => tz !== timezoneName);
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
    
    const card = document.getElementById(`clock-${timezoneName}`);
    if (card) {
        card.style.animation = 'scaleIn 0.3s ease-out reverse';
        setTimeout(() => card.remove(), 300);
    }
    
    updateEmptyState();
}

// Update all clock displays
function updateAllClocks() {
    activeTimezones.forEach(timezoneName => {
        updateClock(timezoneName);
    });
}

// Update individual clock
function updateClock(timezoneName) {
    try {
        // Get current time in specified timezone
        const now = new Date();
        const utcTime = now.toLocaleString('en-US', { timeZone: timezoneName });
        const time = new Date(utcTime);
        
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const date = time.toLocaleDateString('en-US', { 
            weekday: 'short',
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        // Update digital time (24-hour)
        const digitalTime = 
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        
        document.getElementById(`digital-${timezoneName}`).textContent = digitalTime;
        
        // Update 12-hour time
        const hours12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const time12 = 
            String(hours12).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        
        document.getElementById(`12hour-${timezoneName}`).textContent = time12;
        document.getElementById(`ampm-${timezoneName}`).textContent = ampm;
        
        // Update date
        document.getElementById(`date-${timezoneName}`).textContent = date;
        
        // Update analog clock hands
        const secondDegrees = (seconds / 60) * 360;
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
        
        document.getElementById(`second-${timezoneName}`).style.transform = 
            `rotate(${secondDegrees}deg)`;
        document.getElementById(`minute-${timezoneName}`).style.transform = 
            `rotate(${minuteDegrees}deg)`;
        document.getElementById(`hour-${timezoneName}`).style.transform = 
            `rotate(${hourDegrees}deg)`;
            
    } catch (error) {
        console.error(`Error updating clock for ${timezoneName}:`, error);
    }
}

// Update empty state visibility
function updateEmptyState() {
    if (activeTimezones.length === 0) {
        emptyState.style.display = 'block';
        timezonesGrid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        timezonesGrid.style.display = 'grid';
    }
}
