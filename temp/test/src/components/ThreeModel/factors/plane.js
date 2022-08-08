import Cube_Grass_Single from "../models/Cube_Grass_Single";

const plane = () => {
  const result = [];
  for (let x = -10; x < 10; x++) {
    for (let z = -3; z < 4; z++) {
      result.push(
        <Cube_Grass_Single key={`x:${x},y:${z}`} position={[x, -5, z]} />
      );
    }
  }
  return result;
};

function Plane() {
  return <>{plane()}</>;
}

export default Plane;
