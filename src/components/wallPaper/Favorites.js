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
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteIcon from "@mui/icons-material/Delete";
import TileData from "./TileData";
import FavoriteHeader from "./FavoriteHeader";

const Favorites = () => {
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const handleOpen = (img) => {
    setOpen(true);
    setCurrentImg(img);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FavoriteHeader />
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
          {TileData?.map((tile) => (
            <ImageListItem key={tile.id}>
              <img src={tile.img} alt={tile.title} />
              <IconButton
                style={{
                  position: "absolute",
                  bottom: "2px",
                  left: "2px",
                  zIndex: "1",
                  color: "white",
                }}
                onClick={() => {}}
              >
                <DeleteIcon />
              </IconButton>
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    style={{ color: "white" }}
                    onClick={() => {
                      handleOpen(tile.img);
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
            <img src={currentImg} alt={currentImg} style={{ width: "100%" }} />
            <Button onClick={handleClose}>Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Favorites;
