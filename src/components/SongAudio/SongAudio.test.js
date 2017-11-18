import React              from 'react';
import { shallow } from 'enzyme';
import { expect }         from 'chai';
import SongAudio    from './index';
import AudioTrack   from './AudioTrack';
import YoutubeTrack from './YoutubeTrack';

describe('<SongAudio />', () => {
  describe('hasAudio()', () => {
    let songWithYoutubeUrl = {youtube_key: 'youtubecode'};
    //let songWithSoundcloudUrl = {soundcloud_url: 'soundcloudcode'};
    let songWithJJJ = {jjj_preview: 'jjjurl'};
    let songWithAll = { youtube_key    : 'youtubecode',
                        jjj_preview    : 'jjjurl',
                        soundcloud_key : 'soundcloudcode'};

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
