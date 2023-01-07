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
  window.addEventListener("keydown", onCloseByEscape)

  if (!event.target.classList.contains("gallery__image")) {
    return
  }

  const urlOfBigImage = event.target.dataset.source
  
  // Константа в которой лежит разметка, которая буде  
  // вызываться Lightbox для создания большого изображения
  const ImgMarkupForModal = `<img src="${urlOfBigImage}" width="800" height="600">`
  
// Метод создающий модальное окно с разметкой и ссылкой на картинку 
// Первый аргумент - сама разметка
// Второй аргумент - ОБЪЕКТ! с опцией. Варианты опций есть в документации
// В дванном случае опция onClose вызывает callback функицю когда модальное окно будет закрыто
  const instance = basicLightbox.create(ImgMarkupForModal, { onClose: (removeEscapeListener) })
  instance.show()

  
  function removeEscapeListener() {
      window.removeEventListener("keydown", onCloseByEscape)
  }
  
  function onCloseByEscape(event) {
    if (event.code === "Escape") {
      instance.close()
    }
  }
}





