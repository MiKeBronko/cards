const addPicPopup = new Popup('.popup', 'popup_is-opened', '.popup__close');
const editPopup = new Popup('.popup-edit', 'popup-edit_is-opened','.popup-edit__close'); 
const formEdit = document.forms.formInfoUser;
const form = document.forms.new;

document.querySelector('.user-info__button').addEventListener('click', (event) => {
  addPicPopup.open();
 });

document.querySelector('.user-info__button-edit').addEventListener('click', () => {
  formEdit.elements.user.value = document.querySelector('.user-info__name').textContent;
  formEdit.elements.prof.value = document.querySelector('.user-info__job').textContent;
  editPopup.open();
});

/*
  Можно лучше: можно было отказаться от делегирования и вешать обработчики на сами элементы
  карточки при её создании в классе Card. Так весь функционал работы карточки
  был бы описан в одном месте
*/
document.querySelector('.places-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__like-icon')) {
    Card.like(event);
  }
  if (event.target.classList.contains('place-card__delete-icon')) {
    Card.remove(event);
  }
  if (event.target.classList.contains('place-card__image')) {
    let view=event.target.closest('.place-card__image').getAttribute('style');
    let src=`${view.slice(23,-3)}`;
    /* Можно лучше: лучше было создать экземпляр попапа один раз, так же как и попапы addPicPopup и editPopup */ 
    /*я понимаю оптимизацию, но не продумал как именно передать необходиме классы для разных попапов, 
    причём вариант с одной формой мне нравится больше, но опять же нет понимания каким-образом 
    менять в вёрстке формы нужные элементы */
    const imgZoom=new ImagePopup('.popup-image', 'popup-image_is-opened', '.popup-image__close');
    imgZoom.open(src);
    }
});

form.addEventListener('submit', () => {
  event.preventDefault();
  cards.addCard(form.elements.name.value,form.elements.link.value);
  form.reset();
  addPicPopup.close();
});

