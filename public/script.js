function flipCoin() {
  fetch('/flip')
    .then(res => res.json())
    .then(data => {
      document.getElementById('result').textContent = data.result;
    })
    .catch(err => {
      console.log(err);
      alert("Backend error aa raha hai");
    });
}

function loadHistory() {
  fetch('/history')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('history');
      list.innerHTML = "";

      data.reverse().forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.result;
        list.appendChild(li);
      });
    })
    .catch(err => console.log(err));
}