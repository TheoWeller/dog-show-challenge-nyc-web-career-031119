document.addEventListener('DOMContentLoaded', () => {
  //load dogs
  fetch("http://localhost:3000/dogs")
  .then(resp => resp.json())
  .then(renderEachDoggo)

  //find edit button
  const editBtn = document.querySelector(".edit-btn")

  //find form
  const form = document.getElementById("dog-form")

  //find table
  const table = document.querySelector("#table-body")

  //dog loader helper functionality
  function renderEachDoggo(dogs) {
    dogs.forEach(dog => {
      let html = `<tr id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit-btn">Edit</button></td></tr>`
      table.innerHTML += html
    })
  }

let name = "";
let breed = "";
let sex = "";
let dogId = 0;

  //Edit addEventListener
  table.addEventListener("click", function(e) {
    if(e.target.className === "edit-btn") {
      // console.log(e.target.parentNode.parentNode.id);
      //selected dog values
      let currentName = e.target.parentNode.parentNode.childNodes[0].innerText
      let currentBreed = e.target.parentNode.parentNode.childNodes[2].innerText
      let currentSex = e.target.parentNode.parentNode.childNodes[4].innerText

      document.getElementById("dog-form").childNodes[1].value = currentName
      document.getElementById("dog-form").childNodes[3].value = currentBreed
      document.getElementById("dog-form").childNodes[5].value = currentSex

    }
      name = document.getElementById("dog-form").childNodes[1].value
      breed = document.getElementById("dog-form").childNodes[3].value
      sex = document.getElementById("dog-form").childNodes[5].value
      dogId = e.target.parentNode.parentNode.id

      console.log(name);
  })

  // console.log("poop");


    form.addEventListener("submit", function(e){
        e.preventDefault();
        name = document.getElementById("dog-form").childNodes[1].value
        breed = document.getElementById("dog-form").childNodes[3].value
        sex = document.getElementById("dog-form").childNodes[5].value

        let data = {
            name: name,
            breed: breed,
            sex: sex
          }


          fetch(`http://localhost:3000/dogs/${dogId}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              }).then(() => {
                table.innerHTML = "";
                fetch("http://localhost:3000/dogs")
                .then(resp => resp.json())
                .then(renderEachDoggo);

              }).catch(errors => console.log(errors))

          })

        })
      //form values
