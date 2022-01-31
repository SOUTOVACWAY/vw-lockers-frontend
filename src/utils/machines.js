export function getMachineStatus(machine) {
  if (!machine.last_signal) {
    return 'UNKNOWN'
  }

  let now = new Date().getTime()
  let diff = (now - Date.parse(machine.last_signal)) / 1000

  if (diff < 60 * 5) {
    if (machine.status === 'OPERATIVE') {
      return 'ONLINE'
    } else if (machine.status === 'SLEEP') {
      return 'SLEEP'
    } else if (machine.status === 'OUT_OF_SERVICE') {
      return 'FUERA DE SERVICIO'
    } else if (machine.status === 'MAINTENANCE') {
      return 'MANTENIMIENTO'
    }
  }

  return 'OFFLINE'
}

export function getMachineStatusColor(machine) {
  let status = getMachineStatus(machine)

  if (status === 'ONLINE') {
    return '#28a745'
  } else if (status === 'SLEEP') {
    return '#0066ff'
  } else if (status === 'FUERA DE SERVICIO') {
    return '#ff0000'
  } else if (status === 'MANTENIMIENTO') {
    return '#ff7b25'
  } else {
    return '#ffc107'
  }
}

export function getMachinePicture(type) {
  if (type === 'VACWAYone') {
    return '/images/machines/big.png'
  }

  return '/images/machines/small.png'
}

export function getMachineCirclePicture(type) {
  if (type === 'VACWAYone') {
    return '/images/machines/big_circle.png'
  }

  return '/images/machines/small_circle.png'
}

export function getMachineThumbnail(type) {
  if (type === 'VACWAYone') {
    return '/images/machines/big_thumb.png'
  }

  return '/images/machines/small_thumb.png'
}

export function getMachineTypeInitial(type) {
  return type.toUpperCase()[0]
}

export function getMachineCoordinates(location) {
  const latlng = location.split(',')

  if (latlng.length !== 2) {
    return null
  }

  const coordinates = {
    lat: parseFloat(latlng[0]),
    lng: parseFloat(latlng[1])
  }

  if (isNaN(coordinates.lat) || isNaN(coordinates.lng)) {
    return null
  }

  return coordinates
}
