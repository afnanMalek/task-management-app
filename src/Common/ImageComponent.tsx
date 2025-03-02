import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt = "image", className, ...props }) => {
  return <img src={src} alt={alt} className={`object-cover ${className}`} {...props} />;
};

export default ImageComponent;
