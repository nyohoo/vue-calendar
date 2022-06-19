<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="event.color || 'blue'">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-clock-outline">
        <DateForm v-model="startDate" />
        <DateForm v-model="endDate" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogSection from "./DialogSection";
import DateForm from "./DateForm";

export default {
  name: 'EventFormDialog',
  components: {
    DialogSection,
    DateForm,
  },
  data: () => ({
    name: '',
    startDate: null,
    endDate: null,
  }),
  computed: {
    ...mapGetters('events', ['event']),
  },
  created() {
    this.startDate = this.event.startDate;
    this.endDate = this.event.endDate;
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent']),
    closeDialog() {
      this.setEditMode(false);
      this.setEvent(null);
    },
    submit() {
      const params = {
        name: this.name,
        start: this.startDate,
        end: this.endDate,
      };
      this.createEvent(params);
      this.closeDialog();
    },
  },
};
</script>