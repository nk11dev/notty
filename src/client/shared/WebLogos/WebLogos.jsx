import './WebLogos.scss';

import NodeLogo from '../../../assets/images/logo-web-technologies/nodejs-logo.png';
import ExpressLogo from '../../../assets/images/logo-web-technologies/express-logo.svg';


const WebLogos = () => {

  const images = [
    NodeLogo,
    ExpressLogo,
  ];

  return images.map((item, index) => (
    <div key={index}>
      <img
        src={item}
        className="page-image"
      />
    </div>
  ));
}

export default WebLogos;