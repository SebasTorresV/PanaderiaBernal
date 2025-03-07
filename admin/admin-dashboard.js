document.addEventListener("DOMContentLoaded", () => {
  // Verificar si hay una sesión activa
  const isLoggedIn = localStorage.getItem("adminLoggedIn")
  if (isLoggedIn !== "true") {
    window.location.href = "login.html"
    return
  }

  // Mostrar nombre de usuario
  const adminUsername = localStorage.getItem("adminUsername")
  document.getElementById("adminUsername").textContent = adminUsername || "Admin"

  // Inicializar datos si no existen
  initializeData()

  // Cargar datos del dashboard
  loadDashboardData()

  // Cargar datos de productos
  loadProducts()

  // Cargar datos de especialidades
  loadSpecialties()

  // Cargar datos del hero
  loadHeroData()

  // Cargar datos de anuncios
  loadAnnouncements()

  // Navegación entre secciones
  setupNavigation()

  // Configurar eventos para productos
  setupProductEvents()

  // Configurar eventos para especialidades
  setupSpecialtyEvents()

  // Configurar eventos para anuncios
  setupAnnouncementEvents()

  // Configurar evento para el formulario del hero
  setupHeroForm()

  // Configurar evento de cierre de sesión
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminUsername")
    window.location.href = "login.html"
  })
})

// Inicializar datos si no existen
function initializeData() {
  // Inicializar productos
  if (!localStorage.getItem("products")) {
    const defaultProducts = [
      {
        id: "1",
        name: "Pan Integral",
        description: "Pan integral fresco, elaborado con harina de trigo integral.",
        price: 35.0,
        image: "/images/productos/temporada-1.jpg",
        featured: true,
      },
      {
        id: "2",
        name: "Baguette Tradicional",
        description: "Baguette crujiente por fuera, suave por dentro.",
        price: 25.0,
        image: "/images/productos/temporada-2.jpg",
        featured: true,
      },
      {
        id: "3",
        name: "Croissants (4 pzas)",
        description: "Croissants de mantequilla, perfectamente hojaldrados.",
        price: 45.0,
        image: "/images/productos/temporada-3.jpg",
        featured: true,
      },
    ]
    localStorage.setItem("products", JSON.stringify(defaultProducts))
  }

  // Inicializar especialidades
  if (!localStorage.getItem("specialties")) {
    const defaultSpecialties = [
      {
        id: "1",
        title: "PASTELERÍA",
        image: "/images/especialidades/pasteleria.jpg",
      },
      {
        id: "2",
        title: "PANADERÍA",
        image: "/images/especialidades/panaderia.jpg",
      },
      {
        id: "3",
        title: "REPOSTERÍA",
        image: "/images/especialidades/reposteria.jpg",
      },
      {
        id: "4",
        title: "CAFETERÍA",
        image: "/images/especialidades/cafeteria.jpg",
      },
      {
        id: "5",
        title: "BOCADITOS",
        image: "/images/especialidades/bocaditos.jpg",
      },
      {
        id: "6",
        title: "POSTRES",
        image: "/images/especialidades/postres.jpg",
      },
    ]
    localStorage.setItem("specialties", JSON.stringify(defaultSpecialties))
  }

  // Inicializar datos del hero
  if (!localStorage.getItem("heroData")) {
    const defaultHeroData = {
      title: "Un pedacito de felicidad",
      subtitle: "Pastelería y panadería desde 1954",
      image: "/images/hero/main.jpg",
    }
    localStorage.setItem("heroData", JSON.stringify(defaultHeroData))
  }

  // Inicializar anuncios
  if (!localStorage.getItem("announcements")) {
    const defaultAnnouncements = [
      {
        id: "1",
        title: "Promoción de Verano",
        content: "Disfruta de un 20% de descuento en todos nuestros pasteles durante el mes de julio.",
        type: "promocion",
        active: true,
      },
      {
        id: "2",
        title: "Nuevos Productos",
        content: "Hemos añadido nuevas variedades de pan integral a nuestro catálogo. ¡Ven a probarlas!",
        type: "anuncio",
        active: true,
      },
    ]
    localStorage.setItem("announcements", JSON.stringify(defaultAnnouncements))
  }
}

