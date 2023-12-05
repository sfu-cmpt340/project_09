import React from 'react';
import './gallery.css';
import { useState } from 'react';

// import the images

const Gallery = ({imageList}) => {

    // let data = [
    //     {
    //         id:1,
    //         imgSrc: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    //     },
    //     {
    //         id:2,
    //         imgSrc: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    //     },
    //     {
    //         id:3,
    //         imgSrc: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    //     },
    // ]

    // loop through the imageList

    // FILTERING: removes any duplicates and checks the name prefixes with 'resized-'

    let filteredImgList = [];
    for (let imageUrl of imageList){
        if(filteredImgList.includes(imageUrl) === false && imageUrl.includes('annotated_')){
            filteredImgList.push(imageUrl);
        }
    }




    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('');

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    }

    return(
        <>
        <div className={model? "model open" : "model"}>
            <img src={tempimgSrc} />
            <p className="closeButton" onClick={() => setModel(false)}>Close</p>
        </div>

        <div className="gallery">
            {filteredImgList?.map((item, index)=>{
                const imagename = item.split("annotated_")[1].split(".")[0]
                return(
                    <div className="pics" key={index} onClick={() => getImg(item)}>
                        <img src={item} style={{width: '100%'}} />
                        <div className='text-on-image'>
                            <p> {imagename} </p>
                        </div>
                    </div>
                )
            })}

            {console.log(imageList)}
        </div>
        </>
    )
}

export default Gallery