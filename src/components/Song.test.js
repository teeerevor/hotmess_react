import React              from 'react';
import { shallow, mount } from 'enzyme';
import { expect }         from 'chai';
import sinon              from 'sinon';
import pubsub             from 'pubsub-js';
import Song               from './Song';
import SongAudio          from './SongAudio';
import AudioTrack         from './AudioTrack';
import InlineSvg          from './InlineSvg';

function mockItem(overides = {}) {
  let songData = {
      id             : '1',
      name           : 'Doing it to death',
      artistName     : 'The Kills',
      songListLength : 1,
      open           : false,
      sortBy         : 'song'
  };

  for(var key in overides){
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
    expect(wrapper.text()).to.contain(item.artistName);
  });

  it('shows songAudio when open', () => {
    const item    = mockItem(),
          wrapper = shallow(<Song song = {item} open = {true} />);
    expect(wrapper.find(SongAudio)).to.have.length(1);
  });

  it('shows SongAudio when item is clicked', () => {
    const item          = mockItem(),
          wrapper       = shallow(<Song song = {item} />);
    wrapper.find('div.song-display').simulate('click');
    expect(wrapper.find(SongAudio)).to.have.length(1);
  });

  it('renders tick when song is shortlisted', () => {
    const item    = mockItem(),
          wrapper = shallow(<Song song = {item} shortlisted = {true} />);
    expect(wrapper.hasClass('shortlisted')).to.be.true;
    expect(wrapper.contains(<InlineSvg iconClass="icon-selected" iconName="#tick" />)).to.be.true;
  });

  it('calls shortlistAdd when a song is added', () => {
    const item     = mockItem(),
          wrapper  = shallow(<Song song={item} />);

    wrapper.find('button.add').simulate('click');
    expect(wrapper.hasClass('shortlisted')).to.be.true;
  });

  it('publishes when a song is added to top', () => {
    const item     = mockItem(),
          wrapper  = shallow(<Song song={item} />);

    wrapper.find('button.top').simulate('click');
    expect(wrapper.hasClass('shortlisted')).to.be.true;
  });
});
