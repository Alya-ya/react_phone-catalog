//import styles from './ProductGallery.module.scss';
import { useEffect, useState } from 'react';

type ProductGalleryProps = {
  image: string;
  name: string;
};

export const ProductGallery = ({ image, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [productGallery, setProductGallery] = useState<string[]>([]);

  useEffect(() => {
    setSelectedImage(image);

    const images = [0, 1, 2, 3, 4].map(index =>
      image.replace('00.webp', `${String(index).padStart(2, '0')}.webp`),
    );

    const checkImages = async () => {
      const existingImages = await Promise.all(
        images.map(
          imagePath =>
            new Promise<string | null>(resolve => {
              const img = new Image();

              img.onload = () => resolve(imagePath);
              img.onerror = () => resolve(null);

              img.src = imagePath;
            }),
        ),
      );

      const gallery = existingImages.filter(
        (imagePath): imagePath is string => imagePath !== null,
      );

      setProductGallery(gallery);
    };

    checkImages();
  }, [image]);

  return (
    <div>
      <p>{name}</p>

      <div>
        {productGallery.map(imagePath => (
          <button
            type="button"
            key={imagePath}
            onClick={() => setSelectedImage(imagePath)}
          >
            <img src={imagePath} alt={name} />
          </button>
        ))}
      </div>

      <img src={selectedImage} alt={name} />
    </div>
  );
};
