export default class Card {
  constructor(name, link) {
    this.cardElement=this.create(name, link);
  }
  static like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
  }
  static remove(event) {
      let card = event.target.closest('.place-card');
      card.parentNode.removeChild(card);
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

document.querySelector('.places-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__like-icon')) {
 Card.like(event);
  }
  if (event.target.classList.contains('place-card__delete-icon')) {
    Card.remove(event);
  }
})

