const gameOverTextID = "gtOver";
const gamePausedTextID = "gtPaused";
const keyToStartTextID = "ktStart";
const keyToResumeTextID = "ktResume";
const gameMessageTextID = "gameMsg";

export const startScreen = (value: boolean) => {
    gameMessage(value);
    keyToStartTXT(value);
};
export const pauseScreen = (value: boolean) => {
    gameMessage(value);
    gamePausedTXT(value);
    keyToResumeTXT(value);
};

export const endScreen = (value: boolean) => {
    gameMessage(value);
    gameOverTXT(value);
    keyToStartTXT(value);
};

export const clearScreen = () => {
  gameMessage(false);
  gameOverTXT(false);
  gamePausedTXT(false);
  keyToStartTXT(false);
  keyToResumeTXT(false);
};

const gameOverTXT = (value: boolean) => {
    controlDisplay(gameOverTextID, value);
};

const gamePausedTXT = (value?: boolean) => {
    controlDisplay(gamePausedTextID, value)
};

const keyToStartTXT = (value: boolean) => {
    controlDisplay(keyToStartTextID, value)
};

const keyToResumeTXT = (value: boolean) => {
    controlDisplay(keyToResumeTextID, value);
};

const gameMessage = (value: boolean) => {
    controlDisplay("messageOverlay", value);
    controlDisplay(gameMessageTextID, value);
};

const controlDisplay = (identifier: string, value: boolean) => {
    if(value) document.getElementById(identifier).style.display = "block";
    else document.getElementById(identifier).style.display = "none";
};



