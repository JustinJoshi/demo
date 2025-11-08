var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbUp': thumbUp
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(thumbDown).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbDown': thumbDown
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

document.querySelector('button').addEventListener('click', run)

function run() {
  console.log('hi')
  const age = document.querySelector('input').value
  if (!+age) return console.log('has to be number')
  fetch('/api', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'age': age
    })
  })
}


//claude helped me choose chart.js, I added functionality to create chart with data from mongoDB that users put in from addSource page
const ctx = document.getElementById('activityChart');

document.querySelector('#makeChart').addEventListener('click', makeChart)

async function makeChart() {
  const url = "/dashboardChart";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("RESULT FROM MONGODB", result);

    //sort values from result
    let value = []
    Object.keys(result).forEach((e, i) => {
      value.push(result[i].value)
    })

    //create array for lables from mongoDB data
    let lables = []
    Object.keys(result).forEach((e, i) => {
      lables.push(result[i].date)
    })

    //create chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: lables,
        datasets: [{
          label: `${result[0].category}`,
          data: value,
          borderColor: '#5794f2',
          backgroundColor: 'rgba(87, 148, 242, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#2d2f33' },
            ticks: { color: '#9fa3af' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#9fa3af' }
          }
        }
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}
