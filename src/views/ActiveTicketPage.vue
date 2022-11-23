<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Active Ticket</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Active Ticket</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="ticket in tickets" :key="ticket.ticket_id">
        <ion-card-header>
          <ion-card-subtitle>
            <ion-button size="small" color="danger" :disabled="true">
              {{ticket.priority}}
            </ion-button>
          </ion-card-subtitle>
          <ion-card-title>{{ ticket.ticket_number}}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ionItem>
              <ion-label>Request</ion-label>
              <ion-label class="ion-text-wrap">{{ ticket.request}}</ion-label>
            </ionItem>
            <ionItem>
              <ion-label>Ticket Notes</ion-label>
              <ion-label class="ion-text-wrap">{{ ticket.remark}}</ion-label>
            </ionItem>
            <ionItem>
              <ion-label>Open Since</ion-label>
              <ion-label>{{ticket.ticket_age}} days ago</ion-label>
            </ionItem>
          </ion-list>
          <ion-button fill="outline" size="small" color="secondary" @click="setOpenTicket(true, ticket.ticket_id)">Close Ticket</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Your Feedback</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Cancel</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-label position="floating">Feedback</ion-label>
              <ion-textarea rows="5" v-model="enteredFeedback"></ion-textarea>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Ticket Rating</ion-label>
              <ion-range :ticks="true" :snaps="true" :min="1" :max="5" v-model="enteredRating"></ion-range>
            </ion-item>
          </ion-list>
          <ion-button expand="block" @click="submitFeedback()">Close Ticket</ion-button>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useHelpdesk, submitFeedbackUrl } from '../model/helpdesk-use';
import axios from 'axios';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel,
          IonList, IonItem, IonModal, IonTextarea, IonRange,
          IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

export default defineComponent({
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle, IonModal, IonTextarea, IonRange,
    IonToolbar, IonButton, IonLabel, IonList, IonItem,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
  },
  setup () {
      const { tickets, fetchActiveTickets } = useHelpdesk();
      onMounted(fetchActiveTickets);

      return {
          tickets,
      }
  },
  data () {
    return {
      isOpen: false,
      enteredFeedback: "",
      enteredRating: "",
      idTicket: 0,
      postResponse: ""
    };
  },
  methods: {
      setOpenTicket(isOpen: boolean, ticket_id: number) {
          this.isOpen = isOpen;
          this.idTicket = ticket_id;
      },
      setOpen(isOpen: boolean) {
          this.isOpen = isOpen;
      },
      submitFeedback() {
          const postData = {user_id: 1, ticket_id: this.idTicket, feedback: this.enteredFeedback, 
              rating: this.enteredRating};   
          axios
              .post(submitFeedbackUrl, postData)
              .then(response => (this.postResponse = response.data))
              .catch(error => {
                  this.postResponse = `Error: ${error.message}`;
                  console.error('There was an error!', error);
              });
          this.setOpen(false);
      }
  }
});
</script>