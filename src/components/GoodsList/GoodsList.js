// Компонент списка товаров.
export const goodsList = {
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
