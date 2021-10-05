/** Класс, представляющий товар. */
class GoodsItem {
  /**
   * Создает объект товара.
   * @param {string} title название товара (значение по умолчанию "Nameless").
   * @param {number} price стоимость товара (значение по умолчанию 0).
   */
  constructor(title = "Nameless", price = 0) {
    this.title = title;
    this.price = price;
  }

  /**
   * Возвращает HTML разметку карточки товара в виде строки.
   * @returns HTML разметка.
   */
  render() {
    return `
  <div class="goods-item">
  <h3 class="goods-item__title">${this.title}</h3>
  <p class="goods-item__price">${this.price}</p>
  </div>
  `;
  }
}

/** Класс, представляющий список товаров. */
class GoodsList {
  _goods = [];

  /**
   * Создает объект списка товаров.
   */
  constructor() {
    this.fetchGoods();
  }

  /**
   * Получает данные о товарах с сервера.
   */
  fetchGoods() {
    this._goods = [
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
  }

  /**
   * Добавляет HTML разметку карточек товара на страницу в блок с
   * классом "goods-list".
   */
  render() {
    const goodItemsHTML = this._goods.map(({ title, price }) => {
      const goodItem = new GoodsItem(title, price);
      return goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = goodItemsHTML.join(" ");
  }

  /**
   * Возвращает общую стоимость товаров в списке.
   * @returns {number} общая стоимость товаров.
   */
  getTotalItemsPrice() {
    let totalPrice = 0;
    this._goods.forEach((item) => (totalPrice += item.price));
    return totalPrice;
  }
}

/** Класс, представляющий корзину с товарами. */
class Cart {
  /**
   * Возвращает HTML разметку корзины.
   */
  render() {}

  /**
   * Добавляет товар в корзину.
   */
  addItem() {}

  /**
   * Удаляет товар из корзины.
   */
  delItem() {}

  /**
   * Сортирует товары в корзине.
   */
  sort() {}

  /**
   * Возвращает общее количество товаров в корзине.
   */
  getTotalNumberOfItems() {}

  /**
   * Возвращает общую стоимость товаров в корзине.
   */
  getTotalItemsPrice() {}
}

/** Класс, представляющий определенный товар в корзине. */
class CartItem {
  /**
   * Увеличивает количество товара на единицу.
   */
  add() {}

  /**
   * Уменьшает количество товара на единицу.
   */
  sub() {}

  /**
   * Возвращает общую стоимость товара.
   */
  getTotalItemPrice() {}
}

onload = () => {
  const goodsList = new GoodsList();
  goodsList.render();
  console.log(goodsList.getTotalItemsPrice());
};
