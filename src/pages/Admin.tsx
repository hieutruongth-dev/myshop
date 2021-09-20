import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { product } from "../model/ProductModel";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openPopup, setOpenPopup] = React.useState(false);

  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  //create
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [reload, setreload] = useState<boolean>();
  const callCreate = () => {
    axios.post("http://localhost:1107/create", {
      name: name,
      img: image,
      price: price,
      des: description,
    });
    alert("Add Product Successfull");
  };
  //edit
  const callUpdate = () => {
    axios
      .post("http://localhost:1107/update", {
        id: productByID.id,
        name: productByID.name,
        img: productByID.image,
        price: productByID.price,
        des: productByID.description,
      })
      .then((res) => setreload(!reload));
    alert("Edit Successfull");
  };
  //select by id
  const [idProduct, setIdProduct] = useState("");
  const [productByID, setProductByID] = useState<product>({
    name: "",
    price: 0,
    image: "",
    description: "",
    id: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:1107/selectbyid", { params: { id: idProduct } })
      .then((data) => {
        setProductByID(data.data);
      });
  }, [idProduct]);

  const classes = useStyles();
  const [listProduct, setList] = useState<product[]>([]);
  useEffect(() => {
    axios.get("http://localhost:1107/listfull").then((data) => {
      setList(data.data);
    });
  }, []);
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Button color="inherit" href="/">
              {" "}
              Home
            </Button>
            <Button color="inherit" onClick={handleClickOpen}>
              {" "}
              Add Product
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {listProduct.map((item) => {
                return (
                  <Grid item key={item.id} xs={12} sm={4} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={item.image}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                        <Typography>{item.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            console.log(item.id);
                            setIdProduct(item.id);
                            handleClickOpenPopup();
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            console.log(item.id);
                            const rs = global.confirm("Delete ok ?")
                            if(rs){
                              axios.post("http://localhost:1107/delete",{
                                id : item.id
                              }).then(res=>setreload(!reload))
                            }
                          }}
                        >
                          Delete
                        </Button>
                        <Typography>{item.price}</Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </main>
      </React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete Form</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image"
            type="text"
            fullWidth
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              callCreate();
              handleClose();
              e.stopPropagation();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete Form</DialogContentText>
          <>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
              value={productByID.name}
              onChange={(e) => {
                setProductByID({
                  ...productByID,
                  name: e.target.value,
                });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              label="Image"
              type="text"
              fullWidth
              value={productByID.image}
              onChange={(e) => {
                setProductByID({
                  ...productByID,
                  image: e.target.value,
                });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              value={productByID.price}
              onChange={(e) => {
                setProductByID({
                  ...productByID,
                  price: parseInt(e.target.value),
                });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={productByID.description}
              onChange={(e) => {
                setProductByID({
                  ...productByID,
                  description: e.target.value,
                });
              }}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              callUpdate();
              handleClosePopup();
              e.stopPropagation();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
