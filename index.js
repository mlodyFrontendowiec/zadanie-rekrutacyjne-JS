class StarWarsApp {
  constructor() {
    this.API = "https://swapi.dev/api";
    this.API_TYPE = "people";
    this.API_ENDPOINT = `${this.API}/${this.API_TYPE}/`;

    this.people = [];
    this.previous = "";
    this.next = "";

    this.list = document.querySelector(".main__list");
    this.button = document.querySelector(".main__button");
    this.initializeFunction();
  }

  initializeFunction() {
    this.fetchData(this.API_ENDPOINT);

    this.button.addEventListener("click", () => {
      this.pushNewCards();
    });
  }

  async fetchData(url) {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    this.people = [...parsedResponse.results];
    this.next = parsedResponse.next === null ? "" : parsedResponse.next;

    this.createList(this.people);
  }
  async pushNewCards() {
    const response = await fetch(this.next);
    const parsedResponse = await response.json();
    console.log(parsedResponse.results);

    this.next = parsedResponse.next;
    this.people = [...this.people, ...parsedResponse.results];
    this.createList(parsedResponse.results);
  }

  createList(items) {
    this.list.insertAdjacentHTML("beforeend", [
      items.map((item) => this.createListItem(item)).join(""),
    ]);
  }

  createListItem({
    name,
    height,
    mass,
    skin_color,
    eye_color,
    birth_year,
    gender,
  }) {
    return ` <div class="main__list-item">
    <h2>${name}</h2>
    <p>Height: ${height} cm</p>
    <p>Mass: ${mass} kg</p>
    <p>Birth Year: ${birth_year}</p>
    <p>Eyes Color: ${eye_color}</p>
    <p>Skin Color: ${skin_color}</p>
    <p>Gender: ${gender}</p>


  </div>`;
  }
}

const App = new StarWarsApp();
