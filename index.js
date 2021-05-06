class StarWarsApp {
  constructor() {
    this.API = "https://swapi.dev/api";
    this.API_TYPE = "people";
    this.API_ENDPOINT = `${this.API}/${this.API_TYPE}/`;

    this.people = [];
    this.fetchData(this.API_ENDPOINT);
  }

  async fetchData(url) {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    this.people = [...parsedResponse.results];
    console.log(this.people);
  }
}

const App = new StarWarsApp();
