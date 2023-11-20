// Define the global storage entity
var PlayerRegistrationData = [];

// Data collection logic
var playerData = {};

// Task 2: Register function
function Register() {
    // Retrieve form input values
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var dob = document.getElementById('dob').value;
    var age = calculateAge(dob);
    var gender = document.getElementById('gender').value;
    var email = document.getElementById('email').value;

    // Validate required fields
    if (firstName === '' || lastName === '' || dob === '' || gender === '') {
        alert('Please fill in all required fields.');
        return false;
    }

    // Perform additional validation
    if (firstName.length < 4 || lastName.length < 4) {
        alert("First and Last Name must be more than three characters in length.");
        return;
    }

    // Check if age is between 8 and 12
    if (age < 8 || age > 12) {
        alert('Players must be between the ages of 8 and 12 to register.');
        return false;
    }

    // Initialize playerData object properties
    playerData = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        age: age,
        gender: gender,
        email: email,
        correctAnswer: 0,
        incorrectAnswer: 0,
        totalQuestions: 0,
        percentageScore: 0,
        equation: [],
        Response: [],
        correctResponses: [],
    };

    alert("Player has been Registered");

    // Disable form fields and Register button
    document.getElementById("firstName").disabled = true;
    document.getElementById("lastName").disabled = true;
    document.getElementById("dob").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("gender").disabled = true;
    document.getElementById("registerButton").disabled = true;

    // Enable Start and End buttons
    document.getElementById("startButton").disabled = false;
    document.getElementById("endButton").disabled = false;

    // Calculate age based on DOB
    document.getElementById("dob").addEventListener("input", function () {
        const dob = new Date(this.value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dob.getFullYear();
        document.getElementById("age").value = age;
    });

    return false;
}

// Calculate age function
function calculateAge() {
    var dobInput = document.getElementById("dob");
    var ageInput = document.getElementById("age");

    // If DOB is not empty
    if (dobInput.value) {
        // Get current date and birth date from input field
        var today = new Date();
        var birthDate = new Date(dobInput.value);

        // Calculate age based on year difference
        var age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Display age in age input field
        ageInput.value = age;
    } else {
        // Reset age input field if DOB is empty
        ageInput.value = "";
    }
}

// JavaScript for email validation
function validateEmail() {
    var emailInput = document.getElementById("email");
    var errorMessage = document.getElementById("emailErrorMessage");

    // Regular expression to check for a valid Gmail email
    var gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (gmailRegex.test(emailInput.value)) {
        // Valid Gmail email
        errorMessage.textContent = "";
    } else {
        // Invalid email, show error message
        errorMessage.textContent = "Please enter a valid Gmail email address.";
    }
}

// Task 4: PlayGame function
function PlayGame() {
    // Generate random numbers
    var number1 = Math.floor(Math.random() * 9) + 1;
    var number2 = Math.floor(Math.random() * 5) + 1;

    // Show the equation in the play area
    var equation = number1 + " * " + number2;
    document.getElementById("equation").innerHTML = equation;

    // Store the current equation for later validation
    currentEquation = {
        number1: number1,
        number2: number2,
    };
}

// Event listener for the "Start" button
document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("PlayGame").disabled = false;
    document.getElementById("userAnswer").disabled = false;
    document.getElementById("checkButton").disabled = false;
    document.getElementById("nextButton").disabled = false;
});

// Update the player's data on the leaderboard and display all updated statistics
showAllStats();

// Task 5: Start function
function Start() {
    document.getElementById('startButton').addEventListener('click', function () {
        // Call the PlayGame() function
        PlayGame();

        // Enable the Play area
        document.getElementById('PlayGame').disabled = false;

        // Enable the answer input, Accept button, and Next button
        document.getElementById('answerInput').disabled = false;
        document.getElementById('acceptButton').disabled = false;
        document.getElementById('nextButton').disabled = false;

        // Disable the multiplication number inputs
        var numbers = document.getElementsByClassName('number');
        for (var i = 0; i < numbers.length; i++) {
            numbers[i].disabled = true;
        }
    });
}

