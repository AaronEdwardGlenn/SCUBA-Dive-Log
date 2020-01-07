let data = document.getElementById('data');

let diveLog = () => {

  let loginForm = document.createElement('loginForm');

  loginForm.innerHTML = `
   <fieldset>
    <legend>Signup</legend>
    <input name="email" type="text" placeholder="email">
    <input name="password" type="text" placeholder="password">
    </fieldset>
    <button type="submit">Signup</button>
`;

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      email: formData.get('email'), 
      password: formData.get('password')
    };

    console.log('form data on subit', user);

    return fetch('http://localhost:7890/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {        
        console.log('json from sign up res', json);
        // window.location.reload();
      });
  });

  data.appendChild(loginForm);
};

let currentUser = user => {
  let header = document.createElement('h1');
  header.textContent = user.email;

  data.appendChild(header);
};

// fetch('http://localhost:7890/api/v1/auth/verify', {
//   credentials: 'include'
// })
//   .then(res => res.json())
//   .then(user => {
//     if(user._id) {
//       currentUser(user); 
//     } else {
//     }
//   });
  
diveLog();


