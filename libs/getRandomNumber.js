// Min is inclusive, Max is exclusive
export default function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}
