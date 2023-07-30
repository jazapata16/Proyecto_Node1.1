import React from "react"
import AWS from 'aws-sdk';
import { useState } from "react";
import { Button } from "./ui";

AWS.config.update({
    accessKeyId: 'ASIARDNAJFBFZFZ5Y3PA', 
    secretAccessKey: 'CRTOnpRaDpwi5wnGmw8uQ5RwGXpkixB2TIMi+koj', 
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEKH//////////wEaDDcmPtEV3scUiofDLiLPARTX5yl+2z/3BqVGHnOsY7SW+2mXmbJVni131OiCoHzTe6/uaIGIyFsrnBKh+JjXG6izLsCTAFDn1YyO4T+QzIez0u8qbw6mmvJW5jmDdIWSxKL9v/ns/4jYXd3LSRTeERyZ/Ek1EQariVO4tG6/YvRqHriABW1ADYfRmIjsd+EOExlmzBinmG5MAKh10ZwujgwVlckCv4rSKUrhtscNgW3CttECc716VCWlkjIxLznPf9IYymBkT1QKV9+jGfpahAGTbCoZFqolVcZGYF4l1iiN08WlBjItYh7or8tVdZgQcqOKYkcCiXZj6Ph+WdFBxbFgQnHi1KePpX5xSriz6hrXqBfQ',
});

export const S3Uploader = () => {
    const s3 = new AWS.s3();
    const [imageUrl, setImageUrl]= useState(null);
    const [file,setFile]= useState(null);

    const handleFileSelect=(e) => {
        setFile(e.target.file[0]);
    }

    const uploarToS3 =async()=>{
        if(!file){
            return;
        }
        const param ={
            Bucket: 'proyectonodejs',
            Key: `${Date.now()}.${file.name}`,
            Body: file
        };
        const {Location}= await s3.upload(param).promise();
        console.log('cargando a s3',Location);
    }
    return(
        <div style={{ marginTop:'150px'}}>
            <h1>Subida de archivo simple</h1>
            <input type='file' onChange={handleFileSelect}/>
            {file&&(
                <div style={{marginTop: '10px'}}>
                    <Button onClick={uploarToS3}>Upload</Button>
                </div>
            )}
            {imageUrl &&(
                <div style={{marginTop: '10px'}}>
                    <img src={imageUrl} alt="uploader"/>

            </div>
            )}
        </div>
    );
}
