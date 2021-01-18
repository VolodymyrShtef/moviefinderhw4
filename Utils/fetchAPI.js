export default function fetchAPI(string, string2 = "") {
  return fetch(
    `https://api.themoviedb.org/3/${string}?api_key=d8156ffe5031a29b90b514e3d70f6ab1${string2}`
  )
    .then((response) => response.json())
    .then((APIanswer) => APIanswer)
    .catch((error) => alert(error.message));
}
