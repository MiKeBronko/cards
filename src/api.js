export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';
export class Api {
  constructor({ baseURL }, options) {
    
      this.baseURL = serverUrl;
      this.headers = options['headers'];
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
        name: document.forms.formInfoUser.elements.user.value,
        about: document.forms.formInfoUser.elements.prof.value
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