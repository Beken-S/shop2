import { customButton } from "../CustomButton";

// Компонент списка товаров в корзине.
export const cartGoodsItem = {
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
