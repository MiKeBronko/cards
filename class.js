'use strict';

const initialCards=[];

  class Card {
  constructor(name, link) {
    this.cardElement=this.create(name, link);
  }


  static like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
  }
  
  static remove(event) {
    /* Можно лучше: не использовать здесь document.querySelector('.places-list') 
      на тот случай если в дальнейшем карточки будут добавляться в разные контейнеры, а 
      удалять через parentNode карточки 
 */
      const card = event.target.closest('.place-card');
      card.parentNode.removeChild(card);
   
    //document.querySelector('.places-list').removeChild(event.target.closest('.place-card'));
  }

  create(nameValue, linkValue) {
    const cardItem = document.createElement('div');
    const cardBackground = document.createElement('div');
    const delButton = document.createElement('button');
    const cardDesription = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeButton = document.createElement('button');

    cardItem.classList.add('place-card');
    cardBackground.classList.add('place-card__image');
    delButton.classList.add('place-card__delete-icon');
    cardDesription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    likeButton.classList.add('place-card__like-icon');

    cardItem.appendChild(cardBackground);
    cardBackground.appendChild(delButton);
    cardItem.appendChild(cardDesription);
    cardDesription.appendChild(cardName);
    cardDesription.appendChild(likeButton);

    cardName.textContent=nameValue;
    cardBackground.style.backgroundImage =`url(${linkValue})`;
    return cardItem;
}

}

  class CardList {
  constructor(arr,container) {
    this.arr=arr;
    this.container=container;
    this.render();
  }

   addCard(name, link) {
    const { cardElement }= new Card (name, link);
    this.container.appendChild(cardElement);
  }

    render() {
    this.arr.forEach((item) => {
     return this.addCard(item.name, item.link);
  });
  }
}

  class Popup {
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

  class ImagePopup extends Popup {
      open(src) {
        this.popup.querySelector('.popup-image__view').src = src;
        super.open();
      }
}

  class Api {
    constructor({ baseURL }, options) {
      
        this.baseURL = baseUrl;
        this.headers = options['headers'];
        // this.method = options['method'];
        // this.body = options['body']
        /**
         * Можно улучшить
         * 
         * Параметры не передаются в конструктор
         * ошибка в имени ключа baseUrl
         * options лишний - ({ baseUrl, headers })
         * 
         * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2
         */
    }

    getInitialCards() {
       return fetch(this.baseURL + '/cards', {
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
                console.log('Ошибка. Запрос не выполнен');
            });
            /**
             * Отлично
             * 
             * Ошибки обрабатываются корректно
             * работа с данными отделена от отрисовки
             */
    }

    infoUser() {
      return fetch(this.baseURL + '/users/me', {
      
        headers: this.headers
      })
      .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err);
          console.log('Ошибка. Запрос не выполнен');
      });

    }


    patchUser() {
      return fetch(this.baseURL + '/users/me', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: formEdit.elements.user.value,
          about: formEdit.elements.prof.value
        })
      })
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err);
          console.log('Ошибка. Запрос не выполнен');
      });
    }
  }



