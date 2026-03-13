// HERO SLIDER

let slides = document.querySelectorAll(".slide")
let index = 0

setInterval(()=>{
slides[index].classList.remove("active")
index++

if(index == slides.length){
index = 0
}

slides[index].classList.add("active")
},4000)


// LOAD 60 IMAGES AUTOMATICALLY

let projectGallery = document.getElementById("project-gallery")

for(let i=1;i<=16;i++){

let card = document.createElement("div")
card.className = "project-card"

let img = document.createElement("img")

// first image inside each folder
img.src = `Unique/unique${i}/1.jpeg`

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


// LIGHTBOX

let lightbox = document.getElementById("lightbox")
let lightboxImg = document.getElementById("lightbox-img")

document.addEventListener("click",function(e){

if(e.target.parentElement == gallery){
lightbox.style.display="flex"
lightboxImg.src = e.target.src
}

})

lightbox.onclick = ()=> lightbox.style.display="none"