let modal = document.getElementById("formModal");

// Получить все карточки, которые открывают модальное окно
let openModalForm = document.getElementById("openModalForm");

// Получить элемент <span>, который закрывает модальное окно
let span = document.getElementsByClassName("close")[0];

// Добавить событие click для каждой карточки
openModalForm.onclick = function (event) {
  event.preventDefault();
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

// Когда пользователь нажимает на <span> (x), закрыть модальное окно
span.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

// Когда пользователь щелкает в любом месте за пределами модального окна, закрыть его
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};
