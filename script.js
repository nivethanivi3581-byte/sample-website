// ============================================
// KMV GROUP UAE — CINEMATIC 3D ANIMATION ENGINE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
  }

  initCustomCursor()
  initThreeHero()
  initGSAPAnimations()
  initSpotlightCards()
  initProjectsGrid()
  initRollGallery()
  initRealtimeScrollEffects()
  initModals()
})

const generatedMediaItems = [
  // Add your generated files here.
  // Example image:
  // { type: "image", src: "generated/facade-concept-01.jpg", title: "Facade Concept", description: "AI exterior concept render for hero or portfolio use." },
  // Example video:
  // { type: "video", src: "generated/site-walkthrough.mp4", poster: "generated/site-walkthrough-poster.jpg", title: "AI Walkthrough", description: "Short looping promo clip for a project section." }
]

const builtInAnimatedMedia = [
  {
    type: "animation",
    variant: "orbital",
    title: "Concept Motion Loop",
    description: "A self-generated motion canvas that behaves like a looping promo visual for the site.",
    kicker: "Live Animation"
  },
  {
    type: "animation",
    variant: "blueprint",
    title: "Facade Blueprint Sweep",
    description: "An animated architectural panel with scanning lines and layout motion for a technical presentation feel.",
    kicker: "Code Animation"
  }
]

