const authForm = document.getElementById('auth-form');
const submitButton = document.getElementById('submit-btn');

// Email format validator
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number length validator
function isValidPhone(phone) {
  return phone.length === 10 && /^\d+$/.test(phone);
}

// Validation for signup
function validateSignupForm(name, age, gender, email, phone, password, confirmPassword) {
  if (!name || !age || !gender || !email || !phone || !password || !confirmPassword) {
    alert('Please fill in all required fields.');
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert('Name should only contain letters and spaces.');
    return false;
  }

  if (age <= 0 || age > 150 || !/^\d+$/.test(age)) {
    alert('Please enter a valid age (greater than 0 and less than 150).');
    return false;
  }

  if (!['male', 'female', 'others'].includes(gender.toLowerCase())) {
    alert('Please select a valid gender.');
    return false;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (!isValidPhone(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return false;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters.');
    return false;
  }

  return true;
}

// Handle signup form submission
authForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('signup-name').value;
  const age = document.getElementById('signup-age').value;
  const gender = document.getElementById('signup-gender').value;
  const email = document.getElementById('signup-email').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (!validateSignupForm(name, age, gender, email, phone, password, confirmPassword)) return;

  const userInfo = { name, age, gender, email, phone, password };

  // Disable submit button during request
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';  // Change button text to indicate submission

  try {
    const response = await fetch('http://localhost:3000/User/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Signup Successful');
      window.location.href = 'login.html'; // Redirect to login page after signup
    } else {
      alert(`Error: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Signup';  // Reset button text after submission
  }
});
