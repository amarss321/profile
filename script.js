let map, marker;

function showSection(section, event) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));

    // Show the selected section
    document.getElementById(section).classList.remove('hidden');

    // Change the section title
    document.getElementById('section-title').innerText = section.charAt(0).toUpperCase() + section.slice(1);

    // Update active menu
    document.querySelectorAll('.menu li').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}

function logoutUser() {
    alert("Logging out...");
    // Redirect or clear session (if needed)
}

function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        alert("Account deleted.");
        // Add logic to delete the account
    }
}

function resetPassword() {
    alert("Password reset link has been sent to your email.");
    // Add logic to send a password reset link
}

function submitEmail() {
    const email = document.getElementById('email').value;
    alert(`Email submitted: ${email}`);
    // Add logic to submit the email
}

function autofillLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Use a geocoding API to convert lat/lon to address details
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('addressDetails').value = data.display_name;
            document.getElementById('townCity').value = data.address.city || data.address.town || data.address.village;
            document.getElementById('state').value = data.address.state;
            document.getElementById('pincode').value = data.address.postcode;

            // Show the map modal
            openMapModal();

            // Initialize the map
            if (!map) {
                map = L.map('map').setView([lat, lon], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                marker = L.marker([lat, lon], { draggable: true }).addTo(map)
                    .bindPopup('Drag me to your location')
                    .openPopup();
            } else {
                map.setView([lat, lon], 13);
                marker.setLatLng([lat, lon]);
            }

            marker.on('dragend', function (e) {
                const newLatLng = marker.getLatLng();
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLatLng.lat}&lon=${newLatLng.lng}`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('addressDetails').value = data.display_name;
                        document.getElementById('townCity').value = data.address.city || data.address.town || data.address.village;
                        document.getElementById('state').value = data.address.state;
                        document.getElementById('pincode').value = data.address.postcode;
                    })
                    .catch(error => {
                        console.error('Error fetching location data:', error);
                        alert('Error fetching location data.');
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            alert('Error fetching location data.');
        });
}

function chooseLocation() {
    const latLng = marker.getLatLng();
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latLng.lat}&lon=${latLng.lng}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('addressDetails').value = data.display_name;
            document.getElementById('townCity').value = data.address.city || data.address.town || data.address.village;
            document.getElementById('state').value = data.address.state;
            document.getElementById('pincode').value = data.address.postcode;
            closeMapModal();
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            alert('Error fetching location data.');
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function makeModalDraggable() {
    const modalHeader = document.querySelector('.modal-header.draggable');
    const modal = document.querySelector('.modal-content');
    let isDragging = false;
    let startY, initialY;

    modalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        initialY = modal.offsetTop;
        document.body.style.cursor = 'move';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dy = e.clientY - startY;
            modal.style.top = `${initialY + dy}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
}

document.addEventListener('DOMContentLoaded', makeModalDraggable);

function addLocation() {
    document.getElementById('addLocationModal').classList.remove('hidden');
    document.getElementById('addLocationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addLocationModal').classList.add('hidden');
    document.getElementById('addLocationModal').style.display = 'none';
}

function openMapModal() {
    document.getElementById('mapModal').classList.remove('hidden');
    document.getElementById('mapModal').style.display = 'block';
    initializeMap();
}

function closeMapModal() {
    document.getElementById('mapModal').classList.add('hidden');
    document.getElementById('mapModal').style.display = 'none';
}

function saveLocation() {
    const fullName = document.getElementById('fullName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const pincode = document.getElementById('pincode').value;
    const addressDetails = document.getElementById('addressDetails').value;
    const townCity = document.getElementById('townCity').value;
    const state = document.getElementById('state').value;
    const defaultAddress = document.getElementById('defaultAddress').checked;
    const deliveryInstructions = document.getElementById('deliveryInstructions').value;

    if (fullName && mobileNumber && pincode && addressDetails && townCity && state) {
        alert(`Location saved:
        Full Name: ${fullName}
        Mobile Number: ${mobileNumber}
        Pincode: ${pincode}
        Address Details: ${addressDetails}
        Town/City: ${townCity}
        State: ${state}
        Default Address: ${defaultAddress}
        Delivery Instructions: ${deliveryInstructions}`);
        // Add logic to save the location
        closeModal();
    } else {
        alert('Please fill in all required fields.');
    }
}