// Cargar datos del dashboard
function loadDashboardData() {
  const products = JSON.parse(localStorage.getItem("products")) || []
  const specialties = JSON.parse(localStorage.getItem("specialties")) || []
  const announcements = JSON.parse(localStorage.getItem("announcements")) || []
  const activeAnnouncements = announcements.filter((a) => a.active)

  document.getElementById("productCount").textContent = products.length
  document.getElementById("specialtyCount").textContent = specialties.length
  document.getElementById("announcementCount").textContent = activeAnnouncements.length

  // Configurar botones de acciones rápidas
  const actionButtons = document.querySelectorAll(".admin-dashboard-buttons button")
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.getAttribute("data-section")
      showSection(section)

      // Actualizar navegación
      document.querySelectorAll(".admin-nav-link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === section) {
          link.classList.add("active")
        }
      })
    })
  })
}

// Cargar datos de productos
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || []
  const tableBody = document.getElementById("productsTableBody")

  tableBody.innerHTML = ""

  products.forEach((product) => {
    const row = document.createElement("tr")

    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}" class="admin-table-image"></td>
      <td>${product.name}</td>
      <td>${product.description.substring(0, 50)}${product.description.length > 50 ? "..." : ""}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td class="admin-table-actions">
        <button class="admin-action-btn edit" data-id="${product.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="admin-action-btn delete" data-id="${product.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </td>
    `

    tableBody.appendChild(row)
  })
}

// Cargar datos de especialidades
function loadSpecialties() {
  const specialties = JSON.parse(localStorage.getItem("specialties")) || []
  const specialtiesGrid = document.getElementById("specialtiesGrid")

  specialtiesGrid.innerHTML = ""

  specialties.forEach((specialty) => {
    const card = document.createElement("div")
    card.className = "admin-specialty-card"

    card.innerHTML = `
      <img src="${specialty.image}" alt="${specialty.title}" class="admin-specialty-image">
      <div class="admin-specialty-title">${specialty.title}</div>
      <div class="admin-specialty-actions">
        <button class="admin-specialty-action edit" data-id="${specialty.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="admin-specialty-action delete" data-id="${specialty.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    `

    specialtiesGrid.appendChild(card)
  })
}

// Cargar datos del hero
function loadHeroData() {
  const heroData = JSON.parse(localStorage.getItem("heroData")) || {}

  document.getElementById("heroTitle").value = heroData.title || ""
  document.getElementById("heroSubtitle").value = heroData.subtitle || ""

  const heroImagePreview = document.getElementById("heroImagePreview")
  if (heroData.image) {
    heroImagePreview.src = heroData.image
    heroImagePreview.style.display = "block"
  } else {
    heroImagePreview.style.display = "none"
  }
}

// Configurar navegación entre secciones
function setupNavigation() {
  const navLinks = document.querySelectorAll(".admin-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remover clase active de todos los enlaces
      navLinks.forEach((link) => link.classList.remove("active"))

      // Añadir clase active al enlace actual
      this.classList.add("active")

      // Mostrar sección correspondiente
      const section = this.getAttribute("data-section")
      showSection(section)
    })
  })
}

// Mostrar sección específica
function showSection(sectionId) {
  // Ocultar todas las secciones
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Mostrar sección seleccionada
  document.getElementById(`${sectionId}-section`).classList.add("active")

  // Actualizar título de la sección
  document.getElementById("sectionTitle").textContent = document
    .querySelector(`.admin-nav-link[data-section="${sectionId}"]`)
    .textContent.trim()
}

// Configurar eventos para productos
function setupProductEvents() {
  // Abrir modal para añadir producto
  document.getElementById("addProductBtn").addEventListener("click", () => {
    openProductModal()
  })

  // Configurar formulario de producto
  document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault()
    saveProduct()
  })

  // Configurar vista previa de imagen
  document.getElementById("productImage").addEventListener("change", (e) => {
    previewImage(e.target, "productImagePreview")
  })

  // Configurar eventos para botones de editar y eliminar
  document.addEventListener("click", (e) => {
    // Editar producto
    if (e.target.closest(".admin-action-btn.edit")) {
      const productId = e.target.closest(".admin-action-btn.edit").getAttribute("data-id")
      openProductModal(productId)
    }

    // Eliminar producto
    if (e.target.closest(".admin-action-btn.delete")) {
      const productId = e.target.closest(".admin-action-btn.delete").getAttribute("data-id")
      openDeleteModal(productId)
    }
  })

  // Configurar botón de confirmar eliminación
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    deleteProduct()
  })

  // Configurar cierre de modales
  document.querySelectorAll(".admin-modal-close, .admin-modal-cancel").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModals()
    })
  })
}

// Abrir modal para añadir/editar producto
function openProductModal(productId = null) {
  const modal = document.getElementById("productModal")
  const form = document.getElementById("productForm")
  const modalTitle = document.getElementById("productModalTitle")

  // Limpiar formulario
  form.reset()
  document.getElementById("productImagePreview").src = "#"
  document.getElementById("productImagePreview").style.display = "none"

  if (productId) {
    // Editar producto existente
    modalTitle.textContent = "Editar Producto"

    const products = JSON.parse(localStorage.getItem("products")) || []
    const product = products.find((p) => p.id === productId)

    if (product) {
      document.getElementById("productId").value = product.id
      document.getElementById("productName").value = product.name
      document.getElementById("productDescription").value = product.description
      document.getElementById("productPrice").value = product.price
      document.getElementById("productFeatured").checked = product.featured

      if (product.image) {
        document.getElementById("productImagePreview").src = product.image
        document.getElementById("productImagePreview").style.display = "block"
      }
    }
  } else {
    // Añadir nuevo producto
    modalTitle.textContent = "Añadir Producto"
    document.getElementById("productId").value = ""
  }

  // Mostrar modal
  modal.classList.add("active")
}

// Guardar producto
function saveProduct() {
  const productId = document.getElementById("productId").value
  const name = document.getElementById("productName").value
  const description = document.getElementById("productDescription").value
  const price = Number.parseFloat(document.getElementById("productPrice").value)
  const featured = document.getElementById("productFeatured").checked

  // Obtener imagen
  let image = null
  const imageInput = document.getElementById("productImage")
  const imagePreview = document.getElementById("productImagePreview")

  if (imageInput.files && imageInput.files[0]) {
    // En un entorno real, aquí se subiría la imagen al servidor
    // Para este ejemplo, usaremos una URL de datos (base64)
    const reader = new FileReader()
    reader.onload = (e) => {
      image = e.target.result
      saveProductData(productId, name, description, price, image, featured)
    }
    reader.readAsDataURL(imageInput.files[0])
  } else {
    // Usar imagen existente o ninguna
    image = imagePreview.style.display !== "none" ? imagePreview.src : null
    saveProductData(productId, name, description, price, image, featured)
  }
}

// Guardar datos del producto
function saveProductData(productId, name, description, price, image, featured) {
  const products = JSON.parse(localStorage.getItem("products")) || []

  if (productId) {
    // Actualizar producto existente
    const index = products.findIndex((p) => p.id === productId)
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name,
        description,
        price,
        featured,
      }

      if (image) {
        products[index].image = image
      }
    }
  } else {
    // Añadir nuevo producto
    const newProduct = {
      id: Date.now().toString(),
      name,
      description,
      price,
      image: image || "/images/productos/temporada-1.jpg", // Imagen por defecto
      featured,
    }

    products.push(newProduct)
  }

  // Guardar cambios
  localStorage.setItem("products", JSON.stringify(products))

  // Cerrar modal y recargar productos
  closeModals()
  loadProducts()
  loadDashboardData()
}

// Abrir modal de confirmación para eliminar producto
function openDeleteModal(productId) {
  const modal = document.getElementById("deleteModal")
  document.getElementById("deleteProductId").value = productId
  modal.classList.add("active")
}

// Eliminar producto
function deleteProduct() {
  const productId = document.getElementById("deleteProductId").value
  let products = JSON.parse(localStorage.getItem("products")) || []

  // Filtrar productos para eliminar el seleccionado
  products = products.filter((p) => p.id !== productId)

  // Guardar cambios
  localStorage.setItem("products", JSON.stringify(products))

  // Cerrar modal y recargar productos
  closeModals()
  loadProducts()
  loadDashboardData()
}

// Configurar eventos para especialidades
function setupSpecialtyEvents() {
  // Abrir modal para añadir especialidad
  document.getElementById("addSpecialtyBtn").addEventListener("click", () => {
    openSpecialtyModal()
  })

  // Configurar formulario de especialidad
  document.getElementById("specialtyForm").addEventListener("submit", (e) => {
    e.preventDefault()
    saveSpecialty()
  })

  // Configurar vista previa de imagen
  document.getElementById("specialtyImage").addEventListener("change", (e) => {
    previewImage(e.target, "specialtyImagePreview")
  })

  // Configurar eventos para botones de editar y eliminar
  document.addEventListener("click", (e) => {
    // Editar especialidad
    if (e.target.closest(".admin-specialty-action.edit")) {
      const specialtyId = e.target.closest(".admin-specialty-action.edit").getAttribute("data-id")
      openSpecialtyModal(specialtyId)
    }

    // Eliminar especialidad
    if (e.target.closest(".admin-specialty-action.delete")) {
      const specialtyId = e.target.closest(".admin-specialty-action.delete").getAttribute("data-id")
      openDeleteSpecialtyModal(specialtyId)
    }
  })

  // Configurar botón de confirmar eliminación
  document.getElementById("confirmDeleteSpecialtyBtn").addEventListener("click", () => {
    deleteSpecialty()
  })
}

// Abrir modal para añadir/editar especialidad
function openSpecialtyModal(specialtyId = null) {
  const modal = document.getElementById("specialtyModal")
  const form = document.getElementById("specialtyForm")
  const modalTitle = document.getElementById("specialtyModalTitle")

  // Limpiar formulario
  form.reset()
  document.getElementById("specialtyImagePreview").src = "#"
  document.getElementById("specialtyImagePreview").style.display = "none"

  if (specialtyId) {
    // Editar especialidad existente
    modalTitle.textContent = "Editar Especialidad"

    const specialties = JSON.parse(localStorage.getItem("specialties")) || []
    const specialty = specialties.find((s) => s.id === specialtyId)

    if (specialty) {
      document.getElementById("specialtyId").value = specialty.id
      document.getElementById("specialtyTitle").value = specialty.title

      if (specialty.image) {
        document.getElementById("specialtyImagePreview").src = specialty.image
        document.getElementById("specialtyImagePreview").style.display = "block"
      }
    }
  } else {
    // Añadir nueva especialidad
    modalTitle.textContent = "Añadir Especialidad"
    document.getElementById("specialtyId").value = ""
  }

  // Mostrar modal
  modal.classList.add("active")
}

// Guardar especialidad
function saveSpecialty() {
  const specialtyId = document.getElementById("specialtyId").value
  const title = document.getElementById("specialtyTitle").value

  // Obtener imagen
  let image = null
  const imageInput = document.getElementById("specialtyImage")
  const imagePreview = document.getElementById("specialtyImagePreview")

  if (imageInput.files && imageInput.files[0]) {
    // En un entorno real, aquí se subiría la imagen al servidor
    // Para este ejemplo, usaremos una URL de datos (base64)
    const reader = new FileReader()
    reader.onload = (e) => {
      image = e.target.result
      saveSpecialtyData(specialtyId, title, image)
    }
    reader.readAsDataURL(imageInput.files[0])
  } else {
    // Usar imagen existente o ninguna
    image = imagePreview.style.display !== "none" ? imagePreview.src : null
    saveSpecialtyData(specialtyId, title, image)
  }
}

// Guardar datos de la especialidad
function saveSpecialtyData(specialtyId, title, image) {
  const specialties = JSON.parse(localStorage.getItem("specialties")) || []

  if (specialtyId) {
    // Actualizar especialidad existente
    const index = specialties.findIndex((s) => s.id === specialtyId)
    if (index !== -1) {
      specialties[index] = {
        ...specialties[index],
        title,
      }

      if (image) {
        specialties[index].image = image
      }
    }
  } else {
    // Añadir nueva especialidad
    const newSpecialty = {
      id: Date.now().toString(),
      title,
      image: image || "/images/especialidades/pasteleria.jpg", // Imagen por defecto
    }

    specialties.push(newSpecialty)
  }

  // Guardar cambios
  localStorage.setItem("specialties", JSON.stringify(specialties))

  // Cerrar modal y recargar especialidades
  closeModals()
  loadSpecialties()
  loadDashboardData()
}

// Abrir modal de confirmación para eliminar especialidad
function openDeleteSpecialtyModal(specialtyId) {
  const modal = document.getElementById("deleteSpecialtyModal")
  document.getElementById("deleteSpecialtyId").value = specialtyId
  modal.classList.add("active")
}

// Eliminar especialidad
function deleteSpecialty() {
  const specialtyId = document.getElementById("deleteSpecialtyId").value
  let specialties = JSON.parse(localStorage.getItem("specialties")) || []

  // Filtrar especialidades para eliminar la seleccionada
  specialties = specialties.filter((s) => s.id !== specialtyId)

  // Guardar cambios
  localStorage.setItem("specialties", JSON.stringify(specialties))

  // Cerrar modal y recargar especialidades
  closeModals()
  loadSpecialties()
  loadDashboardData()
}

// Configurar formulario del hero
function setupHeroForm() {
  document.getElementById("heroForm").addEventListener("submit", (e) => {
    e.preventDefault()
    saveHeroData()
  })

  document.getElementById("heroImage").addEventListener("change", (e) => {
    previewImage(e.target, "heroImagePreview")
  })
}

// Guardar datos del hero
function saveHeroData() {
  const title = document.getElementById("heroTitle").value
  const subtitle = document.getElementById("heroSubtitle").value

  // Obtener imagen
  let image = null
  const imageInput = document.getElementById("heroImage")
  const imagePreview = document.getElementById("heroImagePreview")

  if (imageInput.files && imageInput.files[0]) {
    // En un entorno real, aquí se subiría la imagen al servidor
    // Para este ejemplo, usaremos una URL de datos (base64)
    const reader = new FileReader()
    reader.onload = (e) => {
      image = e.target.result
      saveHeroDataFinal(title, subtitle, image)
    }
    reader.readAsDataURL(imageInput.files[0])
  } else {
    // Usar imagen existente o ninguna
    image = imagePreview.style.display !== "none" ? imagePreview.src : null
    saveHeroDataFinal(title, subtitle, image)
  }
}

// Guardar datos finales del hero
function saveHeroDataFinal(title, subtitle, image) {
  const heroData = {
    title,
    subtitle,
    image: image || "/images/hero/main.jpg", // Imagen por defecto
  }

  // Guardar cambios
  localStorage.setItem("heroData", JSON.stringify(heroData))

  // Mostrar mensaje de éxito
  alert("Datos del hero guardados correctamente")
}

// Vista previa de imagen
function previewImage(input, previewId) {
  const preview = document.getElementById(previewId)

  if (input.files && input.files[0]) {
    const reader = new FileReader()

    reader.onload = (e) => {
      preview.src = e.target.result
      preview.style.display = "block"
    }

    reader.readAsDataURL(input.files[0])
  }
}

// Cerrar todos los modales
function closeModals() {
  document.querySelectorAll(".admin-modal").forEach((modal) => {
    modal.classList.remove("active")
  })
}

// Cargar datos de anuncios
function loadAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem("announcements")) || []
  const tableBody = document.getElementById("announcementsTableBody")

  tableBody.innerHTML = ""

  announcements.forEach((announcement) => {
    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${announcement.title}</td>
      <td>${announcement.content.substring(0, 50)}${announcement.content.length > 50 ? "..." : ""}</td>
      <td><span class="announcement-type ${announcement.type}">${announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}</span></td>
      <td><span class="announcement-status ${announcement.active ? "active" : "inactive"}">${announcement.active ? "Activo" : "Inactivo"}</span></td>
      <td class="admin-table-actions">
        <button class="admin-action-btn edit" data-id="${announcement.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="admin-action-btn delete" data-id="${announcement.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </td>
    `

    tableBody.appendChild(row)
  })
}

