
      const imagesObject = {
        1: "apple",
        2: "sun",
        3: "red-ball",
        4: "balloon",
        5: "bubble",
      };

      const cardButtonsArray = document.querySelectorAll(".js-card-button");

      const displayMessageElement = document.querySelector(
        ".js-display-play-message"
      );

      const array = [];

      let btnClickCounter = 0;

      let imageToCardObject = {};

      cardButtonsArray.forEach((cardButton) => {
        cardButton.addEventListener("click", originalCode = () => {
          const cardId = cardButton.dataset.id;
          const cardButtonWithId = document.querySelector(
                  `.js-card-button-${cardId}`
                );

          checkImageCardObject(cardId, cardButtonWithId);
          
          console.log(imageToCardObject)
        });
      });

      function checkImageCardObject(cardId, cardButtonWithId) {
            let imageCardObjectLength = Object.keys(imageToCardObject).length;
          
            if (imageCardObjectLength === 9) {
              displayMessageElement.innerHTML =
                "You have seen all the cards. Now press play to play the game.";
            } else {
              if (imageToCardObject[cardId]) {
                displayMessageElement.innerHTML =
                "You cannot view the card more than once";
              } else {
                displayImageOnClick(cardId, cardButtonWithId);
              }
            }
          }

      function displayImageOnClick(cardId, cardButtonWithId) {
              const randomNumber = generateRandomNumber();

              imageToCardObject = (saveImageToCard(cardId, imagesObject[randomNumber]));

              console.log(Object.keys(imageToCardObject).length)

              array.push(randomNumber);

              const isValidNumber = checkNumberArray(array, randomNumber);

              if (isValidNumber) {
              
                cardButtonWithId.innerHTML = `<img src='images/${imagesObject[randomNumber]}.png' alt='' class = 'card-image'/>`;

                setTimeout(() => {
                  cardButtonWithId.innerHTML = ``;
                }, 500);
              } else {
                displayImageOnClick(cardId, cardButtonWithId);
              }
            }

      function checkNumberArray(array, randomNumber) {
        let counter = 0;
        for (let i = 0; i < array.length; i++) {
          if (array[i] === randomNumber) {
            counter++;
          }
        }

        if (counter > 2) {
          return false;
        } else {
          return true;
        }
      }

      function generateRandomNumber() {
        return Math.floor(Math.random() * 5) + 1;
      }

      let saveImageToCardObject = {};

      function saveImageToCard(cardId, imageName) {
        saveImageToCardObject[cardId] = imageName;
        return saveImageToCardObject;
      }

      let checkButtonOneOrTwo = 0;
      let checkCardId = 0;
      let match = 0;
      const playGameElement = document.querySelector(".js-play-game-button");

      let matchingCardsArray = [];

      playGameElement.addEventListener("click", () => {
        displayMessageElement.innerHTML = "Start with any card you want";
         
        const cardButtonsAfterPlay = document.querySelectorAll(".js-card-button");

        /*
        for (let i = 0; i < cardButtonsAfterPlay.length; i++) {
          cardButtonsAfterPlay[i].classList.remove(`js-card-button`);
          let cardButtonId = cardButtonsAfterPlay[i].dataset.id;
          cardButtonsAfterPlay[i].classList.remove(`js-card-button-${cardButtonId}`);
        } */

        cardButtonsAfterPlay.forEach((cardButton) => {
          //cardButton.removeEventListener('click', originalCode())
          //cardButton.classList.remove(`js-card-button`);

          cardButton.addEventListener("click", () => {
            
            const cardId = cardButton.dataset.id;

            //cardButton.classList.remove(`js-card-button-${cardId}`);

            const cardButtonWithId = document.querySelector(
              `.js-card-button-after-play-${cardId}`
            );

            if (matchingCardsArray.includes(cardId)) {
              displayMessageElement.innerHTML = 'You have already found the pair of this card. Choose another card';
            } else {
              if (checkCardId === cardId) {
              displayMessageElement.innerHTML = ('Choose the pair for this card')
              } 
              else {

                checkButtonOneOrTwo++;
                
                cardButtonWithId.innerHTML = `<img src='images/${imageToCardObject[cardId]}.png' alt='' class = 'card-image'/>`;

                displayMessageElement.innerHTML = "Choose its correct pair";

                if (checkButtonOneOrTwo === 1) {
                  checkCardId = cardId;
                } else {
                  if (imageToCardObject[cardId] === imageToCardObject[checkCardId]) {
                    displayMessageElement.innerHTML =
                      "Correct Match. Look for next pair";

                    matchingCardsArray.push(checkCardId, cardId)
                    console.log(matchingCardsArray)

                    match++;
                    if (match === 4) {
                      displayMessageElement.innerHTML = " Congratulations, You WON!!!";
                      gameEnded()
                      
                      return;
                    }
                    checkButtonOneOrTwo = 0;
                  } else {
                    displayMessageElement.innerHTML = "Incorrect Match. Go again.";
                    setTimeout(() => {
                      cardButtonWithId.innerHTML = ``;
                      document.querySelector(
                        `.js-card-button-after-play-${checkCardId}`
                      ).innerHTML = "";
                    }, 1500);
                    checkButtonOneOrTwo = 0;
                  }
                }
              }
            }
            

            
          });
        });

        function gameEnded() {
          cardButtonsAfterPlay.forEach((cardButton) => {
          cardButton.addEventListener("click", () => {
            displayMessageElement.innerHTML = 'Game is already over! Press Restart to start the game again.'
          })
        })
        }
      });