import React, { useState, useEffect } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { ListSubheader } from "@mui/material";
import { IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Dialog } from "@mui/material";
//import {DialogActions} from "@mui/material";
import { DialogContent } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
//import TileData from './TileData';

/*
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    paddingLeft: 15,
    paddingRight: 15,
    background: 'dodgerblue',

  },
  titleBar: {
    background:
      'rgba(0, 0, 0, 0.01)',
  },
  icon: {
    color: 'white',
  },
}));*/
const apiUrl = "https://pixabay.com/api";
const apiKey = "36640679-dc2aaae3a351ed4be072add95";

const Card = ({ categ, find }) => {
  const [images, setImages] = useState([]);

  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/?key=${apiKey}&image_type=photo&pretty=true&category=${categ}&page=all&q=${find}`
      )
      .then((res) => {
        setImages(res.data.hits);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, [categ, find]);

  /* useEffect(() => {
    if (find === "") {
      setImages([]);
    } else {
      axios
        .get(
          `${apiUrl}/?key=${apiKey}&image_type=photo&pretty=true&q=${find}&page=all&safesearch=true`
        )
        .then((res) => setImages(res.data.hits))
        .catch((err) => console.log(err));
    }
  }, [find]);*/

  const downloadImg = (url) => {
    axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, "image.jpg");
      })
      .catch((error) => {
        console.log("Error downloading image:", error);
      });
  };

  const handleOpen = (img) => {
    setOpen(true);
    setCurrentImg(img);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  //const classes = useStyles();
  return (
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
            <img src={img.largeImageURL} alt={img.tags} />
            <ImageListItemBar
              title={img.tags}
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
            src={currentImg.largeImageURL}
            alt={currentImg.tags}
            style={{ width: "100%" }}
          />
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              downloadImg(currentImg.largeImageURL);
            }}
          >
            Download
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Card;
