// Функция определения размера экрана
function definitionSizeScreen() {
  return document.documentElement.clientWidth;
}

// Расчёт коэффициента для определения 
// количества карточек добавляющихся относительно размера экрана
function coefficientScreen() {
  const width = definitionSizeScreen();
    if (width >= 1280) {
      return 3;
    } return 2;
  }

export { definitionSizeScreen, coefficientScreen }