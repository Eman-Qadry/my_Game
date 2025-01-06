
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

// Sort users in descending order by score
allUsers.sort((a, b) => b.score - a.score);

// Get the top 10 users
let top10Users = allUsers.slice(0, 10);

// Populate the leaderboard
const leaderboard = document.getElementById("user-scoreboard");

top10Users.forEach((user, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${user.name}: ${user.score}`;
    leaderboard.appendChild(listItem);
});
