<template>
  <div class="current-weather">
    <select v-model="selected" class="city-dropdown">
      <option disabled value="">Sélectionner une ville</option>
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>

    <div class="search-button">
      <p></p>
      <button><router-link  :to="'/currentWeather/' + selected">Voir la météo</router-link></button>

      <button @click="fetchData">Charger les données</button>
      <!--<button v-if="meteoDonnee==null" @click="search(selected)">Rechercher</button> -->
   </div>



   <!-- Affichez les informations seulement si search() a été appelé et que les données sont disponibles -->
    <div v-if="meteoDonnee" class="weather-info">
      <h2>Où : {{ meteoDonnee.city }}</h2>
      <p v-if="meteoDonnee.temperature">Température : {{ meteoDonnee.temperature }} °C</p>
      <p v-if="!meteoDonnee.temperature">Impossible de récuperer la méteo actuel de {{ meteoDonnee.city }}</p>
      <p>Date : {{ formattedDate }}</p>


      <chart-maker v-if="meteoDonnee" v-bind:params="chartParams">
      </chart-maker>

    </div>

    <div  v-if="meteoDonnee" class="search-button">
      <p></p>
      <button><router-link  :to="'/currentWeather/' ">Retour à l'accueil</router-link></button>
      <!--<button v-if="meteoDonnee==null" @click="search(selected)">Rechercher</button> -->
    </div>

  </div>
</template>


<script>
import moment from 'moment';
import axios from 'axios';
//import ChartMaker from 'vue-chartmaker';




export default {
  name: 'CurrentWeather',
  data() {
    return {
      selected: this.$route.params.city || '', // Utilisez le paramètre de l'URL comme valeur initiale
      options: ['Paris', 'Nice', 'Barcelone'],
      meteoDonnee: null
    };
  },
  computed: {
    formattedDate() {
      return moment().locale('fr').format('LL');
    },
  },
  methods: {
    fetchData() {
      const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4dcc2218a9bf517e2c98a9da0ca721cd';

      // Fonction de réussite (resolveCallback) en gros response est un objet ou tout est stocke il faut utiliser
      // un systeme de .data pour recuperer les données

      const resolveCallback = response => {
        // Traite les données de la réponse ici
        console.log(response.data);
      };

      // Fonction d'échec (rejectCallback)
      const rejectCallback = error => {
        console.error('Erreur lors de la requête :', error);
      };

      // Effectuer la requête Axios avec les callbacks de réussite et d'échec
      axios.get(requestUrl).then(resolveCallback, rejectCallback);

    },
    search(ville) {
      // Logique de recherche avec la ville ici (par exemple, appel à une API)
      // Mettez à jour votre composant avec les résultats de la recherche

      // Dans cet exemple, générons une température aléatoire entre 1 et 32
      const randomTemperature = Math.floor(Math.random() * 32) + 1;

      switch (ville) {
        case 'Paris':
          this.meteoDonnee = { temperature: randomTemperature, city: ville }; // Remplacez cela par les données réelles
          break;
        case 'Nice':
          this.meteoDonnee = {temperature: randomTemperature, city: ville }; // Remplacez cela par les données réelles
          break;
        case 'Barcelone':
          this.meteoDonnee = { temperature: randomTemperature, city: ville }; // Remplacez cela par les données réelles
          break;
        default:
          this.meteoDonnee = null;
      }
    },
  },
  watch: {
    '$route.params.city': function(newCity) {
      this.selected = newCity || ''; // Mettez à jour la ville sélectionnée lorsque le paramètre de l'URL change
      this.search(newCity); // Effectuez la recherche avec la nouvelle ville
    },
  },
};
</script>

<style scoped>
.current-weather {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
}

.city-dropdown {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.search-button button:hover {
  background-color: #45a049;
}

.weather-info {
  margin-top: 20px;
  font-size: 18px;
}
</style>
