// Funcionalidad para el formulario de newsletter
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert('¡Gracias por suscribirte a nuestro newsletter!');
        emailInput.value = '';
      } else {
        alert('Por favor, ingresa un correo electrónico válido.');
      }
    });
  }

  // Animación para las tarjetas de especialidades
  const specialtyCards = document.querySelectorAll('.specialty-card');
  specialtyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const image = this.querySelector('.specialty-image');
      if (image) {
        image.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const image = this.querySelector('.specialty-image');
      if (image) {
        image.style.transform = 'scale(1)';
      }
    });
  });

  // Funcionalidad para el formulario de contacto
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = this.querySelector('#name');
      const emailInput = this.querySelector('#email');
      const messageInput = this.querySelector('#message');
      
      if (nameInput.value && emailInput.value && messageInput.value) {
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
      } else {
        alert('Por favor, completa todos los campos del formulario.');
      }
    });
  }
});