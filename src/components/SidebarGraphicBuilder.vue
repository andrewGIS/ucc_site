<template>
<div>
  <p class="msg">Привет!</p>
</div>
</template>

<script>
export default {
  props: {
    selectedStationWMO: {
      type: Number
    }
  },
  name: 'GraphicBuilder'
}
</script>

<style>
.msg{
  background:red;
}
</style>
