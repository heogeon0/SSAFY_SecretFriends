import Cloud_1 from "../models/Cloud_1";
import Cloud_2 from "../models/Cloud_2";

const cloud_selector = () => {
  const minx = -8;
  const maxx = 8;
  const miny = 4;
  const maxy = 5;
  const minz = -4;
  const maxz = 6;

  const x = Math.floor(Math.random() * (maxx - minx) + minx);
  const y = Math.floor(Math.random() * (maxy - miny) + miny);
  const z = Math.floor(Math.random() * (maxz - minz) + minz);

  const type = Math.floor(Math.random());
  const cloud = [
    <Cloud_1 key={[x, y, z, type]} position={[x, y, z]} />,
    <Cloud_2 key={[z, y, x, type]} position={[x, y, z]} />,
  ];
  return cloud[type];
};

const cloud = () => {
  const result = [];
  const cloud_length = Math.floor(Math.random() * 13);
  let x = 0;
  while (x < cloud_length) {
    result.push(cloud_selector());
    x++;
  }
  return result;
};

function Cloud() {
  return <>{cloud()}</>;
}

export default Cloud;
