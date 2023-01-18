import { canvasPreview } from './canvasPreview'

export function imgPreview(
  image,
  crop,
  scale = 1,
  rotate = 0,
) {
  const canvas = document.createElement('canvas')
  canvasPreview(image, canvas, crop, scale, rotate)
  const dataURL = canvas.toDataURL();
  return dataURL
}
