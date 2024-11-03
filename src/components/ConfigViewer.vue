<script setup lang="ts">
import { Config } from 'components/Types';
import { JsonViewer } from 'vue3-json-viewer';
import 'vue3-json-viewer/dist/index.css';
import { useQuasar } from 'quasar';

const props = defineProps<{ config: Config }>();
const $q = useQuasar();

// calling here; equivalent to when component is created
$q.dark.set(true);

const downloadConfig = async () => {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(props.config));
  const dlAnchorElem = document.getElementById('downloadAnchorElem');
  if (!dlAnchorElem) return;
  dlAnchorElem.setAttribute('href', dataStr);
  dlAnchorElem.setAttribute(
    'download',
    `BOT_CONFIG_${new Date().toLocaleString()}.json`
  );
  dlAnchorElem.click();
};
</script>

<template>
  <div class="column q-mt-md">
    <a id="downloadAnchorElem" style="display: none" />
    <q-btn label="Скачать" @click="downloadConfig" class="q-mb-sm" flat />
    <json-viewer
      :value="{ config: props.config, pnl_update_delay: 1000 }"
      :expand-depth="5"
      copyable
      theme="dark"
    />
  </div>
</template>

<style scoped></style>
