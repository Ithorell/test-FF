const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById('username-login').value.trim();
  const password = document.getElementById('password-login').value.trim();
  console.log(email, password);
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to log in');
    }
  }
};

const button = document.getElementById('login-form');
button.addEventListener('click', loginFormHandler);
