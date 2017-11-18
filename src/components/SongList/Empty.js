import React from 'react';
import InlineSvg from '../InlineSvg';

export default ({next, prev, sortBy, filterStart}) =>
  <div className="emptyState">
    <InlineSvg iconClass={'no-tunes'} iconName={'#no-tunes'} />
    <h4>
      WOAH! NO TUNES.
    </h4>
    <p>
      There are no <b>{sortBy}s</b> starting with <b>{filterStart}</b> in this list.
    </p>

    <button onClick={prev}>BACK UP!</button>
    <button onClick={next}>GO FORTH!</button>
  </div>;
