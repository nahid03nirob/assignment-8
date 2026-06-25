let animals = [];

async function loadAnimals() {
  try {
    const response = await fetch('src/data/animals.json');
    animals = await response.json();
  } catch (error) {
    console.warn('Falling back to built-in animal data', error);
    animals = [
      { id: 1, name: 'Deshi Shahi Cow', type: 'Cow', breed: 'Local Deshi', price: 120000, weight: 280, age: 3, location: 'Bogura', description: 'Healthy deshi cow suitable for Qurbani. Well fed with natural fodder and calm in nature.', image: 'src/assets/images/cow.jpg', category: 'Large Animal' },
      { id: 2, name: 'Jamuna Goat', type: 'Goat', breed: 'Black Bengal', price: 18000, weight: 38, age: 2, location: 'Rajshahi', description: 'A strong and lively goat with fine meat quality and a calm disposition.', image: 'src/assets/images/goat.jpg', category: 'Small Animal' },
      { id: 3, name: 'Golden Bull', type: 'Cow', breed: 'Sahiwal', price: 215000, weight: 320, age: 4, location: 'Pabna', description: 'Premium quality bull known for strong frame and healthy growth.', image: 'src/assets/images/big-camel.jpg', category: 'Large Animal' },
      { id: 4, name: 'Hill Goat', type: 'Goat', breed: 'Boer Cross', price: 24000, weight: 45, age: 2, location: 'Sylhet', description: 'A muscular and hardy goat with a neat body and fast growth.', image: 'src/assets/images/goat-2.jpg', category: 'Small Animal' },
      { id: 5, name: 'Meadow Cow', type: 'Cow', breed: 'Crossbred', price: 158000, weight: 295, age: 3, location: 'Rangpur', description: 'Gentle and well-maintained cow with excellent health and calm behavior.', image: 'src/assets/images/sheep.jpg', category: 'Large Animal' },
      { id: 6, name: 'White Star Goat', type: 'Goat', breed: 'Jamnapari', price: 29000, weight: 50, age: 3, location: 'Barisal', description: 'A graceful premium goat with excellent appearance and great meat quality.', image: 'src/assets/images/camel-1.jpg', category: 'Small Animal' }
    ];
  }
}

const AUTH_KEYS = {
  users: 'qurbani-users',
  session: 'qurbani-session'
};

const demoUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@qurbanihat.com',
  password: 'demo1234',
  photo: 'src/assets/images/cow.jpg'
};

const state = { route: 'home', sort: 'default', loading: true, user: null, selectedAnimalId: null };
const app = document.getElementById('app');
const toastBox = document.getElementById('toast');

function getStoredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(AUTH_KEYS.users) || 'null');
    if (Array.isArray(users) && users.length) return users;
  } catch (error) {
    console.warn('Unable to parse stored users', error);
  }

  localStorage.setItem(AUTH_KEYS.users, JSON.stringify([demoUser]));
  return [demoUser];
}

function saveStoredUsers(users) {
  localStorage.setItem(AUTH_KEYS.users, JSON.stringify(users));
}

function setSession(user) {
  state.user = user;
  localStorage.setItem(AUTH_KEYS.session, JSON.stringify(user));
}

function clearSession() {
  state.user = null;
  localStorage.removeItem(AUTH_KEYS.session);
}

function getSessionUser() {
  try {
    const stored = JSON.parse(localStorage.getItem(AUTH_KEYS.session) || 'null');
    return stored ? stored : null;
  } catch (error) {
    console.warn('Unable to parse session', error);
    return null;
  }
}

