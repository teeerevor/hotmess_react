import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Logo from '../../components/svgs/Logo';
import SongList from '../../components/SongList';
import ShortList from '../../components/ShortList';
import Player from '../../components/player';
import IndexList from '../../components/IndexList';

const App = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-column-gap: 16px;
  grid-template-rows: 80px auto;
  grid-template-columns: 40px auto 30%;
  grid-template-areas:
    "header header header"
    "index songs shortlist";
`;

const Header = styled.header`
  grid-area: header;
  padding: 16px;
  border-bottom: solid 3px tomato;
  display: flex;
`;

const IndexListNav = styled(IndexList)`
  grid-area: index;
`;

const BigSongList = styled(SongList)`
  grid-area: songs;
`;

const SongShortList = styled(ShortList)`
  grid-area: shortlist;
`;

const H100Logo = styled(Logo)`
  width: 200px;
  height: 35px;
`;


const Hottest100Page = ({params}) => {
  return (
    <App>
      <Header>
        <H100Logo />
        <Player />
      </Header>
      <IndexListNav />
      <BigSongList year={params.year}/>
      <SongShortList />
    </App>
  );
};

Hottest100Page.propTypes = {
  params: PropTypes.object,
};

export default Hottest100Page;

