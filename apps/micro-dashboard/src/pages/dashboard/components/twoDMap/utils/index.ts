export const getDirectionFromAngle = (angle: number) => {
  const normalizedAngle = angle % 360
  if ((normalizedAngle >= 315 && normalizedAngle <= 360) || (normalizedAngle >= 0 && normalizedAngle < 45)) {
    return 'right'
  } else if (normalizedAngle >= 45 && normalizedAngle < 135) {
    return 'bottom'
  } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
    return 'left'
  } else {
    return 'top'
  }
}
