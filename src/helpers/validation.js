function validation(name, value) {
  let errors = {};
  if(name === 'email') {
    if(!value) {
      errors = ({[name]: 'Емейл обязателен'});
    } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
      errors = ({[name]: 'Адресс не валиден'});
    }
  }
  if (name === 'password') {
    if(!value) {
      errors = ({[name]: 'Пароль обязателен'});
    }
  }
  if(name === 'name') {
    if(!value) {
      errors = ({[name]: 'Имя обязательно'})
    } else if (!/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/gm.test(value)) {
      errors = ({[name]: 'Введите корректное имя (например: Виталий)'});
    } else if (value.length<1) {
      errors = ({[name]: 'Имя не должно быть меньше 2 символов'});
    }
  }

  return errors;
}

export default validation;
