import SongListFilter from './SongListFilter';
import { expect }     from 'chai';

describe('SongListFilter', () => {
  let filter = new SongListFilter();

  describe('getNextLetter', () => {
    it('should return the next letter in the alphabet', () => {
      expect(filter.getNextLetter('b')).to.equal('c');
    });

    it('should a if give "top"', () => {
      expect(filter.getNextLetter('top')).to.equal('a');
    });

    it('should return z given z', () => {
      expect(filter.getNextLetter('z')).to.equal('z');
    });
  });

  describe('checkLetter', () => {
    it('returns the letter if letter', () => {
      expect(filter.checkLetter('a')).to.equal('a');
    });

    it('returns the top if something else entered', () => {
      expect(filter.checkLetter('1')).to.equal('top');
      expect(filter.checkLetter('!')).to.equal('top');
      expect(filter.checkLetter('(')).to.equal('top');
    });
  });

  describe('getLetterSequence', () => {
    it('returns letter sequence used for regex', () => {
      expect(filter.getLetterSequence('a', 'c')).to.equal('^a|^b|^c');
      expect(filter.getLetterSequence('a', 'a')).to.equal('^a');
    });

    it('should break if letters are put in in the wroing order', () => {
      expect(filter.getLetterSequence('y', 'x')).to.equal('^y|^z');
    });

    it('should handle capitals', () => {
      expect(filter.getLetterSequence('A', 'B')).to.equal('^a|^b');
    });
  });

  describe('handleTop', () => {
    it('should return the default top range regex', () => {
      expect('!').to.match(filter.handleTop('top'));
      expect('1').to.match(filter.handleTop('top'));
      expect('a').to.match(filter.handleTop('top'));
    });

    it('should return extended range regexs', () => {
      expect('b').to.match(filter.handleTop('c'));
      expect('c').to.match(filter.handleTop('c'));
    });
  });

  describe('handleEnd', () => {
    it('should return the default end range regex', () => {
      expect('x').to.match(filter.handleEnd('x'));
      expect('x').to.match(filter.handleEnd('y'));
      expect('x').to.match(filter.handleEnd('z'));
    });

    it('should return extended range regexs', () => {
      expect('t').to.match(filter.handleEnd('t'));
      expect('w').to.match(filter.handleEnd('t'));
      expect('z').to.match(filter.handleEnd('t'));
    });
  });

  describe('getSongFilter', () => {
    it('should return a regex for a given range', () => {
      expect('c').to.match(filter.getSongFilter('c', 'e'));
      expect('e').to.match(filter.getSongFilter('c', 'e'));
    });

    it('should return a regex for a given range including top', () => {
      expect('1').to.match(filter.getSongFilter('top', 'e'));
      expect('e').to.match(filter.getSongFilter('top', 'e'));
    });

    it('should return a regex for a given range including end', () => {
      expect('s').to.match(filter.getSongFilter('s', 'z'));
      expect('z').to.match(filter.getSongFilter('s', 'z'));
    });

    it('should not return letters outside the range', () => {
      expect('b').to.not.match(filter.getSongFilter('c', 'e'));
      expect('f').to.not.match(filter.getSongFilter('c', 'e'));
    });
  });

  return describe('filterSongs', () => {
    let aagg = {
      name: 'aa',
      artistName: 'gg'
    };
    let bbee = {
      name: 'bb',
      artistName: 'ee'
    };
    let ccdd = {
      name: 'cc',
      artistName: 'dd'
    };
    let songs = [aagg, bbee, ccdd];

    it('should filter a list of songs by songs', () => {
      expect(filter.filterSongs(songs, 'song', 'c', 'e')).to.eql([ccdd]);
    });

    it('should filter a list of songs by artist', () => {
      expect(filter.filterSongs(songs, 'artist', 'g', 'f')).to.eql([aagg]);
    });
  });
});
