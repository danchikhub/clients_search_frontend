<template>
    <div class="bg-white q-pa-md">
        <div class="text-h4 q-mb-md">Информация по клиенту</div>
        <q-expansion-item v-if="isIndividual" label="Данные физ. лица" header-class="bg-grey-4 text-black text-bold" class="q-mt-md"
            default-opened>
            <q-form class="q-mt-md" greedy>
                <div class="row q-col-gutter-sm q-pb-sm">
                    <q-input v-model="individual.lastName" label="Фамилия" outlined dense class="col-12 col-sm-4"
                        counter :maxlength="maxLength"></q-input>
                    <q-input v-model="individual.firstName" label="Имя" outlined dense class="col-12 col-sm-4" counter
                        :maxlength="maxLength"></q-input>
                    <q-input v-model="individual.secondName" label="Отчество" outlined dense class="col-12 col-sm-4"
                        counter :maxlength="maxLength"></q-input>
                </div>
                <div class="row q-col-gutter-sm q-pb-sm">
                    <q-input v-model="individual.lastNameLat" label="Фамилия(латиницей)" outlined dense
                        class="col-12 col-sm-4"></q-input>
                    <q-input v-model="individual.firstNameLat" label="Имя(латиницей)" outlined dense
                        class="col-12 col-sm-4"></q-input>
                    <q-input v-model="individual.internationalName" label="Полное имя(латиницей)" outlined dense
                        class="col-12 col-sm-4"></q-input>
                </div>
                <div class="row q-col-gutter-sm q-pb-sm">
                    <q-input v-model="individual.birthDate" label="Дата рождения" class="col-12 col-sm-3" type="date"
                        outlined dense></q-input>
                    <q-select v-model="individual.isMale" label="Пол" class="col-12 col-sm-3" outlined dense
                        :options="genderOptions" emit-value map-options></q-select>
                    <q-select v-model="individual.maritalStatus" label="Семейное положение" class="col-12 col-sm-3"
                        outlined dense :options="maritalStatusOptions" emit-value map-options></q-select>
                    <q-select v-model="individual.nationality" label="Национальность" class="col-12 col-sm-3" outlined
                        dense :options="nationalities" option-label="nationality" option-value="id" emit-value
                        map-options></q-select>
                </div>
                <div class="row q-col-gutter-sm q-pb-sm">
                    <q-input v-model="individual.workPlace" label="Место работы" outlined dense class="col-12 col-sm-4"
                        :disable="workPlaceDisable" counter :maxlength="100"></q-input>
                    <div>
                        <q-checkbox v-model="individual.isOptimaEmployee" label="Сотрудник банка" />
                    </div>

                </div>
            </q-form>
        </q-expansion-item>
        <q-expansion-item v-if="!isIndividual" label="Данные юр. лица" header-class="bg-grey-4 text-black text-bold"
                        default-opened>
                        <q-form ref="legalForm" class="q-mt-md" greedy>
                            <div class="row q-col-gutter-sm q-pb-sm ">
                                <q-input v-model="legal.fullName" label="Наименование" outlined dense
                                    class="col-12 col-sm-4" counter :maxlength="140"
                                    ></q-input>
                                <q-input v-model="legal.fullNameKg" label="Наименование (кыргызский)" outlined dense
                                    class="col-12 col-sm-4" counter :maxlength="140"
                                    ></q-input>
                                <q-input v-model="legal.internationalName" label="Наименование (латиницей)" outlined dense
                                    class="col-12 col-sm-4" counter :maxlength="140"
                                    ></q-input>
                            </div>
                            <div class="row q-col-gutter-sm q-pb-sm">
                                <q-input v-model="legal.shortName" label="Сокращенное наименование" outlined
                                    dense class="col-12 col-sm-4" 
                                    :maxlength="70"></q-input>
                                <q-input v-model="legal.shortNameKg"
                                    label="Сокращенное наименование на кыргызском" outlined dense
                                    class="col-12 col-sm-4" 
                                    :maxlength="70"></q-input>
                                <q-input v-model="legal.shortNameLat"
                                    label="Сокращенное наименование латиницей" outlined dense class="col-12 col-sm-4"
                                     :maxlength="70"></q-input>
                            </div>
                            <div class="row q-col-gutter-sm q-pb-sm">
                                <q-input v-model="legal.okpoCode" label="Код ОКПО" outlined dense
                                    class="col-12 col-sm-4" :disable="workPlaceDisable" counter
                                    :maxlength="8" ></q-input>
                                <q-input v-model="legal.socialFund" label="Регистрационный номер соц.фонда" outlined
                                    dense class="col-12 col-sm-4" :disable="workPlaceDisable" counter
                                    :maxlength="14" ></q-input>

                            </div>
                        </q-form>
                    </q-expansion-item>
        <q-expansion-item label="Основные данные" header-class="bg-grey-4 text-black text-bold" class="q-mt-md"
            default-opened>
            <q-form class="q-mt-md" greedy>
                <div class="row q-col-gutter-sm q-pb-sm ">
                    <q-select v-model="subject.clientType" class="col-12 col-sm-3" label="Тип клиента" emit-value
                        map-options outlined dense :options="clientTypeOptions" option-label="label"
                        option-value="value" readonly></q-select>
                    <q-input v-model="subject.inn" class="col-12 col-sm-3" label="ИНН" mask="##############"
                        maxlength="14" counter dense outlined></q-input>
                </div>

            </q-form>

        </q-expansion-item>
        <q-expansion-item label="Контакты" header-class="bg-grey-4 text-black text-bold" class="q-mt-md" default-opened>
            <q-form class="q-mt-md" greedy>

                <div v-for="(contact) in contacts" :key="contact.contactType">
                    <div class="row q-col-gutter-sm q-pb-sm ">
                        <q-select v-model="contact.contactType" class="col-12 col-sm-3" label="Тип контакта"
                            :options="contactTypeOptions" outlined emit-value map-options dense></q-select>
                        <q-input v-model="contact.contact" class="col-12 col-sm-3" label="Контакт" dense
                            outlined></q-input>
                        <div class="col-12 col-sm-3" v-if="isDeleteContact">
                            <q-btn flat dense no-caps icon="delete" color="red" />
                        </div>

                    </div>

                </div>

            </q-form>

        </q-expansion-item>
        <q-expansion-item label="Документы" header-class="bg-grey-4 text-black text-bold" class="q-mt-md"
            default-opened>
            <q-form greedy>
                <div v-for="(document, index) in documents" :key='document.documentType'>
                    <span class="block text-weight-bold text-grey-8 q-mt-md">Документ #{{ index + 1
                        }}</span>
                    <div class="row q-col-gutter-sm q-my-sm">
                        <q-select v-model="document.documentType" class="col-12 col-sm-3" label="Тип документа" dense
                            outlined :options="documentTypeOptions" option-label="docName" option-value="id" emit-value
                            map-options></q-select>
                        <q-input v-model="document.series" class="col-12 col-sm-3" label="Серия" dense
                            outlined></q-input>
                        <q-input v-model="document.docNumber" class="col-12 col-sm-3" label="Номер" dense
                            outlined></q-input>
                        <q-input v-model="document.paperIssuer" class="col-12 col-sm-3" label="Орган выдачи" dense
                            outlined></q-input>
                    </div>
                    <div class="row q-col-gutter-sm">
                        <q-input v-model="document.docDate" type="date" class="col-12 col-sm-3" label="Дата выдачи"
                            dense outlined></q-input>
                        <q-input v-model="document.docEndDate" type="date" class="col-12 col-sm-3"
                            label="Дата окончания" dense outlined></q-input>
                    </div>
                </div>

            </q-form>
        </q-expansion-item>
        <q-expansion-item label="Адрес" header-class="bg-grey-4 text-black text-bold" class="q-mt-md" default-opened>
            <q-form greedy>
                <span class="block text-weight-bold text-grey-8 q-mt-md">Фактический адрес проживания</span>
                <div class="row q-col-gutter-sm q-my-sm">
                    <q-select v-model="address.addressType" readonly class="col-12 col-sm-3" label="Тип адреса" dense
                        outlined :options="addressTypeOptions" emit-value map-options></q-select>
                    <q-select v-model="address.addressArea" class="col-12 col-sm-3" label="Область" dense outlined
                        :options="addressAreaOptions" option-label="areaName" option-value="id" emit-value
                        map-options></q-select>
                    <q-input v-model="address.addressDistrict" class="col-12 col-sm-3" label="Район" dense
                        outlined></q-input>
                    <q-select v-model="address.addressCode" class="col-12 col-sm-3" label="Тип" dense outlined
                        :options="addressCodeOptions" option-label="codeDescr" option-value="id" emit-value
                        map-options></q-select>
                </div>
                <div class="row q-col-gutter-sm">
                    <q-input v-model="address.addressStreet" class="col-12 col-sm-3" label="Название" dense
                        outlined></q-input>
                    <q-input v-model="address.addressHouse" class="col-12 col-sm-3" label="Дом" dense
                        outlined></q-input>
                    <q-input v-model="address.addressFlat" class="col-12 col-sm-3" label="Квартира" dense
                        outlined></q-input>
                    <q-input v-model="address.addressIndex" class="col-12 col-sm-3" label="Почтовый индекс" dense
                        outlined></q-input>
                </div>
            </q-form>
        </q-expansion-item>
        <q-expansion-item label="Примечания" header-class="bg-grey-4 text-black text-bold" class="q-mt-md"
            default-opened>
            <q-form greedy>
                <div class="row q-col-gutter-sm q-my-sm">
                    <q-input v-model="note.profileStartDate" type="date" class="col-12 col-sm-3"
                        label="Дата заполнения анкеты" dense outlined></q-input>
                    <q-input v-model="note.profileEndDate" type="date" class="col-12 col-sm-3"
                        label="Дата обновления анкеты" dense outlined></q-input>
                </div>
            </q-form>
        </q-expansion-item>
    </div>

