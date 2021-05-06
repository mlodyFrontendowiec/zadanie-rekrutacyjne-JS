class StarWarsApp {
  constructor() {
    this.API = "https://swapi.dev/api";
    this.API_TYPE = "people";
    this.API_ENDPOINT = `${this.API}/${this.API_TYPE}/`;

    this.people = [];
    this.next = "";

    this.fetchData(this.API_ENDPOINT);

    this.initializeFunction();
  }

  initializeFunction() {
    this.list = document.querySelector(".main__list");
    this.button = document.querySelector(".main__button");
    this.loader = document.querySelector(".lds-facebook");
    this.search = document.querySelector(".header__search");
    this.info = document.querySelector(".main__info");

    this.addEventListeners();
  }
  addEventListeners() {
    this.button.addEventListener("click", () => this.pushNewCards());
    this.search.addEventListener("keyup", () => this.filterItems());
  }

  async fetchData(url) {
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.people = [...parsedResponse.results];
    this.next = parsedResponse.next === null ? null : parsedResponse.next;

    this.createList(this.people);
  }
  async pushNewCards() {
    this.toogleShowElement(this.button, this.loader);
    const response = await fetch(this.next);
    const parsedResponse = await response.json();
    this.next = parsedResponse.next;
    this.people = [...this.people, ...parsedResponse.results];
    this.toogleShowElement(this.button, this.loader);
    this.createList(parsedResponse.results);
    this.removeButtonLoadMore();
  }

  removeButtonLoadMore() {
    if (this.next === null) {
      this.button.classList.add("hide");
      this.search.classList.add("hide");
    }
  }

  filterItems() {
    const searchQuery = this.search.value.toLowerCase();

    searchQuery.length
      ? this.button.classList.add("hide")
      : this.button.classList.remove("hide");

    document
      .querySelectorAll(".main__list-item")
      .forEach((item) => item.classList.remove("hide"));

    const filteredItems = this.people.filter(
      ({ name }) => !name.toLowerCase().includes(searchQuery)
    );

    filteredItems.length === this.people.length
      ? this.info.classList.remove("hide")
      : this.info.classList.add("hide");

    filteredItems.forEach(({ name }) => {
      document.getElementById(name).classList.add("hide");
    });
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
    return ` <div class="main__list-item" id="${name}" >
    <h2>${name}</h2>
    <p>Height: ${height} cm</p>
    <p>Mass: ${mass} kg</p>
    <p>Birth Year: ${birth_year}</p>
    <p>Eyes Color: ${eye_color}</p>
    <p>Skin Color: ${skin_color}</p>
    <p>Gender: ${gender}</p>
  </div>`;
  }

  toogleShowElement(...elements) {
    elements.forEach((element) => element.classList.toggle("hide"));
  }
}

const App = new StarWarsApp();
