import NodeLogo from '@/images/logo-web-technologies/nodejs-logo.png';
import ExpressLogo from '@/images/logo-web-technologies/express-logo.svg';


const ImagesExample = () => {

  const images = [
    NodeLogo,
    ExpressLogo,
  ];

  return images.map((item, index) => (
    <div key={index}>
      <img
        src={item}
        className="page-image"
        style={{
          width: 250,
          padding: 5,
          marginTop: 5,
          border: '1px solid #c0c0c0'
        }}
      />
    </div>
  ));
}

export default ImagesExample;