<template>
    <q-page>
        <div class="row" style="height: 90vh">
            <div class="col-12 flex content-center justify-center">
                <q-card class="q-ma-xl">
                    <q-tabs v-model="tab" dense class="text-teal" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                        <q-tab name="mails" label="Физические лица" icon="person" no-caps />
                        <q-tab name="alarms" label="Юридические лица" icon="apartment" no-caps />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="mails">
                            <div>
                                <q-splitter v-model="splitterModel" style="width: 600px;">

                                    <template v-slot:before>
                                        <q-tabs v-model="individualSubTab" vertical>
                                            <q-tab name="inn" label="ИНН" no-caps />
                                            <q-tab name="fio" label="ФИО" no-caps />
                                            <q-tab name="partyId" label="ID клиента" no-caps />
                                            <q-tab name="code" label="Код клиента" no-caps />
                                            <q-tab name="cards" label="Карты" no-caps />
                                        </q-tabs>
                                    </template>

                                    <template v-slot:after>
                                        <q-tab-panels v-model="individualSubTab" swipeable vertical transition-prev="jump-up"
                                            transition-next="jump-up">
                                            <q-tab-panel name="inn">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по ИНН</div>
                                                    <q-input label="Введите ИНН" name="Email" required />
                                                </div>

                                            </q-tab-panel>
                                            <q-tab-panel name="fio">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по ФИО</div>
                                                    <q-input label="Введите ФИО" name="Email" required />
                                                </div>

                                            </q-tab-panel>

                                            <q-tab-panel name="partyId">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по ID</div>
                                                    <q-input label="Введите ID клиента" name="Email" required />
                                                </div>
                                            </q-tab-panel>

                                            <q-tab-panel name="code">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по коду</div>
                                                    <q-input label="Введите код клиента" name="Email" required />
                                                </div>
                                            </q-tab-panel>
                                            <q-tab-panel name="cards">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по карте</div>
                                                    <q-input label="Введите карту клиента" name="Email" required />
                                                </div>
                                            </q-tab-panel>
                                        </q-tab-panels>
                                        <div class="flex justify-end q-mt-xl">
                                            <div>
                                                <q-btn dense flat no-caps class="q-px-sm" color="grey"><q-icon
                                                        name="person_add" class="q-mr-sm" /> Завести клиента
                                                    вручную</q-btn>
                                                <q-btn dense flat no-caps class="q-mx-sm q-px-sm"
                                                    color="primary"><q-icon name="search" class="q-mr-sm" /> Найти
                                                    клиента</q-btn>
                                            </div>
                                        </div>
                                    </template>

                                </q-splitter>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="alarms">
                            <div>
                                <q-splitter v-model="splitterModel" style="width: 600px;">

                                    <template v-slot:before>
                                        <q-tabs v-model="legalSubTab" vertical>
                                            <q-tab name="inn" label="ИНН" no-caps />
                                            <q-tab name="name" label="Наименование" no-caps />
                                            <q-tab name="partyId" label="ID клиента" no-caps />
                                            <q-tab name="code" label="Код клиента" no-caps />
                                            <q-tab name="account" label="Карт. счет" no-caps />
                                        </q-tabs>
                                    </template>

                                    <template v-slot:after>
                                        <q-tab-panels v-model="legalSubTab" swipeable vertical transition-prev="jump-up"
                                            transition-next="jump-up">
                                            <q-tab-panel name="inn">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по ИНН</div>
                                                    <q-input label="Введите ИНН" name="Email" required />
                                                </div>

                                            </q-tab-panel>
                                            <q-tab-panel name="name">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по наимениванию</div>
                                                    <q-input label="Введите название" name="Email" required />
                                                </div>

                                            </q-tab-panel>

                                            <q-tab-panel name="partyId">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по ID</div>
                                                    <q-input label="Введите ID" name="Email" required />
                                                </div>
                                            </q-tab-panel>

                                            <q-tab-panel name="code">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по коду</div>
                                                    <q-input label="Введите код" name="Email" required />
                                                </div>
                                            </q-tab-panel>
                                            <q-tab-panel name="account">
                                                <div>
                                                    <div class="text-h5 text-center q-mb-md">Поиск клиента по карт. счёту</div>
                                                    <q-input label="Введите код" name="Email" required />
                                                </div>
                                            </q-tab-panel>
                                        </q-tab-panels>
                                        <div class="flex justify-end q-mt-xl">
                                            <div>
                                                <q-btn dense flat no-caps class="q-px-sm" color="grey"><q-icon
                                                        name="person_add" class="q-mr-sm" /> Завести клиента
                                                    вручную</q-btn>
                                                <q-btn dense flat no-caps class="q-mx-sm q-px-sm"
                                                    color="primary"><q-icon name="search" class="q-mr-sm" /> Найти
                                                    клиента</q-btn>
                                            </div>
                                        </div>
                                    </template>

                                </q-splitter>
                            </div>
                        </q-tab-panel>

                    </q-tab-panels>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import { ref } from 'vue'
const tab = ref('mails');
const individualSubTab = ref('inn');
const legalSubTab = ref('inn')
const splitterModel = ref(20);
</script>