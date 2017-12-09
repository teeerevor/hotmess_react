import styled from 'styled-components';

const SIZE = '35px';

export default styled.button`
  height: ${SIZE};
  background: 0;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  padding: 0;
  text-align: center;
  border-radius: ${SIZE};

  svg {
    overflow: visible;
    width: ${SIZE};
    height: ${SIZE};
    fill: white;
    color: #aaa;
  }

  &:hover {
    svg {
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
      color: tomato;
    }
  }
`;
