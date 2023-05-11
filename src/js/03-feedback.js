import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackFormStateKey = 'feedback-form-state';

const saveFormState = () => {
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const formState = { email, message };
  localStorage.setItem(feedbackFormStateKey, JSON.stringify(formState));
};

const throttledSaveFormState = throttle(saveFormState, 500);

// відновлення стану форми з локального сховища
const restoreFormState = () => {
  const formState = JSON.parse(localStorage.getItem(feedbackFormStateKey));
  if (formState) {
    emailInput.value = formState.email || '';
    messageInput.value = formState.message || '';
  }
};


window.addEventListener('load', restoreFormState);


emailInput.addEventListener('input', throttledSaveFormState);
messageInput.addEventListener('input', throttledSaveFormState);

// Видалення стану форми з локального сховища та полів під час надсилання
const clearFormState = () => {
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  if (email && message) {
    localStorage.removeItem(feedbackFormStateKey);
    emailInput.value = '';
    messageInput.value = '';
  } else {
    alert("Всі поля повинні бути заповнені!");
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFormState();
});

