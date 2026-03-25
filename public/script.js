function flipCoin() {
  const coin = document.getElementById('coin');

  coin.classList.add('flip');

  setTimeout(() => {
    fetch('/flip')
      .then(res => res.json())
      .then(data => {
        document.getElementById('result').textContent = data.result;

        // you can later use 2 images if you want
        coin.src = "coin.png";
      })
      .catch(() => alert("Backend error aa raha hai"));

    coin.classList.remove('flip');
  }, 600);
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
    });
}