import React from 'react';

const ResponsiveGoogleMap = ({ latitude , longitude, setviewmaps}) => {
    // Generate Google Maps URL with marker at specified latitude and longitude
    function generateGoogleMapsEmbedUrl(latitude, longitude) {
        var embedUrl = "https://www.google.com/maps/embed";
        embedUrl += "?pb=!1m16!1m12!1m3!1d111798.15148182338!2d" + longitude + "!3d" + latitude;
        embedUrl += "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1";
        embedUrl += "!2m1!1s";
        embedUrl += "!5e0!3m2!1sen!2sus!4v1390839289319c";
        return embedUrl;
    }
    const mapUrl = `${generateGoogleMapsEmbedUrl(latitude, longitude)}!markers=${latitude},${longitude}`;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
            <div style={{width:"80vw",height:"80vh"}} className=" w-100 h-100 bg-white rounded-lg shadow-md overflow-hidden relative">
                <iframe
                    width="100%"
                    height="100%"
                    src={mapUrl}
                    aria-hidden="false"
                    tabIndex="0"
                />
                <button
                    type="button"
                    className="absolute top-2 right-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-gray-200 rounded-full p-1"
                    onClick={() => { setviewmaps(false) }}
                >
                    <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                </button>
            </div>
            {`location is ${latitude} and ${longitude}`}
        </div>
    );
};

export default ResponsiveGoogleMap;