/* ---------- REAL-TIME SCROLL EFFECTS ---------- */
function initRealtimeScrollEffects() {
  const floatEls = document.querySelectorAll("[data-scroll-speed]")
  const revealEls = document.querySelectorAll(".scroll-reveal")
  const projectCards = document.querySelectorAll(".project-card")
  const root = document.body
  let lastScrollY = window.scrollY
  let ticking = false

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible")
      }
    })
  }, { threshold: 0.2 })

  revealEls.forEach((el) => revealObserver.observe(el))
  projectCards.forEach((el) => revealObserver.observe(el))

  function updateScrollScene() {
    const scrollTop = window.scrollY
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    const progress = scrollTop / maxScroll
    const velocity = Math.max(-1, Math.min(1, (scrollTop - lastScrollY) / 120))
    const heroDepth = Math.min(scrollTop / Math.max(window.innerHeight, 1), 1)

    root.style.setProperty("--scroll-progress", progress.toFixed(4))
    root.style.setProperty("--hero-depth", heroDepth.toFixed(4))
    root.style.setProperty("--scroll-velocity", velocity.toFixed(4))

    floatEls.forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed || "0.1")
      const rect = el.getBoundingClientRect()
      const offset = (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) * speed
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
    })

    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const visible = 1 - Math.min(Math.abs(window.innerHeight * 0.45 - rect.top) / window.innerHeight, 1)
      const translateY = 50 - visible * 50
      el.style.opacity = Math.max(0.2, visible).toFixed(3)
      el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`
    })

    lastScrollY = scrollTop
    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollScene)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true })
  window.addEventListener("resize", requestTick)
  requestTick()
}

/* ---------- CUSTOM MAGNETIC CURSOR ---------- */
function initCustomCursor() {
  const cursor = document.getElementById("cursor")
  const follower = document.getElementById("cursor-follower")
  if (!cursor || !follower) return

  let mouseX = 0, mouseY = 0
  let followerX = 0, followerY = 0

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
  })

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15
    followerY += (mouseY - followerY) * 0.15
    follower.style.left = `${followerX}px`
    follower.style.top = `${followerY}px`
    requestAnimationFrame(animateFollower)
  }
  animateFollower()

  // Interactive element hover
  const interactiveEls = document.querySelectorAll("a, button, .project-card, .service-card-3d, .gallery-3d-item")
  interactiveEls.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-active"))
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"))
  })
}

/* ---------- BOLD 3D THREE.JS HERO SCENE ---------- */
function initThreeHero() {
  const canvas = document.getElementById("hero-canvas")
  if (!canvas || typeof THREE === "undefined") return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 24

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 50)
  cyanLight.position.set(10, 10, 10)
  scene.add(cyanLight)

  const blueLight = new THREE.PointLight(0x0066ff, 2, 50)
  blueLight.position.set(-10, -10, 10)
  scene.add(blueLight)

  // Main Geometry: Glowing 3D Glass Building Icosahedron Core
  const group = new THREE.Group()

  const outerGeo = new THREE.IcosahedronGeometry(7, 1)
  const outerMat = new THREE.MeshPhongMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
    shininess: 100
  })
  const outerMesh = new THREE.Mesh(outerGeo, outerMat)
  group.add(outerMesh)

  const innerGeo = new THREE.IcosahedronGeometry(4.5, 0)
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x0066ff,
    roughness: 0.1,
    metalness: 0.9,
    wireframe: false,
    transparent: true,
    opacity: 0.5
  })
  const innerMesh = new THREE.Mesh(innerGeo, innerMat)
  group.add(innerMesh)

  // Orbiting Rings
  const ringGeo = new THREE.TorusGeometry(10, 0.08, 16, 100)
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 })
  const ring1 = new THREE.Mesh(ringGeo, ringMat)
  ring1.rotation.x = Math.PI / 3
  group.add(ring1)

  const ring2 = new THREE.Mesh(ringGeo, ringMat)
  ring2.rotation.y = Math.PI / 4
  group.add(ring2)

  // Orbiting Shards Particle Field
  const particleCount = 300
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 45
  }
  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.15,
    transparent: true,
    opacity: 0.8
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  scene.add(group)

  // Mouse Interactivity
  let mouseX = 0, mouseY = 0
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  })

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate)

    group.rotation.y += 0.005
    group.rotation.x += 0.002

    ring1.rotation.z += 0.008
    ring2.rotation.z -= 0.008

    particles.rotation.y -= 0.001

    // Camera follow with easing
    camera.position.x += (mouseX * 4 - camera.position.x) * 0.05
    camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

/* ---------- GSAP SCROLLTRIGGER ANIMATIONS ---------- */
function initGSAPAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return

  // Hero Text Staggered Reveal
  gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: "power3.out" })
  gsap.from(".hero-content h1", { opacity: 0, y: 40, duration: 1.2, delay: 0.4, ease: "power3.out" })
  gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.7, ease: "power3.out" })
  gsap.from(".hero-cta", { opacity: 0, y: 30, duration: 1, delay: 0.9, ease: "power3.out" })

  // Pinned Hero Parallax Effect
  gsap.to("#hero-canvas", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    y: 150,
    scale: 1.2
  })

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll(".stat-number")
  statNumbers.forEach(num => {
    const target = parseInt(num.dataset.target, 10)
    gsap.to(num, {
      scrollTrigger: {
        trigger: num,
        start: "top 85%"
      },
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      ease: "power2.out",
      onUpdate: function () {
        num.innerText = Math.ceil(num.innerText) + "+"
      }
    })
  })

  // Fade & Slide in for Section Headers
  const headers = document.querySelectorAll(".section-header")
  headers.forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 80%"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })
  })

  // Stagger Reveal Services 3D Grid Cards
  gsap.from(".service-card-3d", {
    scrollTrigger: {
      trigger: ".services-3d-grid",
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  })

  // Stagger Reveal Value Cards & Portfolio Cards
  gsap.from(".value-card", {
    scrollTrigger: {
      trigger: ".values-grid",
      start: "top 80%"
    },
    y: 36,
    stagger: 0.1,
    duration: 0.75,
    ease: "power3.out",
    clearProps: "transform"
  })

  gsap.from(".portfolio-card-spotlight", {
    scrollTrigger: {
      trigger: ".portfolio-grid",
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
    clearProps: "all"
  })

  // Header Nav Scroll State & ScrollSpy
  const navHeader = document.getElementById("nav-header")
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-links a")

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navHeader?.classList.add("scrolled")
    } else {
      navHeader?.classList.remove("scrolled")
    }

    let currentSectionId = ""

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 220 && rect.bottom >= 220) {
        currentSectionId = section.getAttribute("id")
      }
    })

    if (window.scrollY < 150) {
      currentSectionId = "hero"
    }

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href")
        if (href === `#${currentSectionId}`) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true })
  handleNavScroll()

  // Manual Click Navigation Handler
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href")
      if (targetId && targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId)
        if (targetSection) {
          e.preventDefault()
          navLinks.forEach((l) => l.classList.remove("active"))
          link.classList.add("active")
          targetSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
}

/* ---------- SPOTLIGHT TILT CARDS EFFECT ---------- */
function initSpotlightCards() {
  const cards = document.querySelectorAll(".portfolio-card-spotlight")
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    })
  })
}

