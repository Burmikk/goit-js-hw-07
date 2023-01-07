import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector(".gallery")

const galleryMarkup = onCreateGallaryMarkup(galleryItems)

galleryEl.insertAdjacentHTML('beforeend',galleryMarkup)

galleryEl.addEventListener("click", onGetOriginalImage)


function onCreateGallaryMarkup(images) {
    return images.map(({ preview, original, description }) => {
       return`<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
}).join("")       
}


function onGetOriginalImage(event) {
  event.preventDefault()

  if (!event.target.classList.contains("gallery__image")) {
    return
  }
  const urlOfBigImage = event.target.dataset.source
    
  const instance = basicLightbox.create(`
    <img src="${urlOfBigImage}" width="800" height="600">
`, { onClose: (removeEscapeListener)})
  instance.show()

  
  function removeEscapeListener() {
      window.removeEventListener("keydown", onCloseByEscape)
  }
  
  window.addEventListener("keydown", onCloseByEscape)
  
  function onCloseByEscape(event) {
    if (event.code === "Escape") {
      instance.close()
    }
  }
}





