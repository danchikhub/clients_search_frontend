<template>
    <q-page>
        <div class="q-pa-md">
            <q-stepper v-model="step" ref="stepper" color="primary" animated>
                <q-step :name="1" title="Основные данные" :done="step > 1" active-color="orange" done-color="positive">
                    <q-expansion-item label="Данные физ. лица" header-class="bg-grey-4 text-black text-bold"
                        default-opened>
                        <q-form ref="individualForm" class="q-mt-md" greedy>
                            <div class="row q-col-gutter-sm q-pb-sm">
                                <q-input v-model="individual.lastName" label="Фамилия" outlined dense
                                    class="col-12 col-sm-4" counter :maxlength="maxLength"
                                    :rules="[validateName, validateRequired]"></q-input>
                                <q-input v-model="individual.firstName" label="Имя" outlined dense
                                    class="col-12 col-sm-4" counter :maxlength="maxLength"
                                    :rules="[validateName, validateRequired]"></q-input>
                                <q-input v-model="individual.secondName" label="Отчество" outlined dense
                                    class="col-12 col-sm-4" counter :maxlength="maxLength"
                                    :rules="[validateName, validateRequired]"></q-input>
                            </div>
                            <div class="row q-col-gutter-sm q-pb-sm">
                                <q-input v-model="individual.lastNameLat" label="Фамилия(латиницей)" outlined dense
                                    class="col-12 col-sm-4" :rules="[validateNameLat, validateRequired]"></q-input>
                                <q-input v-model="individual.firstNameLat" label="Имя(латиницей)" outlined dense
                                    class="col-12 col-sm-4" :rules="[validateNameLat, validateRequired]"></q-input>
                                <q-input v-model="individual.internationalName" label="Полное имя(латиницей)" outlined
                                    dense class="col-12 col-sm-4"
                                    :rules="[validateNameLat, validateRequired]"></q-input>
                            </div>
                            <div class="row q-col-gutter-sm q-pb-sm">
                                <q-input v-model="individual.birthDate" label="Дата рождения" class="col-12 col-sm-3"
                                    type="date" outlined dense :rules="[validateDate, validateRequired]"></q-input>
                                <q-select v-model="individual.isMale" label="Пол" class="col-12 col-sm-3" outlined dense
                                    :options="genderOptions" :rules="[validateRequiredBirthDate]" emit-value
                                    map-options></q-select>
                                <q-select v-model="individual.maritalStatus" label="Семейное положение"
                                    class="col-12 col-sm-3" outlined dense :options="maritalStatusOptions"
                                    :rules="[validateRequired]" emit-value map-options></q-select>
                                <q-select v-model="individual.nationality" label="Национальность"
                                    class="col-12 col-sm-3" outlined dense :options="nationalities"
                                    option-label="nationality" option-value="id" :rules="[validateRequired]" emit-value
                                    map-options></q-select>
                            </div>
                            <div class="row q-col-gutter-sm q-pb-sm">
                                <q-input v-model="individual.workPlace" label="Место работы" outlined dense
                                    class="col-12 col-sm-4" :disable="workPlaceDisable" counter
                                    :maxlength="100"></q-input>
                                <div>
                                    <q-checkbox v-model="individual.isOptimaEmployee" label="Сотрудник банка" />
                                </div>

                            </div>
                        </q-form>
                    </q-expansion-item>
                    <q-expansion-item label="Основные данные" header-class="bg-grey-4 text-black text-bold"
                        default-opened>
                        <q-form ref="subjectForm" class="q-mt-md" greedy>
                            <div class="row q-col-gutter-sm q-pb-sm ">
                                <q-select v-model="subject.clientType" class="col-12 col-sm-3" label="Тип клиента"
                                    emit-value map-options outlined dense :options="clientTypeOptions"
                                    option-label="label" option-value="value" readonly></q-select>
                                <q-input v-model="subject.inn" class="col-12 col-sm-3" label="ИНН" mask="##############"
                                    maxlength="14" counter dense outlined
                                    :rules="[validateINN, validateRequired]"></q-input>
                            </div>

                        </q-form>

                    </q-expansion-item>
                    <q-expansion-item label="Контакты" header-class="bg-grey-4 text-black text-bold" default-opened>
                        <q-form ref="contactForm" class="q-mt-md" greedy>

                            <div v-for="(contact, index) in contacts" :key="contact.contactType">
                                <div class="row q-col-gutter-sm q-pb-sm ">
                                    <q-select v-model="contact.contactType" class="col-12 col-sm-3" label="Тип контакта"
                                        :rules="[validateRequired]" :options="contactTypeOptions" outlined emit-value
                                        map-options dense></q-select>
                                    <q-input v-model="contact.contact" class="col-12 col-sm-3" label="Контакт" dense
                                        outlined :rules="[validateRequired]"></q-input>
                                    <div class="col-12 col-sm-3" v-if="isDeleteContact">
                                        <q-btn flat dense no-caps icon="delete" color="red"
                                            @click="removeContact(index)" />
                                    </div>

                                </div>

                            </div>

                        </q-form>
                        <q-btn flat no-caps icon="add" label="Добавить новый контакт" color="grey"
                            @click="addContact" />
                    </q-expansion-item>
                </q-step>

                <q-step :name="2" title="Документы" icon="create_new_folder" :done="step > 2" active-color="orange"
                    done-color="positive">
                    <q-expansion-item label="Документы" header-class="bg-grey-4 text-black text-bold" default-opened>
                        <q-form ref="documentForm" greedy>
                            <div v-for="(document, index) in documents" :key='document.documentType'>
                                <span class="block text-weight-bold text-grey-8 q-mt-md">Документ #{{ index + 1
                                    }}</span>
                                <div class="row q-col-gutter-sm q-my-sm">
                                    <q-select v-model="document.documentType" class="col-12 col-sm-3"
                                        label="Тип документа" dense outlined :options="documentTypeOptions"
                                        option-label="docName" option-value="id" emit-value map-options
                                        :rules="[validateRequired]"></q-select>
                                    <q-input v-model="document.series" class="col-12 col-sm-3" label="Серия" dense
                                        outlined :rules="[validateRequired]"></q-input>
                                    <q-input v-model="document.docNumber" class="col-12 col-sm-3" label="Номер" dense
                                        outlined :rules="[validateRequired]"></q-input>
                                    <q-input v-model="document.paperIssuer" class="col-12 col-sm-3" label="Орган выдачи"
                                        dense outlined :rules="[validateRequired]"></q-input>
                                </div>
                                <div class="row q-col-gutter-sm">
                                    <q-input v-model="document.docDate" type="date" class="col-12 col-sm-3"
                                        label="Дата выдачи" dense outlined :rules="[validateRequired]"></q-input>
                                    <q-input v-model="document.docEndDate" type="date" class="col-12 col-sm-3"
                                        label="Дата окончания" dense outlined :rules="[validateRequired]"></q-input>
                                    <div class="col-12 col-sm-3" v-if="isDeleteDocument">
                                        <q-btn flat label="Удалить документ" no-caps color="red"
                                            @click="removeDocument(index)" />
                                    </div>
                                </div>
                            </div>

                        </q-form>
                        <q-btn flat no-caps icon="add" label="Добавить документ" color="grey" class="q-mt-md"
                            @click="addDocument" />
                    </q-expansion-item>
                </q-step>

                <q-step :name="3" title="Адрес" icon="home_work" :done="step > 3" active-color="orange"
                    done-color="positive">
                    <q-expansion-item label="Адрес" header-class="bg-grey-4 text-black text-bold" default-opened>
                        <q-form ref="addressForm" greedy>
                            <span class="block text-weight-bold text-grey-8 q-mt-md">Фактический адрес проживания</span>
                            <div class="row q-col-gutter-sm q-my-sm">
                                <q-select v-model="address.addressType" :rules="[validateRequired]" readonly
                                    class="col-12 col-sm-3" label="Тип адреса" dense outlined
                                    :options="addressTypeOptions" emit-value map-options></q-select>
                                <q-select v-model="address.addressArea" :rules="[validateRequired]"
                                    class="col-12 col-sm-3" label="Область" dense outlined :options="addressAreaOptions"
                                    option-label="areaName" option-value="id" emit-value map-options></q-select>
                                <q-input v-model="address.addressDistrict" :rules="[validateRequired]"
                                    class="col-12 col-sm-3" label="Район" dense outlined></q-input>
                                <q-select v-model="address.addressCode" :rules="[validateRequired]"
                                    class="col-12 col-sm-3" label="Тип" dense outlined :options="addressCodeOptions"
                                    option-label="codeDescr" option-value="id" emit-value map-options></q-select>
                            </div>
                            <div class="row q-col-gutter-sm">
                                <q-input v-model="address.addressStreet" :rules="[validateRequired]"
                                    class="col-12 col-sm-3" label="Название" dense outlined></q-input>
                                <q-input v-model="address.addressHouse" :rules="[validateRequired]"
                                    class="col-12 col-sm-3" label="Дом" dense outlined></q-input>
                                <q-input v-model="address.addressFlat" class="col-12 col-sm-3" label="Квартира" dense
                                    outlined></q-input>
                                <q-input v-model="address.addressIndex" class="col-12 col-sm-3" label="Почтовый индекс"
                                    dense outlined></q-input>
                            </div>
                        </q-form>
                    </q-expansion-item>
                </q-step>

                <q-step :name="4" title="Примечания" icon="note" active-color="orange" done-color="positive">
                    <q-expansion-item label="Примечания" header-class="bg-grey-4 text-black text-bold" default-opened>
                        <q-form ref="noteForm" greedy>
                            <div class="row q-col-gutter-sm q-my-sm">
                                <q-input v-model="note.profileStartDate" type="date" class="col-12 col-sm-3"
                                    :rules="[validateRequired]" label="Дата заполнения анкеты" dense outlined></q-input>
                                <q-input v-model="note.profileEndDate" type="date" class="col-12 col-sm-3"
                                    :rules="[validateRequired]" label="Дата обновления анкеты" dense outlined></q-input>
                            </div>
                        </q-form>
                    </q-expansion-item>
                </q-step>

                <template v-slot:navigation>
                    <q-stepper-navigation class="flex justify-end">
                        <q-btn v-if="step > 1" flat color="grey" @click="$refs.stepper.previous()"
                            label="Предыдущий шаг" class="q-mr-sm q-px-sm" dense no-caps />
                        <q-btn @click="stepperClick" color="primary" :label="step === 4 ? 'Сохранить' : 'Следующий шаг'"
                            dense flat no-caps class="q-px-sm" />
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </div>
    </q-page>