/* ---------- 3D GRAPHICAL EXECUTED PROJECTS ---------- */
const projectsData = [
  { id: 1, title: "Marina Bay High-Rise Facade", category: "curtain", categoryLabel: "Curtain Walls", location: "Dubai, UAE", span: "span-large" },
  { id: 2, title: "Business Bay Financial Tower", category: "cladding", categoryLabel: "ACP Cladding", location: "Dubai, UAE", span: "" },
  { id: 3, title: "Palm Jumeirah Villa Glazing", category: "glazing", categoryLabel: "Structural Glazing", location: "Dubai, UAE", span: "" },
  { id: 4, title: "Al Majaz Executive Tower", category: "curtain", categoryLabel: "Curtain Walls", location: "Sharjah, UAE", span: "span-wide" },
  { id: 5, title: "Downtown Luxury Residence", category: "doors", categoryLabel: "Doors & Windows", location: "Dubai, UAE", span: "" },
  { id: 6, title: "Al Zahia Commercial Center", category: "cladding", categoryLabel: "ACP Cladding", location: "Sharjah, UAE", span: "" },
  { id: 7, title: "Jumeirah Beach Pavilion", category: "glazing", categoryLabel: "Structural Glazing", location: "Dubai, UAE", span: "span-wide" },
  { id: 8, title: "Corporate Headquarters Hub", category: "curtain", categoryLabel: "Curtain Walls", location: "Abu Dhabi, UAE", span: "" },
  { id: 9, title: "Sharjah Innovation Park", category: "cladding", categoryLabel: "ACP Cladding", location: "Sharjah, UAE", span: "" },
  { id: 10, title: "Emirates Golf Villa Balustrades", category: "glazing", categoryLabel: "Structural Glazing", location: "Dubai, UAE", span: "" },
  { id: 11, title: "DIFC Financial Heights", category: "curtain", categoryLabel: "Curtain Walls", location: "Dubai, UAE", span: "span-wide" },
  { id: 12, title: "Silicon Oasis Tech Park", category: "doors", categoryLabel: "Doors & Windows", location: "Dubai, UAE", span: "" },
  { id: 13, title: "Al Mamzar Waterfront Center", category: "cladding", categoryLabel: "ACP Cladding", location: "Sharjah, UAE", span: "" },
  { id: 14, title: "Dubai Hills Luxury Mansion", category: "glazing", categoryLabel: "Structural Glazing", location: "Dubai, UAE", span: "" },
  { id: 15, title: "City Center Commercial Plaza", category: "curtain", categoryLabel: "Curtain Walls", location: "Dubai, UAE", span: "" },
  { id: 16, title: "Al Qusais Industrial Complex", category: "cladding", categoryLabel: "ACP Cladding", location: "Dubai, UAE", span: "" }
]

/* ---------- 3D INTERACTIVE PROJECT FAN DECK ---------- */
let activeProjectIndex = 0

