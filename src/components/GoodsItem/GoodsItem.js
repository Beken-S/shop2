import { customButton } from "../CustomButton";

// Компонент карточки товара.
export const goodsItem = {
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
