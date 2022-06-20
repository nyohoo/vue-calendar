<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="color">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-clock-outline">
        <DateForm v-model="startDate" />
        <div v-show="!allDay">
          <TimeForm v-model="startTime" />
        </div>
        <span class="px-2">–</span>
        <DateForm v-model="endDate" :isError="isInvalidDatetime" />
        <div v-show="!allDay">
          <TimeForm v-model="endTime" :isError="isInvalidDatetime" />
        </div>
      </DialogSection>
      <DialogSection>
        <CheckBox v-model="allDay" label="終日" class="ma-0 pa-0" />
      </DialogSection>
      <DialogSection icon="mdi-card-text-outline">
        <TextForm v-model="description" />
      </DialogSection>
      <DialogSection>
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn :disabled="isInvalid" @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

import DialogSection from "./DialogSection";
import DateForm from "./DateForm";
import TimeForm from "./TimeForm";
import TextForm from './TextForm';
import ColorForm from "./ColorForm";
import CheckBox from "./CheckBox";
import { isGreaterEndThanStart } from '../functions/datetime';

export default {
  name: 'EventFormDialog',
  mixins: [validationMixin],
  components: {
    DialogSection,
    DateForm,
    TimeForm,
    TextForm,
    ColorForm,
    CheckBox,
},
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    description: '',
    color: '',
    allDay: false,
  }),
  validations: {
    name: { required },
    startDate: { required },
    endDate: { required },
  },
  computed: {
    ...mapGetters('events', ['event']),
    isInvalidDatetime() {
      return !isGreaterEndThanStart(this.startDate, this.startTime, this.endDate, this.endTime, this.allDay);
    },
    isInvalid() {
      return this.$v.$invalid || this.isInvalidDatetime;
    },
  },
  created() {
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
    this.endDate = this.event.endDate;
    this.endTime = this.event.endTime;
    this.color = this.event.color;
    this.allDay = !this.event.timed;
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent']),
    closeDialog() {
      this.setEditMode(false);
      this.setEvent(null);
    },
    submit() {
      if (this.isInvalid) {
        return
      }
      const params = {
        name: this.name,
        start: `${this.startDate} ${this.startTime || ''}`,
        end: `${this.endDate} ${this.endTime || ''}`,
        description: this.description,
        color: this.color,
        timed: !this.allDay,
      };
      this.createEvent(params);
      this.closeDialog();
    },
  },
};
</script>