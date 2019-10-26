import Card from './card.js';
export let cards;//=document.querySelector('.places-list');
export const initialCards=[];

export default class CardList {
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


