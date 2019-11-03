import "./pages/index.css";
import { api } from './req.js';
import  { ImagePopup }  from './popup.js';
import {addPicPopup, editPopup, formEdit, form} from './req.js';
import  {validate, validEditPopup, validPopup} from './valid_input.js';


document.querySelector('.user-info__button-edit').addEventListener('click', () => {
  document.forms.formInfoUser.elements.user.value = document.querySelector('.user-info__name').textContent;
  document.forms.formInfoUser.elements.prof.value = document.querySelector('.user-info__job').textContent;
  editPopup.open();
});

document.querySelector('.popup-edit__button').addEventListener('click',(event)=> {
  event.preventDefault();
  api.patchUser();
  api.infoUser().then(res => {
    document.querySelector('.user-info__name').textContent= res.name;
    document.querySelector('.user-info__job').textContent = res.about;
  })
  editPopup.close();
  });


  document.querySelector('.user-info__button').addEventListener('click', (event) => {
    addPicPopup.open();
   });

  document.querySelector('.places-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('place-card__image')) {
      let view=event.target.closest('.place-card__image').getAttribute('style');
      let src=`${view.slice(23,-3)}`;
      const imgZoom=new ImagePopup('.popup-image', 'popup-image_is-opened', '.popup-image__close');
      imgZoom.open(src);
      }
  });

  form.addEventListener('input', (elem) => {
    validate(event.target);
    validPopup(elem);
});

  formEdit.addEventListener('input', (elem) => {
    validate(event.target);
    validEditPopup(elem);
});