</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import nationality from '../json/nationality.json'
import documentTypes from '../json/documentTypes.json'
import areas from '../json/areas.json'
import addressCode from '../json/addressCode.json'
import { fetchAddress, fetchContacts, fetchDocuments, fetchIndividual, fetchSubject, fetchNote, fetchLegal} from 'src/services';

const maxLength = ref(24);
const route = useRoute()

const genderOptions = reactive([
    { label: 'М', value: true },
    { label: 'Ж', value: false },
]);

const MaritalStatuses = {
    NONE: 'NONE',
    MARRIED: 'MARRIED',
    DIVORCED: 'DIVORCED',
    IDLE: 'IDLE',
    WIDOWED: 'WIDOWED',
}

const nationalities = reactive(nationality.data)

const maritalStatusOptions = reactive([
    { label: 'Не указано', value: MaritalStatuses.NONE },
    { label: 'Разведён/Разведена', value: MaritalStatuses.DIVORCED },
    { label: 'Не женат/Не замужем', value: MaritalStatuses.IDLE },
    { label: 'Женат/Замужем', value: MaritalStatuses.MARRIED },
    { label: 'Вдовец/Вдова', value: MaritalStatuses.WIDOWED },
]);

const clientTypeOptions = reactive([
    { label: 'Физическое лицо', value: 'individual' }
])

