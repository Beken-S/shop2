"use strict";

const API_URL = "http://localhost:8080";
const GET_GOODS = `${API_URL}/catalog.json`;
const GET_CART = `${API_URL}/cart.json`;
const ADD_TO_CART = `${API_URL}/add`;
const DELETE_FROM_CART = `${API_URL}/delete`;

// Компонент кнопки.
const customButton = {
  data: function () {
    return {
      classList: ["button"],
    };
  },
  template: `
      <button :class="classList" type="button" @click="$emit('click')">
        <slot></slot>
      </button>
    `,
};

// Компонент всплывающего меню.
const popUpMenu = {
  data: function () {
    return {
      classList: ["pup-up-menu"],
      buttonClassList: ["button_style_close", "pup-up-menu__close-button"],
    };
  },
  components: {
    customButton,
  },
  template: `
    <div :class="classList">
      <custom-button :class="buttonClassList" @click="$emit('close')">
        &#128939;
      </custom-button>
      <slot></slot>
    </div>
  `,
};

// Компонент корзины
const cart = {
  data: function () {
    return {
      cartPopupVision: false,
      classList: ["cart"],
      buttonClassList: ["button_style_main"],
      menuClassList: ["cart__pop-up-menu"],
    };
  },
  components: {
    customButton,
    popUpMenu,
  },
  template: `
    <div :class="classList">
      <custom-button :class="buttonClassList" @click="open">
        Корзина
      </custom-button>
      <pop-up-menu :class="menuClassList" v-if="cartPopupVision" @close="close">
        <slot></slot>
      </pop-up-menu>
    </div>

  `,
  methods: {
    open: function () {
      this.cartPopupVision = true;
    },
    close: function () {
      this.cartPopupVision = false;
    },
  },
};

// Компонент списка товаров в корзине.
const cartGoodsItem = {
  props: {
    title: String,
    quantity: Number,
    amount: Number,
  },
  data: function () {
    return {
      classList: ["cart__goods-item"],
      titleClassList: ["cart-goods-item", "cart-goods-item__title"],
      buttonClassList: ["button_style_second", "cart-goods-item__del-button"],
    };
  },
  components: {
    customButton,
  },
  template: `
    <div :class="classList">
      <div :class="titleClassList">{{ title }}</div>
      <div>{{quantity}} шт.</div>
      <div>{{ amount }}</div>
      <custom-button :class="buttonClassList" @click="$emit('remove-item')">
        Удалить
      </custom-button>
    </div>
  `,
};

// Компонент карточки товара.
const goodsItem = {
  props: {
    title: String,
    price: Number,
  },
  data: function () {
    return {
      classList: ["goods-item"],
      titleClassList: ["goods-item__title"],
      priceClassList: ["goods-item__price"],
      buttonClassList: ["button_style_second", "button_add"],
    };
  },
  components: {
    customButton,
  },
  template: `
    <div :class="classList">
      <h3 :class="titleClassList">{{ title }}</h3>
      <custom-button :class="buttonClassList" @click="$emit('add-to-cart')">
        Добавить
      </custom-button>
      <p :class="priceClassList">{{ price }}</p>
    </div>
  `,
};

// Компонент списка товаров.
const goodsList = {
  data: function () {
    return {
      classList: ["goods-list"],
    };
  },
  template: `
    <div :class="classList">
      <slot></slot>
    </div>
  `,
};

// Компонент формы поиска товаров.
const searchForm = {
  data: function () {
    return {
      classList: ["search-form"],
      inputClassList: ["search-form__input-field"],
      buttonClassList: ["button_style_main", "search-form__button"],
    };
  },
  components: {
    customButton,
  },
  template: `
    <div :class="classList">
      <input
        :class="inputClassList"
        type="text"
        v-on:input="$emit('input', $event.target.value)"
      />
      <custom-button :class="buttonClassList" @click="$emit('search')">
        Найти
      </custom-button>
    </div>
  `,
};

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
