 export class Popup {
  constructor(namePopup, openClassName, closeClassName) {
    this.popup = document.querySelector(namePopup);
    this.openClassName = openClassName;
    this.closeClassName = closeClassName;
    this.close = this.close.bind(this);
    this.popup.querySelector(this.closeClassName)
    .addEventListener('click', this.close);
  }

  open() {
    this.popup.classList.add(this.openClassName);
  }

  close() {
    this.popup.classList.remove(this.openClassName);
  }
}

 export class ImagePopup extends Popup {
  open(src) {
    this.popup.querySelector('.popup-image__view').src = src;
    super.open();
  }
}

