const btnLogout = document.querySelector('#btnLogout');

btnLogout.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
  
  //REDIRECT TO INDEX
  window.location.href = 'index.html';
});