</template>
<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar'
import nationality from '../json/nationality.json'
import documentTypes from '../json/documentTypes.json'
import areas from '../json/areas.json'
import addressCode from '../json/addressCode.json'
import { cyrillicToLatin } from 'src/utils/transliteration';
import { validateBirthDate } from 'src/utils/validates';
import { parseINN } from 'src/utils/inn';
import { createAddress, createDocument, createIndividual, createNote, createSubject, createContact } from 'src/services';
import { useRouter } from 'vue-router';

const router = useRouter()

//data
const step = ref(1);
const maxLength = ref(24);

//refs
const individualForm = ref(null);
const subjectForm = ref(null);
const contactForm = ref(null);
const documentForm = ref(null);
const addressForm = ref(null);
const noteForm = ref(null);
const stepper = ref(null);
//options
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

const individual = reactive({
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

const workPlaceDisable = ref(false);

const subject = reactive({
    clientType: 'individual',
    inn: ''
});

const contacts = reactive([
    {
        contactType: '',
        contact: ''
    }
])

const documents = reactive([
    {
        documentType: '',
        series: '',
        docNumber: '',
        paperIssuer: '',
        docDate: '',
        docEndDate: ''
    }
])

const address = reactive({
    addressType: 'actual',
    addressArea: '',
    addressDistrict: '',
    addressCode: '',
    addressStreet: '',
    addressHouse: '',
    addressFlat: '',
    addressIndex: ''
})

const note = reactive({
    profileStartDate: '',
    profileEndDate: ''
})


watch(() => individual.isOptimaEmployee, (value) => {
    if (value) {
        individual.workPlace = 'Сотрудник банка';
        individual.isOptimaEmployee = true;
        workPlaceDisable.value = true
    } else {
        individual.workPlace = '';
        individual.isOptimaEmployee = false;
        workPlaceDisable.value = false
    }
});

watch(() => individual.lastName, (value) => {
    individual.lastNameLat = cyrillicToLatin(value);
    individual.internationalName = `${individual.lastNameLat} ${individual.firstNameLat}`
})

watch(() => individual.firstName, (value) => {
    individual.firstNameLat = cyrillicToLatin(value);
    individual.internationalName = `${individual.lastNameLat} ${individual.firstNameLat}`
})

const isDeleteContact = computed(() => contacts.length > 1);
const isDeleteDocument = computed(() => documents.length > 1);

const validateRequired = (value) => {
    return !!value || 'Поле обязательно для заполнения';
}

const validateRequiredBirthDate = (value) => {
    return value !== null || 'Поле обязательно для заполнения';
}

const validateName = (value) => {
    if (!value) return true;
    if (value.length > 24) return 'Длина символов не может быть более 24';
    const rule = /[^-.а-яА-Яa-zA-ZёЁөӨңҢүҮ\s]/g;
    return !rule.test(value) || 'Разрешенные символы: -, пробелы, буквы и точка';
}

const validateNameLat = (value) => {
    if (!value) {
        return true;
    }

    const rule = /[^-.a-zA-Z\s]/g;
    return !rule.test(value) || 'Разрешенные символы: -, пробелы, латиница и точка';
}

const validateDate = (date) => {
    return validateBirthDate(date)
}

const validateINN = (inn) => {
    try {
        const parsedInn = parseINN(inn);
        console.log(parsedInn.isMale, individual.isMale)
        if (typeof individual.isMale === 'boolean' && individual.isMale !== parsedInn.isMale) {
            return 'Несоответствие ИНН и указанного пола';
        }

        if (individual.birthDate && parsedInn.birthDate.format('YYYY-MM-DD') !== individual.birthDate) {
            return 'Несоответствие ИНН и даты рождения';
        }

        return true;
    } catch (e) {
        return e.message
    }
}

const addContact = () => {
    contacts.push({
        contactType: '',
        contact: ''
    })
}

const removeContact = (index) => {
    contacts.splice(index, 1)
}

const addDocument = () => {
    documents.push({
        documentType: '',
        series: '',
        docNumber: '',
        paperIssuer: '',
        docDate: '',
        docEndDate: ''
    })
}

const removeDocument = (index) => {
    documents.splice(index, 1)
}
const $q = useQuasar()
const stepperClick = async () => {
    // stepper.value.next()
    if (step.value == 1) {
        const individualValidated = await individualForm.value.validate();
        const subjectValidated = await subjectForm.value.validate();
        const contactValidated = await contactForm.value.validate();

        if (individualValidated && subjectValidated && contactValidated) stepper.value.next()
    }

    if (step.value == 2) {
        const documentValidated = await documentForm.value.validate()
       
        if (documentValidated) stepper.value.next()

        // stepper.value.next()
    }

    if (step.value == 3) {
        const addressValidated = await addressForm.value.validate();
     
        if (addressValidated) stepper.value.next()

        // stepper.value.next()
    }

    if (step.value == 4) {
        const noteValidated = await noteForm.value.validate();
        if (noteValidated) {
            const subjectResponse = await createSubject(subject).then(async (response) => {
                const individualData = await createIndividual({
                    ...individual,
                    subjectId: response.data.id,
                })
                const contactData = contacts.map((contact) => ({ ...contact, subjectId: response.data.id }));
                const contactResponse = await createContact(contactData);
                const documentData = documents.map((document) => ({ ...document, subjectId: response.data.id }));
                const documentResponse = await createDocument(documentData);
                const addressResponse = await createAddress({ ...address, subjectId: response.data.id });
                const noteResponse = await createNote({ ...note, subjectId: response.data.id })
            })

            
            router.push('/search')
        }
    }

}

</script>