// Configurar eventos para anuncios
function setupAnnouncementEvents() {
  // Abrir modal para añadir anuncio
  document.getElementById("addAnnouncementBtn").addEventListener("click", () => {
    openAnnouncementModal()
  })

  // Configurar formulario de anuncio
  document.getElementById("announcementForm").addEventListener("submit", (e) => {
    e.preventDefault()
    saveAnnouncement()
  })

  // Configurar eventos para botones de editar y eliminar
  document.addEventListener("click", (e) => {
    // Editar anuncio
    if (e.target.closest(".admin-table-actions .admin-action-btn.edit")) {
      const announcementId = e.target.closest(".admin-action-btn.edit").getAttribute("data-id")
      openAnnouncementModal(announcementId)
    }

    // Eliminar anuncio
    if (e.target.closest(".admin-table-actions .admin-action-btn.delete")) {
      const announcementId = e.target.closest(".admin-action-btn.delete").getAttribute("data-id")
      openDeleteAnnouncementModal(announcementId)
    }
  })

  // Configurar botón de confirmar eliminación
  document.getElementById("confirmDeleteAnnouncementBtn").addEventListener("click", () => {
    deleteAnnouncement()
  })
}

// Abrir modal para añadir/editar anuncio
function openAnnouncementModal(announcementId = null) {
  const modal = document.getElementById("announcementModal")
  const form = document.getElementById("announcementForm")
  const modalTitle = document.getElementById("announcementModalTitle")

  // Limpiar formulario
  form.reset()

  if (announcementId) {
    // Editar anuncio existente
    modalTitle.textContent = "Editar Anuncio"

    const announcements = JSON.parse(localStorage.getItem("announcements")) || []
    const announcement = announcements.find((a) => a.id === announcementId)

    if (announcement) {
      document.getElementById("announcementId").value = announcement.id
      document.getElementById("announcementTitle").value = announcement.title
      document.getElementById("announcementContent").value = announcement.content
      document.getElementById("announcementType").value = announcement.type
      document.getElementById("announcementActive").checked = announcement.active
    }
  } else {
    // Añadir nuevo anuncio
    modalTitle.textContent = "Añadir Anuncio"
    document.getElementById("announcementId").value = ""
    document.getElementById("announcementActive").checked = true
  }

  // Mostrar modal
  modal.classList.add("active")
}

