// Компонент кнопки.
export const customButton = {
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
