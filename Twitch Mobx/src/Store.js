import { observable, action, autorun } from "mobx";

class Store {
  @observable twitch;
  @observable loading;
  @observable err;
  @observable display;

  constructor() {
    this.twitch = [];
    this.loading = true;
    this.err = false;
    this.display = "";
    this.fetchData();
  }

  @action fetchData() {
    const promStream = fetch("https://api-express.glitch.me/streams")
      .then(res => res.json())
      .catch(err => console.error(err));
    const promChannel = fetch("https://api-express.glitch.me/channels")
      .then(res => res.json())
      .catch(err => console.error(err));

    Promise.all([promStream, promChannel])
      .then(res => {
        console.log(res[0]);

        let arr = [];
        for (let item1 of res[0]) {
          if (item1.stream === undefined) {
            arr.push({ channel: "undefined" });
          } else if (item1.stream === null) {
            for (let item of res[1]) {
              // if no stream but need name
              if (item._links.self === item1._links.channel) {
                // if the same channel
                arr.push({
                  id: item._id,
                  channel: `https://www.twitch.tv/${item.name}`,
                  stream: "offline",
                  name: item.display_name,
                  logo: item.logo
                });
              }
            }
          } else {
            arr.push({
              id: item1.stream.channel._id,
              channel: `https://www.twitch.tv/${
                item1.stream.channel.display_name
              }`,
              self: item1._links.self, // not available without api
              stream: "online",
              name: item1.stream.channel.display_name,
              game: item1.stream.game,
              status: item1.stream.channel.status,
              logo: item1.stream.channel.logo,
              video_banner: item1.stream.channel.video_banner
            });
          }
        }
        return arr;
      })
      .then(res => {
        this.isLoading(false);
        this.addTwitch(res);
      })
      .catch(() => this.isError(true));
  }

  @action addTwitch(data) {
    // action
    this.twitch = data;
  }

  @action isLoading(bool) {
    this.loading = bool;
  }
  @action isError(bool) {
    this.err = bool;
  }
}

const store = new Store();

/*autorun(() => {
  store.display = "tt"
  // console.log(store.display); // observerArr to JS arr
});*/

export default store;
