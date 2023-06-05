var socket = io();

const ctx = document.getElementById("chart");
const tableHeader = `<div class="header"><strong>Title</strong><strong>Time</strong></div>`;
const list = document.querySelector("#list");
let count = 0;
let labels = [];
let dataForDays = [];
let chart;
let titles = [];

getData().then((data) => {
  drawTotalGraph();
  makeTable(data);
});

socket.on("mail-received", (data) => {
  labels = Object.keys(data).slice(-7);
  dataForDays = labels.map((date) => data[date].length);

  chartUpdate(chart);
  makeTable(data);
});

// setInterval(() => {
//   getData().then(() => {
//     chartUpdate(chart);
//     makeTable(data);
//   });
// }, 1000);

function drawTotalGraph() {
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Number or letters in a day",
          data: dataForDays,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Number of Mail recieved in a day",
          font: {
            size: 20,
          },
        },
        colors: {
          enabled: true,
        },
      },
    },
  });
}
function chartUpdate(chart) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = dataForDays;
  chart.update();
}
async function getData() {
  const res = await fetch("/api/data");
  const data = await res.json();

  labels = Object.keys(data).slice(-7);
  dataForDays = labels.map((date) => data[date].length);

  return data;
}

async function getTitles() {
  const res = await fetch("https://catfact.ninja/fact?max_length=25");
  const title = res.json();
  return title.fact;
}
function makeTable(data) {
  count = 0;
  list.innerHTML = "";
  labels.forEach((date) => {
    let dataOfDate = data[date];
    let elem = document.createElement("div");
    elem.setAttribute("class", "item");
    let heading = document.createElement("h2");
    heading.innerText =
      date == new Date().toLocaleDateString("in") ? "Today:" : date + ":";
    dataOfDate.forEach(async (time) => {
      let mail = `<div class="mail"><p>${"New mail recieved"}</p><p>${time}</p></div>`;
      count++;
      elem.innerHTML = mail + elem.innerHTML;
    });
    elem.innerHTML = tableHeader + elem.innerHTML;
    elem.prepend(heading);
    list.prepend(elem);
  });
}
