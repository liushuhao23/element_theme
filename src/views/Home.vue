<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-18 14:34:51
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-19 11:27:41
-->
<template>
  <div class="home">
    <el-button type="primary">Primary</el-button>
    <span class="testClass">11</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home'
});
</script>
<style lang="scss">
@import '../styles/theme/index.scss';
.testClass {
  color: $color-test
}
</style>
