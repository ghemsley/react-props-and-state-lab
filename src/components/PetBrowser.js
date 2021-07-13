import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return (
      <div className='ui cards'>
        {this.props.pets.map((pet, i) => (
          <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} key={i} />
        ))}
      </div>
    )
  }
}

export default PetBrowser
