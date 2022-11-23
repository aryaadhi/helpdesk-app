import { ref } from "vue";
import { TicketModel, RequestModel, RequestCategoryModel } from './helpdesk-model';
import axios from 'axios';

const createRequestUrl = 'https://demo.medxa.id:8443/simrs/helpdesk/rest/request';
const submitFeedbackUrl = 'https://demo.medxa.id:8443/simrs/helpdesk/rest/closetiket';
const getRequestCategoryUrl = 'https://demo.medxa.id:8443/simrs/helpdesk/rest/reqcategory';
const getRequestInfoUrl = 'https://demo.medxa.id:8443/simrs/helpdesk/reqinfo/';
const getTicketInfoUrl = 'https://demo.medxa.id:8443/simrs/helpdesk/tickets/';

const tickets = ref<TicketModel>();
const requests = ref<RequestModel>();
const requestCategories = ref<RequestCategoryModel>();

let postResponse = '';

async function fetchRequestCategory() {
    await axios
      .get(getRequestCategoryUrl)
      .then(response => (requestCategories.value = response.data.items))
}

async function fetchTickets() {
    await axios
      .get(getTicketInfoUrl)
      .then(response => (tickets.value = response.data.items))
}

async function fetchActiveTickets() {
    await axios
      .get(`$(getTicketInfoUrl)`)
      .then(response => (tickets.value = response.data.items))
}

async function fetchRequests() {
    await axios
      .get(getRequestInfoUrl)
      .then(response => (requests.value = response.data.items))
}

async function submitFeedback(postData: string) {
    await axios
      .post(submitFeedbackUrl, postData)
      .then(response => (postResponse = response.data))
      .catch(error => {
        postResponse = `Error: ${error.message}`;
        console.error('There was an error!', error);
      });
}

async function createRequest(postData: string) {
    await axios
      .post(createRequestUrl, postData)
      .then(response => (postResponse = response.data))
      .catch(error => {
        postResponse = `Error: ${error.message}`;
        console.error('There was an error!', error);
      });
}

export function useHelpdesk() {
    return {
        tickets,
        fetchTickets,
        fetchActiveTickets,
        requests,
        fetchRequests,
        requestCategories,
        fetchRequestCategory,
        createRequest,
        submitFeedback,
    }
  }

  export { createRequestUrl, submitFeedbackUrl, getRequestCategoryUrl }