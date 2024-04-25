function GetImage() {
    const inputDate = document.getElementById("Datepicker").value;
    const apiKey = "XJK84sm35DyvL8ojlIUw5AeDR9Pxrp4tg76hehdL";
    const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${inputDate}`;
    fetch(apiURL).then(response => response.json()).then(data => {
        if(data.url){
            const imageContainer = document.getElementById("imageContainer");
            imageContainer.innerHTML = `<img src=${data.url} alt="Nasa Image of the day"/>`;

            const titleElement = document.getElementById("title");
            titleElement.textContent = data.title;

            // console.log(data.title)

            const Description = document.getElementById("description");
            Description.textContent = data.explanation;
            document.getElementById("infoContainer").classList.remove("hidden");
        }
        else {
            alert("No image found for the selected date");


        }


            

        }
    )
    .catch(error => {
        alert("An error occured,please try again later");
    })
    // console.log(inputDate)

}