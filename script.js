const searchBar = document.getElementById('searchBar');
const suggestionsList = document.getElementById('suggestions');

// Function to load previous searches from local storage
function loadPreviousSearches() {
  let searches = localStorage.getItem('previousSearches');
  return searches ? JSON.parse(searches) : []; // If no searches, return empty array
}

// Function to save a search to local storage
function saveSearch(searchTerm) {
  let searches = loadPreviousSearches();
  if (!searches.includes(searchTerm)) { 
    searches.push(searchTerm); 
    localStorage.setItem('previousSearches', JSON.stringify(searches));
  }
}

// Function to display suggestions
function displaySuggestions(searches) {
  suggestionsList.innerHTML = ''; // Clear previous suggestions

  if (searches.length > 0) {
    searches.forEach(search => {
      let li = document.createElement('li');
      li.textContent = search;
      li.addEventListener('click', () => {
        searchBar.value = search;
        suggestionsList.innerHTML = ''; // Clear suggestions after selection
      });
      suggestionsList.appendChild(li);
    });
  }
}

// Event listener for search bar input
searchBar.addEventListener('input', () => {
  let searchTerm = searchBar.value.toLowerCase();
  let previousSearches = loadPreviousSearches();
  let filteredSearches = previousSearches.filter(search => 
    search.toLowerCase().includes(searchTerm)
  );
  displaySuggestions(filteredSearches);
});

// Optional: Load and display previous searches on page load
window.addEventListener('load', () => {
  let previousSearches = loadPreviousSearches();
  displaySuggestions(previousSearches); 
});