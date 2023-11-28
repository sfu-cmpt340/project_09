import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL} from 'firebase/storage';
// import ImageGallery from "react-image-grid-gallery";
import Gallery from "../components/Gallery";

export default function ModifiedPictures() {

    const imageRef = ref(storage);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                console.log('executed!');
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    },[]);

    return (
        <div>
            {/* <ImageGallery imgArray={imageList} columnWidth={500} gapSize={10}/> */}
            { imageList.length > 0 ? <Gallery imageList={imageList}/> : ''}

        </div>
    )
}