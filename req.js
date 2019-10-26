let cards// = new CardList(initialCards,document.querySelector('.places-list'));
    
const api = new Api( 
  baseUrl = 'http://95.216.175.5/cohort3', 
  /**
   * Можно улучшить baseUrl это ключ аналогичный headers
   * baseUrl: 'http://95.216.175.5/cohort3' а не переменная
   * без указания типа
   */
  {
        //method: 'PATCH', 
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

            //  res.forEach(elem=>{
            //     initialCards.push({
            //         'name': elem.name,
            //         'link': elem.link
            //     })
            //   })

   // cards.render();
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
    /**
     * Можно улучшить
     * 
     * Не хватает тематического изображения на случай отсутствия основного
     */
  }
 });

//   // правильнее добавить проверку перед отрисовкой
//   // if (res.name && res.about ....) { обновляем если все поля пришли}
// /* простите не въехал в проверку "отсутвия полей в запросе"*/

/**
 * Возможны две ситуации:
 * 
 * сервер ответил ошибкой и запрос не содержит name и about
 * сервер прислал корректный ответ, но значения равны пустой строке
 * в каждом из случаев нет смысла нагружать браузер
 */




document.querySelector('.popup-edit__button').addEventListener('click',(event)=> {
    event.preventDefault();
    api.patchUser();
    api.infoUser().then(res => {
      document.querySelector('.user-info__name').textContent= res.name;
      document.querySelector('.user-info__job').textContent = res.about;
      console.log(res);
    })
    /**
     * Можно улучшить 
     * 
     * Логический порядок выглядит так
     * из api отправляется PATCH запрос и получается ответ в then
     * на основе которого обновляются элементы, дополнительный запрос
     * не нужен
     */
    editPopup.close();
    });