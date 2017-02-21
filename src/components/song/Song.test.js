import React       from 'react';
import { shallow } from 'enzyme';
import { expect }  from 'chai';
import Song        from './Song';
import SongAudio   from '../song_audio/SongAudio';
import IconTick    from '../svgs/IconTick';

function mockItem(overides = {}) {
  let songData = {
      id             : '1',
      name           : 'Doing it to death',
      artist         : 'The Kills',
      songListLength : 1,
      open           : false,
      sortBy         : 'song'
  };

  for(let key in overides){
    if (!songData.hasOwnProperty(key)) continue;
    songData[key] = overides[key];
  }

  return songData;
}

describe('<Song />', () => {
  it('renders song and artist title', () => {
    const item = mockItem(),
      wrapper  = shallow(<Song song = {item} />);
    expect(wrapper.text()).to.contain(item.name);
    expect(wrapper.text()).to.contain(item.artist);
  });

  it('shows songAudio when open', () => {
    const item    = mockItem(),
          wrapper = shallow(<Song song = {item} open = {true} />);
    expect(wrapper.find(SongAudio)).to.have.length(1);
  });

  it('shows SongAudio when item is clicked', () => {
    const item          = mockItem(),
          wrapper       = shallow(<Song song = {item} />);
    wrapper.find('div').simulate('click');
    expect(wrapper.find(SongAudio)).to.have.length(1);
  });

  it('renders tick when song is shortlisted', () => {
    const item    = mockItem(),
          wrapper = shallow(<Song song = {item} shortlisted = {true} />);
    expect(wrapper.hasClass('shortlisted')).to.be.true;
    expect(wrapper.find(IconTick)).to.have.length(1);
  });

  it('shows song as shortlisted when song is added', () => {
    const item     = mockItem(),
          wrapper  = shallow(<Song song={item} />);

    wrapper.find('button').last().simulate('click');
    expect(wrapper.hasClass('shortlisted')).to.be.true;
  });

  it('shows song as shortlisted when song is added to top', () => {
    const item     = mockItem(),
          wrapper  = shallow(<Song song={item} />);

    wrapper.find('button').first().simulate('click');
    expect(wrapper.hasClass('shortlisted')).to.be.true;
  });
});
