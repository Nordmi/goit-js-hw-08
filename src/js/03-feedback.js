import '../css/common.css';
import '../css/03-feedback.css';
const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  inputMessage: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);

let formData = {};
refs.form.addEventListener(
  'input',
  throttle(event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.target;

  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  console.log({
    email: emailValue,
    message: messageValue,
  });
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

const load = key => {
  try {
    const savedInputs = localStorage.getItem(key);
    return savedInputs ? JSON.parse(savedInputs) : undefined;
  } catch (error) {
    console.error(error.message);
  }
};

const storageData = load('feedback-form-state');
if (storageData) {
  formData = storageData;
  const keys = Object.keys(formData);
  for (const key of keys) {
    refs.form.elements[key].value = formData[key];
  }
}
