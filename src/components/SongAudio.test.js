import React              from 'react';
import { shallow } from 'enzyme';
import { expect }         from 'chai';
import SongAudio    from './SongAudio';
import AudioTrack   from './AudioTrack';
import YoutubeTrack from './YoutubeTrack';

describe('<SongAudio />', () => {
  describe('hasAudio()', () => {
    let songWithYoutubeUrl = {youtube_url: 'youtubecode'};
    //let songWithSoundcloudUrl = {soundcloud_url: 'soundcloudcode'};
    let songWithJJJ = {jjj_preview: 'jjjurl'};
    let songWithAll = { youtube_url    : 'youtubecode',
                        jjj_preview    : 'jjjurl',
                        soundcloud_url : 'soundcloudcode'};

    it('returns youtube track', () => {
      let wrapper = shallow(<SongAudio song={songWithYoutubeUrl} />);
      expect(wrapper.find(YoutubeTrack).length).to.equal(1);
    });

    it('returns soundcloud audio track');

    it('returns jjj audio track', () => {
      let wrapper = shallow(<SongAudio song={songWithJJJ} />);
      expect(wrapper.find(AudioTrack).length).to.equal(1);
    });

    it('prioritises the youtube track', () => {
      let wrapper = shallow(<SongAudio song={songWithAll} />);
      expect(wrapper.find(YoutubeTrack).length).to.equal(1);
    });
  });
});
