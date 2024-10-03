// import * as Carousel from "./Carousel.mjs";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_HG4AJNZqBzGY01gDEqT1q95iM6l2HiJgrjm8qRSP16EK0jzKjaL6JPSkk1LBDUn1";
// * 1. Create an async function "initialLoad" that does the following:
async function initialLoad(){
    // * - Retrieve a list of breeds from the cat API using fetch().
    let breeds = 
    await fetch('https://api.thecatapi.com/v1/breeds', {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Auth-Token": API_KEY,
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        console.log(data);
        return data
      })
      .catch(function(error) {
        console.log(error);
      });
    // * - Create new <options> for each of these breeds, and append them to breedSelect.
      for(let breed of breeds){
        let breedOption = document.createElement('option')
        // *  - Each option should have a value attribute equal to the id of the breed.
        breedOption.value = breed.id;
        //  *  - Each option should display text equal to the name of the breed.
        breedOption.innerText = breed.name;
        breedSelect.append(breedOption);
      }
  await generateCarousel(breeds[0].id);
  //  * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
  window.start();
    


}  
//  * This function should execute immediately.
// Commented out so program runs with Axios functions
// window.addEventListener('load', initialLoad)

//  * 2. Create an event handler for breedSelect that does the following:
// Commented out for Axios program to work
// breedSelect.addEventListener('change', async function(e){
//   let newId = e.target.value
//   await generateCarousel(newId)
//   window.start()

// })

async function generateCarousel(id){
  //  * - Each new selection should clear, re-populate, and restart the Carousel.
window.clear();
  //  * - Retrieve information on the selected breed from the cat API using fetch().
  let selectedBreedId = id
  let breeds = 
    await fetch('https://api.thecatapi.com/v1/breeds', {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Auth-Token": API_KEY,
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        console.log(data);
        return data
      })
      .catch(function(error) {
        console.log(error);
      });
  let selectedBreed = breeds.find(breed => breed.id === selectedBreedId);
  let selectedBreedImages = 
  await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=${selectedBreedId}`, {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-Auth-Token": API_KEY,
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(function(data) {
      console.log(data);
      return data
    })
    .catch(function(error) {
      console.log(error);
    });
  let n = 1;
  for(let selectedBreedImage of selectedBreedImages){
    //  * - For each object in the response array, create a new element for the carousel.
    let newClone = window.createCarouselItem(selectedBreedImage.url, `${selectedBreed.name} Photo# ${n}`, selectedBreedImage.id);
    //  *  - Append each of these new elements to the carousel.
    window.appendCarousel(newClone);
    n++;
  }
  //  * - Use the other data you have been given to create an informational section within the infoDump element.
  let infoDump = document.querySelector('#infoDump');
  infoDump.innerHTML = `
    <h3>${selectedBreed.name}</h3>
    <h5>${selectedBreed.description}</h5>
    <ul>
      <li>Country of Origin: ${selectedBreed.origin}</li>
      <li>Temperament: ${selectedBreed.temperament}</li>
      <li>Lifespan: ${selectedBreed.life_span}</li>
      <li>Child-Friendly Score: ${selectedBreed.child_friendly}</li>
      <li>Dog-Friendly Score: ${selectedBreed.dog_friendly}</li>
      <li>Stranger-Friendly Score: ${selectedBreed.stranger_friendly}</li>
      <li><a href=${selectedBreed.wikipedia}>Wikipedia</a></li>
    </ul
  `;

}

// * 4. Change all of your fetch() functions to axios!

async function initialAxiosLoad(){
  // * - Retrieve a list of breeds from the cat API using Axios.
  let breeds = await (async () => {
    axios.defaults.headers.common['X-Auth-Token'] = API_KEY;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    
      try {
          const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
              withCredentials: false,
              onDownloadProgress: updateProgress
          });
          console.log(response.data); 
          return response.data; 
      } catch (error) {
          console.error(error); 
      }
  })()
    for(let breed of breeds){
      let breedOption = document.createElement('option');
      breedOption.value = breed.id;
      breedOption.innerText = breed.name;
      breedSelect.append(breedOption);
    }
await generateAxiosCarousel(breeds[0].id);
//  * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
window.start();
  
}
window.addEventListener('load', initialAxiosLoad);

