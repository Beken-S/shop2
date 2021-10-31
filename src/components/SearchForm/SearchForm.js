import { customButton } from "../CustomButton";

// Компонент формы поиска товаров.
export const searchForm = {
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