function initProjectsGrid() {
  const stage = document.getElementById("projects-stage")
  const wrapper = document.querySelector(".projects-3d-wrapper")
  const counter = document.getElementById("projects-counter")
  if (!stage) return

  stage.innerHTML = ""

  projectsData.forEach((project, index) => {
    const card = document.createElement("div")
    card.className = "project-deck-card"
    card.dataset.index = index

    card.innerHTML = `
      <img src="Unique/unique${project.id}/1.jpeg" alt="${project.title}" loading="lazy">
      <div class="project-deck-badge">${project.categoryLabel}</div>
      <div class="project-deck-info">
        <h3>${project.title}</h3>
        <p><span>📍 ${project.location}</span> <span class="view-btn">Inspect Specs ↗</span></p>
      </div>
    `

    card.addEventListener("click", () => {
      if (wasDragging) return
      if (index === activeProjectIndex) {
        openProjectModal(project.id)
      } else {
        activeProjectIndex = index
        updateProjectsDeck()
      }
    })

    stage.appendChild(card)
  })

  function updateProjectsDeck() {
    const cards = stage.querySelectorAll(".project-deck-card")
    const total = cards.length

    cards.forEach((card, index) => {
      let offset = index - activeProjectIndex

      if (offset > total / 2) offset -= total
      if (offset < -total / 2) offset += total

      const absOffset = Math.abs(offset)

      if (absOffset > 3) {
        card.style.opacity = "0"
        card.style.transform = "translate3d(0, 0, -300px) scale(0.5)"
        card.style.pointerEvents = "none"
        card.classList.remove("active")
      } else {
        card.style.pointerEvents = "auto"
        const translateX = offset * 240
        const translateZ = 100 - absOffset * 100
        const rotateY = -offset * 18
        const scale = Math.max(0.7, 1.05 - absOffset * 0.12)
        const opacity = Math.max(0.25, 1 - absOffset * 0.28)
        const zIndex = 10 - absOffset

        if (offset === 0) {
          card.classList.add("active")
        } else {
          card.classList.remove("active")
        }

        card.style.opacity = opacity.toFixed(2)
        card.style.zIndex = zIndex
        card.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale.toFixed(2)})`
      }
    })

    if (counter) {
      counter.textContent = `${activeProjectIndex + 1} / ${total}`
    }
  }

  updateProjectsDeck()

  document.getElementById("btn-projects-prev")?.addEventListener("click", () => {
    activeProjectIndex = (activeProjectIndex - 1 + projectsData.length) % projectsData.length
    updateProjectsDeck()
  })

  document.getElementById("btn-projects-next")?.addEventListener("click", () => {
    activeProjectIndex = (activeProjectIndex + 1) % projectsData.length
    updateProjectsDeck()
  })

  let isDragging = false
  let wasDragging = false
  let startX = 0

  if (wrapper) {
    wrapper.addEventListener("mousedown", (e) => {
      isDragging = true
      wasDragging = false
      startX = e.clientX
    })

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - startX
      if (Math.abs(deltaX) > 10) wasDragging = true
    })

    window.addEventListener("mouseup", (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startX
        if (deltaX < -40) {
          activeProjectIndex = (activeProjectIndex + 1) % projectsData.length
          updateProjectsDeck()
        } else if (deltaX > 40) {
          activeProjectIndex = (activeProjectIndex - 1 + projectsData.length) % projectsData.length
          updateProjectsDeck()
        }
        isDragging = false
        setTimeout(() => { wasDragging = false }, 50)
      }
    })

    wrapper.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true
        wasDragging = false
        startX = e.touches[0].clientX
      }
    }, { passive: true })

    wrapper.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - startX
      if (Math.abs(deltaX) > 10) wasDragging = true
    }, { passive: true })

    wrapper.addEventListener("touchend", () => {
      if (isDragging) {
        isDragging = false
        setTimeout(() => { wasDragging = false }, 50)
      }
    })
  }
}

/* ---------- GENERATED MEDIA GALLERY ---------- */
function initGeneratedMediaGallery() {
  const grid = document.getElementById("generated-media-grid")
  if (!grid) return

  generatedMediaItems.forEach((item) => {
    grid.appendChild(createGeneratedMediaCard(item))
  })

  builtInAnimatedMedia.forEach((item) => {
    grid.appendChild(createGeneratedMediaCard(item))
  })

  if (generatedMediaItems.length === 0) {
    const note = document.createElement("div")
    note.className = "generated-media-empty"
    note.innerHTML = `
      <h3>Animated now, upload anytime</h3>
      <p>This section already runs built-in motion visuals from code. If you later add your own AI image or video file paths inside <code>generatedMediaItems</code> in <code>script.js</code>, they will appear here too.</p>
    `
    grid.appendChild(note)
  }

  initBuiltInMediaAnimations()
}

function createGeneratedMediaCard(item) {
  const card = document.createElement("article")
  card.className = "generated-media-card scroll-float"
  card.dataset.scrollSpeed = "0.1"

  let mediaMarkup = ""

  if (item.type === "video") {
    mediaMarkup = `
      <video controls preload="metadata" ${item.poster ? `poster="${item.poster}"` : ""}>
        <source src="${item.src}" type="video/mp4">
      </video>
    `
  } else if (item.type === "image") {
    mediaMarkup = `<img src="${item.src}" alt="${item.title}" loading="lazy">`
  } else if (item.variant === "blueprint") {
    mediaMarkup = `
      <div class="generated-media-stage generated-media-stage--blueprint">
        <div class="generated-media-blueprint-core">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="generated-media-play">Auto Loop</div>
      </div>
    `
  } else {
    mediaMarkup = `
      <div class="generated-media-stage">
        <canvas class="generated-media-canvas" data-animation="orbital" aria-label="${item.title} animation"></canvas>
        <div class="generated-media-play">Motion Render</div>
      </div>
    `
  }

  card.innerHTML = `
    ${mediaMarkup}
    <div class="generated-media-body">
      <span class="generated-media-kicker">${item.kicker || (item.type === "video" ? "Generated Video" : item.type === "image" ? "Generated Image" : "Generated Animation")}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `

  return card
}

function initBuiltInMediaAnimations() {
  const canvases = document.querySelectorAll(".generated-media-canvas")
  canvases.forEach((canvas) => animateGeneratedCanvas(canvas))
}

function animateGeneratedCanvas(canvas) {
  const context = canvas.getContext("2d")
  if (!context) return

  let animationFrameId = null

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const bounds = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, Math.floor(bounds.width * ratio))
    canvas.height = Math.max(1, Math.floor(bounds.height * ratio))
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function draw(time) {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const t = time * 0.001

    context.clearRect(0, 0, width, height)

    const gradient = context.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "#03111b")
    gradient.addColorStop(0.5, "#09233b")
    gradient.addColorStop(1, "#02050c")
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < 6; i++) {
      const orbit = 28 + i * 18
      const angle = t * (0.45 + i * 0.08)
      const x = width / 2 + Math.cos(angle) * orbit * 2.1
      const y = height / 2 + Math.sin(angle * 1.35) * orbit
      const radius = 6 + i * 1.7

      context.beginPath()
      context.fillStyle = `rgba(${i % 2 === 0 ? "0, 240, 255" : "0, 102, 255"}, ${0.16 + i * 0.05})`
      context.shadowBlur = 28
      context.shadowColor = i % 2 === 0 ? "rgba(0,240,255,0.8)" : "rgba(0,102,255,0.7)"
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    context.shadowBlur = 0
    context.strokeStyle = "rgba(255,255,255,0.08)"
    context.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      const ring = 40 + i * 22 + Math.sin(t * 1.2 + i) * 4
      context.beginPath()
      context.arc(width / 2, height / 2, ring, 0, Math.PI * 2)
      context.stroke()
    }

    context.fillStyle = "rgba(255,255,255,0.75)"
    context.font = "600 14px Space Grotesk, sans-serif"
    context.fillText("AI VISUAL LOOP", 22, 28)

    animationFrameId = requestAnimationFrame(draw)
  }

  resizeCanvas()
  animationFrameId = requestAnimationFrame(draw)
  window.addEventListener("resize", resizeCanvas)

  canvas.addEventListener("remove", () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
}

/* ---------- PERSPECTIVE FOCUS ROLL GALLERY ---------- */
function initRollGallery() {
  const track = document.getElementById("gallery-track")
  const wrapper = document.getElementById("gallery-wrapper")
  if (!track || !wrapper) return

  const imageNumbers = [1, 2, 3, 5, 6, 7, 10, 11, 13, 19, 20, 24]
  const tripleImages = [...imageNumbers, ...imageNumbers, ...imageNumbers]

  tripleImages.forEach((num) => {
    const item = document.createElement("div")
    item.className = "gallery-roll-item"
    item.innerHTML = `<img src="Images/image-${num}.jpeg" alt="KMV Gallery ${num}">`

    item.addEventListener("click", () => {
      if (wasDragging) return
      openLightbox(`Images/image-${num}.jpeg`)
    })

    track.appendChild(item)
  })

  let trackOffset = 0
  let isHovered = false
  let isDragging = false
  let wasDragging = false
  let startX = 0
  let dragStartOffset = 0
  const speed = 1.25

  function getSingleSetWidth() {
    const singleCount = imageNumbers.length
    const items = track.children
    if (items.length < singleCount) return 0
    let totalWidth = 0
    for (let i = 0; i < singleCount; i++) {
      totalWidth += items[i].offsetWidth + 20
    }
    return totalWidth
  }

  function updatePerspectiveAndPosition() {
    const singleWidth = getSingleSetWidth() || (imageNumbers.length * 320)
    while (trackOffset <= -singleWidth) {
      trackOffset += singleWidth
    }
    while (trackOffset > 0) {
      trackOffset -= singleWidth
    }
    track.style.transform = `translate3d(${trackOffset}px, 0, 0)`

    const wrapperRect = wrapper.getBoundingClientRect()
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2
    const items = track.children

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemRect = item.getBoundingClientRect()
      const itemCenter = itemRect.left + itemRect.width / 2
      
      const distFromCenter = itemCenter - wrapperCenter
      const normDist = distFromCenter / (wrapperRect.width * 0.45)
      const absDist = Math.abs(normDist)

      // Perspective values: small on sides, normal/focused in center
      const scale = Math.max(0.64, 1.15 - Math.pow(absDist, 1.2) * 0.48)
      const opacity = Math.max(0.35, 1.0 - absDist * 0.55)
      const rotY = Math.max(-28, Math.min(28, -normDist * 24))
      const zIndex = Math.round(100 - absDist * 50)

      item.style.transform = `scale(${scale.toFixed(3)}) rotateY(${rotY.toFixed(2)}deg)`
      item.style.opacity = opacity.toFixed(3)
      item.style.zIndex = zIndex
    }
  }

  function animateRoll() {
    if (!isHovered && !isDragging) {
      trackOffset -= speed
      updatePerspectiveAndPosition()
    } else if (isDragging) {
      updatePerspectiveAndPosition()
    }
    requestAnimationFrame(animateRoll)
  }
  requestAnimationFrame(animateRoll)

  wrapper.addEventListener("mouseenter", () => { isHovered = true })
  wrapper.addEventListener("mouseleave", () => {
    isHovered = false
    if (isDragging) {
      isDragging = false
      wrapper.style.cursor = "grab"
    }
  })

  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true
    wasDragging = false
    startX = e.clientX
    dragStartOffset = trackOffset
    wrapper.style.cursor = "grabbing"
  })

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    if (Math.abs(deltaX) > 5) wasDragging = true
    trackOffset = dragStartOffset + deltaX
    updatePerspectiveAndPosition()
  })

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false
      wrapper.style.cursor = "grab"
      setTimeout(() => { wasDragging = false }, 50)
    }
  })

  wrapper.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true
      wasDragging = false
      startX = e.touches[0].clientX
      dragStartOffset = trackOffset
    }
  }, { passive: true })

  wrapper.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return
    const deltaX = e.touches[0].clientX - startX
    if (Math.abs(deltaX) > 5) wasDragging = true
    trackOffset = dragStartOffset + deltaX
    updatePerspectiveAndPosition()
  }, { passive: true })

  wrapper.addEventListener("touchend", () => {
    isDragging = false
    setTimeout(() => { wasDragging = false }, 50)
  })

  document.getElementById("btn-prev-3d")?.addEventListener("click", () => {
    trackOffset += 320
    updatePerspectiveAndPosition()
  })

  document.getElementById("btn-next-3d")?.addEventListener("click", () => {
    trackOffset -= 320
    updatePerspectiveAndPosition()
  })
}

/* ---------- LIGHTBOX & MODAL LOGIC ---------- */
let currentModalImages = []
let activeModalIndex = 0

function initModals() {
  const lightbox = document.getElementById("lightbox")
  const lightboxClose = lightbox?.querySelector(".lightbox-close")

  lightboxClose?.addEventListener("click", () => lightbox.classList.remove("active"))
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active")
  })

  const projectModal = document.getElementById("project-modal")
  const modalClose = projectModal?.querySelector(".project-modal__close")
  const prevBtn = projectModal?.querySelector(".project-modal__nav--prev")
  const nextBtn = projectModal?.querySelector(".project-modal__nav--next")

  modalClose?.addEventListener("click", () => projectModal.classList.remove("is-open"))

  prevBtn?.addEventListener("click", () => {
    if (currentModalImages.length === 0) return
    activeModalIndex = (activeModalIndex - 1 + currentModalImages.length) % currentModalImages.length
    renderModalImage()
  })

  nextBtn?.addEventListener("click", () => {
    if (currentModalImages.length === 0) return
    activeModalIndex = (activeModalIndex + 1) % currentModalImages.length
    renderModalImage()
  })
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  if (!lightbox || !lightboxImg) return
  lightboxImg.src = src
  lightbox.classList.add("active")
}

async function openProjectModal(projectNum) {
  const modal = document.getElementById("project-modal")
  const title = document.getElementById("project-modal-title")
  if (!modal) return

  title.innerText = `Project ${projectNum} Showcase`
  currentModalImages = []
  activeModalIndex = 0

  // Load available images (1 to 3)
  for (let i = 1; i <= 3; i++) {
    const src = `Unique/unique${projectNum}/${i}.jpeg`
    currentModalImages.push(src)
  }

  renderModalImage()
  modal.classList.add("is-open")
}

function renderModalImage() {
  const img = document.getElementById("project-modal-image")
  const dotsContainer = document.getElementById("project-modal-dots")
  if (!img || currentModalImages.length === 0) return

  img.src = currentModalImages[activeModalIndex]

  dotsContainer.innerHTML = ""
  currentModalImages.forEach((_, idx) => {
    const dot = document.createElement("button")
    dot.className = `project-modal__dot ${idx === activeModalIndex ? "is-active" : ""}`
    dot.addEventListener("click", () => {
      activeModalIndex = idx
      renderModalImage()
    })
    dotsContainer.appendChild(dot)
  })
}