// Task 6: checkAnswer function
function checkAnswer() {
    // Get the player's answer from the input field
    var playerAnswer = document.getElementById("userAnswer").value;

    // Validate if the answer is not empty
    if (playerAnswer.trim() === "") {
        alert("Please enter your answer.");
        return;
    }

    // Validate if the answer is a number
    if (isNaN(playerAnswer)) {
        alert("Please enter a valid number.");
        return;
    }

    // Calculate the correct answer
    var correctAnswer = currentEquation.number1 * currentEquation.number2;

    // Check if the player's answer is correct
    var isCorrect = parseInt(playerAnswer) === correctAnswer;

    // Append data to PlayerRegistrationData
    PlayerRegistrationData.push({
        equation: currentEquation.number1 + " * " + currentEquation.number2,
        userAnswer: playerAnswer,
        isCorrect: correctAnswer,
    });

    // Clear the answer input field
    document.getElementById("userAnswer").value = "";

    // Notify the player if the answer is correct or incorrect
    alert(isCorrect ? "Correct!" : "Incorrect.");

    // Show all updated statistics
    showAllStats();
}

// Task 13: showAllStats function
function showAllStats() {
    // Clear the display area
    document.getElementById("showallplayers").innerHTML = "";

    // Calculate total number of questions and correct answers
    var totalQuestions = PlayerRegistrationData.length;
    var correctAnswers = PlayerRegistrationData.filter(function (data) {
        return data.isCorrect;
    }).length;

    // Display all data in the 'showallplayers' area
    PlayerRegistrationData.forEach(function (playerData, index) {
        // Calculate percentage score for each player
        var playerPercentageScore = (correctAnswers / totalQuestions) * 100;

        // Display player stats
        var playerStats = `
            Date: ${new Date().toLocaleDateString()}
            Name: ${playerData.firstName} ${playerData.lastName}, 
            Gender: ${playerData.gender}
            Question Number: ${index + 1} / ${totalQuestions}
            Equation: ${playerData.equation}
            Response: ${playerData.userAnswer}
            Correct: ${playerData.isCorrect ? 'Yes' : 'No'}
            Percentage Score: ${playerPercentageScore.toFixed(2)}%
        `;

        // Append playerStats to the existing content
        document.getElementById("showallplayers").innerHTML += playerStats;
    });
}

// Task 10: findPercentageScore function
function findPercentageScore() {
    // Clear the display area
    document.getElementById("showpercentage").innerHTML = "";

    // Calculate total number of questions, correct answers, and percentage score
    var totalQuestions = PlayerRegistrationData.length;
    var correctAnswers = PlayerRegistrationData.filter(function (data) {
        return data.isCorrect;
    }).length;
    var percentageScore = (correctAnswers / totalQuestions) * 100;

    // Display the stats in the 'showpercentage' area
    var displayText = `
        Date: ${new Date().toLocaleDateString()}
        Name: ${playerData.firstName} ${playerData.lastName}, 
        Total Questions: ${totalQuestions},
        Correct Answers: ${correctAnswers},
        Percentage Score: ${percentageScore.toFixed(2)},
    `;

    // Append the formatted data to the display area
    document.getElementById("showpercentage").innerHTML = displayText;
}

// Task 11: End function
function End() {
    // Call findPercentageScore() to display percentage score
    findPercentageScore();

    // Get input elements by their IDs
    const formInputs = ['firstName', 'lastName', 'dob', 'gender', 'email'];
    formInputs.forEach(inputId => {
        document.getElementById(inputId).removeAttribute('disabled');
    });

    // Create an object to store player information
    const playerInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        birthDate: document.getElementById('dob').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value,
        percentageScore: findPercentageScore(),
    };

    // Add player information to the array
    playerInformationArray.push(playerInfo);

    // Display information in the leaderboard
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    leaderboardContainer.innerHTML = ''; // Clear previous content

    // Sort the player information array based on percentage score in descending order
    playerInformationArray.sort((a, b) => b.percentageScore - a.percentageScore);

    // Display ranked information in the leaderboard
    playerInformationArray.forEach((player, index) => {
        const playerInfoElement = document.createElement('p');
        playerInfoElement.textContent = `Rank ${index + 1}: ${player.firstName} ${player.lastName} - ${player.percentageScore}%`;
        leaderboardContainer.appendChild(playerInfoElement);
    });

    // Disable buttons and areas
    document.getElementById('startButton').disabled = true;
    document.getElementById('endButton').disabled = true;
    document.getElementById('PlayGame').disabled = true;
    document.getElementById('userAnswer').disabled = true;
    document.getElementById('checkButton').disabled = true;
    document.getElementById('nextButton').disabled = true;
}

