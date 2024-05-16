<template>
    <div>
        <q-card class="q-pa-none">
            <q-card-section>
                <img class="image" :src="clientPhoto" :class="{'cursor-pointer': true}"/>
            </q-card-section>
        </q-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const loading = ref(true);
</script>