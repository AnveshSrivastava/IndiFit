const authForm = document.getElementById('auth-form');
const submitButton = document.getElementById('submit-btn');

// Email format validator
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validation for login
function validateLoginForm(email, password) {
  if (!email || !password) {
    alert('Please fill in your email and password.');
    return false;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  return true;
}

// Handle login form submission
authForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Updated IDs to match your HTML
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!validateLoginForm(email, password)) return;

  const userInfo = { email, password };

  // Disable submit button during request
  submitButton.disabled = true;

  try {
    const response = await fetch('http://localhost:3000/User/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login Successful');
      window.location.href = 'userPages/dashboard.html';
    } else {
      alert(`Error: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    submitButton.disabled = false;
  }
});
