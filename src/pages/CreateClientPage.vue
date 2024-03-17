<template>
    <q-page>
        <div class="q-pa-md">
            <q-stepper v-model="step" ref="stepper" color="primary" animated>
                <q-step :name="1" title="Основные данные" :done="step > 1" active-color="orange" done-color="positive">
                    <q-expansion-item label="Данные физ. лица" header-class="bg-grey-4 text-black text-bold" default-opened>
                        hello
                    </q-expansion-item>
                </q-step>

                <q-step :name="2" title="Документы" icon="create_new_folder" :done="step > 2" active-color="orange"
                    done-color="positive">
                    An ad group contains one or more ads which target a shared set of keywords.
                </q-step>

                <q-step :name="3" title="Адреса" icon="home_work" :done="step > 3" active-color="orange"
                    done-color="positive">
                    This step won't show up because it is disabled.
                </q-step>

                <q-step :name="4" title="Примечания" icon="note" active-color="orange" done-color="positive">
                    Try out different ad text to see what brings in the most customers, and learn how to
                    enhance your ads using features like ad extensions. If you run into any problems with
                    your ads, find out how to tell if they're running and how to resolve approval issues.
                </q-step>

                <template v-slot:navigation>
                    <q-stepper-navigation class="flex justify-end">
                        <q-btn v-if="step > 1" flat color="grey" @click="$refs.stepper.previous()"
                            label="Предыдущий шаг" class="q-mr-sm q-px-sm" dense no-caps  />
                        <q-btn @click="$refs.stepper.next()" color="primary"
                            :label="step === 4 ? 'Сохранить' : 'Следующий шаг'" dense flat no-caps class="q-px-sm" />
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </div>
    </q-page>
</template>
<script setup>
import { ref } from 'vue';

const step = ref(1);

</script>