const addressTypeOptions = reactive([
    { label: 'Фактический адрес', value: 'actual' }
])

const addressCodeOptions = reactive(addressCode.data)

const addressAreaOptions = reactive(areas.data)

const contactTypeOptions = reactive([
    {
        label: 'Сотовый телефон',
        value: 'phoneType'
    },
    {
        label: 'Почта',
        value: 'mailType'
    },
    {
        label: 'Telegram',
        value: 'telegramType'
    },
    {
        label: 'WhatsApp',
        value: 'whatsappType'
    },
])

const documentTypeOptions = reactive(documentTypes.data.filter((document) => document.clientType.type == 'I'))

const individual = ref({
    lastName: '',
    firstName: '',
    secondName: '',
    firstNameLat: '',
    lastNameLat: '',
    internationalName: '',
    workPlace: '',
    birthDate: '',
    isMale: null,
    maritalStatus: '',
    nationality: '',
    isOptimaEmployee: false
})

const legal = ref({
    fullName: '',
    fullNameKg: '',
    internationalName: '',
    shortName: '',
    shortNameKg: '',
    shortNameLat: '',
    okpoCode: '',
    socialFund: ''
})


const workPlaceDisable = ref(false);

const subject = ref({
    clientType: 'individual',
    inn: ''
});

const contacts = ref([
    {
        contactType: '',
        contact: ''
    }
])

const documents = ref([
    {
        documentType: '',
        series: '',
        docNumber: '',
        paperIssuer: '',
        docDate: '',
        docEndDate: ''
    }
])

const address = ref({
    addressType: 'actual',
    addressArea: '',
    addressDistrict: '',
    addressCode: '',
    addressStreet: '',
    addressHouse: '',
    addressFlat: '',
    addressIndex: ''
})

const note = ref({
    profileStartDate: '',
    profileEndDate: ''
})

const isIndividual = computed(() => route.query.clientType == "I")

onMounted(async () => {

    const subjectData = await fetchSubject(route.query.subjectId);
    const individualData = await fetchIndividual(route.query.subjectId);
    const legalData = await fetchLegal(route.query.subjectId)
    const contactsData = await fetchContacts(route.query.subjectId);
    const documentsData = await fetchDocuments(route.query.subjectId);
    const addressData = await fetchAddress(route.query.subjectId);
    const noteData = await fetchNote(route.query.subjectId)
    subject.value = subjectData.data
    individual.value = individualData.data
    legal.value = legalData.data
    contacts.value = contactsData.data
    documents.value = documentsData.data
    address.value = addressData.data;
    note.value = noteData.data
})

</script>