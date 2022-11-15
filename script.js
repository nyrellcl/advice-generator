const apiLink = "https://api.adviceslip.com/advice";
const adviceSpan = document.querySelector('.advice-number');
const adviceQuote = document.querySelector('.advice-quote');
const adviceBtn = document.querySelector('.advice-button');
/**
 * This requests the data so we can access said data inside the fetchAdvice
 * function
 * The response is in JSON, not in JS
 * Need to convert JSON request into JS in order to work with the reponse
 */
const fetchAdvice = async () => {
    const response = await fetch(apiLink)
    const advice = await response.json()
    return advice
}

/**
 * this function is responsible for generating a new advice and going through
 * the data and display it for the user
 */

const renderAdvice = (adviceObj) => {
    const { id, advice } = adviceObj;
    //textContent sets text of an HTML element to the data from the API
    adviceSpan.textContent = `ADVICE #${id}`;
    adviceQuote.textContent = advice
};

/**
 * This code will work with the JSON response to convert it to JS and access the
 * data inside and convert to JS
 * 
 */
const generateAdvice = async () => {
    const data = await fetchAdvice()
    const advice = data.slip;
    const buttonClick = adviceBtn.getAttribute("aria-expanded") === "false";
    renderAdvice(advice)
    if (buttonClick) {
        adviceBtn.setAttribute("aria-expanded", "true");
        setTimeout(()=>{
            adviceBtn.setAttribute("aria-expanded", "false")
        }, 500)
    }

};
/**
     * references the window and adds an event listener DOMContentLoaded
     * this event fires when HTML doc is completely loaded without waiting
     * for stylesheets and imgs
     * After that, we add another event listener, when the advice button
     * is clicked, it calls the generateAdvice function to generate a new adivce 
     * from the API data
     */
window.addEventListener('DOMContentLoaded', () => {

    adviceBtn.addEventListener('click', generateAdvice)
});
