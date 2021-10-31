"use strict";
import {
  GET_GOODS,
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from "./constants";

import {
  cart,
  cartGoodsItem,
  goodsItem,
  goodsList,
  searchForm,
} from "./components";

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    search: "",
  },
  components: {
    cart,
    cartGoodsItem,
    goodsItem,
    goodsList,
    searchForm,
  },
  methods: {
    filterGoods: function () {
      this.filteredGoods = this.goods.filter((item) => {
        return new RegExp(this.search, "i").test(item.product_name);
      });
    },
    getCart: function () {
      return fetch(GET_CART).then((response) => response.json());
    },
    getGoods: function () {
      return fetch(GET_GOODS).then((response) => response.json());
    },
    addToCart: function (id) {
      return fetch(ADD_TO_CART, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((cart) => (this.cart = cart));
    },
    removeFromCart: function (id) {
      return fetch(DELETE_FROM_CART, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((cart) => (this.cart = cart));
    },
  },
  mounted: function () {
    this.getGoods().then((res) => {
      this.goods = res;
      this.filteredGoods = res;
    });
    this.getCart().then((res) => (this.cart = res));
  },
});
