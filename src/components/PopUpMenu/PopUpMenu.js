import { customButton } from "../CustomButton";

// Компонент всплывающего меню.
export const popUpMenu = {
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
