import React from "react";
import { Artist } from "../types/types";

interface TrackLayoutProps {
  artists: Artist[];
}

const ArtistLayout = ({ artists }: TrackLayoutProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {artists.map((item, index) => (
        <div key={item.id} className="justify-center items-center py-2">
          <div className="flex flex-col items-center">
            <img src={item.images[0]?.url} className="w-3/4" />
            <div className="flex w-3/4 justify-between px-2">
              <div className="flex">
                <span className="text-xs md:text-base">{index + 1 + ".\u00A0"}</span>
                <div className="text-xs md:text-base">{item.name}</div>
              </div>
              <div className="flex items-center">
                <a href={item.external_urls.spotify} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.727,16.605c-1.47-0.882-3.333-1.372-5.293-1.372 c-1.078,0-2.254,0.196-3.234,0.392l-0.273,0.085l-0.315-1.36c1.274-0.294,2.548-0.49,3.921-0.49c2.254,0,4.313,0.588,6.077,1.568 l-0.744,1.258L15.727,16.605z M16.707,13.861c-1.666-1.078-4.019-1.666-6.567-1.666c-1.274,0-2.392,0.288-3.274,0.484l-0.297,0.069 l-0.349-1.729c1.176-0.294,2.352-0.588,4.019-0.588c2.744,0,5.293,0.686,7.449,1.96l-0.798,1.564 C16.889,13.955,16.743,13.879,16.707,13.861z M17.981,10.725c-1.96-1.078-4.803-1.764-7.547-1.764c-1.372,0-2.842,0.196-4.117,0.49 L5.93,9.55L5.435,7.588C7.003,7.196,8.669,7,10.434,7c3.038,0,6.175,0.686,8.625,1.96L17.981,10.725z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistLayout;
