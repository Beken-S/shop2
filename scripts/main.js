"use strict";

Vue.component("goods-item", {
  props: ["item"],
  template: `
      <div class="goods-item">
        <h3 class="goods-item__title">{{ item.title }}</h3>
        <button class="button button_style_second button_add">Добавить</button>
        <p class="goods-item__price">{{ item.price }}</p>
      </div>
    `,
});

Vue.component("cart-pup-up-menu", {
  template: `
    <div class="cart__pup-up-menu">
    </div>
  `,
});

Vue.component("cart-goods-item", {
  props: ["item"],
  template: `
    <div class="cart__goods-item">
      <div>{{ item.title }}</div>
      <div>{{ item.price }}</div>
      <button class="button button_style_second">Удалить</button>
    </div>
  `,
});

const GOODS = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
];

const app = new Vue({
  el: "#app",
  data: {
    goods: GOODS,
    filteredGoods: GOODS,
    cartPopupVision: false,
    search: "",
  },
  methods: {
    filterGoods: function () {
      this.filteredGoods = this.goods.filter((item) => {
        return new RegExp(this.search, "i").test(item.title);
      });
    },
    setVision: function () {
      this.cartPopupVision = !this.cartPopupVision;
    },
  },
});
