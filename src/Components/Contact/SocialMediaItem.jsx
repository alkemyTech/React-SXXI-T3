import {parseUsername} from "./parseUsernames";

export const SocialMediaItem = ({url, icon, className, children, containerClassName}) => {
    return (
        <div className={containerClassName}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
                {icon}{children}
            </a>
        </div>
    )
}

export const SocialMediaItemWLabel = ({url, className, containerClassName, icon}) => {
    return (
        <SocialMediaItem url={url} icon={icon} className={className} containerClassName={containerClassName}>
            {' '}{parseUsername(url)}
        </SocialMediaItem>
    )
}