// Input provider, intended to be changed depending on use

export default function getInputs() {
   let count = document.getElementById("amount").value;
   let tolerance = document.getElementById("tolerance").value;
   let speed = 100 / document.getElementById("speed").value;
   let color = document.getElementById("color").value;

   return input = {count:count, tolerance:tolerance, speed:speed, color:color}
}
