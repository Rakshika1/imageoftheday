const datepicker = document.getElementById("datepicker");
const imageContainer = document.getElementById("imageContainer");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const infoContainer = document.getElementById("infoContainer");

async function GetImage() {
    const inputDate = Datepicker.value;

    try {
        const response = await fetch(`/api/image?date=${inputDate}`);
        if (!response.ok) {
            throw new Error("Failed to fetch image");
        }
        
        const data = await response.json();

        if (data.url) {
            imageContainer.innerHTML = `<img src="${data.url}" alt="NASA Image of the day"/>`;
            titleElement.textContent = data.title;
            descriptionElement.textContent = data.explanation;

            infoContainer.classList.remove("hidden");
        } else {
            alert("No image found for the selected date");
        }
    } catch (error) {
        alert("Failed to fetch image. Please try again later.");
    }
}

