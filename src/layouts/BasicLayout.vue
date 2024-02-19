<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header"><GlobalHeader /></a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">STOJ By Mendicus</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  background-color: white;
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
  position: sticky;
  top: 0;
  z-index: 3;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  padding: 10px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script setup>
import GlobalHeader from "@/components/GlobalHeader";
</script>
