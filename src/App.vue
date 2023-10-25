<template>
  <div id="app">
    <CurrentWeather :temperature="25" />
  </div>
</template>

<script>
import CurrentWeather from './components/CurrentWeather.vue';

export default {
  components: {
    CurrentWeather,
  },
};
</script>

<style>

</style>
