import Star from '../models/Star'
import Heart from '../models/Heart'
import Heart_Outline from '../models/Heart_Outline'


const chatItems = () => {
  const minx = -8
  const maxx = 8
  const miny = 4
  const maxy = 5
  const minz = -7
  const maxz = 4

  const x =  Math.floor(Math.random() * (maxx-minx) + minx)
  const y =  Math.floor(Math.random() * (maxy-miny) + miny)
  const z =  Math.floor(Math.random() * (maxz-minz) + minz)

  const type = Math.floor(Math.random() * 3)
  const selected= [
    <Star position ={[x,y,z]} />,
    <Heart position ={[x,y,z]} />,
    <Heart_Outline position ={[x,y,z]} />,
  ]

  return selected[type]
}

