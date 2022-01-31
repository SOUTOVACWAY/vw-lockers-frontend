import React from 'react'

import { getMachineStatusColor, getMachineThumbnail } from '../utils/machines'

const K_WIDTH = 15
const K_HEIGHT = 15

const style = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  borderRadius: K_HEIGHT,
  boxShadow: '0 .25rem .75rem rgba(0, 0, 0, .15)',
  textAlign: 'center',
  color: '#000',
  fontSize: 24,
  fontWeight: 'bold',
  padding: 4,

  cursor: 'pointer'
}

class MachineMarker extends React.Component {

  render() {
    return (
      <div style={{
        ...style,
        backgroundColor: "#fff",
        border: `5px solid ${getMachineStatusColor(this.props.machine)}`
        }}>
        <img style={{maxWidth: "90%"}}
             src={ getMachineThumbnail(this.props.machine.type) } alt=""/>
       </div>
    );
  }
}

export default MachineMarker
