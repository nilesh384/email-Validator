// script.js

document.getElementById('emailForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const messageElement = document.getElementById('message');
    const emailValue = emailInput.value.trim();

    if (!validateEmailFormat(emailValue)) {
        messageElement.textContent = 'Invalid email format. Please enter a valid email.';
        messageElement.style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`https://api.email-validator.net/api/verify?EmailAddress=${encodeURIComponent(emailValue)}&APIKey=YOUR_API_KEY`);
        const data = await response.json();

        if (data.status === 'valid') {
            messageElement.textContent = 'Valid email address!';
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = 'Invalid email address or domain not found.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error validating email:', error);
        messageElement.textContent = 'An error occurred while validating the email. Please try again.';
        messageElement.style.color = 'red';
    }
});

function validateEmailFormat(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
