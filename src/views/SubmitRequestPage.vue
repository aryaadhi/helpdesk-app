<template>
    <ion-page>
    <ion-header :aria-colindex="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Submit Request</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Submit Request</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <form class="ion-padding" @submit.prevent="submitForm">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Request Priority</ion-label>
          <ion-range :ticks="true" :snaps="true" :min="1" :max="5" v-model="enteredRating"></ion-range>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Your Request</ion-label>
          <ion-textarea rows="5" v-model="enteredRequest"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating">App Feature</ion-label>
          <ion-input type="text" required v-model="enteredFeatures" />
        </ion-item>
        <ion-item>
          <ion-select interface="action-sheet" placeholder="Select category">
            <ion-select-option v-for="reqcat in requestCategories" :key="reqcat.id" 
            value=reqcat.lookup_value v-model="enteredCategory">{{reqcat.lookup_code}}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button type="submit" expand="block">Submit</ion-button>
    </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useHelpdesk, createRequestUrl, getRequestCategoryUrl } from '../model/helpdesk-use';
import {IonList, IonItem, IonLabel, IonInput, 
    IonTextarea, IonButton, IonRange, IonSelect, IonSelectOption} from '@ionic/vue';
import axios from 'axios'; 

export default defineComponent({
    components: {
      IonList,
      IonItem,
      IonLabel,
      IonInput,
      IonTextarea,
      IonButton,
      IonRange,
      IonSelect, IonSelectOption
    },
    setup () {
      const { requestCategories, fetchRequestCategory } = useHelpdesk();
      onMounted(fetchRequestCategory);

      return {
        requestCategories,
      }
    },
    data() {
      return {
        enteredRequest: "",
        enteredFeatures: "",
        enteredRating: "",
        postResponse: "",
        enteredCategory: ""
      };
    },
    methods: {
      submitForm() {
        const postData = {user_id: 1, request: this.enteredRequest, priority: this.enteredRating, 
          feature: this.enteredFeatures, category: this.enteredCategory};
        axios
          .post(createRequestUrl, postData)
          .then(response => (this.postResponse = response.data))
          .catch(error => {
            this.postResponse = `Error: ${error.message}`;
            console.error('There was an error!', error);
          });
      }
    },
})
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