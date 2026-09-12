// ===== Ждём, пока страница загрузится =====
document.addEventListener('DOMContentLoaded', function () {

  // ===== Находим все кнопки на странице =====
  const buttons = document.querySelectorAll('.card button');

  // ===== Навешиваем обработчик на каждую кнопку =====
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Находим заголовок карточки, к которой относится кнопка
      const cardTitle = button.closest('.card').querySelector('h2').textContent;

      // Показываем всплывающее сообщение
      alert('Раздел «' + cardTitle + '» скоро будет доступен 🚧');
    });
  });

});
