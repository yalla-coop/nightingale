import React from 'react';
import { Button } from './index.style';

export default function index(props){
       const { value, color, onClick } = props;
    return (<>
      <Button type='submit' style={{ background: color }} onClick={onClick}>
        {value}
      </Button>
    </>
    );
  }
}
