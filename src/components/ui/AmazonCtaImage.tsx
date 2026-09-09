import React from 'react';
import ctaImage from '../../images/img.png';

export const AmazonCtaImage: React.FC<{ className?: string }> = ({ className }) => (
  <img src={ctaImage} alt="Buy on Amazon" className={className} />
);