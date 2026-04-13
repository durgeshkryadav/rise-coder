/**
 * Img — Image component enforcing alt attribute.
 */
export default function Img({ src, alt, className = '', ...props }) {
  return <img src={src} alt={alt} className={`max-w-full ${className}`} {...props} />;
}
