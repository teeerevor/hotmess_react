import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Logo from '../../components/svgs/Logo';
import SongList from '../../components/SongList';
import ShortList from '../../components/ShortList';
import Player from '../../components/player';
import IndexList from '../../components/IndexList';

const Header = styled.div`
  padding: 18px;
  border-bottom: solid 3px tomato;
  display: flex;
`;

const LogoWrapper = styled.div`
  flex: 1;
`;

  //+media-wider-then(700px)
    //display: block;

const H100Logo = styled(Logo)`
  width: 200px;
  height: 35px;
`;

const Hottest100Page = ({params}) => {
  return (
    <div>
      <Header>
        <LogoWrapper>
          <H100Logo />
        </LogoWrapper>
        <Player />
      </Header>
      <IndexList />
      <SongList year={params.year}/>
      <ShortList />
    </div>
  );
};

Hottest100Page.propTypes = {
  params: PropTypes.object,
};

export default Hottest100Page;

