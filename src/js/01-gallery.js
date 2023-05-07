// // Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// // Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
    </li>
  `;
};
const renderGallery = (items) => {
  const galleryMarkup = items.map(createGalleryItem).join('');
  galleryContainer.innerHTML = galleryMarkup;
};

renderGallery(galleryItems);

const lightbox = new SimpleLightbox(".gallery__link", { captionsData: "alt", captionDelay: "250" });
