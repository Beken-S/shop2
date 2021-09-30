const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
];

/**
 * Функция возвращает разметку для карточки товара.
 * @param {{}} param объект товара.
 * @returns разметка карточки товара.
 */
const getGoodsItemMarkup = ({ title = "Nameless", price = 0 }) => `
    <div class="goods-item">
       <h3 class="goods-item__title">${title}</h3>
       <p class="goods-item__price">${price}</p>
    </div>
  `;

/**
 * Функция создает разметку для массива товаров и добавляет ее на страницу в
 * блок с классом "goods-list".
 * @param {[]} _goods массив товаров.
 */
const renderGoodsList = (_goods) => {
  let goodsList = _goods.map((_item) => getGoodsItemMarkup(_item));

  /* Ответ на вопрос про запятую в разметке из урока.

     Строка кода из урока:
     document.querySelector(".goods-list").innerHTML = goodsList;.

     Так как goodsList представляет из себя массив, а типом данных поля innerHTML является строка, в строке кода из урока происходит динамическое преобразование массива в строку в результате чего разделитель между элементами массива попал в разметку. */

  document.querySelector(".goods-list").innerHTML = goodsList.join(" ");
};

onload = () => renderGoodsList(goods);
