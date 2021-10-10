class API {
  API_URL =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

  makeGETRequest(url, method = "GET", type = "") {
    return new Promise((resolve) => {
      let xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open(method, url, true);
      xhr.responseType = type;
      xhr.send();
      xhr.onload = function () {
        resolve(xhr.response);
      };
    });
  }
}

/** Класс, представляющий товар. */
class GoodsItem {
  /**
   * Создает объект товара.
   * @param {string} title название товара (значение по умолчанию "Nameless").
   * @param {number} price стоимость товара (значение по умолчанию 0).
   */
  constructor(id = 0, title = "Nameless", price = 0) {
    this.id = `product-${id}`;
    this.title = title;
    this.price = price;
  }

  /**
   * Возвращает элемент карточки товара.
   * @returns элемент.
   */
  getElement(cart) {
    const element = document.createElement("div");
    const button = document.createElement("button");
    element.classList.add("goods-item");
    element.innerHTML = `
      <h3 class="goods-item__title">${this.title}</h3>
      <p class="goods-item__price">${this.price}</p>
    `;
    button.classList.add("button", "button_style_second", "button_add");
    button.textContent = "Добавить";
    button.addEventListener("click", () => {
      cart.addItem(this.id);
    });
    element
      .querySelector(".goods-item__title")
      .insertAdjacentElement("afterend", button);
    return element;
  }
}

/** Класс, представляющий список товаров. */
class GoodsList extends API {
  _goods = [];

  /**
   * Создает объект списка товаров.
   */
  constructor(cart) {
    super();
    this.fetchGoods().then(() => {
      this.render(cart);
    });
  }

  /**
   * Получает данные о товарах с сервера.
   */
  fetchGoods() {
    return this.makeGETRequest(
      `${this.API_URL}/catalogData.json`,
      "GET",
      "json"
    ).then((goods) => (this._goods = goods));
  }

  /**
   * Добавляет HTML разметку карточек товара на страницу в блок с
   * классом "goods-list".
   */

  /**
   * Добавляет HTML разметку карточек товара на страницу в блок с
   * классом "goods-list".
   * @param {{}} cart объект корзины для добавления кнопки добавить товар.
   */
  render(cart) {
    const fragment = document.createDocumentFragment();
    this._goods.forEach(({ id_product, product_name, price }) => {
      const goodItem = new GoodsItem(id_product, product_name, price);
      fragment.appendChild(goodItem.getElement(cart));
    });
    document.querySelector(".goods-list").appendChild(fragment);
  }

  /**
   * Возвращает общую стоимость товаров в списке.
   * @returns {number} общая стоимость товаров.
   */
  getTotalItemsPrice() {
    return this._goods.reduce((totalPrice, { price }) => {
      return (totalPrice += price);
    }, 0);
  }
}

/** Класс, представляющий корзину с товарами. */
class Cart extends API {
  _cart = [];
  _amount = null;

  /**
   * Создает объект корзины.
   */
  constructor() {
    super();
    this.button = new CartButton();
    this.popUpMenu = new CartPopUpMenu(this.button);
    this.fetchCart().then(() => {
      this.render();
    });
  }
  /**
   * Возвращает HTML разметку корзины.
   */
  render() {
    const fragment = document.createDocumentFragment();
    this._cart.forEach((item) => fragment.appendChild(item.element));
    this.popUpMenu.element.textContent = "";
    this.popUpMenu.element.appendChild(fragment);
  }

  /**
   * Формирует запрос на сервис для получения корзины товаров.
   * @returns ответ.
   */
  fetchCart() {
    return this.makeGETRequest(
      `${this.API_URL}/getBasket.json`,
      "GET",
      "json"
    ).then(({ contents, amount }) => {
      this._cart = [];
      this._amount = amount;
      contents.forEach((item) => {
        let newItem = new CartItem(item);
        newItem.deleteButton.addEventListener("click", () => this.delItem());
        this._cart.push(newItem);
      });
    });
  }

  /**
   * Добавляет товар в корзину.
   */
  addItem(id) {
    return this.makeGETRequest(
      `${this.API_URL}/addToBasket.json`,
      "GET",
      "json"
    )
      .then(() => this.fetchCart())
      .then(() => this.render());
  }

  /**
   * Удаляет товар из корзины.
   */
  delItem() {
    return this.makeGETRequest(
      `${this.API_URL}/deleteFromBasket.json`,
      "GET",
      "json"
    )
      .then(() => this.fetchCart())
      .then(() => this.render());
  }

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
  deleteButton = document.createElement("button");
  /**
   * Создает объект товара в корзине.
   * @param {{}} param0 объект с параметрами товара.
   */
  constructor({ id_product, product_name, price }) {
    this.id = id_product;
    this.name = product_name;
    this.price = price;
    this.element = this.getElement();
  }
  /**
   * Увеличивает количество товара на единицу.
   */
  add() {}

  /**button
  sub() {}

  /**
   * Возвращает общую стоимость товара.
   */
  getTotalItemPrice() {}

  /**
   * Возвращает элемент товара в корзины.
   * @returns элемент.
   */
  getElement() {
    const element = document.createElement("div");
    element.classList.add("cart-item");
    this.deleteButton.classList.add("button", "button_style_second");
    this.deleteButton.textContent = "Удалить";
    element.insertAdjacentHTML(
      "afterbegin",
      `
        <div>${this.name}</div>
        <div>${this.price}</div>
      `
    );
    element.insertAdjacentElement("beforeend", this.deleteButton);
    return element;
  }
}

/**
 * Класс, представляющий кнопку корзины.
 */
class CartButton {
  /**
   * Создает объект кнопки корзины.
   */
  constructor() {
    this.element = document.querySelector(".cart-button");
    this.height = this.element.getBoundingClientRect().height;
  }
}

/**
 * Класс, представляющий всплывающее меню корзины.
 */
class CartPopUpMenu {
  /**
   * Создает объект всплывающего меню корзины.
   * @param {{}} param0 объект кнопки корзины.
   */
  constructor({ element: button, height }) {
    this.element = document.createElement("div");
    this.element.classList.add("pup-up-menu");
    this.element.style.top = `${height + 10}px`;
    button.insertAdjacentElement("beforeend", this.element);
    button.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-button")) {
        if (this.element.classList.contains("show")) {
          this.element.classList.remove("show");
        } else {
          this.element.classList.add("show");
        }
      }
    });
  }
}

onload = () => {
  const cart = new Cart();
  const goodsList = new GoodsList(cart);
};
