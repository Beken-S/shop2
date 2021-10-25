const fs = require("fs");
const { GOODS_PATH, CART_PATH } = require("./constants");

const readItems = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const writeItems = function (path, items) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(items), (err) => {
      if (err) {
        reject(err);
      }
      resolve(items);
    });
  });
};

/**
 * Функция ищет товар в списке товаров.
 * @param {String} path путь к файлу.
 * @param {Number} id id товара.
 * @returns {{}} объект товара.
 */
const findItem = function (path, id) {
  return readItems(path).then((_items) => {
    const items = [..._items];
    return items.find((el) => el.id_product === id);
  });
};

/**
 * Функция создает объект товара для корзины.
 * @param {String} path путь к списку товаров.
 * @param {Number} id id товара.
 * @returns {{}} объект товара в корзине.
 */
const createCartItem = function (path, id) {
  return findItem(path, id).then((_item) => {
    if (_item) {
      return { product: { ..._item }, quantity: 1, amount: _item.price };
    }
    throw `В файле ${path} нет товара с id = ${id}`;
  });
};

/**
 * Функция добавляет товар в корзину.
 * @param {String} path путь к файлу корзины.
 * @param {Number} id id товара.
 * @returns {[]} корзина.
 */
const addToCart = function (path, id) {
  return readItems(path)
    .then((_cart) => {
      const cart = [..._cart];
      const item = cart.find((item) => item.product.id_product === id);

      /* Если товар с id уже находится в корзине то увеличиваем количество и
       * вычисляем общую стоимость. */
      if (item) {
        item.quantity++;
        item.amount = item.quantity * item.product.price;
        return cart;
      }
      return createCartItem(GOODS_PATH, id).then((item) => {
        cart.push(item);
        return cart;
      });
    })
    .then((resultCart) => writeItems(path, resultCart))
    .catch((err) => console.log(err));
};

/**
 * Функция удаляет товар из корзины.
 * @param {String} path путь к файлу корзины.
 * @param {Number} id id товара.
 * @returns {[]} корзина.
 */
const removeFromCart = function (path, id) {
  return readItems(path)
    .then((_cart) => {
      const cart = [..._cart];
      const indexItem = cart.findIndex(
        (item) => item.product.id_product === id
      );
      if (indexItem >= 0) {
        cart.splice(indexItem, 1);
        return cart;
      }
      throw `В корзине нет товара с id = ${id}`;
    })
    .then((resultCart) => writeItems(path, resultCart))
    .catch((err) => console.log(err));
};

module.exports = {
  addToCart,
  removeFromCart,
};
