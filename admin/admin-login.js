document.addEventListener('DOMContentLoaded', function() {
  // Credenciales de administrador (en un entorno real, esto se verificaría en el servidor)
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Verificar si ya hay una sesión activa
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (isLoggedIn === 'true') {
    window.location.href = 'dashboard.html';
  }

  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validar credenciales
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Guardar sesión en localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUsername', username);
      
      // Redirigir al dashboard
      window.location.href = 'dashboard.html';
    } else {
      loginError.textContent = 'Usuario o contraseña incorrectos';
    }
  });
});