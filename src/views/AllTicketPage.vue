<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>All Ticket</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Active Ticket</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="ticket in ticketinfo" :key="ticket.ticket_id">
        <ion-card-header>
          <ion-card-subtitle>
            <ion-button size="small" color="danger" :disabled="true">
              {{ticket.priority}}
            </ion-button>
            <ion-button size="small" color="success" :disabled="true">
              {{ticket.closing_status}}
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
            <ionItem>
              <ion-label>Your Rating</ion-label>
              <ion-label>{{ticket.user_rating}} stars</ion-label>
            </ionItem>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel,
          IonList, IonItem,
          IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

export default defineComponent({
  name: 'FolderPage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar, IonButton, IonLabel, IonList, IonItem,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
  },
  data () {
    return {
      ticketinfo: [],
      isOpen: false,
      enteredFeedback: "",
      enteredRating: "",
      idTicket: 0,
      postResponse: ""
    };
  },
  methods: {
    async fetchTickets() {
        await axios
          .get('https://demo.medxa.id:8443/simrs/helpdesk/tickets/')
          .then(response => (this.ticketinfo = response.data.items))
    },
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
        .post('https://demo.medxa.id:8443/simrs/helpdesk/feedback/', postData)
        .then(response => (this.postResponse = response.data))
        .catch(error => {
          this.postResponse = `Error: ${error.message}`;
          console.error('There was an error!', error);
        });
      this.setOpen(false);
    }
  },
  async mounted() {
    await this.fetchTickets()
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
.updatedColor{
 color:"danger"
}

</style>