async function generateAxiosCarousel(id){
    //  * - Each new selection should clear, re-populate, and restart the Carousel.
  window.clear();
  //  * - Retrieve information on the selected breed from the cat API using Axios().
  let selectedBreedId = id;
  let breeds = await (async () => {
    axios.defaults.headers.common['X-Auth-Token'] = API_KEY;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    
      try {
          const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
              withCredentials: false,
              
          });
          console.log(response.data); 
          return response.data; 
      } catch (error) {
          console.error(error); 
      }
  })();
    for(let breed of breeds){
      let breedOption = document.createElement('option');
      breedOption.value = breed.id;
      breedOption.innerText = breed.name;
      breedSelect.append(breedOption);
    }
  let selectedBreed = breeds.find(breed => breed.id === selectedBreedId);
  let selectedBreedImages = await (async () => {
    axios.defaults.headers.common['X-Auth-Token'] = API_KEY;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
      try {
          const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=${selectedBreedId}`, {
              withCredentials: false,
              // - Pass this function to the axios onDownloadProgress config option in your event handler.
              onDownloadProgress: updateProgress
          });
          console.log(response.data); 
          return response.data; 
      } catch (error) {
          console.error(error); 
      }
    }) ()
  let n = 1
  for(let selectedBreedImage of selectedBreedImages){
    //  * - For each object in the response array, create a new element for the carousel.
    let newClone = window.createCarouselItem(selectedBreedImage.url, `${selectedBreed.name} Photo# ${n}`, selectedBreedImage.id);
    //  *  - Append each of these new elements to the carousel.
    window.appendCarousel(newClone);
    n++
  }
  //  * - Use the other data you have been given to create an informational section within the infoDump element.
  let infoDump = document.querySelector('#infoDump')
  infoDump.innerHTML = `
    <h3>${selectedBreed.name}</h3>
    <h5>${selectedBreed.description}</h5>
    <ul>
      <li>Country of Origin: ${selectedBreed.origin}</li>
      <li>Temperament: ${selectedBreed.temperament}</li>
      <li>Lifespan: ${selectedBreed.life_span}</li>
      <li>Child-Friendly Score: ${selectedBreed.child_friendly}</li>
      <li>Dog-Friendly Score: ${selectedBreed.dog_friendly}</li>
      <li>Stranger-Friendly Score: ${selectedBreed.stranger_friendly}</li>
      <li><a href=${selectedBreed.wikipedia}>Wikipedia</a></li>
    </ul
  `;
}


breedSelect.addEventListener('change', async function(e){
  let newId = e.target.value;
  await generateAxiosCarousel(newId);
  window.start();

})

// * 5. Add axios interceptors to log the time between request and response to the console.
axios.interceptors.request.use(config => {
  //  * - In your request interceptor, set the body element's cursor style to "progress."
  document.body.style.cursor = 'progress';
  // * - In your request interceptor, set the width of the progressBar element to 0%.
  progressBar.style.width = '0%';
  config.metadata = { startTime: new Date() };
  console.log(`Request started: ${config.url} at ${config.metadata.startTime}`) ;
  return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  // * - In your response interceptor, remove the progress cursor style from the body element.
  document.body.style.cursor = 'default';
  const endTime = new Date();
  const timeTaken = endTime - response.config.metadata.startTime;
  console.log(`Response received from ${response.config.url} at ${endTime} in ${timeTaken}ms`);
  return response;
}, error => {
  return Promise.reject(error);
});


// * - Create a function "updateProgress" that receives a ProgressEvent object.
function updateProgress(progressEvent) {
  if (progressEvent.lengthComputable) {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    // *  - You need only to modify its "width" style property to align with the request progress.
    // *  - Update the progress of the request using the properties you are given.
    progressBar.style.width = `${percentCompleted}%`;
    // * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
    console.log(progressEvent);
  }
}
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - .
 * - The API documentation gives examples of this functionality using fetch(); use Axios!

 * - You can call this function by clicking on the heart at the top right of any image.
 */
window.favourite = async function(imgId) {
  let favourites = await window.getFavourites()
  console.log(favourites)
  // * - Add additional logic to this function such that if the image is already favourited,
  // *   you delete that favourite using the API, giving this function "toggle" functionality.
  let match = favourites.find(favourite => favourite.image_id === imgId)
  if(match){
    await window.deleteFavourite(match.id)
  } else{
    await window.saveFavourite(imgId)
  }

}
// * 9. Test your favourite() function by creating a getFavourites() function.
// * - Use Axios to get all of your favourites from the cat API.
window.getFavourites = async function(){
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/favourites/`, {
      headers: {
        'x-api-key': API_KEY
      },
    });
    
    console.log('Success getting favourites:', response.data);
    return response.data
  } catch (error) {
    console.error('Error getting favourites:', error.response ? error.response.data : error.message);
  }
};


window.saveFavourite = async function(imgId){
  let rawBody = {
    image_id: imgId
  };
  try {
     let newFavourite = await axios.post(
      'https://api.thecatapi.com/v1/favourites',
      rawBody,
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(newFavourite.data); 
  } catch (error) {
    console.error(error);
  }
}

window.deleteFavourite = async function(imgId){
  try {
    const response = await axios.delete(`https://api.thecatapi.com/v1/favourites/${imgId}`, {
      headers: {
        'x-api-key': API_KEY,  
      },
    });
    console.log('Favourite deleted:', response.data);
  } catch (error) {
    console.error('Error deleting favourite:', error.response ? error.response.data : error.message);
  }
};
/**



 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
// *  - You will have to bind this event listener to getFavouritesBtn yourself.
getFavouritesBtn.addEventListener('click', async function(){
  let favourites = await window.getFavourites();
  // * - Clear the carousel and display your favourites when the button is clicked.
  window.clear();
  infoDump.innerHTML = ''
  for(let favourite of favourites){
      //  * - For each object in the response array, create a new element for the carousel.
      let newClone = window.createCarouselItem(favourite.image.url, `${favourite.name} PhotoId ${favourite.image.id}`, favourite.image.id);
      //  *  - Append each of these new elements to the carousel.
      window.appendCarousel(newClone);
  }
  

})
