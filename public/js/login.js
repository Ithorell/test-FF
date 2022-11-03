const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('.username-login');
  const password = document.querySelector('.password-login');

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

document.querySelector('.login-form');
document.addEventListener('click', loginFormHandler);
