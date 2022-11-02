const newTeam = '';
document.querySelectorAll('.logo').forEach((item) => {
  item.addEventListener('click', (event) => {
    const team = item.id;
    newTeam = team;
  });
});
// send team info to /models/user.js
