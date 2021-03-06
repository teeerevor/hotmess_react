export default class SongListFilter{
  getNextLetter(letter){
    switch (letter) {
      case 'top':
        return 'b';
      case 'z':
        return 'z';
      default:
        return String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
    }
  }

  getPrevLetter(letter){
    switch (letter) {
      case 'top':
        return 'top';
      case 'a':
        return 'top';
      default:
        return String.fromCharCode(letter.charCodeAt(letter.length - 1) - 1);
    }
  }

  checkLetter(letter) {
    let nonLetter = /^\W|^\d/i;
    if (nonLetter.test(letter)) {
      return 'top';
    }
    return letter;
  }

  getLetterSequence(start, end) {
    //returns ^a|^b for regex
    start = start.toLowerCase();
    end = end.toLowerCase();
    let letter = start;
    let letterSet = ['^'+letter];

    if ( start != end ) {
      do {
        letter = this.getNextLetter(letter);
        letterSet.push('^' + letter);
      } while (letter != end && letter != "z");
    }

    return letterSet.join('|');
  }

  handleTop(endLetter) {
    let sequence;
    let topRegex = /^\W|^\d|^a/i;
    if (endLetter !== 'top') {
      //bug where it doubles up the ^a
      //but dosen't cause errors. TODO fix this
      sequence = this.getLetterSequence('a', endLetter);
      return RegExp(topRegex.source + '|' + sequence, 'i');
    }
    return topRegex;
  }

  handleEnd(startLetter) {
    let sequence;
    let endRegex = /^x|^y|^z/i;
    if (!endRegex.test(startLetter)) {
      sequence = this.getLetterSequence(startLetter, 'z');
      return RegExp(sequence + endRegex.source, 'i');
    }
    return endRegex;
  }

  getSongFilter(startLetter, endLetter) {
    if (startLetter === 'top') {
      return this.handleTop(endLetter);
    }
    if (startLetter === 'xyz') {
      return this.handleEnd(startLetter);
    }
    let sequence = this.getLetterSequence(startLetter, endLetter);
    return RegExp(sequence, 'i');
  }

  filterSongs(songs, filterBy, startsWith, endsWith){
    const start = startsWith.toLowerCase();
    const end = endsWith.toLowerCase();
    let songFilter = this.getSongFilter(start, end);
    return songs.filter(song => {
      switch (filterBy) {
        case 'song':
          return songFilter.test(song.name);
        case 'artist':
          return songFilter.test(song.artist);
      }
    });
  }
}
