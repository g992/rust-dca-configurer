<template>
  <q-page class="row justify-evenly">
    <div class="col-5">
      <ConfigBuilder @updateConfig="updateConfig" />
    </div>
    <div class="col-5"><ConfigViewer :config="config" /></div>
  </q-page>
</template>

<script setup lang="ts">
import ConfigViewer from 'components/ConfigViewer.vue';
import { ref } from 'vue';
import { Config } from 'components/Types';
import ConfigBuilder from 'components/ConfigBuilder.vue';

const config = ref<Config>(new Config());
const updateConfig = (configUpdate: Config) => {
  config.value = configUpdate;
};
</script>
