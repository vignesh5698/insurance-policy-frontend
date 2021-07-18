import React from 'react';

const Header = (props) => {
  const { title } = props

  return (
    <div className='header'>
      {title}
    </div>
  )
}

export default Header;