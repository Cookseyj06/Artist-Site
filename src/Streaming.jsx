const links = [
    {href:"https://open.spotify.com/artist/1No4Jvg7hVsSYbrz1nLijO", className: "spotify", label: "Spotify"},
    {href:"https://www.instagram.com/alexdethero/?hl=en", className: "instagram", label: "Instagram"},
    {href:"https://www.youtube.com/channel/UCzYJtFi0FLhiWvL7BWysWkQ", className: "youtube", label: "Youtube"},
    {href:"https://www.tiktok.com/@alexdethero", className: "tiktok", label: "TikTok"},
    {href:"https://soundcloud.com/alex-dethero", className: "soundcloud", label: "SoundCloud"},
    {href:"https://music.apple.com/us/artist/alex-dethero/1591651870", className: "appleMusic", label: "Apple Music"}

];

function LinkList({ items }) {
    return items.map((link) => (
        <a key={link.label} href={link.href} className={link.className}>{link.label}</a>
    ));
}

function Streaming({ rows = false}) {
    if (rows) {
        return (
            <div className="social-links">
                <div className="social-row"><LinkList items={links.slice(0,3)} /></div>
                <div className="social-row"><LinkList items={links.slice(3,6)} /></div>
            </div>
        );
    }
    
    return (
        <div className="social-links social-row">
            <LinkList items={links} />
        </div>
    )
}

export default Streaming;