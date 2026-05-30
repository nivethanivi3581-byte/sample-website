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

if(projectGallery){
for(let i=1;i<=16;i++){

let card = document.createElement("div")
card.className = "project-card"

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

card.onclick = ()=>{
window.location.href = `project.html?project=${i}`
}

projectGallery.appendChild(card)

}
}


// LIGHTBOX

let lightbox = document.getElementById("lightbox")
let lightboxImg = document.getElementById("lightbox-img")

// Open lightbox when clicking any image inside a gallery or project-gallery
document.addEventListener("click", function(e){
	if(!lightbox || !lightboxImg){
		return
	}
	let target = e.target
	if(target && target.tagName === 'IMG'){
		if(target.closest('.project-gallery') || target.closest('.gallery')){
			lightbox.style.display = 'flex'
			lightboxImg.src = target.src
		}
	}
})

if(lightbox){
	lightbox.onclick = () => lightbox.style.display = 'none'
}
