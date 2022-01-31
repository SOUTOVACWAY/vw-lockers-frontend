import React from 'react'
import GoogleMapReact from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'

import MachineMarker from '../components/MachineMarker'
import { getMachineCoordinates } from '../utils/machines'
import { GMAPS_KEY } from '../config'

class MachineMap extends React.Component {
  getMachinesMapBounds(machines) {
    const fMachines = machines.filter(machine => machine.customer !== undefined)

    const defaultBounds = {
      center: { lat: 41.390205, lng: 2.154007 },
      zoom: 10
    }

    // no machines
    if (fMachines.length === 0) {
      return defaultBounds
    }

    // only one machine
    if (fMachines.length === 1) {
      let coordinates = getMachineCoordinates(fMachines[0].location)

      if (!coordinates) {
        return defaultBounds
      }

      return {
        center: coordinates,
        zoom: 10
      }
    }

    // multiple machines
    let nw = { lat: -90, lng: 180 }
    let se = { lat: 90, lng: -180 }

    fMachines.forEach(machine => {
      const coordinates = getMachineCoordinates(machine.location);

      if (coordinates) {
        // nw: max lat, min lng
        if (coordinates.lat > nw.lat) {
          nw.lat = coordinates.lat
        }

        if (coordinates.lng < nw.lng) {
          nw.lng = coordinates.lng
        }

        // se: min lat, max lng
        if (coordinates.lat < se.lat) {
          se.lat = coordinates.lat
        }

        if (coordinates.lng > se.lng) {
          se.lng = coordinates.lng
        }
      }
    })

    // TODO: should get rendered w/h
    return fitBounds({nw, se}, {width: 400, height: 400})
  }

  render() {
    const { machines } = this.props
    const bounds = this.getMachinesMapBounds(machines)

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPS_KEY }}
        defaultCenter={bounds.center}
        defaultZoom={bounds.zoom}
        onChildClick={this.props.onMachineClick}
      >
        {machines.map(machine => {
          const coordinates = getMachineCoordinates(machine.location)

          if (coordinates == null) {
            return null
          }

          return (
            <MachineMarker
              key={machine.serial}
              lat={coordinates.lat}
              lng={coordinates.lng}
              machine={machine}
            />
          )
        })}
      </GoogleMapReact>
    )
  }
}

export default MachineMap
