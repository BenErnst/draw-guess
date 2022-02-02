
import randomWords from 'random-words';
import { utilService } from './utilService.js';

export const randomWordsService = {
    getWords
}

let gLength = 1;

const gLevelsMap = {
    3: 'Easy',
    5: 'Medium',
    7: 'Hard',
}

function getWords() {
    gLength = 1;
    return [_getWordObj(), _getWordObj(), _getWordObj()];
}

function _getWordObj() {
    gLength += 2;
    const randWord = _getRandWord();
    return {
        id: `w${utilService.makeId()}`,
        txt: randWord.join(),
        rank: {
            level: gLevelsMap[gLength],
            points: gLength - 2
        }
    }
}

function _getRandWord() {
    return randomWords({
        exactly: 1,
        minLength: gLength,
        maxLength: gLength,
        formatter: word => word[0].toUpperCase() + word.slice(1) 
    });
}
