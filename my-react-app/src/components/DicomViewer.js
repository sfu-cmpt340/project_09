import React, { Component } from 'react'
import DwvComponent from './dwv-react/DwvComponent'

export default class DicomViewer extends Component {
  render() {
    return (
        <div>      
            <DwvComponent/>
        </div>
    )
  }
}