<script setup lang="ts">
import { Config } from 'components/Types';
import { JsonViewer } from 'vue3-json-viewer';
import 'vue3-json-viewer/dist/index.css';
import { useQuasar } from 'quasar';

const props = defineProps<{ config: Config }>();
const $q = useQuasar();

// calling here; equivalent to when component is created
$q.dark.set(true);
</script>

<template>
  <div class="column q-mt-md">
    <json-viewer
      :value="{ config: props.config }"
      :expand-depth="5"
      copyable
      theme="dark"
    ></json-viewer>
  </div>
</template>

<style scoped></style>
