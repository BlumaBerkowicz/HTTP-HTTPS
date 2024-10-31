// Initialize WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000');

// Elements from the DOM
const idea = document.getElementById('idea');
const errorMessage = document.getElementById('error-message');

// Listen for WebSocket messages from the server
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Check if there's an error
    if (data.error) {
        errorMessage.textContent = data.error;
    } else {
        // Update the UI with the highest bid and bidder
        idea.textContent = `hiiiiiii`;
        errorMessage.textContent = ''; // Clear any previous error messages
    }
};

// Function to place a idea
function addIdea(){
    const idea=document.getElementById('idea').value;
    console.log("im here");
    if (idea) {
        // Send the bid to the server
        ws.send(JSON.stringify({ idea }));
    } else {
        errorMessage.textContent = 'Please enter a valid name and bid amount.';
    }
}
