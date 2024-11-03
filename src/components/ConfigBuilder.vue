<script setup lang="ts">
import { Config } from 'components/Types';
import { onMounted, ref, watch } from 'vue';
import { v4 } from 'uuid';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const emit = defineEmits<{ updateConfig: [config: Config] }>();
const configRef = ref<Config>(new Config());
const props = defineProps<{ config: Config }>();

onMounted(() => {
  const configStr = localStorage.getItem('config');
  if (!configStr) return;
  try {
    configRef.value = JSON.parse(configStr);
  } catch (e) {
    console.error('Parsing config error', e);
  }
});

watch(configRef, (value) => {
  localStorage.setItem('config', JSON.stringify(value));
});

setTimeout(() => {
  gridOrdersCount.value = configRef.value.grid.orders.length;
}, 333);

const exchanges = [
  { label: 'ByBit SPOT', value: 3 },
  {
    label: 'ByBit FUTURES',
    value: 2,
  },
];

const selectedExchange = ref({
  label: 'ByBit SPOT',
  value: 3,
});

watch(selectedExchange, (value) => {
  configRef.value.exchange.type = value.value;
});

const strategies = [
  { label: 'Long', value: 0 },
  {
    label: 'Short',
    value: 1,
  },
];

const selectedStrategy = ref({ label: 'Long', value: 0 });

watch(selectedStrategy, (value) => {
  configRef.value.strategy = value.value;
});

const gridOrdersCount = ref(0);

watch(gridOrdersCount, (value) => {
  const oldGrid = [...configRef.value.grid.orders];

  configRef.value.grid.orders = [];
  configRef.value.grid.orders = Array.from(Array(value).keys()).map(() => {
    return { step: 0, deposit: 0 };
  });
  const newArray = [...configRef.value.grid.orders];
  oldGrid.forEach((value, index) => {
    if (index < newArray.length) {
      newArray[index] = value;
    }
  });
  configRef.value.grid.orders = newArray;
  updateConfig();
});

const isTrailingActive = ref(false);
const trailingStep = ref(0.001);
const trailingShift = ref(0.0005);
watch(isTrailingActive, (value) => {
  if (value) {
    configRef.value.profit.trailing = {
      stop: trailingStep.value,
      shift: trailingShift.value,
    };
  } else {
    delete configRef.value.profit.trailing;
  }
});

watch([trailingStep, trailingShift], () => {
  configRef.value.profit.trailing = {
    stop: trailingStep.value,
    shift: trailingShift.value,
  };
  updateConfig();
});

watch(
  configRef,
  () => {
    updateConfig();
  },
  { deep: true }
);

onMounted(() => {
  configRef.value = props.config;
});

const newId = () => {
  configRef.value.id = v4();
};

const newName = () => {
  configRef.value.bot_name = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  }).toLowerCase();
};

const updateConfig = () => {
  emit('updateConfig', configRef.value);
};
</script>

<template>
  <div class="column full-width inputs">
    <span class="text-h6"> Основные настройки </span>
    <q-input v-model="configRef.id" label="ID Бота">
      <template v-slot:after>
        <q-btn round dense flat icon="refresh" @click="newId" />
      </template>
    </q-input>
    <q-input v-model="configRef.bot_name" label="Имя Бота">
      <template v-slot:after>
        <q-btn round dense flat icon="refresh" @click="newName" />
      </template>
    </q-input>

    <span class="text-h6"> Настройки биржи </span>
    <q-input
      v-model.number="configRef.commission_maker"
      label="MAKER комиссия"
      type="number"
    />
    <q-input
      v-model.number="configRef.commission_taker"
      label="TAKER комиссия"
      type="number"
    />
    <q-select v-model="selectedExchange" :options="exchanges" label="Биржа" />
    <q-input v-model="configRef.exchange.api_key" label="API Ключ" />
    <q-input v-model="configRef.exchange.api_secret" label="API Секрет" />
    <span class="text-h6"> Настройки торговли </span>
    <q-input v-model="configRef.symbol.base_asset" label="BASE монета (BTC)" />
    <q-input
      v-model="configRef.symbol.quote_asset"
      label="QUOTE монета (USDT)"
    />
    <q-select
      v-model="selectedStrategy"
      :options="strategies"
      label="Стратегия"
    />
    <span class="text-h6"> Настройки инициирующего ордера </span>
    <q-input
      v-model.number="configRef.initial_order.deposit"
      label="Депозит инициирующего ордера"
    />
    <q-input
      v-model.number="configRef.initial_order.shifting.space"
      label="Отступ инициирующего ордера"
    />
    <q-input
      v-model.number="configRef.initial_order.shifting.shift"
      label="Перетяжка инициирующего ордера"
    />
    <q-input
      v-model.number="configRef.initial_order.shifting.shift_timeout"
      label="Таймаут инициирующего ордера, секунды"
    />
    <span class="text-h6"> Настройки сетки </span>

    <q-input
      v-model.number="configRef.grid.active_orders"
      label="Максимум активных ордеров"
    />
    <q-input v-model.number="gridOrdersCount" label="Всего сеточных ордеров" />
    <div
      v-for="(order, index) of configRef.grid.orders"
      :key="order.deposit"
      ref="orders"
      class="row flex items-center"
    >
      <div class="col-1 text-h6">#{{ index + 1 }}</div>
      <div class="col-5">
        <q-input
          v-model.number="order.step"
          label="Отсутп от предыдущего ордера"
        />
      </div>
      <div class="col-5 q-ml-md">
        <q-input v-model.number="order.deposit" label="Депозит ордера" />
      </div>
    </div>

    <span class="text-h6"> Настройки профита </span>
    <q-input v-model.number="configRef.profit.value" label="Величина профита" />
    <q-checkbox v-model="isTrailingActive" label="Трейлинг активен?" />
    <div v-if="isTrailingActive">
      <q-input v-model.number="trailingStep" label="Отступ до стоп ордера" />
      <q-input
        v-model.number="trailingShift"
        label="Минимаьный отступ до перестановки стоп ордера"
      />
    </div>
    <span class="text-h6"> Настройки стоп лосса </span>
    <q-input
      v-model.number="configRef.stop.percent"
      label="Значение стоп лосса"
    />
    <q-input
      v-model.number="configRef.stop.timeout"
      label="Таймаут стоп лосса, секунд"
    />
  </div>
</template>

<style scoped>
.inputs > * {
  margin-top: 1.1em;
}
</style>
