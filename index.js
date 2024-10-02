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
        breedOption.value = breed.id
        //  *  - Each option should display text equal to the name of the breed.
        breedOption.innerText = breed.name
        breedSelect.append(breedOption)
      }
  await generateCarousel(breeds[0].id)
  //  * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
  window.start()
    


}  
//  * This function should execute immediately.
// Commented out so program runs with Axios functions
// window.addEventListener('load', initialLoad)

//  * 2. Create an event handler for breedSelect that does the following:
breedSelect.addEventListener('change', async function(e){
  let newId = e.target.value
  await generateCarousel(newId)
  window.start()

})

async function generateCarousel(id){
  //  * - Each new selection should clear, re-populate, and restart the Carousel.
window.clear()
  //  * - Retrieve information on the selected breed from the cat API using fetch().
  let selectedBreedId = id
  console.log(selectedBreedId)
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
  let selectedBreed = breeds.find(breed => breed.id === selectedBreedId)
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
  console.log(selectedBreedImages)
  let n = 1
  for(let selectedBreedImage of selectedBreedImages){
    //  * - For each object in the response array, create a new element for the carousel.
    let newClone = window.createCarouselItem(selectedBreedImage.url, `${selectedBreed.name} Photo# ${n}`, selectedBreedImage.id)
    //  *  - Append each of these new elements to the carousel.
    window.appendCarousel(newClone)
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
  `

}

async function initialAxiosLoad(){
  // * - Retrieve a list of breeds from the cat API using fetch().
  let breeds = 
  axios.defaults.headers.common['X-Auth-Token'] = API_KEY;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  
  // Function to retrieve breeds
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
            withCredentials: true 
        });
        console.log(response.data); 
        return response.data; 
    } catch (error) {
        console.error(error); 
    }
  // * - Create new <options> for each of these breeds, and append them to breedSelect.
    for(let breed of breeds){
      let breedOption = document.createElement('option')
      // *  - Each option should have a value attribute equal to the id of the breed.
      breedOption.value = breed.id
      //  *  - Each option should display text equal to the name of the breed.
      breedOption.innerText = breed.name
      breedSelect.append(breedOption)
    }
await generateCarousel(breeds[0].id)
//  * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
window.start()
  


}
window.addEventListener('load', initialAxiosLoad)









/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
window.favourite = function(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
