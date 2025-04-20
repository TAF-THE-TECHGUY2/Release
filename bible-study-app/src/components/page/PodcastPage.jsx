import "../../styles/PodcastPage.css";
import React from "react";
import Masonry from "react-masonry-css";

const podcastEpisodes = [
  "https://open.spotify.com/embed/episode/5dcc3pitJVIVh42ptMIl45?theme=0",
  "https://open.spotify.com/embed/episode/5q45pZigMdkYxY3Zvnv2GF?theme=0",
  "https://open.spotify.com/embed/episode/1nNyaFkIK7fRm7WO3k4mKC?theme=0",
  "https://open.spotify.com/embed/episode/7AElJzwfUCaROrBPG4Bc52/video?theme=0",
  "https://open.spotify.com/embed/episode/4oUQPPUzuBVBMXSyYJdweh?theme=0",
  "https://open.spotify.com/embed/episode/53bxVr8fd55SBXlf52q9G9?theme=0",
  "https://open.spotify.com/embed/episode/7bv4CqJ5qlhzfQrQ05KT29?theme=0",
  "https://open.spotify.com/embed/episode/0JjcPIDhvqLX0oIxSmD6mn?theme=0",
  "https://open.spotify.com/embed/episode/6ZTFW8sE98pL0TKoulrOeu?theme=0",
  "https://open.spotify.com/embed/episode/1LGGI1PMTKbZszcYmqdGIg?theme=0",
  "https://open.spotify.com/embed/episode/651J8qcsuvSlW2qlwm174o?theme=0",
  "https://open.spotify.com/embed/episode/7KuL0E57kOrRPGy8NhSvEU?theme=0",
  "https://open.spotify.com/embed/episode/77bSPJ6Zddw6w9k7SuaXnO?theme=0",
  "https://open.spotify.com/embed/episode/4iXgp9JozX8lSnl9axN7GM?theme=0",
  "https://open.spotify.com/embed/episode/10oE8f48CUFTb5O5fvM5LW?theme=0",
  "https://open.spotify.com/embed/episode/5H93aucNZki1QtXH79Y2mX?theme=0",
  "https://open.spotify.com/embed/episode/7oY7WTTUHgdTi9P1Xa4TsE?theme=0",
  "https://open.spotify.com/embed/episode/69sHwJMDiAPGjRlPk0kcAV?theme=0",
  "https://open.spotify.com/embed/episode/0JciNiE4ifu7lgA3LNLGio?theme=0",
];

const PodcastPage = () => {
  return (
    <div className="podcast-page">
      <h1>🎧 Our Spotify Podcast</h1>
      <Masonry
        breakpointCols={{ default: 3, 800: 2, 500: 1 }}
        className="masonry-grid"
        columnClassName="masonry-col"
      >
        {podcastEpisodes.map((url, idx) => (
          <div key={idx} className="masonry-item">
            <iframe
              src={url}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: "12px" }}
            ></iframe>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default PodcastPage;
