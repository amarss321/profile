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
    // Mock autofill functionality
    const locationList = document.getElementById('location-list');
    const li = document.createElement('li');
    li.textContent = '789 New Street, City, 560003';
    locationList.appendChild(li);
    alert('Autofilled location successfully!');
}

function addLocation() {
    document.getElementById('addLocationModal').classList.remove('hidden');
    document.getElementById('addLocationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addLocationModal').classList.add('hidden');
    document.getElementById('addLocationModal').style.display = 'none';
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
