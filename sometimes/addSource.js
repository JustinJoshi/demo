//claude code except where cited
let currentSource = '';

const sourceNames = {
    fitbit: 'Fitbit',
    strava: 'Strava',
    github: 'GitHub',
    googlesheets: 'Google Sheets',
    todoist: 'Todoist',
    spotify: 'Spotify',
    rescuetime: 'RescueTime',
    myfitnesspal: 'MyFitnessPal',
    custom: 'Custom API'
};

// Set today's date as default
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('metricDate').value = today;
});

function handleManualEntry(event) {
    event.preventDefault();

    // Get form values
    const category = document.getElementById('metricCategory').value;
    const name = document.getElementById('metricName').value;
    const value = document.getElementById('metricValue').value;
    const date = document.getElementById('metricDate').value;
    const notes = document.getElementById('metricNotes').value;

    console.log('Manual Entry:', { category, name, value, date, notes });

    // justin
    fetch('/addSourceData', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'category': category,
            'name': name,
            'value': value,
            'date': date,
            'notes': notes,
        })
    })

    // Show success message
    const alert = document.getElementById('manualEntryAlert');
    alert.classList.add('show');

    // Reset form
    document.getElementById('manualEntryForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('metricDate').value = today;

    // Hide success message after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(source) {
    currentSource = source;
    const modal = document.getElementById('configModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = `Configure ${sourceNames[source]}`;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('configModal');
    modal.classList.remove('active');
    document.getElementById('sourceForm').reset();
}

function handleSubmit(event) {
    event.preventDefault();

    // Show success message
    const alert = document.getElementById('successAlert');
    alert.classList.add('show');

    // Close modal
    closeModal();

    // Hide success message after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modal when clicking outside
document.getElementById('configModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});