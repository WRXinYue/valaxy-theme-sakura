<template>
  <div class="mashiro-dots">
    <span /><span /><span />
  </div>
</template>

<style lang="scss">
.mashiro-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.mashiro-dots span {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #666;
  border-radius: 50%;
}

.mashiro-dots:hover span {
  background-color: var(--sakura-primary-color);
}
</style>
