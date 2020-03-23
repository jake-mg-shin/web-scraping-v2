const axios = require("axios"),
  cheerio = require("cheerio"),
  fs = require("fs");

loop = () => {
  for (let i = 1; i < 25; i++) {
    const writeStream = fs.createWriteStream(
      "volunteerConnector" + [i] + ".csv"
    );

    const url1 =
      "https://www.volunteerconnector.org/organizations/page-" + [i] + "/";
    const url2 = "https://www.volunteerconnector.org";

    let links1 = [];
    let links2 = [];

    getData = async () => {
      await links2.forEach(link => {
        axios
          .get(link)
          .then(res => {
            // console.log(res);
            const $ = cheerio.load(res.data);
            const $bodyList = $("div.profile");

            $bodyList.each(function(i, el) {
              const name = $(this)
                .find("div.follow")
                .next("h1.name")
                .text();
              const address = $(this)
                .find("div.address")
                .text()
                .slice(20)
                .trim()
                .replace(/(\s*)/g, "");
              const phone = $(this)
                .find("div.phone")
                .text()
                .trim();
              const email = $(this)
                .find("div.email")
                .children("a")
                .text();
              const website = $(this)
                .find("div.website")
                .children("a")
                .text();

              console.log(name, phone, email, website, address);

              // Write header on CSV
              // writeStream.write(`name, address, phone, email, website \n`);

              // Write row to CSV
              writeStream.write(
                `${name}, ${phone}, ${email}, ${website}, ${address} \n`
              );
            });
          })
          .catch(err => {
            // console.log(err);
            console.log("getData request err");
          });
      });
    };

    makeUrl = () => {
      links1.forEach(link => {
        const _link = url2 + link;
        // console.log(_link);

        links2.push(_link);
      });
      console.log(links2);

      getData();
    };

    getLinks = async () => {
      await axios
        .get(url1)
        .then(res => {
          const $ = cheerio.load(res.data);
          const $bodyList = $("div.is-parent");

          $bodyList.each(function(i, el) {
            const link = $(this)
              .find("a")
              .attr("href");

            // console.log(link);
            links1.push(link);
          });
          console.log(links1);
        })
        .then(() => {
          makeUrl();
        })
        .catch(err => {
          console.log(err);
        });
    };

    init = () => {
      getLinks();
    };

    init();
  }
};

// loop();

const writeStream = fs.createWriteStream("volunteerConnector24.csv");

const url1 = "https://www.volunteerconnector.org/organizations/page-24/";
const url2 = "https://www.volunteerconnector.org";

let links1 = [];
let links2 = [];

getData = async () => {
  await links2.forEach(link => {
    axios
      .get(link)
      .then(res => {
        // console.log(res);
        const $ = cheerio.load(res.data);
        const $bodyList = $("div.profile");

        $bodyList.each(function(i, el) {
          const name = $(this)
            .find("div.follow")
            .next("h1.name")
            .text();
          const address = $(this)
            .find("div.address")
            .text()
            .slice(20)
            .trim()
            .replace(/(\s*)/g, "");
          const phone = $(this)
            .find("div.phone")
            .text()
            .trim();
          const email = $(this)
            .find("div.email")
            .children("a")
            .text();
          const website = $(this)
            .find("div.website")
            .children("a")
            .text();

          console.log(name, phone, email, website, address);

          // Write header on CSV
          // writeStream.write(`name, address, phone, email, website \n`);

          // Write row to CSV
          writeStream.write(
            `${name}, ${phone}, ${email}, ${website}, ${address} \n`
          );
        });
      })
      .catch(err => {
        // console.log(err);
        console.log("getData request err");
      });
  });
};

makeUrl = () => {
  links1.forEach(link => {
    const _link = url2 + link;
    // console.log(_link);

    links2.push(_link);
  });
  console.log(links2);

  getData();
};

getLinks = async () => {
  await axios
    .get(url1)
    .then(res => {
      const $ = cheerio.load(res.data);
      const $bodyList = $("div.is-parent");

      $bodyList.each(function(i, el) {
        const link = $(this)
          .find("a")
          .attr("href");

        // console.log(link);
        links1.push(link);
      });
      console.log(links1);
    })
    .then(() => {
      makeUrl();
    })
    .catch(err => {
      console.log(err);
    });
};

init = () => {
  getLinks();
};

init();
