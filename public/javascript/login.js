// log user in
async function loginFormHandler(event) {
  event.preventDefault();

  // get username from webpage
  const username = document.querySelector('#username-login').value.trim();
  // get password for webpage
  const password = document.querySelector('#password-login').value.trim();

  // if both fields are truthy
  if (username && password) {
    // use await for api call
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);