// Guardar anuncio
function saveAnnouncement() {
  const announcementId = document.getElementById("announcementId").value
  const title = document.getElementById("announcementTitle").value
  const content = document.getElementById("announcementContent").value
  const type = document.getElementById("announcementType").value
  const active = document.getElementById("announcementActive").checked

  const announcements = JSON.parse(localStorage.getItem("announcements")) || []

  if (announcementId) {
    // Actualizar anuncio existente
    const index = announcements.findIndex((a) => a.id === announcementId)
    if (index !== -1) {
      announcements[index] = {
        ...announcements[index],
        title,
        content,
        type,
        active,
      }
    }
  } else {
    // Añadir nuevo anuncio
    const newAnnouncement = {
      id: Date.now().toString(),
      title,
      content,
      type,
      active,
    }

    announcements.push(newAnnouncement)
  }

  // Guardar cambios
  localStorage.setItem("announcements", JSON.stringify(announcements))

  // Cerrar modal y recargar anuncios
  closeModals()
  loadAnnouncements()
  loadDashboardData()
}

// Abrir modal de confirmación para eliminar anuncio
function openDeleteAnnouncementModal(announcementId) {
  const modal = document.getElementById("deleteAnnouncementModal")
  document.getElementById("deleteAnnouncementId").value = announcementId
  modal.classList.add("active")
}

// Eliminar anuncio
function deleteAnnouncement() {
  const announcementId = document.getElementById("deleteAnnouncementId").value
  let announcements = JSON.parse(localStorage.getItem("announcements")) || []

  // Filtrar anuncios para eliminar el seleccionado
  announcements = announcements.filter((a) => a.id !== announcementId)

  // Guardar cambios
  localStorage.setItem("announcements", JSON.stringify(announcements))

  // Cerrar modal y recargar anuncios
  closeModals()
  loadAnnouncements()
  loadDashboardData()
}

