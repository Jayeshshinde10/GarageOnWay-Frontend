import React from 'react';

const ResponsiveIframe = ({ latitude,longitude, aspectRatio}) => {
    
    return (
      <iframe
        src={mapUrl}
        className="w-75 h-50"

        allowFullScreen
        style={{
          paddingTop: `${(aspectRatio || 1.77) * 100}%`, // Default 16:9 aspect ratio
        }}
      />
  );
};

export default ResponsiveIframe;
