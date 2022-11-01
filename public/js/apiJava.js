const rootApi = 'https://api.sportsdata.io/v3/nfl/';
const apiKey = '?key=a5e2eba777e4407396d813ee1fa5ef6d'; //process.env.API_KEY
const news = 'scores/json/News';
const season = 'scores/json/TeamSeasonStats/';
const seasonYear = '2022';
const standings = 'scores/json/Standings/';
const schedule = 'scores/json/Schedules/';
let newTeam = '';
const newsFeed = document.getElementById('newsFeed');

// gathering the team ID based on the user input
document.querySelectorAll('.logo').forEach((item) => {
  item.addEventListener('click', (event) => {
    const team = item.id;
    newTeam = team;
    getSeason();
    getStangings();
    getSchedule();
  });
});

// season stats API
const getSeason = function () {
  const newSeason = rootApi + season + seasonYear + apiKey;
  fetch(newSeason)
    .then((response) => response.json())

    .then((data) => {
      const teamData = data.filter((item) => item.Team === newTeam);
      // console.log(teamData);
      const passingYards = teamData[0].PassingYards;
      // console.log(passingYards);
      const rushingYards = teamData[0].RushingYards;
      // console.log(rushingYards);
      const touchdowns = teamData[0].Touchdowns;
      // console.log(touchdowns);
      const fieldgoalsmade = teamData[0].FieldGoalsMade;
      // console.log(fieldgoalsmade);
      const fumbles = teamData[0].Fumbles;
      const interceptions = teamData[0].InterceptionReturns;
      const FirstDowns = teamData[0].FirstDowns;
      document
        .getElementById('passing')
        .append('passing yards: ' + passingYards);
      document
        .getElementById('rushing')
        .append('Rushing yards: ' + rushingYards);
      document.getElementById('touchdowns').append('Touchdowns: ' + touchdowns);
      document
        .getElementById('field')
        .append('Fieldgoals Made: ' + fieldgoalsmade);
      document.getElementById('fumbles').append('Fumbles: ' + fumbles);
      document
        .getElementById('firstDowns')
        .append('First Downs: ' + FirstDowns);
      document
        .getElementById('interceptions')
        .append('Interceptions: ' + interceptions);
    });
};

// standings API
const getStangings = function () {
  const seasonStandings = rootApi + standings + seasonYear + apiKey;
  fetch(seasonStandings)
    .then((response) => response.json())

    .then((data) => {
      const teamData = data.filter((item) => item.Team === newTeam);

      // console.log(teamData);
      const teamName = teamData[0].Name;
      // console.log(teamName);
      const wins = teamData[0].Wins;
      // console.log(wins);
      const losses = teamData[0].Losses;
      // console.log(losses);
      const division = teamData[0].Division;
      // console.log(division);
      const conference = teamData[0].Conference;
      // console.log(conference);
      const conferenceRank = teamData[0].ConferenceRank;
      // console.log(conferenceRank);
      const divisionRank = teamData[0].DivisionRank;
      // console.log(divisionRank);

      document.getElementById('teamName').append('Team Name: ' + teamName);
      document.getElementById('wins').append('Wins: ' + wins);
      document.getElementById('losses').append('Losses: ' + losses);
      document.getElementById('division').append('Division: ' + division);
      document
        .getElementById('divisionRank')
        .append('Division Rank: ' + divisionRank);
      document.getElementById('conference').append('Conference: ' + conference);
      document
        .getElementById('conferenceRank')
        .append('Conference Rank: ' + conferenceRank);
    });
};

//! schedule API
// * this is a possible API to be used later. we need to figure out how to get games that are later than the current date
// const getSchedule = function () {
//   const nextGame = rootApi + schedule + seasonYear + apiKey;
//   fetch(nextGame)
//     .then((response) => response.json())
//     .then((data) => {
//       const teamData = data.filter(
//         (item) => item.HomeTeam === newTeam || item.AwayTeam === newTeam
//       );
//       console.log(teamData);
// *get game dates that are later than today

//       const day = teamData.Day;

//       console.log(day);
//     });
// };
