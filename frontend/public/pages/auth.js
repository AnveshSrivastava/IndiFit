let isLogin = true;

const formTitle = document.getElementById('form-title');
const toggleAuthMode = document.getElementById('toggle-auth-mode');
const signupFields = document.getElementById('signup-fields');
const signupPasswordFields = document.getElementById('signup-password-fields');
const loginFields = document.getElementById('login-fields');
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

// Validation for signup
function validateSignupForm(name, age, gender, email, phone, password, confirmPassword) {
  if (!name || !age || !gender || !email || !phone || !password || !confirmPassword) {
    alert('Please fill in all required fields.');
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

  return true;
}

// Toggle between login and signup form
toggleAuthMode.addEventListener('click', () => {
  isLogin = !isLogin;

  // Update form title and button text
  formTitle.textContent = isLogin ? 'User Login' : 'User Signup';
  toggleAuthMode.textContent = isLogin
    ? "Don't have an account? Sign up"
    : 'Already have an account? Log in';

  // Toggle visibility of login and signup-specific fields
  signupFields.style.display = isLogin ? 'none' : 'block';
  signupPasswordFields.style.display = isLogin ? 'none' : 'block';
  loginFields.style.display = isLogin ? 'block' : 'none';
});

// Handle form submission
authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name')?.value;
  const age = document.getElementById('age')?.value;
  const gender = document.getElementById('gender')?.value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone')?.value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password')?.value;

  let isValid = false;

  if (isLogin) {
    isValid = validateLoginForm(email, password);
  } else {
    isValid = validateSignupForm(name, age, gender, email, phone, password, confirmPassword);
  }

  if (!isValid) return;

  const userInfo = isLogin
    ? { email, password }
    : { name, age, gender, email, phone, password };

  // Disable submit button during request
  submitButton.disabled = true;

  try {
    const response = await fetch(
      `http://localhost:3001/Student/${isLogin ? 'login' : 'signup'}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(isLogin ? 'Login Successful' : 'Signup Successful');
      if (isLogin) window.location.href = '/studentdashboard';
    } else {
      alert(`Error: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    // Re-enable submit button after request
    submitButton.disabled = false;
  }
});
