import  { Api }  from './api.js';
import  CardList  from './cardList';
import { serverUrl} from './api.js';
import { initialCards } from './cardList.js';
import  { Popup }  from './popup.js';
 const addPicPopup = new Popup('.popup', 'popup_is-opened', '.popup__close');
 const editPopup = new Popup('.popup-edit', 'popup-edit_is-opened','.popup-edit__close'); 
 const formEdit = document.forms.formInfoUser;
 const form = document.forms.new;
export {addPicPopup, editPopup, formEdit, form};
 export const api = new Api( 
  serverUrl ,
  {
        headers: {
          authorization: '4bd0cc5d-bbe0-42cd-8a49-c0a6de9996c3',
          'Content-Type': 'application/json'
        }
        })
        api.getInitialCards()
        .then(cards => {
          if (cards && cards.length > 0 ) {
            new CardList(cards,document.querySelector('.places-list'));
          }
        });
        
        api.infoUser()
        .then((res) => {
          if (res.name && res.about) {
          document.querySelector('.user-info__name').textContent= res.name;
          document.querySelector('.user-info__job').textContent = res.about;
          document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})` ;
          } else {
            document.querySelector('.user-info__name').textContent= 'вот это поворот';
            document.querySelector('.user-info__job').textContent = 'вот это поворот';
            document.querySelector('.user-info__photo').style.backgroundImage = `` ;
          }
         });

         document.forms.new.addEventListener('submit', () => {
          event.preventDefault();
          let  ccard=new CardList(initialCards,document.querySelector('.places-list'));
          ccard.addCard(document.forms.new.elements.name.value,document.forms.new.elements.link.value);
          document.forms.new.reset();
          addPicPopup.close();
        })