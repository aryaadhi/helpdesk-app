<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Submitted Request</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Active Ticket</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-card v-for="request in requestsInfo" :key="request.id">
          <ion-card-header>
            <ion-card-subtitle>
              <ion-button size="small" color="danger" :disabled="true">
                {{request.priority}}
              </ion-button>
            </ion-card-subtitle>
            <ion-card-title>{{ request.submitted_date}}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ionItem>
                <ion-label>Request</ion-label>
                <ion-label class="ion-text-wrap">{{ request.request}}</ion-label>
              </ionItem>
              <ionItem>
                <ion-label>Has ticket?</ion-label>
                <ion-button size="small" color="success" :disabled="true">{{request.has_ticket}}</ion-button>
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
            IonList, IonItem, IonButton,
            IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  
  export default defineComponent({
    name: 'FolderPage',
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar, IonLabel, IonList, IonItem, IonButton,
      IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
    },
    data () {
      return {
        requestsInfo: []
      }
    },
    methods: {
      async fetchRequests() {
          await axios
            .get('https://demo.medxa.id:8443/simrs/helpdesk/reqinfo/')
            .then(response => (this.requestsInfo = response.data.items))
      },
    },
    async mounted() {
      await this.fetchRequests()
    }
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
  </style>
  