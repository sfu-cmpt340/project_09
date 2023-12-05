# SFU CMPT 340 - SAM Segmentation Machine (SAM SM)
SAM Segmentation Machine is a full stack web application created by Mathew Tse, Raymond Kong, Alex Simpson, Jody Tao, Oliver Ng-Young-Lim.
This web app allows users to upload a DICOM image and the segmented image will be returned in the 'processed images' page.  


## Important Links

| [Timesheet](https://1sfu-my.sharepoint.com/:x:/g/personal/kabhishe_sfu_ca/EfPw-6yhhaNMjL7N1J2hK7MBpV-RSoG_9ocsgho20TwK2g?e=2bi2Im) | [Slack channel](https://app.slack.com/client/T05JYJAF22G/C05T7MA6T6J/docs/Qp:F05U3C2D1CG) | [Project report](https://www.overleaf.com/project/650ca0c0dcd3d7eb38ba626b) |
|-----------|---------------|-------------------------|



## Video/demo/GIF
Record a short video (1:40 - 2 minutes maximum) or gif or a simple screen recording or even using PowerPoint with audio or with text, showcasing your work.


## Table of Contents
1. [Demo](#demo)

2. [Installation](#installation)

3. [Reproducing this project](#repro)

<a name="demo"></a>
## 1. Example demo

A minimal example to showcase your work

Home Page with Lung Image Uploaded
<img width="800" alt="Screen Shot 2023-12-04 at 10 50 19 PM" src="https://github.com/sfu-cmpt340/project_09/assets/88808907/06abb21f-c580-45bc-b9c2-a2bd13f5bd4f">

Processed Segmented Images

<img width="800" alt="Screen Shot 2023-12-04 at 10 52 03 PM" src="https://github.com/sfu-cmpt340/project_09/assets/88808907/38d0a0d7-11ae-4680-8309-5509f6679c01">

### What to find where

File Directory Layout:

```bash
repository
├── functions                         ## Firebase credentials and cloud functions on file upload
├── my-react-app                     ## source code of React frontend 
├── SAM                        	## source code of SAM code and flask backend 
├── README.md                    ## You are here
```

<a name="installation"></a>

## 2. Installation


### SAM and backend setup 

The code requires the following dependencies:
1. Python version 3.9 - 3.11 (3.12 will not work!)
2. Node.js
(Make sure that you also have npm installed)

Clone the repository onto your computer

Download the file below by pasting this URL into your browser
https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth
Copy and paste this file into the project, inside of the SAM folder

SAM and backend Dependencies:
CD into the SAM Directory and run
```
pip install -r requirements.txt
```

### Frontend React setup
CD into the my-react-app directory and run
npm install

Congratulations! You have finished installing the project! Run instructions are in the reproduction section below

<a name="repro"></a>
## 3. Reproduction

### On Windows:

1. Open project_09 folder in your file explorer, and double click to run WindowsApp.bat
2. Open your browser and go to the URL localhost:3000

### Mac/Linux
1. Open project_09 folder in your terminal, and type: sh MacOSApp.sh on Mac. Type sh Linux.sh on Linux.
2. Open your browser and go to the URL localhost:3000
   
### Alternatively, if the above didn't work:

1. Open a new terminal
2. cd into my-react-app
3. npm run start -> React front end should now be running
4. Open a new terminal
5. cd into SAM
6. python app.py -> Flask backend should now be running
7. Wait until you see the message: Running on http://127.0.0.1:5000
8. Open your browser and type in the URL: localhost:3000
9. You should now be able to see the application running!
10. To upload a file, click on the ‘Click Here to Upload a DICOM Image’ and select your DICOM image
11. Once your DICOM images have been uploaded, wait up to 15 minutes for the segmented image to appear on the Modified Images tab. 

<a name="guide"></a>
