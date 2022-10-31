import './Title.css';

const Title = ({
                   title = "",
                   image = "https://ong-project.vercel.app/static/media/pic2-test.cc9c5fdb28b717e18a2b.jpg"
               }) => {
    return (
        <div style={{
            backgroundImage: `url(${image})`,
        }}
             className="title-container">
            <h1 className="title-text">{title}</h1>
        </div>
    );
}

export default Title;