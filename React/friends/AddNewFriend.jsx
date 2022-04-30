import React, { useState, useEffect, useRef, useCallback } from "react";
import toastr from "toastr";
import "react-toastify/dist/ReactToastify.css";
import * as friendsService from "./friendsService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as uploadService from "../uploadService";
// import { Route } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function FriendsNew() {
  const [addFriendForm, setAddFriendForm] = useState({
    title: "",
    bio: "not neeeded for this project",
    summary: "",
    headline: "not neeeded for this project",
    slug: "",
    statusId: "Active",
    primaryImage: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  //, setSelectedFile
  //cropping state

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  // console.log(previewCanvasRef);

  //friends edit stuff
  const friendLocation = useLocation();
  const friendPassedFromState = friendLocation?.state?.payload;

  const navigate = useNavigate();

  const friendObject = useParams();

  useEffect(() => {
    let isIdPresent = false;
    if (friendObject?.friendId) {
      if (friendPassedFromState) {
        FriendTransported(friendPassedFromState);
      } else {
        let thisIsPointless = friendObject.friendId;
        friendsService
          .getFriendById(thisIsPointless)
          .then(onFindIdSuccess)
          .catch(onFindIdError);
      }
      isIdPresent = true;
      console.log("working", friendObject, isIdPresent);
      //
    }
  }, []);

  function onSubmit() {
    const data = {
      title: addFriendForm.title,
      bio: "not neeeded for this project",
      summary: addFriendForm.summary,
      headline: "not neeeded for this project",
      slug: Math.floor(Math.random() * 123468),
      statusId: "Active",
      primaryImage: addFriendForm.primaryImage,
    };
    console.log(data);
    let thisIsPointless = friendObject.friendId;
    if (thisIsPointless) {
      // data.id = parseInt(thisIsPointless);
      console.log(data);
      friendsService
        .editFriendById(thisIsPointless, data)
        .then(onEditSuccess)
        .catch(onEditError);
    } else {
      friendsService.addFriend(data).then(onActionSuccess).catch(onActionError);
    }
  }
  //look up .filer
  const onActionSuccess = (response) => {
    console.log(
      toastr.success("Friend Added Successfully"),
      response,
      navigate(`/friends`)
    );
  };

  const onActionError = (errResponse) => {
    console.log(toastr.error("Failed To Add Friend", errResponse));
  };

  const onEditSuccess = (response) => {
    console.log(
      toastr.success("Friend Edited Successfully"),
      response,
      navigate(`/friends`)
    );
  };

  const onEditError = (errResponse) => {
    toastr.error("Failed To Edit Friend", errResponse);
  };

  const onFormFieldChange = (e) => {
    const target = e.target;
    const newUserValue = target.value;
    const nameOfField = target.name;

    setAddFriendForm((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
  };

  const FriendTransported = (friend) => {
    const theFriend = friend;
    const newFriendForm = {
      title: theFriend.title,
      bio: theFriend.bio,
      summary: theFriend.summary,
      headline: theFriend.headline,
      slug: theFriend.slug,
      primaryImage: theFriend.primaryImage.imageUrl,
    };
    console.log("friends transported", newFriendForm);
    setAddFriendForm(newFriendForm);
  };

  const onFindIdSuccess = (response) => {
    console.log(response);
    const theFriend = response.data.item;
    const newFriendForm = {
      title: theFriend.title,
      bio: theFriend.bio,
      summary: theFriend.summary,
      headline: theFriend.headline,
      slug: theFriend.slug,
      primaryImage: theFriend.primaryImage.imageUrl,
    };
    console.log("friends edit stuff", newFriendForm);
    setAddFriendForm(newFriendForm);
  };

  const onFindIdError = (err) => {
    console.log(err);
  };

  // file upload stuff

  const onFileChange = (e) => {
    // let uploadThis = new FormData();

    // let file = e.target.files[0];
    // uploadThis.append("file", file);

    // setSelectedFile(uploadThis);

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // function generateDownload(canvas, crop) {
  // if (!crop || !canvas) {
  //   return;
  // }
  //Returning notes need second button for cropping and uploading
  // const onCropClick = () => {
  //   // let uploadThis = new FormData();

  //   // let file = selectedFile;
  //   // uploadThis.append("file", file);
  //   // console.log(file);

  //   // setSelectedFile(uploadThis);
  //   console.log("not sure eh");
  //   //  generateDownload(previewCanvasRef.current, completedCrop);
  //   // const data = selectedFile;
  //   // uploadService.upload(data).then(onUplaodSuccess).catch(onUploadError);
  // };

  const onUploadClick = () => {
    let uploadThis = new FormData();

    let file = selectedFile;
    uploadThis.append("file", file);
    console.log(file);

    setSelectedFile(uploadThis);

    const data = uploadThis;

    uploadService.upload(data).then(onUplaodSuccess).catch(onUploadError);
  };
  const onUplaodSuccess = (response) => {
    console.log(toastr.success("Photo Uploaded Successfully"));
    console.log(response.data.items[0]);
    setAddFriendForm((prevState) => {
      let image = response.data.items[0];
      const newUserObject = {
        ...prevState,
      };

      newUserObject["primaryImage"] = image;

      return newUserObject;
    });
  };
  const onUploadError = (response) => {
    console.log(response);
  };
  // console.log(selectedFile);

  //Image crop stuff
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    // canvas.toBlob(blob=>{
    //   setSelectedFile(blob)
    // })

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          console.error("Canvas is empty");
          return;
        }
        blob.name = "cropped.jpeg";
        let fileUrl = window.URL.createObjectURL(blob);
        window.URL.revokeObjectURL(fileUrl);

        resolve(fileUrl);
        setSelectedFile(blob);
      }, "image/jpeg");
    });
  }, [completedCrop]);

  //testing exporting crop
  // function generateDownload(canvas, crop) {
  //   if (!crop || !canvas) {
  //     return;
  //   }

  //   canvas.toBlob(
  //     (blob) => {
  //       const previewUrl = window.URL.createObjectURL(blob);

  //       const anchor = document.createElement("a");
  //       anchor.download = "crop.png";
  //       anchor.href = URL.createObjectURL(blob);
  //       anchor.click();

  //       window.URL.revokeObjectURL(previewUrl);
  //     },
  //     "image/png",
  //     1
  //   );
  //   onCropClick()
  // }

  return (
    <React.Fragment>
      <div className="container-lg">
        <div className="text-center">
          <div className="row justify-content-center my-5">
            <div className="col-lg-6">
              <form id="friend">
                <label for="title" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="John Doe"
                  className="form-control"
                  value={addFriendForm.title}
                  onChange={onFormFieldChange}
                  // defaultValue={ifIdPresent && friend.title}
                  required
                />

                <label for="summary" className="form-label">
                  Summary:
                </label>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  placeholder="John Doe is currently the CEO of Acme Corp."
                  className="form-control"
                  value={addFriendForm.summary}
                  onChange={onFormFieldChange}
                  // defaultValue={ifIdPresent && friend.summary}
                  required
                />

                <label for="image" className="form-label">
                  Photo:
                </label>

                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
                <br />

                {/* <button
                  type="button"
                  className="btn btn-info submit-form create-friend"
                  // enabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={onCropClick}
                >
                  crop image
                </button> */}

                <button
                  type="button"
                  className="btn btn-info submit-form create-friend"
                  // enabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={onUploadClick}
                >
                  Upload image
                </button>

                <button
                  type="button"
                  className="btn btn-info submit-form create-friend"
                  onClick={onSubmit}
                >
                  Create New Friend!
                </button>
              </form>
              <div className="App">
                <div>
                  {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
                </div>
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
                <div>
                  <canvas
                    ref={previewCanvasRef}
                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                    style={{
                      width: Math.round(completedCrop?.width ?? 0),
                      height: Math.round(completedCrop?.height ?? 0),
                    }}
                  />
                </div>
                <p>
                  Please click upload image once you are finished with cropping
                  your image before submitting a new friend. wait for the
                  notification that uplaod is complete.
                </p>
                {/* <button
                  type="button"
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={() =>
                    generateDownload(previewCanvasRef.current, completedCrop)
                  }
                >
                  Download cropped image
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FriendsNew;
