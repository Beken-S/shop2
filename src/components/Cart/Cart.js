import { customButton } from "../CustomButton";
import { popUpMenu } from "../PopUpMenu";

// Компонент корзины
export const cart = {
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
