import style from './SliderTemplate.module.css'

const SliderTemplate = (props) => {
    const htmlContent = {__html: props.description}
    return (
        <>
            <img src={props.image} alt={props.name} className={style.image}/>
            <div className={style.content}>
                <h3 className={style.title}>{props.name}</h3>
                <div dangerouslySetInnerHTML={htmlContent} className={style.text}/>
            </div>
        </>
    )
}
export default SliderTemplate;