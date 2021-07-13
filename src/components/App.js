import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (value) => {
    this.setState((previousState) => {
      return { ...previousState, filters: { type: value } }
    })
  }

  onFindPetsClick = () => {
    const type = this.state.filters.type
    return fetch(`/api/pets${type !== 'all' ? '?type=' + type : ''}`)
      .then((response) => response.json())
      .then((petsJSON) =>
        this.setState((previousState) => ({ ...previousState, pets: petsJSON }))
      )
  }

  onAdoptPet = (id) => {
    this.setState((previousState) => {
      const newState = { ...previousState }
      newState.pets[
        newState.pets.indexOf(
          newState.pets.find((petElement) => petElement.id === id)
        )
      ].isAdopted = true
      return { ...newState, pets: [...newState.pets] }
    })
  }

  render() {
    return (
      <div className='ui container'>
        <header>
          <h1 className='ui dividing header'>React Animal Shelter</h1>
        </header>
        <div className='ui container'>
          <div className='ui grid'>
            <div className='four wide column'>
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className='twelve wide column'>
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
