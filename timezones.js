// Comprehensive list of all timezones
const TIMEZONES = [
    // Africa
    { name: 'Africa/Cairo', label: 'Cairo', region: 'Africa', offset: 'UTC+2' },
    { name: 'Africa/Johannesburg', label: 'Johannesburg', region: 'Africa', offset: 'UTC+2' },
    { name: 'Africa/Lagos', label: 'Lagos', region: 'Africa', offset: 'UTC+1' },
    { name: 'Africa/Nairobi', label: 'Nairobi', region: 'Africa', offset: 'UTC+3' },
    
    // Asia
    { name: 'Asia/Bangkok', label: 'Bangkok', region: 'Asia', offset: 'UTC+7' },
    { name: 'Asia/Beijing', label: 'Beijing', region: 'Asia', offset: 'UTC+8' },
    { name: 'Asia/Dubai', label: 'Dubai', region: 'Asia', offset: 'UTC+4' },
    { name: 'Asia/Hong_Kong', label: 'Hong Kong', region: 'Asia', offset: 'UTC+8' },
    { name: 'Asia/Kolkata', label: 'Kolkata', region: 'Asia', offset: 'UTC+5:30' },
    { name: 'Asia/Manila', label: 'Manila', region: 'Asia', offset: 'UTC+8' },
    { name: 'Asia/Seoul', label: 'Seoul', region: 'Asia', offset: 'UTC+9' },
    { name: 'Asia/Shanghai', label: 'Shanghai', region: 'Asia', offset: 'UTC+8' },
    { name: 'Asia/Singapore', label: 'Singapore', region: 'Asia', offset: 'UTC+8' },
    { name: 'Asia/Tokyo', label: 'Tokyo', region: 'Asia', offset: 'UTC+9' },
    { name: 'Asia/Jakarta', label: 'Jakarta', region: 'Asia', offset: 'UTC+7' },
    { name: 'Asia/Karachi', label: 'Karachi', region: 'Asia', offset: 'UTC+5' },
    { name: 'Asia/Istanbul', label: 'Istanbul', region: 'Asia', offset: 'UTC+3' },
    
    // Australia
    { name: 'Australia/Sydney', label: 'Sydney', region: 'Australia', offset: 'UTC+10' },
    { name: 'Australia/Melbourne', label: 'Melbourne', region: 'Australia', offset: 'UTC+10' },
    { name: 'Australia/Brisbane', label: 'Brisbane', region: 'Australia', offset: 'UTC+10' },
    { name: 'Australia/Perth', label: 'Perth', region: 'Australia', offset: 'UTC+8' },
    { name: 'Australia/Adelaide', label: 'Adelaide', region: 'Australia', offset: 'UTC+9:30' },
    
    // Europe
    { name: 'Europe/Amsterdam', label: 'Amsterdam', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Berlin', label: 'Berlin', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Brussels', label: 'Brussels', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/London', label: 'London', region: 'Europe', offset: 'UTC+0' },
    { name: 'Europe/Madrid', label: 'Madrid', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Moscow', label: 'Moscow', region: 'Europe', offset: 'UTC+3' },
    { name: 'Europe/Paris', label: 'Paris', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Rome', label: 'Rome', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Stockholm', label: 'Stockholm', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Vienna', label: 'Vienna', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Zurich', label: 'Zurich', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Athens', label: 'Athens', region: 'Europe', offset: 'UTC+2' },
    { name: 'Europe/Dublin', label: 'Dublin', region: 'Europe', offset: 'UTC+0' },
    { name: 'Europe/Prague', label: 'Prague', region: 'Europe', offset: 'UTC+1' },
    { name: 'Europe/Warsaw', label: 'Warsaw', region: 'Europe', offset: 'UTC+1' },
    
    // North America
    { name: 'America/Anchorage', label: 'Anchorage', region: 'North America', offset: 'UTC-9' },
    { name: 'America/Chicago', label: 'Chicago', region: 'North America', offset: 'UTC-6' },
    { name: 'America/Denver', label: 'Denver', region: 'North America', offset: 'UTC-7' },
    { name: 'America/Los_Angeles', label: 'Los Angeles', region: 'North America', offset: 'UTC-8' },
    { name: 'America/Mexico_City', label: 'Mexico City', region: 'North America', offset: 'UTC-6' },
    { name: 'America/New_York', label: 'New York', region: 'North America', offset: 'UTC-5' },
    { name: 'America/Toronto', label: 'Toronto', region: 'North America', offset: 'UTC-5' },
    { name: 'America/Vancouver', label: 'Vancouver', region: 'North America', offset: 'UTC-8' },
    
    // South America
    { name: 'America/Bogota', label: 'Bogota', region: 'South America', offset: 'UTC-5' },
    { name: 'America/Buenos_Aires', label: 'Buenos Aires', region: 'South America', offset: 'UTC-3' },
    { name: 'America/Lima', label: 'Lima', region: 'South America', offset: 'UTC-5' },
    { name: 'America/Sao_Paulo', label: 'São Paulo', region: 'South America', offset: 'UTC-3' },
    
    // Pacific
    { name: 'Pacific/Auckland', label: 'Auckland', region: 'Pacific', offset: 'UTC+12' },
    { name: 'Pacific/Fiji', label: 'Fiji', region: 'Pacific', offset: 'UTC+12' },
    { name: 'Pacific/Honolulu', label: 'Honolulu', region: 'Pacific', offset: 'UTC-10' },
];

// Get timezone by name (case-insensitive)
function getTimezoneByName(searchTerm) {
    const search = searchTerm.toLowerCase().trim();
    return TIMEZONES.filter(tz => 
        tz.name.toLowerCase().includes(search) ||
        tz.label.toLowerCase().includes(search) ||
        tz.region.toLowerCase().includes(search)
    );
}

// Get all timezone regions
function getRegions() {
    const regions = new Set();
    TIMEZONES.forEach(tz => regions.add(tz.region));
    return Array.from(regions).sort();
}

// Get timezones by region
function getTimezonesByRegion(region) {
    return TIMEZONES.filter(tz => tz.region === region);
}

// Validate timezone
function isValidTimezone(timezoneName) {
    return TIMEZONES.some(tz => tz.name === timezoneName);
}