// Task 12: showCharts function
function showCharts() {
    // Get the global storage entity
    const PlayerRegistrationData = JSON.parse(localStorage.getItem('PlayerRegistrationData'));

    // Calculate gender frequencies
    const genderCounts = { 'female': 0, 'male': 0 };
    for (const player of PlayerRegistrationData) {
        player.gender === 'female' ? genderCounts['female']++ : genderCounts['male']++;
    }

    // Calculate percentage score frequencies
    const scoreCounts = { '<50': 0, '50-59': 0, '60-69': 0, '70-79': 0, '80-89': 0, '90-99': 0, '100': 0 };
    for (const player of PlayerRegistrationData) {
        const score = Math.floor(player.percentageScore);
        if (score < 50) {
            scoreCounts['<50']++;
        } else if (score < 60) {
            scoreCounts['50-59']++;
        } else if (score < 70){
          scoreCounts['60-69'] = (scoreCounts['60-69'] || 0) + 1;
        } else if (score < 80) {
          scoreCounts['70-79'] = (scoreCounts['70-79'] || 0) + 1;
        } else if (score < 90) {
          scoreCounts['80-89'] = (scoreCounts['80-89'] || 0) + 1;
        } else if (score < 100) {
          scoreCounts['90-99'] = (scoreCounts['90-99'] || 0) + 1;
        } else {
          scoreCounts['100'] = (scoreCounts['100'] || 0) + 1;
        }
      }
    
      // Calculate the total number of persons
      const totalPlayer = PlayerRegistrationData.length;
    
      // Create the gender frequency chart HTML
      let genderChartHTML = `<table>`;
      for (const gender in genderCounts) {
        const count = genderCounts[gender];
        const percentage = (count / totalPlayer) * 100.0;
        genderChartHTML += `<tr><td>${gender}:</td><td><img src="thin_bar.jpeg" width="${Math.round(percentage)}"></td></tr>`;
      }
      genderChartHTML += `</table>`;
    
      // Create the percentage score frequency chart HTML
      let scoreChartHTML = `<table>`;
      for (const scoreRange in scoreCounts) {
        const count = scoreCounts[scoreRange];
        const percentage = (count / totalPlayer) * 100.0;
        scoreChartHTML += `<tr><td>${scoreRange}:</td><td><img src="thin_bar.jpeg" width="${Math.round(percentage)}"></td></tr>`;
      }
      scoreChartHTML += `</table>`;
    
      // Update the 'showcharts' div with the charts
      const showChartsDiv = document.getElementById('showcharts');
      showChartsDiv.innerHTML = `<h2>Gender Frequency</h2>${genderChartHTML}<h2>Percentage Score Frequency</h2>${scoreChartHTML}`;
    }
    
    // Call the showCharts() function every 5 seconds
    setInterval(showCharts, 5000);
    
    // Function to display the leaderboard
    function showLeaderboard() {
      // Sort players by percentage score in descending order
      var sortedPlayers = PlayerRegistrationData.slice().sort(function (a, b) {
        return b.percentageScore - a.percentageScore;
      });
    
      // Clear the leaderboard display area
      document.getElementById("leaderboard").innerHTML = "";
    
      // Display the leaderboard in the 'leaderboard' area
      var leaderboardHTML = `
          <table>
              <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Percentage Score</th>
              </tr>
      `;
    
      // Display up to the top 5 players in the leaderboard
      for (var i = 0; i < Math.min(5, sortedPlayers.length); i++) {
        leaderboardHTML += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${sortedPlayers[i].firstName} ${sortedPlayers[i].lastName}</td>
                  <td>${sortedPlayers[i].percentageScore.toFixed(2)}%</td>
              </tr>
          `;
      }
      leaderboardHTML += '</table>';
    
      // Append the leaderboard to the 'leaderboard' area
      document.getElementById("leaderboard").innerHTML = leaderboardHTML;
    }
    
    // Call the showLeaderboard() function to initially display the leaderboard
    showLeaderboard();
    
    // Add event listener to the reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function() {
        // Add code here to reset the game
    });