document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos del hero
  loadHeroData()

  // Cargar productos destacados
  loadFeaturedProducts()

  // Cargar especialidades
  loadSpecialties()

  // Cargar anuncios
  loadAnnouncements()
})

// Cargar datos del hero
function loadHeroData() {
  const heroSection = document.getElementById("hero-section")
  if (!heroSection) return

  const heroData = JSON.parse(localStorage.getItem("heroData"))
  if (!heroData) return

  // Actualizar título y subtítulo
  const heroTitle = heroSection.querySelector(".hero-title")
  const heroSubtitle = heroSection.querySelector(".hero-subtitle")

  if (heroTitle) heroTitle.textContent = heroData.title
  if (heroSubtitle) heroSubtitle.textContent = heroData.subtitle

  // Actualizar imagen
  const heroImage = document.getElementById("hero-main-image")
  if (heroImage && heroData.image) {
    heroImage.src = heroData.image
  }
}

// Cargar productos destacados
function loadFeaturedProducts() {
  const productsGrid = document.querySelector(".products-grid")
  if (!productsGrid) return

  const products = JSON.parse(localStorage.getItem("products")) || []
  const featuredProducts = products.filter((product) => product.featured)

  if (featuredProducts.length === 0) return

  // Limpiar grid
  productsGrid.innerHTML = ""

  // Añadir productos destacados
  featuredProducts.slice(0, 3).forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"

    productCard.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
    `

    productsGrid.appendChild(productCard)
  })
}

// Cargar especialidades
function loadSpecialties() {
  const specialtiesGrid = document.querySelector(".specialties-grid")
  if (!specialtiesGrid) return

  const specialties = JSON.parse(localStorage.getItem("specialties")) || []

  if (specialties.length === 0) return

  // Limpiar grid
  specialtiesGrid.innerHTML = ""

  // Añadir especialidades
  specialties.forEach((specialty) => {
    const specialtyCard = document.createElement("div")
    specialtyCard.className = "specialty-card"

    specialtyCard.innerHTML = `
      <div class="specialty-image-container">
        <img src="${specialty.image}" alt="${specialty.title}" class="specialty-image">
        <div class="specialty-overlay">
          <h3 class="specialty-title">${specialty.title}</h3>
        </div>
      </div>
    `

    specialtiesGrid.appendChild(specialtyCard)
  })
}

// Cargar anuncios
function loadAnnouncements() {
  const announcementsContainer = document.querySelector(".announcements-container")
  if (!announcementsContainer) return

  const announcements = JSON.parse(localStorage.getItem("announcements")) || []
  const activeAnnouncements = announcements.filter((announcement) => announcement.active)

  if (activeAnnouncements.length === 0) {
    announcementsContainer.style.display = "none"
    return
  }

  // Mostrar contenedor
  announcementsContainer.style.display = "block"

  // Limpiar contenedor
  announcementsContainer.innerHTML = ""

  // Añadir anuncios
  activeAnnouncements.forEach((announcement) => {
    const announcementCard = document.createElement("div")
    announcementCard.className = `announcement-card ${announcement.type}`

    announcementCard.innerHTML = `
      <div class="announcement-header">
        <h3>${announcement.title}</h3>
        <span class="announcement-type ${announcement.type}">${announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}</span>
      </div>
      <div class="announcement-content">
        <p>${announcement.content}</p>
      </div>
    `

    announcementsContainer.appendChild(announcementCard)
  })
}

