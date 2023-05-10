import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackFormStateKey = 'feedback-form-state';

// Функція для запису стану форми в локальне сховище
const saveFormState = throttle(() => {
  const formState = { email: emailInput.value, message: messageInput.value };
  localStorage.setItem(feedbackFormStateKey, JSON.stringify(formState));
}, 500);

// Функція для відновлення стану форми з локального сховища
const restoreFormState = () => {
  const formState = JSON.parse(localStorage.getItem(feedbackFormStateKey));
  if (formState) {
    emailInput.value = formState.email || '';
    messageInput.value = formState.message || '';
  }
};

// Заповнюємо поля форми при завантаженні сторінки
window.addEventListener('load', restoreFormState);

// Записуємо стан форми в локальне сховище при вводі користувача
emailInput.addEventListener('input', saveFormState);
messageInput.addEventListener('input', saveFormState);

// Очищуємо сховище та поля форми при сабміті
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formState = { email: '', message: '' };
  localStorage.setItem(feedbackFormStateKey, JSON.stringify(formState));
  emailInput.value = '';
  messageInput.value = '';
  console.log(formState);
});