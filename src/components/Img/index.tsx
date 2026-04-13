interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Img — Image component enforcing alt attribute.
 */
export default function Img({ src, alt, className = '', ...props }: ImgProps) {
  return <img src={src} alt={alt} className={`max-w-full ${className}`} {...props} />;
}
