const API_KEY = "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";
const url0 = 'https://api.openai.com/v1/images/generations'

//variable Initialization

const submitIcon = document.querySelector("#submit-icon");
const inputValue = document.querySelector("input");
const imageSection = document.querySelector(".images-section");
const loading =  document.querySelector(".loading");

//Function to get images

const getImages = async () => {

    const options = {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                prompt: inputValue.value,
                n: 4,
                size: "1024x1024"
            }
        )
    }

    try{
         const response = await fetch(url0, options);
         const data = await response.json();
        //mapping the response value onto

        data ?.data.forEach(imageObject => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', imageObject.url);
            imageContainer.append(imageElement);
            imageSection.append(imageContainer);
        })
    } catch(error){
        console.log(error);
    }

    loadAnimation();
    setTimeout( eraseAnimation, 5000);
}

const loadAnimation = () => {
    if(getImages){
       loading.style.display="block";
    }
}
const eraseAnimation = () => {
    if(getImages){
       loading.style.display="none";
    }
}

const getImagesEnter =  async (e) => {
    if(e.code === 'Enter'){
        const runResponse  = await  getImages();
        return runResponse;
    }
}

window.onload = () => {
    document.addEventListener("keydown", getImagesEnter);
};

submitIcon.addEventListener("click", getImages);
