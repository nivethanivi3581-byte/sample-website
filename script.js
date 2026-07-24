// HERO SLIDER

requestAnimationFrame(() => {
	document.body.classList.add("page-ready")
})

document.addEventListener("click", function(e){
	let link = e.target.closest("a")

	if(!link){
		return
	}

	let url = new URL(link.href, window.location.href)
	let isSamePageAnchor = url.pathname === window.location.pathname && url.hash
	let isInternalHtmlPage = url.origin === window.location.origin && url.pathname.endsWith(".html")

	if(!isInternalHtmlPage || isSamePageAnchor || link.target){
		return
	}

	e.preventDefault()
	document.body.classList.add("page-exit", "page-loading")

	setTimeout(() => {
		window.location.href = link.href
	}, 360)
})

let slides = document.querySelectorAll(".slide")
let index = 0

if(slides.length > 0){
setInterval(()=>{
slides[index].classList.remove("active")
index++

if(index == slides.length){
index = 0
}

slides[index].classList.add("active")
},4000)
}


// LOAD PROJECT THUMBNAILS

let projectGallery = document.getElementById("project-gallery")
let projectModal = document.getElementById("project-modal")
let modalTitle = document.getElementById("project-modal-title")
let modalImage = document.getElementById("project-modal-image")
let modalDots = document.getElementById("project-modal-dots")
let modalClose = projectModal ? projectModal.querySelector(".project-modal__close") : null
let modalPrev = projectModal ? projectModal.querySelector(".project-modal__nav--prev") : null
let modalNext = projectModal ? projectModal.querySelector(".project-modal__nav--next") : null
let modalImages = []
let activeImageIndex = 0

function closeProjectModal(){
	if(!projectModal){
		return
	}
	projectModal.classList.remove("is-open")
	projectModal.setAttribute("aria-hidden", "true")
	document.body.style.overflow = ""
}

function renderProjectModal(){
	if(!projectModal || !modalImage || !modalDots){
		return
	}

	if(modalImages.length === 0){
		closeProjectModal()
		return
	}

	let activeImage = modalImages[activeImageIndex]
	modalImage.src = activeImage.src
	modalImage.alt = activeImage.alt

	if(modalPrev){
		modalPrev.style.display = modalImages.length > 1 ? "flex" : "none"
	}

	if(modalNext){
		modalNext.style.display = modalImages.length > 1 ? "flex" : "none"
	}

	modalDots.innerHTML = ""
	modalImages.forEach((image, index) => {
		let dot = document.createElement("button")
		dot.className = "project-modal__dot" + (index === activeImageIndex ? " is-active" : "")
		dot.type = "button"
		dot.setAttribute("aria-label", `Show image ${index + 1}`)
		dot.addEventListener("click", () => {
			activeImageIndex = index
			renderProjectModal()
		})
		modalDots.appendChild(dot)
	})
}

function loadProjectImages(projectNumber){
	return new Promise((resolve) => {
		let foundImages = []
		let imageNumber = 1

		function checkNextImage(){
			if(imageNumber > 3){
				resolve(foundImages)
				return
			}

			let imageUrl = `Unique/unique${projectNumber}/${imageNumber}.jpeg`
			let image = new Image()

			image.onload = () => {
				foundImages.push({
					src: imageUrl,
					alt: `Project ${projectNumber} image ${imageNumber}`
				})
				imageNumber += 1
				checkNextImage()
			}

			image.onerror = () => {
				resolve(foundImages)
			}

			image.src = imageUrl
		}

		checkNextImage()
	})
}

async function openProjectModal(projectNumber){
	if(!projectModal){
		return
	}

	modalImages = []
	activeImageIndex = 0
	modalImage.src = ""
	modalImage.alt = "Loading project images"

	if(modalTitle){
		modalTitle.textContent = `Project ${projectNumber}`
	}

	projectModal.classList.add("is-open")
	projectModal.setAttribute("aria-hidden", "false")
	document.body.style.overflow = "hidden"

	modalImages = await loadProjectImages(projectNumber)
	if(modalImages.length === 0){
		closeProjectModal()
		return
	}

	renderProjectModal()
}

if(projectGallery){
for(let i=1;i<=16;i++){

let card = document.createElement("div")
card.className = "project-card"
card.setAttribute("role", "button")
card.setAttribute("tabindex", "0")
card.dataset.project = i

let img = document.createElement("img")

// first image inside each folder
img.src = `Unique/unique${i}/1.jpeg`
img.alt = `Project ${i} thumbnail`
img.loading = 'lazy'

let overlay = document.createElement("div")
overlay.className = "project-overlay"
overlay.innerText = "Project " + i

card.appendChild(img)
card.appendChild(overlay)

card.addEventListener("click", () => openProjectModal(i))
card.addEventListener("keydown", (event) => {
	if(event.key === "Enter" || event.key === " "){
		event.preventDefault()
		openProjectModal(i)
	}
})

projectGallery.appendChild(card)

}
}

if(projectModal){
	projectModal.addEventListener("click", (event) => {
		if(event.target.closest(".project-modal__content")){
			return
		}
		closeProjectModal()
	})

	if(modalClose){
		modalClose.addEventListener("click", closeProjectModal)
	}

	if(modalPrev){
		modalPrev.addEventListener("click", () => {
			activeImageIndex = (activeImageIndex - 1 + modalImages.length) % modalImages.length
			renderProjectModal()
		})
	}

	if(modalNext){
		modalNext.addEventListener("click", () => {
			activeImageIndex = (activeImageIndex + 1) % modalImages.length
			renderProjectModal()
		})
	}

	document.addEventListener("keydown", (event) => {
		if(!projectModal.classList.contains("is-open")){
			return
		}

		if(event.key === "Escape"){
			closeProjectModal()
		} else if(event.key === "ArrowRight"){
			activeImageIndex = (activeImageIndex + 1) % modalImages.length
			renderProjectModal()
		} else if(event.key === "ArrowLeft"){
			activeImageIndex = (activeImageIndex - 1 + modalImages.length) % modalImages.length
			renderProjectModal()
		}
	})
}
