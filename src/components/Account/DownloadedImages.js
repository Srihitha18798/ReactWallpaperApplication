import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteIcon from "@mui/icons-material/Delete";

const DownloadedImages = () => {
  const { state } = useLocation();
  const { user } = state;
  console.log(user);
  const userData = JSON.parse(localStorage.getItem(user));

  const imgAltText = "Not able to fetch the image ";

  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const [images, setImages] = useState(userData.images);

  const handleOpen = (img) => {
    setOpen(true);
    setCurrentImg(img);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteImg = (img) => {
    const updatedImages = images.filter((element) => element !== img);
    setImages(updatedImages);
    localStorage.setItem(
      user,
      JSON.stringify({
        name: userData.name,
        password: userData.password,
        images: updatedImages,
      })
    );
  };

  return (
    <>
      <AccountHeader />
      {images.length !== 0 ? (
        <div>
          <ImageList
            rowHeight={300}
            cols={3}
            gap={30}
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
          >
            <ImageListItem key="Subheader" cols={3} style={{ height: "auto" }}>
              <ListSubheader component="div"></ListSubheader>
            </ImageListItem>
            {images?.map((img) => (
              <ImageListItem key={img.id}>
                <img src={img} alt={imgAltText} />
                <IconButton
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "2px",
                    zIndex: "1",
                    color: "white",
                  }}
                  onClick={() => {
                    deleteImg(img);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <ImageListItemBar
                  actionIcon={
                    <IconButton
                      style={{ color: "white" }}
                      onClick={() => {
                        handleOpen(img);
                      }}
                    >
                      <ZoomInIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <img
                src={currentImg}
                alt={currentImg}
                style={{ width: "100%" }}
              />
              <Button onClick={handleClose}>Close</Button>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <h2>You have not downloaded any images.</h2>
        </div>
      )}
    </>
  );
};

export default DownloadedImages;
