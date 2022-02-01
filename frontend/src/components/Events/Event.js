import { BaseUrl } from 'AxiosInstance'
import React from 'react'

const Event = (props) => {
    const colour=['red','blue','green','yellow']
    const url='#'
    // console.log(props['arr'][0])
    let image = props['arr'][0]['image']
    const ChangeDate=(props)=>{
        return(<><i className="fas fa-calendar-alt mr-2"></i>{props.date}</>)
    }
    return (
        <>
        {props.arr.map((item,key)=>{
            return (<article key={key} className={`postcard dark ${colour[key%4]}`} style={{paddingBottom:'20px',display:"flex",alignItems:"center"}}>
                <a className="postcard__img_link" href={url}>
                    <img style={{height:"100%"}} className="postcard__img" src={BaseUrl+"media/"+image} alt='event'/>
                </a>
                <div style={{textAlign:"center"}} className="postcard__text">
                    <h1  className={`postcard__title ${colour[key%4]}`}>{item.name}</h1>
                    <div className="postcard__subtitle small">
                        <time dateTime="2020-05-25 12:00:00">
                            <ChangeDate date={item.date}/>
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div style={{textAlign:"center"}} className="postcard__preview-txt">{item.details}</div>
                    <ul className="postcard__tagbox">
                        <li className="tag__item" onClick={()=>{window.open(item.resources)}}><i className="fas fa-tag mr-2" ></i>Resources</li>
                    </ul>
                </div>
            </article>)
        })}
            
        </>
    )
}

export default Event
