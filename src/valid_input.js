const link = document.querySelector('#link');
const linkValid = /^(ftp|https?:\/\/)?(www\.)?([\w]{1}[\w\.-]*\.?)*\.{1}[\w\.-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;


  function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
     if (element.value.length == 0) {
      setError(event);  
      setError1(event);
      errorElement.textContent = 'Это обязательное поле';
      return false
    } else if (!element.checkValidity()) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      setError(event);
      setError1(event);
      return false
    } else if (!isLink(element)) {
      errorElement.textContent = 'Здесь должна быть ссылка';
      setError(element);
      setError1(event);
      return false
    }  else {
      errorElement.textContent = '';
      resetError(event.target);
      resetError1(event.target);
    }
    return true
    }

  function isLink(element) {
    let test = link.value.length === 0 || linkValid.test(link.value)
    if (element.id !== link.id ) {
      return true
    } else if (!test) {
      setError1(link);
        return false
      } 
      return true
    }


  function setError() {
    document.querySelector('.popup-edit__button').setAttribute('disabled',true);
    document.querySelector('.popup-edit__button').classList.remove('popup-edit__button_active');
  }

  function setError1() {
    document.querySelector('.popup__button').setAttribute('disabled',true);
    document.querySelector('.popup__button').classList.remove('popup__button_active');
  }



  function resetError() {
    document.querySelector('.popup-edit__button').classList.add('popup-edit__button_active');
    document.querySelector('.popup-edit__button').removeAttribute('disabled',true);
  }

  function resetError1() {
    document.querySelector('.popup__button').classList.add('popup__button_active');
    document.querySelector('.popup__button').removeAttribute('disabled',true);
  }



  function validEditPopup(event) {
     event.preventDefault();
     const inputsuser = Array.from(document.forms.formInfoUser.elements);
     inputsuser.forEach((elem) => {
      if (elem.id !== submit1.id) {
        validate(elem);
      }
    });
  }
  
  function validPopup(event) {
    event.preventDefault();
    const inputsuser1 = Array.from(document.forms.new.elements);
    inputsuser1.forEach((elem) => {
     if (elem.id !== submit.id && elem.id == link.id) {
       validate(elem);
     } else if (elem.id == link.id) {
       isLink(elem);
     }
   });
 }

 export {validate, validEditPopup, validPopup};