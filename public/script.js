async function flip() {
  const coin = document.getElementById("coin");
  const resultText = document.getElementById("result");

  // animation feel
  coin.style.transform = "rotateY(180deg)";
  resultText.innerText = "Flipping...";

  const res = await fetch('/flip');
  const data = await res.json();

  setTimeout(() => {
    resultText.innerText = data.result;

    if (data.result === "Heads") {
      coin.src = "heads.png";
    } else {
      coin.src = "tails.png";
    }

    coin.style.transform = "rotateY(0deg)";
  }, 300);
}