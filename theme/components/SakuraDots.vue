<template>
  <div class="mashiro-dots">
    <span /><span /><span />
  </div>
</template>

<style lang="scss" scoped>
.mashiro-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.mashiro-dots span {
  width: 0.3rem;
  height: 0.3rem;
  background-color: var(--sakura-color-text);
  border-radius: 50%;
}

.mashiro-dots:hover span {
  background-color: var(--sakura-color-primary);
}
</style>
