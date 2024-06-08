import { HTMLAttributes, useState } from 'react';
import styles from './ImageBox.module.css';

interface ImageBoxProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  radius?: 's' | 'm' | 'l' | 'none';
  width: number;
  height: number;
  border?: string;
  backgroundColor?: string;
  alt?: string;
}

const ImageBox = ({
  src = '',
  width,
  height,
  alt,
  border,
  radius = 'none',
  ...rest
}: ImageBoxProps) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div {...rest}>
      <img
        className={styles[`radius-${radius}`]}
        onLoad={handleImageLoad}
        src={src}
        alt={alt !== '' ? alt : 'img'}
        style={{
          width,
          height,
          border,
          backgroundColor: loading ? '#e0e0e0' : 'transparent',
        }}
      />
    </div>
  );
};

export default ImageBox;
