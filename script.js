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

let gallery = document.getElementById("gallery-container")

for(let i=1;i<=60;i++){

let img = document.createElement("img")
img.src = `images/image ${i}.jpeg`
gallery.appendChild(img)

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