function findUserByEmail(email) {
  return getStoredUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function init() {
  state.user = getSessionUser();
  await loadAnimals();
  setTimeout(() => {
    state.loading = false;
    routeFromHash();
  }, 400);
  window.addEventListener('hashchange', routeFromHash);
}

function routeFromHash() {
  const hash = window.location.hash.replace('#', '').split('/');
  const [base, id] = hash;
  if (base === 'animals') state.route = 'animals';
  else if (base === 'login') state.route = 'login';
  else if (base === 'register') state.route = 'register';
  else if (base === 'my-profile') state.route = 'profile';
  else if (base === 'update-profile') state.route = 'update';
  else if (base === 'details' && id) { state.route = 'details'; state.selectedAnimalId = Number(id); }
  else if (base === 'not-found') state.route = 'not-found';
  else { state.route = 'home'; }

  if ((state.route === 'details' || state.route === 'profile' || state.route === 'update') && !state.user) {
    state.route = 'login';
    showToast('Please log in to continue.');
  }

  render();
}

function navigate(route) {
  window.location.hash = route;
}

function render() {
  if (state.loading) {
    app.innerHTML = '<div class="container"><div class="card panel"><h2>Loading QurbaniHat...</h2><p>Preparing the marketplace for you.</p></div></div>';
    return;
  }

  if (state.route === 'animals') {
    app.innerHTML = renderAnimalsPage();
  } else if (state.route === 'login') {
    app.innerHTML = renderLoginPage();
  } else if (state.route === 'register') {
    app.innerHTML = renderRegisterPage();
  } else if (state.route === 'profile') {
    app.innerHTML = renderProfilePage();
  } else if (state.route === 'update') {
    app.innerHTML = renderUpdatePage();
  } else if (state.route === 'details') {
    app.innerHTML = renderDetailsPage();
  } else if (state.route === 'not-found') {
    app.innerHTML = renderNotFoundPage();
  } else {
    app.innerHTML = renderHomePage();
  }

  bindEvents();
}

function renderShell(content) {
  return `
    <div class="navbar">
      <div class="nav-inner">
        <a href="#/" class="brand"><span class="brand-badge">🐄</span> QurbaniHat</a>
        <div class="nav-links">
          <a class="nav-link ${state.route === 'home' ? 'active' : ''}" href="#">Home</a>
          <a class="nav-link ${state.route === 'animals' ? 'active' : ''}" href="#animals">All Animals</a>
          ${state.user ? `<span class="user-badge">Hi, ${state.user.name.split(' ')[0]}</span><a class="nav-link ${state.route === 'profile' ? 'active' : ''}" href="#my-profile">My Profile</a><button class="btn btn-secondary" id="logoutBtn">Logout</button>` : `<a class="nav-link ${state.route === 'login' ? 'active' : ''}" href="#login">Login</a><a class="nav-link ${state.route === 'register' ? 'active' : ''}" href="#register">Register</a>`}
        </div>
      </div>
    </div>
    <div class="container">${content}</div>
    <footer class="footer">
      <div class="footer-inner">
        <div><h3>QurbaniHat</h3><p class="muted">A premium marketplace for healthy livestock booking for Eid-ul-Adha.</p></div>
        <div><h3>Contact</h3><p class="muted">+880 1712 345678<br/>support@qurbanihat.com</p></div>
        <div><h3>Follow us</h3><p class="muted">Facebook • Instagram • WhatsApp</p></div>
      </div>
    </footer>
  `;
}

function renderHomePage() {
  const featured = animals.slice(0, 4);
  return renderShell(`
    <section class="hero">
      <div class="hero-card">
        <div class="pill">Modern livestock marketplace</div>
        <h1>Book premium animals for your Qurbani with confidence.</h1>
        <p>Explore healthy cows and goats, compare quality and price, and reserve your preferred animal in minutes.</p>
        <div class="nav-links" style="margin-top: 16px;">
          <a class="btn btn-primary" href="#animals">Browse Animals</a>
          ${state.user ? '<a class="btn btn-secondary" href="#my-profile">Go to Profile</a>' : '<a class="btn btn-secondary" href="#register">Create Account</a>'}
        </div>
        <div class="stats-grid">
          <div class="stat"><strong>Verified listings</strong><p>Each animal is reviewed for health and quality.</p></div>
          <div class="stat"><strong>Best prices</strong><p>Competitive rates across local breeders.</p></div>
          <div class="stat"><strong>Easy booking</strong><p>Reserve your selection in minutes.</p></div>
        </div>
      </div>
      <img class="hero-image" src="src/assets/images/cow.jpg" alt="Healthy livestock" />
    </section>
    <section class="section">
      <div class="section-title"><h2>Featured animals</h2><a class="link-btn" href="#animals">View all</a></div>
      <div class="animals-grid">
        ${featured.map(animal => `
          <div class="card animal-card">
            <img src="${animal.image}" alt="${animal.name}" />
            <h3>${animal.name}</h3>
            <div class="animal-meta">${animal.breed} • ${animal.location}</div>
            <div class="animal-footer">
              <span class="price">৳${animal.price.toLocaleString()}</span>
              <a class="btn btn-secondary" href="#details/${animal.id}">Details</a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
    <section class="section two-col">
      <div class="card panel">
        <h3>Qurbani tips</h3>
        <ul>
          <li>Choose a healthy animal with clear eyes and calm behavior.</li>
          <li>Check the age, weight, and body condition before booking.</li>
          <li>Confirm the vaccination history and origin.</li>
        </ul>
      </div>
      <div class="card panel">
        <h3>Top breeds</h3>
        <div class="nav-links" style="justify-content:flex-start; margin-top: 8px;">
          <span class="btn btn-secondary">Deshi Shahi Cow</span>
          <span class="btn btn-secondary">Sahiwal</span>
          <span class="btn btn-secondary">Black Bengal Goat</span>
        </div>
      </div>
    </section>
  `);
}

function renderAnimalsPage() {
  const sorted = [...animals].sort((a, b) => state.sort === 'low' ? a.price - b.price : state.sort === 'high' ? b.price - a.price : 0);
  return renderShell(`
    <section class="section">
      <div class="section-title"><h2>All animals</h2><select id="sortSelect" class="field" style="padding: 8px 10px; border-radius: 10px;">
        <option value="default" ${state.sort === 'default' ? 'selected' : ''}>Default</option>
        <option value="low" ${state.sort === 'low' ? 'selected' : ''}>Price: Low to High</option>
        <option value="high" ${state.sort === 'high' ? 'selected' : ''}>Price: High to Low</option>
      </select></div>
      <div class="animals-grid">
        ${sorted.map(animal => `
          <div class="card animal-card">
            <img src="${animal.image}" alt="${animal.name}" />
            <h3>${animal.name}</h3>
            <div class="animal-meta">${animal.breed} • ${animal.location}</div>
            <p>${animal.description.slice(0, 90)}...</p>
            <div class="animal-footer">
              <span class="price">৳${animal.price.toLocaleString()}</span>
              <a class="btn btn-primary" href="#details/${animal.id}">Details</a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `);
}

function renderLoginPage() {
  return renderShell(`
    <section class="section">
      <div class="form-card panel auth-card" style="max-width: 600px; margin: 20px auto;">
        <h2>Welcome back</h2>
        <p>Sign in to reserve animals and manage your profile.</p>
        <div class="auth-hint">Demo account: demo@qurbanihat.com / demo1234</div>
        <form id="loginForm" class="form-grid" style="margin-top: 16px;">
          <div class="field"><label>Email</label><input name="email" type="email" autocomplete="email" required /></div>
          <div class="field"><label>Password</label><input name="password" type="password" autocomplete="current-password" required /></div>
          <button class="btn btn-primary">Login</button>
        </form>
        <button class="btn btn-secondary" id="googleLoginBtn" style="margin-top: 10px;">Continue with Google</button>
        <p style="margin-top: 12px;">New here? <a class="link-btn" href="#register">Create an account</a></p>
      </div>
    </section>
  `);
}

function renderRegisterPage() {
  return renderShell(`
    <section class="section">
      <div class="form-card panel auth-card" style="max-width: 600px; margin: 20px auto;">
        <h2>Create account</h2>
        <p>Register securely and start booking your preferred livestock.</p>
        <form id="registerForm" class="form-grid" style="margin-top: 16px;">
          <div class="field"><label>Name</label><input name="name" required /></div>
          <div class="field"><label>Email</label><input name="email" type="email" autocomplete="email" required /></div>
          <div class="field"><label>Photo URL</label><input name="photo" placeholder="https://example.com/photo.jpg" /></div>
          <div class="field"><label>Password</label><input name="password" type="password" autocomplete="new-password" required /></div>
          <div class="field"><label>Confirm Password</label><input name="confirmPassword" type="password" autocomplete="new-password" required /></div>
          <button class="btn btn-primary">Register</button>
        </form>
        <p style="margin-top: 12px;">Already have an account? <a class="link-btn" href="#login">Login</a></p>
      </div>
    </section>
  `);
}

function renderProfilePage() {
  const user = state.user || {};
  return renderShell(`
    <section class="section">
      <div class="profile-card">
        <div class="profile-top">
          <div style="display:flex; align-items:center; gap: 14px;">
            <img class="avatar" src="${user.photo || 'src/assets/images/cow.jpg'}" alt="${user.name || 'Profile'}" />
            <div>
              <h2>${user.name || 'My Profile'}</h2>
              <p>${user.email || 'No email available'}</p>
            </div>
          </div>
          <a class="btn btn-primary" href="#update-profile">Update Information</a>
        </div>
        <div class="card panel" style="margin-top: 16px;">
          <h3>Profile details</h3>
          <p>Keep your account details fresh so booking and updates stay simple.</p>
        </div>
      </div>
    </section>
  `);
}

function renderUpdatePage() {
  const user = state.user || { name: '', email: '', photo: '', password: '' };
  return renderShell(`
    <section class="section">
      <div class="form-card panel" style="max-width: 650px; margin: 20px auto;">
        <h2>Update Information</h2>
        <p>Refresh your profile details and photo link.</p>
        <form id="updateForm" class="form-grid" style="margin-top: 16px;">
          <div class="field"><label>Name</label><input name="name" value="${user.name || ''}" required /></div>
          <div class="field"><label>Email</label><input name="email" type="email" value="${user.email || ''}" required /></div>
          <div class="field"><label>Photo URL</label><input name="photo" value="${user.photo || ''}" /></div>
          <div class="field"><label>Password</label><input name="password" type="password" value="${user.password || ''}" required /></div>
          <button class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </section>
  `);
}

function renderDetailsPage() {
  const animal = animals.find(item => item.id === state.selectedAnimalId);
  if (!animal) return renderShell('<div class="empty">Animal not found.</div>');
  return renderShell(`
    <section class="section two-col">
      <div class="card panel">
        <img class="detail-image" src="${animal.image}" alt="${animal.name}" />
        <h2>${animal.name}</h2>
        <p>${animal.description}</p>
        <div class="stats-grid" style="margin-top: 12px;">
          <div class="stat"><strong>Price</strong><p>৳${animal.price.toLocaleString()}</p></div>
          <div class="stat"><strong>Weight</strong><p>${animal.weight} kg</p></div>
          <div class="stat"><strong>Age</strong><p>${animal.age} years</p></div>
        </div>
      </div>
      <div class="card panel">
        <h3>Booking form</h3>
        <p>${state.user ? 'Reserve this animal now.' : 'Login is required before booking.'}</p>
        <form id="bookingForm" class="form-grid" style="margin-top: 14px;">
          <div class="field"><label>Your Name</label><input name="name" required /></div>
          <div class="field"><label>Email</label><input name="email" type="email" required /></div>
          <div class="field"><label>Phone</label><input name="phone" required /></div>
          <div class="field"><label>Address</label><textarea name="address" required></textarea></div>
          <button class="btn btn-primary">Book Now</button>
        </form>
      </div>
    </section>
  `);
}

function renderNotFoundPage() {
  return renderShell(`
    <section class="section">
      <div class="card panel" style="text-align:center;">
        <h2>404 - Page not found</h2>
        <p>The page you are looking for is unavailable.</p>
        <a class="btn btn-primary" href="#">Back home</a>
      </div>
    </section>
  `);
}

function bindEvents() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    clearSession();
    showToast('You logged out');
    navigate('');
    render();
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', (event) => { state.sort = event.target.value; render(); });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!validateEmail(email)) {
      showToast('Please enter a valid email address.');
      return;
    }

    const user = findUserByEmail(email);
    if (user && user.password === password) {
      setSession(user);
      showToast(`Welcome back, ${user.name}!`);
      navigate('');
    } else {
      showToast('Invalid email or password');
    }
  });

  const googleLoginBtn = document.getElementById('googleLoginBtn');
  if (googleLoginBtn) googleLoginBtn.addEventListener('click', () => {
    const googleUser = { id: Date.now(), name: 'Google User', email: 'google.user@example.com', photo: 'src/assets/images/cow.jpg', password: 'google' };
    const users = getStoredUsers();
    if (!users.some(user => user.email === googleUser.email)) {
      users.push(googleUser);
      saveStoredUsers(users);
    }
    setSession(googleUser);
    showToast('Signed in with Google');
    navigate('');
  });

  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const photo = String(formData.get('photo') || '').trim();
    const password = String(formData.get('password') || '').trim();
    const confirmPassword = String(formData.get('confirmPassword') || '').trim();

    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      showToast('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match.');
      return;
    }

    const users = getStoredUsers();
    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      showToast('An account with this email already exists.');
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      photo,
      password
    };

    users.push(user);
    saveStoredUsers(users);
    setSession(user);
    showToast('Registration successful');
    navigate('');
  });

  const updateForm = document.getElementById('updateForm');
  if (updateForm) updateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(updateForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const photo = String(formData.get('photo') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!name || !email || !password) {
      showToast('Please fill in all required fields.');
      return;
    }

    const users = getStoredUsers();
    const duplicate = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.id !== state.user.id);
    if (duplicate) {
      showToast('That email is already in use.');
      return;
    }

    const updated = {
      ...state.user,
      name,
      email,
      photo,
      password
    };

    const updatedUsers = users.map(user => user.id === state.user.id ? updated : user);
    saveStoredUsers(updatedUsers);
    setSession(updated);
    showToast('Profile updated');
    navigate('my-profile');
  });

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!state.user) {
      showToast('Please login before booking.');
      navigate('login');
      return;
    }
    bookingForm.reset();
    showToast('Booking request sent successfully');
  });
}

function showToast(message) {
  toastBox.innerHTML = `<div class="toast">${message}</div>`;
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => { toastBox.innerHTML = ''; }, 2500);
}

init();
