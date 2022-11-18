import {parseUsername} from "./parseUsernames";

export const SocialMediaItem = ({url, icon, children}) => {
    return (
        <div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="contact-text">
                {icon}{children}
            </a>
        </div>
    )
}

export const SocialMediaItemWLabel = ({url, icon}) => {
    return (
        <SocialMediaItem url={url} icon={icon}>
            {' '}{parseUsername(url)}
        </SocialMediaItem>
    )
}